import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getWeekSchedules,
  getUserReservations,
  createReservation,
  cancelReservation,
} from "../lib/booking";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toDateStr(d) {
  return d.toISOString().split("T")[0];
}

function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

const DIAS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

export function useClases() {
  const { user, role } = useAuth();
  const { showToast } = useToast();

  const [weekOffset, setWeekOffset] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTipo, setFilterTipo] = useState("todos");
  const [filterInstructor, setFilterInstructor] = useState("todos");
  const [search, setSearch] = useState("");
  const [bookingId, setBookingId] = useState(null); // schedule being booked

  const monday = useMemo(
    () => addDays(getMonday(new Date()), weekOffset * 7),
    [weekOffset],
  );
  const sunday = useMemo(() => addDays(monday, 6), [monday]);

  const canBook = !!user && role === "cliente";

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await getWeekSchedules(
      toDateStr(monday),
      toDateStr(sunday),
    );
    setSchedules(data || []);

    if (user) {
      const { data: res } = await getUserReservations(user.id);
      setUserReservations(res || []);
    }
    setLoading(false);
  }, [monday, sunday, user]);

  useEffect(() => {
    load();
  }, [load]);

  // Realtime
  useEffect(() => {
    const channel = supabase
      .channel("booking-schedules")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "class_schedules" },
        load,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        load,
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [load]);

  // Filters
  const filtered = useMemo(() => {
    let result = schedules;
    if (filterTipo !== "todos") {
      result = result.filter((s) => s.classes?.tipo === filterTipo);
    }
    if (filterInstructor !== "todos") {
      result = result.filter((s) => s.instructor?.nombre === filterInstructor);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.classes?.nombre?.toLowerCase().includes(q) ||
          s.instructor?.nombre?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [schedules, filterTipo, filterInstructor, search]);

  // Group by day
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(monday, i);
      const dateStr = toDateStr(date);
      return {
        label: DIAS[i],
        date,
        dateStr,
        isToday: dateStr === toDateStr(new Date()),
        items: filtered.filter((s) => s.fecha === dateStr),
      };
    });
  }, [monday, filtered]);

  const tipos = useMemo(
    () => [...new Set(schedules.map((s) => s.classes?.tipo).filter(Boolean))],
    [schedules],
  );
  const instructores = useMemo(
    () => [
      ...new Set(schedules.map((s) => s.instructor?.nombre).filter(Boolean)),
    ],
    [schedules],
  );

  const isReserved = useCallback(
    (scheduleId) => userReservations.some((r) => r.schedule_id === scheduleId),
    [userReservations],
  );

  const getReservationId = useCallback(
    (scheduleId) =>
      userReservations.find((r) => r.schedule_id === scheduleId)?.id,
    [userReservations],
  );

  const handleBook = async (scheduleId) => {
    if (!user) return; // handled at UI level (show login modal)
    setBookingId(scheduleId);
    const { error } = await createReservation(user.id, scheduleId);
    if (error) {
      if (error.message?.includes("cupos")) {
        showToast("No hay cupos disponibles", "error");
      } else if (
        error.message?.includes("reserva_unica") ||
        error.code === "23505"
      ) {
        showToast("Ya tienes una reserva en esta clase", "error");
      } else {
        showToast("Error al reservar", "error");
      }
    } else {
      showToast("¡Clase reservada exitosamente!");
    }
    setBookingId(null);
  };

  const handleCancel = async (scheduleId) => {
    const resId = getReservationId(scheduleId);
    if (!resId) return;
    setBookingId(scheduleId);
    const { error } = await cancelReservation(resId);
    if (error) {
      showToast("Error al cancelar reserva", "error");
    } else {
      showToast("Reserva cancelada");
    }
    setBookingId(null);
  };

  const prevWeek = () => setWeekOffset((w) => w - 1);
  const nextWeek = () => setWeekOffset((w) => w + 1);
  const goThisWeek = () => setWeekOffset(0);

  return {
    loading,
    days,
    tipos,
    instructores,
    filterTipo,
    setFilterTipo,
    filterInstructor,
    setFilterInstructor,
    search,
    setSearch,
    canBook,
    isReserved,
    handleBook,
    handleCancel,
    bookingId,
    prevWeek,
    nextWeek,
    goThisWeek,
    weekOffset,
    monday,
    sunday,
  };
}

import { useState, useEffect, useCallback } from "react";
import {
  getInstructorSchedules,
  getScheduleReservations,
  updateReservationAttendance,
} from "../lib/instructor";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export function useInstructorAsistencia() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRes, setLoadingRes] = useState(false);

  const loadSchedules = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await getInstructorSchedules(user.id);
    setSchedules(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const selectSchedule = async (scheduleId) => {
    setSelectedSchedule(scheduleId);
    if (!scheduleId) {
      setReservations([]);
      return;
    }
    setLoadingRes(true);
    const { data } = await getScheduleReservations(scheduleId);
    setReservations(data || []);
    setLoadingRes(false);
  };

  const refreshReservations = useCallback(async () => {
    if (!selectedSchedule) return;
    const { data } = await getScheduleReservations(selectedSchedule);
    setReservations(data || []);
  }, [selectedSchedule]);

  // Realtime en reservations
  useEffect(() => {
    if (!selectedSchedule) return;
    const channel = supabase
      .channel("inst-reservations")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        refreshReservations,
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [selectedSchedule, refreshReservations]);

  const markAttendance = async (reservationId, estado) => {
    const { error } = await updateReservationAttendance(reservationId, estado);
    if (error) {
      showToast("Error al marcar asistencia", "error");
    } else {
      showToast(
        estado === "asistida"
          ? "Asistencia registrada"
          : "Marcada como no asistió",
      );
      await refreshReservations();
    }
  };

  const markAllAttended = async () => {
    const pendientes = reservations.filter((r) => r.estado === "confirmada");
    for (const r of pendientes) {
      await updateReservationAttendance(r.id, "asistida");
    }
    showToast(`${pendientes.length} alumnas marcadas como asistidas`);
    await refreshReservations();
  };

  const selected = schedules.find((s) => s.id === selectedSchedule);

  return {
    loading,
    loadingRes,
    schedules,
    selectedSchedule,
    selectSchedule,
    selected,
    reservations,
    markAttendance,
    markAllAttended,
  };
}

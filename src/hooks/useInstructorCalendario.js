import { useState, useEffect, useCallback } from "react";
import {
  getInstructorSchedules,
  getScheduleReservations,
} from "../lib/instructor";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export function useInstructorCalendario() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTipo, setFilterTipo] = useState("todos");
  const [expandedId, setExpandedId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await getInstructorSchedules(user.id);
    setSchedules(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  // Realtime
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("inst-schedules")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "class_schedules" },
        load,
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [user, load]);

  const toggleExpand = async (scheduleId) => {
    if (expandedId === scheduleId) {
      setExpandedId(null);
      setReservations([]);
      return;
    }
    setExpandedId(scheduleId);
    setLoadingReservations(true);
    const { data } = await getScheduleReservations(scheduleId);
    setReservations(data || []);
    setLoadingReservations(false);
  };

  // Agrupar por fecha
  const hoy = new Date().toISOString().split("T")[0];
  const manana = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const en7Dias = new Date(Date.now() + 7 * 86400000)
    .toISOString()
    .split("T")[0];

  const filtered =
    filterTipo === "todos"
      ? schedules
      : schedules.filter((s) => s.classes?.tipo === filterTipo);

  const grupos = [
    { label: "Hoy", items: filtered.filter((s) => s.fecha === hoy) },
    { label: "Mañana", items: filtered.filter((s) => s.fecha === manana) },
    {
      label: "Próximos 7 días",
      items: filtered.filter((s) => s.fecha > manana && s.fecha <= en7Dias),
    },
    { label: "Más adelante", items: filtered.filter((s) => s.fecha > en7Dias) },
  ].filter((g) => g.items.length > 0);

  const tipos = [
    ...new Set(schedules.map((s) => s.classes?.tipo).filter(Boolean)),
  ];

  return {
    loading,
    grupos,
    tipos,
    filterTipo,
    setFilterTipo,
    expandedId,
    toggleExpand,
    reservations,
    loadingReservations,
  };
}

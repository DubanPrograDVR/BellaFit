import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

// ── Utilidades de cumpleaños ──

function isBirthdayInNext7Days(fechaNacimiento) {
  if (!fechaNacimiento) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bday = new Date(fechaNacimiento + "T00:00:00");
  const thisYear = new Date(
    today.getFullYear(),
    bday.getMonth(),
    bday.getDate(),
  );
  const nextYear = new Date(
    today.getFullYear() + 1,
    bday.getMonth(),
    bday.getDate(),
  );
  const next7 = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return (
    (thisYear >= today && thisYear <= next7) ||
    (nextYear >= today && nextYear <= next7)
  );
}

function daysUntilBirthday(fechaNacimiento) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bday = new Date(fechaNacimiento + "T00:00:00");
  let candidate = new Date(
    today.getFullYear(),
    bday.getMonth(),
    bday.getDate(),
  );
  if (candidate < today) {
    candidate = new Date(
      today.getFullYear() + 1,
      bday.getMonth(),
      bday.getDate(),
    );
  }
  return Math.round((candidate - today) / (1000 * 60 * 60 * 24));
}

// ── Hook principal ──

export function useInstructorNotificaciones() {
  const { user } = useAuth();
  const [birthdays, setBirthdays] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [newScheduleIds, setNewScheduleIds] = useState(new Set());
  const [loadingBirthdays, setLoadingBirthdays] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  const channelRef = useRef(null);

  // ── Cumpleaños próximos (todos los clientes) ──
  const loadBirthdays = async () => {
    setLoadingBirthdays(true);

    // Obtener role_id de 'cliente'
    const { data: roleData } = await supabase
      .from("roles")
      .select("id")
      .eq("nombre", "cliente")
      .single();

    if (!roleData) {
      setLoadingBirthdays(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("id, nombre, fecha_nacimiento")
      .eq("role_id", roleData.id)
      .not("fecha_nacimiento", "is", null);

    if (data) {
      const upcoming = data
        .filter((p) => isBirthdayInNext7Days(p.fecha_nacimiento))
        .map((p) => ({
          ...p,
          daysUntil: daysUntilBirthday(p.fecha_nacimiento),
        }))
        .sort((a, b) => a.daysUntil - b.daysUntil);
      setBirthdays(upcoming);
    }

    setLoadingBirthdays(false);
  };

  // ── Clases asignadas al instructor (últimas 15) ──
  const loadSchedules = async () => {
    if (!user) return;
    setLoadingSchedules(true);

    const { data } = await supabase
      .from("class_schedules")
      .select("*, classes(nombre, tipo)")
      .eq("instructor_id", user.id)
      .order("created_at", { ascending: false })
      .limit(15);

    if (data) setSchedules(data);
    setLoadingSchedules(false);
  };

  useEffect(() => {
    loadBirthdays();
    loadSchedules();
  }, [user?.id]);

  // ── Realtime: nuevas clases asignadas a este instructor ──
  useEffect(() => {
    if (!user) return;

    channelRef.current = supabase
      .channel(`instructor-notif-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "class_schedules",
          filter: `instructor_id=eq.${user.id}`,
        },
        async (payload) => {
          const { data } = await supabase
            .from("class_schedules")
            .select("*, classes(nombre, tipo)")
            .eq("id", payload.new.id)
            .single();

          if (data) {
            setSchedules((prev) => [data, ...prev.slice(0, 14)]);
            setNewScheduleIds((prev) => new Set([...prev, data.id]));
          }
        },
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [user?.id]);

  return {
    birthdays,
    schedules,
    newScheduleIds,
    loadingBirthdays,
    loadingSchedules,
  };
}

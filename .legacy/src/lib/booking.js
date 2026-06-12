import { supabase } from "./supabase";

// ── Horarios públicos de la semana ──

export async function getWeekSchedules(startDate, endDate) {
  const { data, error } = await supabase
    .from("class_schedules")
    .select(
      "*, classes(nombre, tipo, capacidad, duracion, activo), instructor:profiles!class_schedules_instructor_id_fkey(nombre)",
    )
    .gte("fecha", startDate)
    .lte("fecha", endDate)
    .order("hora_inicio")
    .order("fecha");
  // Filter out schedules for inactive classes
  const filtered = data?.filter((s) => s.classes?.activo !== false) || [];
  return { data: filtered, error };
}

// ── Reservas del usuario para una semana (para saber qué ya reservó) ──

export async function getUserReservations(userId) {
  const { data, error } = await supabase
    .from("reservations")
    .select("id, schedule_id, estado")
    .eq("user_id", userId)
    .in("estado", ["confirmada", "asistida"]);
  return { data, error };
}

// ── Crear reserva ──

export async function createReservation(userId, scheduleId) {
  const { data, error } = await supabase
    .from("reservations")
    .insert({ user_id: userId, schedule_id: scheduleId })
    .select()
    .single();
  return { data, error };
}

// ── Cancelar reserva ──

export async function cancelReservation(reservationId) {
  const { data, error } = await supabase
    .from("reservations")
    .update({ estado: "cancelada" })
    .eq("id", reservationId)
    .select()
    .single();
  return { data, error };
}

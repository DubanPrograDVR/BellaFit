import { supabase } from "./supabase";

// ── Horarios del instructor ──

export async function getInstructorSchedules(instructorId) {
  const { data, error } = await supabase
    .from("class_schedules")
    .select("*, classes(nombre, tipo, capacidad, duracion)")
    .eq("instructor_id", instructorId)
    .gte("fecha", new Date().toISOString().split("T")[0])
    .order("fecha")
    .order("hora_inicio");
  return { data, error };
}

export async function getInstructorAllSchedules(instructorId) {
  const { data, error } = await supabase
    .from("class_schedules")
    .select("*, classes(nombre, tipo, capacidad, duracion)")
    .eq("instructor_id", instructorId)
    .order("fecha", { ascending: false })
    .order("hora_inicio");
  return { data, error };
}

// ── Reservas de un horario ──

export async function getScheduleReservations(scheduleId) {
  const { data, error } = await supabase
    .from("reservations")
    .select("*, profiles(nombre, email, telefono)")
    .eq("schedule_id", scheduleId)
    .order("created_at");
  return { data, error };
}

// ── Marcar asistencia ──

export async function updateReservationAttendance(reservationId, estado) {
  const { data, error } = await supabase
    .from("reservations")
    .update({ estado })
    .eq("id", reservationId)
    .select("*, profiles(nombre, email, telefono)")
    .single();
  return { data, error };
}

// ── Observaciones ──

export async function getObservations(scheduleId) {
  const { data, error } = await supabase
    .from("instructor_observations")
    .select("*")
    .eq("schedule_id", scheduleId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createObservation(scheduleId, instructorId, contenido) {
  const { data, error } = await supabase
    .from("instructor_observations")
    .insert({ schedule_id: scheduleId, instructor_id: instructorId, contenido })
    .select()
    .single();
  return { data, error };
}

export async function deleteObservation(observationId) {
  const { error } = await supabase
    .from("instructor_observations")
    .delete()
    .eq("id", observationId);
  return { error };
}

// ── Estadísticas ──

export async function getInstructorStats(instructorId) {
  // Todos los horarios del instructor
  const { data: schedules } = await supabase
    .from("class_schedules")
    .select("id, fecha, hora_inicio, classes(nombre)")
    .eq("instructor_id", instructorId)
    .order("fecha", { ascending: false });

  if (!schedules || schedules.length === 0) {
    return { totalClases: 0, tasaAsistencia: 0, alumnosUnicos: 0, proximaClase: null, resumen: [] };
  }

  const hoy = new Date().toISOString().split("T")[0];
  const hace30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const pasados = schedules.filter((s) => s.fecha <= hoy && s.fecha >= hace30);
  const scheduleIds = pasados.map((s) => s.id);

  // Reservas de esos horarios
  const { data: reservations } = scheduleIds.length
    ? await supabase
        .from("reservations")
        .select("id, user_id, estado, schedule_id")
        .in("schedule_id", scheduleIds)
    : { data: [] };

  const totalClases = pasados.length;
  const totalReservas = reservations?.length || 0;
  const asistieron = reservations?.filter((r) => r.estado === "asistida").length || 0;
  const tasaAsistencia = totalReservas > 0 ? Math.round((asistieron / totalReservas) * 100) : 0;
  const alumnosUnicos = new Set(reservations?.map((r) => r.user_id)).size;

  // Próxima clase
  const futuras = schedules.filter((s) => s.fecha >= hoy);
  const proximaClase = futuras.length > 0 ? futuras[futuras.length - 1] : null;

  // Resumen por clase
  const resumenMap = {};
  for (const s of pasados) {
    const nombre = s.classes?.nombre || "Sin nombre";
    const reservasClase = reservations?.filter((r) => r.schedule_id === s.id) || [];
    if (!resumenMap[nombre]) resumenMap[nombre] = { nombre, clases: 0, inscritas: 0, asistieron: 0 };
    resumenMap[nombre].clases++;
    resumenMap[nombre].inscritas += reservasClase.length;
    resumenMap[nombre].asistieron += reservasClase.filter((r) => r.estado === "asistida").length;
  }
  const resumen = Object.values(resumenMap).sort((a, b) => b.clases - a.clases);

  return { totalClases, tasaAsistencia, alumnosUnicos, proximaClase, resumen };
}

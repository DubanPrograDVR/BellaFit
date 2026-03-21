import { supabase } from "./supabase";

// ── Usuarios ──

export async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, roles(id, nombre)")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function getUserById(id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, roles(id, nombre)")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function updateUser(id, updates) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select("*, roles(id, nombre)")
    .single();
  return { data, error };
}

export async function deleteUser(id) {
  const { error } = await supabase.from("profiles").delete().eq("id", id);
  return { error };
}

// ── Roles ──

export async function getRoles() {
  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .order("nombre");
  return { data, error };
}

// ── Clases ──

export async function getClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createClass(classData) {
  const { data, error } = await supabase
    .from("classes")
    .insert(classData)
    .select()
    .single();
  return { data, error };
}

export async function updateClass(id, updates) {
  const { data, error } = await supabase
    .from("classes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function deleteClass(id) {
  const { error } = await supabase.from("classes").delete().eq("id", id);
  return { error };
}

// ── Horarios ──

export async function getSchedules() {
  const { data, error } = await supabase
    .from("class_schedules")
    .select(
      "*, classes(id, nombre, tipo, capacidad), instructor:profiles!instructor_id(id, nombre)",
    )
    .order("fecha", { ascending: true });
  return { data, error };
}

export async function createSchedule(scheduleData) {
  const { data, error } = await supabase
    .from("class_schedules")
    .insert(scheduleData)
    .select(
      "*, classes(id, nombre, tipo, capacidad), instructor:profiles!instructor_id(id, nombre)",
    )
    .single();
  return { data, error };
}

export async function updateSchedule(id, updates) {
  const { data, error } = await supabase
    .from("class_schedules")
    .update(updates)
    .eq("id", id)
    .select(
      "*, classes(id, nombre, tipo, capacidad), instructor:profiles!instructor_id(id, nombre)",
    )
    .single();
  return { data, error };
}

export async function deleteSchedule(id) {
  const { error } = await supabase
    .from("class_schedules")
    .delete()
    .eq("id", id);
  return { error };
}

// ── Instructores (para asignar a horarios) ──

export async function getInstructors() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, nombre, roles(nombre)")
    .eq("roles.nombre", "instructor");
  return { data: data?.filter((p) => p.roles?.nombre === "instructor"), error };
}

// ── Reservas (vista admin) ──

export async function getReservationsBySchedule(scheduleId) {
  const { data, error } = await supabase
    .from("reservations")
    .select("*, user:profiles!user_id(id, nombre, email)")
    .eq("schedule_id", scheduleId)
    .order("created_at", { ascending: false });
  return { data, error };
}

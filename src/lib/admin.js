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

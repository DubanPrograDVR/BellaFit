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

// ── Productos (inventario) ──

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createProduct(productData) {
  const { data, error } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single();
  return { data, error };
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  return { error };
}

// ── Packs / Combos ──

export async function getPacks() {
  const { data, error } = await supabase
    .from("product_packs")
    .select(
      "*, pack_items(*, product:products(id, nombre, precio, imagen_url))",
    )
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createPack(packData, items) {
  const { data: pack, error: packError } = await supabase
    .from("product_packs")
    .insert(packData)
    .select()
    .single();

  if (packError || !pack) return { data: null, error: packError };

  if (items.length > 0) {
    const packItems = items.map((item) => ({
      pack_id: pack.id,
      product_id: item.product_id,
      cantidad: item.cantidad,
    }));

    const { error: itemsError } = await supabase
      .from("pack_items")
      .insert(packItems);

    if (itemsError) return { data: pack, error: itemsError };
  }

  // Re-fetch with joins
  const { data, error } = await supabase
    .from("product_packs")
    .select(
      "*, pack_items(*, product:products(id, nombre, precio, imagen_url))",
    )
    .eq("id", pack.id)
    .single();

  return { data, error };
}

export async function updatePack(id, packData, items) {
  const { error: packError } = await supabase
    .from("product_packs")
    .update(packData)
    .eq("id", id);

  if (packError) return { error: packError };

  // Replace pack items
  await supabase.from("pack_items").delete().eq("pack_id", id);

  if (items.length > 0) {
    const packItems = items.map((item) => ({
      pack_id: id,
      product_id: item.product_id,
      cantidad: item.cantidad,
    }));

    const { error: itemsError } = await supabase
      .from("pack_items")
      .insert(packItems);

    if (itemsError) return { error: itemsError };
  }

  const { data, error } = await supabase
    .from("product_packs")
    .select(
      "*, pack_items(*, product:products(id, nombre, precio, imagen_url))",
    )
    .eq("id", id)
    .single();

  return { data, error };
}

export async function deletePack(id) {
  const { error } = await supabase.from("product_packs").delete().eq("id", id);
  return { error };
}

// ── Imagen de producto (Storage) ──

export async function uploadProductImage(file) {
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const path = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) return { url: null, error };

  const { data: urlData } = supabase.storage
    .from("products")
    .getPublicUrl(path);

  return { url: urlData.publicUrl, error: null };
}

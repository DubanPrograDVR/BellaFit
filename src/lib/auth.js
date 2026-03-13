import { supabase } from "./supabase";

/**
 * Login con email o nombre de usuario + contraseña.
 * Si el identificador no contiene "@", busca el email asociado al nombre.
 */
export async function login(identifier, password) {
  let email = identifier.trim();

  if (!email.includes("@")) {
    const { data } = await supabase.rpc("get_email_by_username", {
      username: email,
    });

    if (!data) {
      return {
        data: null,
        error: { message: "Su usuario o contraseña son incorrectos" },
      };
    }
    email = data;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      data: null,
      error: { message: "Su usuario o contraseña son incorrectos" },
    };
  }

  return { data, error: null };
}

/**
 * Registro de nuevo usuario.
 * Los campos extra se guardan en raw_user_meta_data y el trigger
 * los copia automáticamente a la tabla profiles.
 */
export async function register({
  email,
  password,
  nombre,
  telefono,
  direccion,
  rut,
  fecha_nacimiento,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nombre, telefono, direccion, rut, fecha_nacimiento },
    },
  });

  return { data, error };
}

/**
 * Cerrar sesión.
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Obtener el perfil completo del usuario actual (con rol).
 */
export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: { message: "No autenticado" } };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*, roles(nombre)")
    .eq("id", user.id)
    .single();

  return { data, error };
}

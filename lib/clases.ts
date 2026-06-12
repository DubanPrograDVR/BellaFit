export type TipoClase = "bungee" | "yoga" | "pilates" | "funcional" | "otro"

export interface SesionClase {
  id: number
  nombre: string
  tipo: TipoClase
  instructora: string
  /** 0 = lunes … 6 = domingo */
  dia: number
  horaInicio: string
  duracionMin: number
  capacidad: number
  cuposDisponibles: number
}

export const tiposClase: TipoClase[] = [
  "bungee",
  "yoga",
  "pilates",
  "funcional",
]

export const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
] as const

/**
 * Horario semanal de ejemplo para la fase de diseño.
 * En la fase de funcionalidad se reemplaza por datos reales de la base de datos.
 */
export const sesionesSemana: SesionClase[] = [
  // Lunes
  { id: 1, nombre: "Bungee Power", tipo: "bungee", instructora: "Camila Rojas", dia: 0, horaInicio: "09:00", duracionMin: 50, capacidad: 8, cuposDisponibles: 3 },
  { id: 2, nombre: "Yoga Flow", tipo: "yoga", instructora: "Valentina Soto", dia: 0, horaInicio: "11:00", duracionMin: 60, capacidad: 12, cuposDisponibles: 7 },
  { id: 3, nombre: "Bungee Cardio", tipo: "bungee", instructora: "Camila Rojas", dia: 0, horaInicio: "18:30", duracionMin: 50, capacidad: 8, cuposDisponibles: 0 },
  // Martes
  { id: 4, nombre: "Pilates Mat", tipo: "pilates", instructora: "Fernanda Díaz", dia: 1, horaInicio: "10:00", duracionMin: 55, capacidad: 10, cuposDisponibles: 5 },
  { id: 5, nombre: "Funcional Fit", tipo: "funcional", instructora: "Javiera Muñoz", dia: 1, horaInicio: "19:00", duracionMin: 45, capacidad: 14, cuposDisponibles: 9 },
  // Miércoles
  { id: 6, nombre: "Bungee Power", tipo: "bungee", instructora: "Camila Rojas", dia: 2, horaInicio: "09:00", duracionMin: 50, capacidad: 8, cuposDisponibles: 2 },
  { id: 7, nombre: "Yoga Restaurativo", tipo: "yoga", instructora: "Valentina Soto", dia: 2, horaInicio: "12:00", duracionMin: 60, capacidad: 12, cuposDisponibles: 10 },
  { id: 8, nombre: "Bungee Sculpt", tipo: "bungee", instructora: "Javiera Muñoz", dia: 2, horaInicio: "18:30", duracionMin: 50, capacidad: 8, cuposDisponibles: 1 },
  // Jueves
  { id: 9, nombre: "Pilates Reformer", tipo: "pilates", instructora: "Fernanda Díaz", dia: 3, horaInicio: "10:00", duracionMin: 55, capacidad: 6, cuposDisponibles: 0 },
  { id: 10, nombre: "Funcional HIIT", tipo: "funcional", instructora: "Javiera Muñoz", dia: 3, horaInicio: "19:00", duracionMin: 45, capacidad: 14, cuposDisponibles: 6 },
  // Viernes
  { id: 11, nombre: "Bungee Cardio", tipo: "bungee", instructora: "Camila Rojas", dia: 4, horaInicio: "09:00", duracionMin: 50, capacidad: 8, cuposDisponibles: 4 },
  { id: 12, nombre: "Yoga Flow", tipo: "yoga", instructora: "Valentina Soto", dia: 4, horaInicio: "17:30", duracionMin: 60, capacidad: 12, cuposDisponibles: 8 },
  // Sábado
  { id: 13, nombre: "Bungee Weekend", tipo: "bungee", instructora: "Javiera Muñoz", dia: 5, horaInicio: "10:00", duracionMin: 50, capacidad: 10, cuposDisponibles: 5 },
  { id: 14, nombre: "Pilates Mat", tipo: "pilates", instructora: "Fernanda Díaz", dia: 5, horaInicio: "11:30", duracionMin: 55, capacidad: 10, cuposDisponibles: 7 },
]

export const instructoras = [...new Set(sesionesSemana.map((s) => s.instructora))]

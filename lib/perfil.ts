export interface PerfilUsuario {
  nombre: string
  email: string
  telefono: string
  direccion: string
  rut: string
  fechaNacimiento: string
  rol: string
  miembroDesde: string
  planActual: string
}

export type EstadoCompra = "activo" | "enviado" | "entregado" | "expirado"
export type EstadoPago = "aprobado" | "pendiente" | "rechazado"

export interface Compra {
  id: number
  tipo: "plan" | "producto"
  nombre: string
  fechaCompra: string
  fechaExpiracion?: string
  estado: EstadoCompra
  precio: number
  tracking?: string
}

export interface Pago {
  id: number
  fecha: string
  concepto: string
  metodo: string
  monto: number
  estado: EstadoPago
  boleta: string
}

// Datos de demostración — se reemplazarán por Supabase en la fase de funcionalidad
export const perfilDemo: PerfilUsuario = {
  nombre: "Valentina Rodríguez",
  email: "valentina.rodriguez@email.com",
  telefono: "+56 9 8765 4321",
  direccion: "Av. Providencia 1234, Santiago",
  rut: "19.876.543-2",
  fechaNacimiento: "1995-04-12",
  rol: "cliente",
  miembroDesde: "2025-08-15",
  planActual: "Premium",
}

export const comprasActivas: Compra[] = [
  {
    id: 1,
    tipo: "plan",
    nombre: "Plan Premium Mensual",
    fechaCompra: "2026-03-01",
    fechaExpiracion: "2026-04-01",
    estado: "activo",
    precio: 49990,
  },
  {
    id: 2,
    tipo: "producto",
    nombre: "Mat de Yoga Premium",
    fechaCompra: "2026-03-10",
    estado: "enviado",
    precio: 32990,
    tracking: "SP20260310001",
  },
]

export const comprasPasadas: Compra[] = [
  {
    id: 3,
    tipo: "plan",
    nombre: "Plan Básico Mensual",
    fechaCompra: "2026-01-01",
    fechaExpiracion: "2026-02-01",
    estado: "expirado",
    precio: 29990,
  },
  {
    id: 4,
    tipo: "producto",
    nombre: "Botella BellaFit Rose",
    fechaCompra: "2025-12-20",
    estado: "entregado",
    precio: 15990,
  },
  {
    id: 5,
    tipo: "producto",
    nombre: "Leggings Sport Blush",
    fechaCompra: "2025-11-05",
    estado: "entregado",
    precio: 24990,
  },
]

export const historialPagos: Pago[] = [
  {
    id: 1,
    fecha: "2026-03-10",
    concepto: "Mat de Yoga Premium",
    metodo: "Tarjeta ****4521",
    monto: 32990,
    estado: "aprobado",
    boleta: "BOL-2026-0310",
  },
  {
    id: 2,
    fecha: "2026-03-01",
    concepto: "Plan Premium Mensual",
    metodo: "Tarjeta ****4521",
    monto: 49990,
    estado: "aprobado",
    boleta: "BOL-2026-0301",
  },
  {
    id: 3,
    fecha: "2026-01-01",
    concepto: "Plan Básico Mensual",
    metodo: "Transferencia",
    monto: 29990,
    estado: "aprobado",
    boleta: "BOL-2026-0101",
  },
  {
    id: 4,
    fecha: "2025-12-20",
    concepto: "Botella BellaFit Rose",
    metodo: "Tarjeta ****4521",
    monto: 15990,
    estado: "aprobado",
    boleta: "BOL-2025-1220",
  },
  {
    id: 5,
    fecha: "2025-11-05",
    concepto: "Leggings Sport Blush",
    metodo: "Webpay",
    monto: 24990,
    estado: "aprobado",
    boleta: "BOL-2025-1105",
  },
]

export function formatPrice(n: number): string {
  return "$" + n.toLocaleString("es-CL")
}

export function formatDate(d: string): string {
  return new Date(d + "T12:00:00").toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

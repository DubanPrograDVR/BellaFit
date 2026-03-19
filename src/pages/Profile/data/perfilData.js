// Datos simulados del perfil de usuario
export const perfilData = {
  nombre: "Valentina Rodríguez",
  email: "valentina.rodriguez@email.com",
  telefono: "+56 9 8765 4321",
  direccion: "Av. Providencia 1234, Santiago",
  rut: "19.876.543-2",
  fecha_nacimiento: "1995-04-12",
  rol: "cliente",
  miembro_desde: "2025-08-15",
  plan_actual: "Premium",
};

// Compras activas
export const comprasActivas = [
  {
    id: 1,
    tipo: "plan",
    nombre: "Plan Premium Mensual",
    fecha_compra: "2026-03-01",
    fecha_expiracion: "2026-04-01",
    estado: "activo",
    precio: 49990,
  },
  {
    id: 2,
    tipo: "producto",
    nombre: "Mat de Yoga Premium",
    fecha_compra: "2026-03-10",
    estado: "enviado",
    precio: 32990,
    tracking: "SP20260310001",
  },
];

// Compras pasadas
export const comprasPasadas = [
  {
    id: 3,
    tipo: "plan",
    nombre: "Plan Básico Mensual",
    fecha_compra: "2026-01-01",
    fecha_expiracion: "2026-02-01",
    estado: "expirado",
    precio: 29990,
  },
  {
    id: 4,
    tipo: "producto",
    nombre: "Botella BellaFit Rose",
    fecha_compra: "2025-12-20",
    estado: "entregado",
    precio: 15990,
  },
  {
    id: 5,
    tipo: "producto",
    nombre: "Leggings Sport Blush",
    fecha_compra: "2025-11-05",
    estado: "entregado",
    precio: 24990,
  },
];

// Historial de pagos
export const historialPagos = [
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
];

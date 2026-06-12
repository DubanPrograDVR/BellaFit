export function formatPrice(n) {
  return "$" + n.toLocaleString("es-CL");
}

export function formatDate(d) {
  return new Date(d + "T12:00:00").toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function estadoBadge(estado) {
  const map = {
    activo: "badge-activo",
    enviado: "badge-enviado",
    entregado: "badge-entregado",
    expirado: "badge-expirado",
    aprobado: "badge-aprobado",
  };
  return map[estado] || "";
}

import {
  faInstagram,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export const footerData = {
  about: {
    title: "BellaFit",
    description:
      "Centro de Bungee Fitness y Bienestar dedicado a transformar vidas a través del movimiento y la nutrición consciente.",
    social: [
      { label: "Instagram", icon: faInstagram, href: "#" },
      { label: "Facebook", icon: faFacebook, href: "#" },
      { label: "TikTok", icon: faTiktok, href: "#" },
    ],
  },
  servicios: [
    { nombre: "Clases Presenciales", enlace: "#clases" },
    { nombre: "Clases Online", enlace: "#online" },
    { nombre: "Formaciones", enlace: "#formaciones" },
    { nombre: "Nutrición", enlace: "#nutricion" },
    { nombre: "Tienda", enlace: "#tienda" },
  ],
  informacion: [
    { nombre: "Términos y Condiciones", enlace: "#terminos" },
    { nombre: "Política de Privacidad", enlace: "#privacidad" },
    { nombre: "Política de Cancelación", enlace: "#cancelacion" },
    { nombre: "Preguntas Frecuentes", enlace: "#faq" },
  ],
  contacto: {
    direccion: "📍 Dirección del Estudio",
    telefono: "📞 +56 9 XXXX XXXX",
    email: "✉️ hola@bellafit.cl",
    horarios: "🕐 Lun - Vie: 7:00 - 21:00, Sáb: 9:00 - 14:00",
  },
  copyright:
    "© 2026 BellaFit. Todos los derechos reservados. Diseñado con ♡ para transformar vidas.",
};

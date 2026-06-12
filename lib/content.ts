export interface NavItem {
  nombre: string;
  enlace: string;
  isCta?: boolean;
}

export const navItems: NavItem[] = [
  { nombre: "Clases", enlace: "/clases" },
  { nombre: "Tienda", enlace: "/tienda" },
  { nombre: "Formaciones", enlace: "/formaciones" },
  { nombre: "Nutrición", enlace: "/#nutricion" },
  { nombre: "Contacto", enlace: "/#contacto" },
];

export interface PricingPlan {
  name: string;
  price: string;
  currency: string;
  period: string;
  features: string[];
  cta: string;
  link: string;
  highlight: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Clase Individual",
    price: "12.000",
    currency: "CLP",
    period: "por clase",
    features: [
      "Acceso a 1 clase a elección",
      "Bungee, Jumping, Pilates o Yoga",
      "Equipamiento incluido",
      "Reserva flexible",
    ],
    cta: "Reservar Clase",
    link: "/clases",
    highlight: false,
  },
  {
    name: "Pack 8 Clases",
    price: "80.000",
    currency: "CLP",
    period: "por mes",
    features: [
      "8 clases mensuales a elección",
      "Todas las disciplinas disponibles",
      "Equipamiento incluido",
      "Acceso a clases online",
      "Ahorra un 17%",
    ],
    cta: "Elegir Plan",
    link: "/clases",
    highlight: true,
  },
  {
    name: "Plan Ilimitado",
    price: "120.000",
    currency: "CLP",
    period: "por mes",
    features: [
      "Clases ilimitadas todo el mes",
      "Todas las disciplinas disponibles",
      "Equipamiento incluido",
      "Clases online ilimitadas",
      "Prioridad en reservas",
      "10% dcto en tienda",
    ],
    cta: "Comenzar Ahora",
    link: "/clases",
    highlight: false,
  },
];

import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Laptop,
  ShoppingBag,
  GraduationCap,
  Salad,
  PartyPopper,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export const servicesHeader = {
  subtitle: "Nuestros Servicios",
  title: "Todo lo que necesitas",
  titleAccent: "en un solo lugar",
};

export const services: Service[] = [
  {
    icon: Sparkles,
    badge: "Presencial",
    title: "Clases Presenciales",
    description:
      "Bungee Fitness, Jumping Fitness, Pilates, Yoga y Zumba. Entrena con energía en nuestro estudio equipado.",
    link: "/clases",
    linkText: "Ver horarios",
  },
  {
    icon: Laptop,
    badge: "Online",
    title: "Clases Online",
    description:
      "Accede a clases virtuales exclusivas con tu equipo oficial. Entrena desde donde estés.",
    link: "/clases",
    linkText: "Más información",
  },
  {
    icon: ShoppingBag,
    badge: "Tienda",
    title: "Tienda",
    description:
      "Equipos oficiales, ropa deportiva, accesorios y suplementos. Todo lo que necesitas en un solo lugar.",
    link: "/tienda",
    linkText: "Explorar tienda",
  },
  {
    icon: GraduationCap,
    badge: "Formación",
    title: "Formaciones",
    description:
      "Certifícate como instructora de Bungee Fitness. Modalidad presencial y online disponible.",
    link: "/formaciones",
    linkText: "Inscríbete",
  },
  {
    icon: Salad,
    badge: "Nutrición",
    title: "Nutrición",
    description:
      "Consultas nutricionales personalizadas, presenciales y online, con planes alimentarios diseñados para ti.",
    link: "/#nutricion",
    linkText: "Agendar consulta",
  },
  {
    icon: PartyPopper,
    badge: "Eventos",
    title: "Fiestas Privadas",
    description:
      "Celebra momentos especiales con una experiencia única. Arrienda nuestro espacio para eventos.",
    link: "/#contacto",
    linkText: "Solicitar información",
  },
];

export interface GalleryPhoto {
  id: number;
  label: string;
  category: string;
  span: "tall" | "wide" | "normal";
  image: string;
}

export const galleryHeader = {
  subtitle: "Nuestro Espacio",
  title: "Conoce",
  titleAccent: "BellaFit por dentro",
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    label: "Estudio Principal",
    category: "Bungee Fitness",
    span: "tall",
    image: "/images/gallery-studio.png",
  },
  {
    id: 2,
    label: "Zona de Equipamiento",
    category: "Equipamiento",
    span: "normal",
    image: "/images/gallery-equipment.png",
  },
  {
    id: 3,
    label: "Área de Bienvenida",
    category: "Recepción",
    span: "normal",
    image: "/images/gallery-reception.png",
  },
  {
    id: 4,
    label: "Sala Multiusos",
    category: "Clases Grupales",
    span: "wide",
    image: "/images/gallery-class.png",
  },
  {
    id: 5,
    label: "Rincón Wellness",
    category: "Bienestar",
    span: "normal",
    image: "/images/gallery-wellness.png",
  },
  {
    id: 6,
    label: "Tienda BellaFit",
    category: "Tienda",
    span: "tall",
    image: "/images/gallery-shop.png",
  },
];

export const footerData = {
  about: {
    title: "BellaFit",
    description:
      "Centro de Bungee Fitness y bienestar dedicado a transformar vidas a través del movimiento y la nutrición consciente.",
  },
  servicios: [
    { nombre: "Clases Presenciales", enlace: "/clases" },
    { nombre: "Clases Online", enlace: "/clases" },
    { nombre: "Formaciones", enlace: "/formaciones" },
    { nombre: "Nutrición", enlace: "/#nutricion" },
    { nombre: "Tienda", enlace: "/tienda" },
  ],
  informacion: [
    { nombre: "Términos y Condiciones", enlace: "#terminos" },
    { nombre: "Política de Privacidad", enlace: "#privacidad" },
    { nombre: "Política de Cancelación", enlace: "#cancelacion" },
    { nombre: "Preguntas Frecuentes", enlace: "#faq" },
  ],
  contacto: {
    direccion: "Dirección del Estudio, Santiago",
    telefono: "+56 9 XXXX XXXX",
    email: "hola@bellafit.cl",
    horarios: "Lun - Vie: 7:00 - 21:00 · Sáb: 9:00 - 14:00",
  },
  copyright:
    "© 2026 BellaFit. Todos los derechos reservados. Diseñado para transformar vidas.",
};

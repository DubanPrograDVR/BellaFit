import {
  faDumbbell,
  faLaptop,
  faBagShopping,
  faBook,
  faCarrot,
  faCake,
} from "@fortawesome/free-solid-svg-icons";

export const servicesData = {
  header: {
    subtitle: "NUESTROS SERVICIOS",
    title: "Descubre Tu Camino al Bienestar",
    description:
      "Ofrecemos una variedad de disciplinas diseñadas para transformar tu cuerpo y mente, adaptadas a todos los niveles.",
  },
  services: [
    {
      icon: faDumbbell,
      title: "Clases Presenciales",
      description:
        "Bungee Fitness, Jumping Fitness, Pilates, Yoga y Zumba. Entrena con energía en nuestro estudio equipado.",
      link: "#clases-presenciales",
      linkText: "Ver horarios →",
    },
    {
      icon: faLaptop,
      title: "Clases Online",
      description:
        "Accede a clases virtuales exclusivas con tu equipo oficial. Entrena desde donde estés.",
      link: "#clases-online",
      linkText: "Más información →",
    },
    {
      icon: faBagShopping,
      title: "Tienda",
      description:
        "Equipos oficiales, ropa deportiva, accesorios y suplementos. Todo lo que necesitas en un solo lugar.",
      link: "#tienda",
      linkText: "Explorar tienda →",
    },
    {
      icon: faBook,
      title: "Formaciones",
      description:
        "Certifícate como instructora de Bungee Fitness. Modalidad presencial y online disponible.",
      link: "#formaciones",
      linkText: "Inscríbete →",
    },
    {
      icon: faCarrot,
      title: "Nutrición",
      description:
        "Consultas nutricionales personalizadas, presenciales y online, con planes alimentarios diseñados para ti.",
      link: "#nutricion",
      linkText: "Agendar consulta →",
    },
    {
      icon: faCake,
      title: "Fiestas Privadas",
      description:
        "Celebra momentos especiales con una experiencia única. Arrienda nuestro espacio para eventos.",
      link: "#fiestas",
      linkText: "Solicitar información →",
    },
  ],
};

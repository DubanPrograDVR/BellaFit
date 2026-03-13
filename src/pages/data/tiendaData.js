export const categorias = [
  { id: "todos", nombre: "Todos" },
  { id: "equipo", nombre: "Equipo" },
  { id: "ropa", nombre: "Ropa" },
  { id: "accesorios", nombre: "Accesorios" },
  { id: "suplementos", nombre: "Suplementos" },
  { id: "botellas", nombre: "Botellas" },
  { id: "giftcards", nombre: "Gift Cards" },
];

export const productosData = [
  // ─── Equipo ───
  {
    id: 1,
    nombre: "Bungee Cord Profesional",
    categoria: "equipo",
    precio: 89990,
    precioAnterior: null,
    descripcion:
      "Cuerda elástica profesional para Bungee Fitness. Resistencia ajustable, ideal para entrenamientos de alta intensidad.",
    imagen:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    badge: "NUEVO",
    stock: true,
  },
  {
    id: 2,
    nombre: "Arnés BellaFit Pro",
    categoria: "equipo",
    precio: 65990,
    precioAnterior: 79990,
    descripcion:
      "Arnés ergonómico con acolchado premium. Máxima comodidad y seguridad durante tu entrenamiento.",
    imagen:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=80",
    badge: "OFERTA",
    stock: true,
  },
  {
    id: 3,
    nombre: "Kit de Montaje Bungee",
    categoria: "equipo",
    precio: 124990,
    precioAnterior: null,
    descripcion:
      "Kit completo de instalación para Bungee Fitness. Incluye soporte, mosquetones y guía de montaje.",
    imagen:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    badge: null,
    stock: true,
  },

  // ─── Ropa ───
  {
    id: 4,
    nombre: "Leggings BellaFit Signature",
    categoria: "ropa",
    precio: 32990,
    precioAnterior: null,
    descripcion:
      "Leggings de compresión con tejido transpirable. Diseño exclusivo BellaFit con cintura alta.",
    imagen:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80",
    badge: "BESTSELLER",
    stock: true,
  },
  {
    id: 5,
    nombre: "Top Deportivo Rose",
    categoria: "ropa",
    precio: 24990,
    precioAnterior: 29990,
    descripcion:
      "Top de soporte medio con diseño cruzado en la espalda. Perfecto para Bungee y Pilates.",
    imagen:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
    badge: "OFERTA",
    stock: true,
  },
  {
    id: 6,
    nombre: "Hoodie Oversize BellaFit",
    categoria: "ropa",
    precio: 39990,
    precioAnterior: null,
    descripcion:
      "Hoodie oversize ultra suave para antes y después del entrenamiento. Bordado BellaFit en el pecho.",
    imagen:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
    badge: null,
    stock: true,
  },

  // ─── Accesorios ───
  {
    id: 7,
    nombre: "Banda de Resistencia Set x3",
    categoria: "accesorios",
    precio: 18990,
    precioAnterior: null,
    descripcion:
      "Set de 3 bandas elásticas con diferentes niveles de resistencia. Incluye bolsa de transporte.",
    imagen:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80",
    badge: null,
    stock: true,
  },
  {
    id: 8,
    nombre: "Mat de Yoga Premium",
    categoria: "accesorios",
    precio: 27990,
    precioAnterior: 34990,
    descripcion:
      "Mat antideslizante de 6mm con alineación grabada. Material eco-friendly y fácil de limpiar.",
    imagen:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80",
    badge: "OFERTA",
    stock: true,
  },
  {
    id: 9,
    nombre: "Guantes de Entrenamiento",
    categoria: "accesorios",
    precio: 14990,
    precioAnterior: null,
    descripcion:
      "Guantes con grip reforzado y muñequera integrada. Protección y estilo en cada sesión.",
    imagen:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
    badge: null,
    stock: false,
  },

  // ─── Suplementos ───
  {
    id: 10,
    nombre: "Proteína Whey Vainilla 1kg",
    categoria: "suplementos",
    precio: 34990,
    precioAnterior: null,
    descripcion:
      "Proteína de suero de alta calidad. 24g de proteína por servicio. Sabor vainilla natural.",
    imagen:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2c1cf?w=400&q=80",
    badge: "BESTSELLER",
    stock: true,
  },
  {
    id: 11,
    nombre: "BCAA Fruit Punch 300g",
    categoria: "suplementos",
    precio: 22990,
    precioAnterior: null,
    descripcion:
      "Aminoácidos ramificados para recuperación muscular. Ratio 2:1:1 con vitamina B6.",
    imagen:
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80",
    badge: null,
    stock: true,
  },

  // ─── Botellas ───
  {
    id: 12,
    nombre: "Botella Térmica BellaFit 750ml",
    categoria: "botellas",
    precio: 19990,
    precioAnterior: null,
    descripcion:
      "Botella de acero inoxidable con doble pared. Mantiene frío 24h y caliente 12h. Logo grabado.",
    imagen:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    badge: "NUEVO",
    stock: true,
  },
  {
    id: 13,
    nombre: "Shaker BellaFit Rose 600ml",
    categoria: "botellas",
    precio: 12990,
    precioAnterior: 15990,
    descripcion:
      "Shaker con bola mezcladora y compartimento extra. Color rose exclusivo BellaFit.",
    imagen:
      "https://images.unsplash.com/photo-1523362628745-0c100fc988a6?w=400&q=80",
    badge: "OFERTA",
    stock: true,
  },

  // ─── Gift Cards ───
  {
    id: 14,
    nombre: "Gift Card $25.000",
    categoria: "giftcards",
    precio: 25000,
    precioAnterior: null,
    descripcion:
      "Tarjeta de regalo para usar en tienda o clases BellaFit. Válida por 6 meses.",
    imagen:
      "https://images.unsplash.com/photo-1549465220-1a8b9238f52e?w=400&q=80",
    badge: "REGALO",
    stock: true,
  },
  {
    id: 15,
    nombre: "Gift Card $50.000",
    categoria: "giftcards",
    precio: 50000,
    precioAnterior: null,
    descripcion:
      "Tarjeta de regalo premium. Incluye packaging especial y mensaje personalizado.",
    imagen:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80",
    badge: "REGALO",
    stock: true,
  },
];

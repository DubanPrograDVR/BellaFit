export type CategoriaId =
  | "todos"
  | "equipo"
  | "ropa"
  | "accesorios"
  | "suplementos"
  | "botellas"
  | "giftcards"

export interface Categoria {
  id: CategoriaId
  nombre: string
}

export type ProductoBadge = "NUEVO" | "OFERTA" | "BESTSELLER" | "REGALO"

export interface Producto {
  id: number
  nombre: string
  categoria: Exclude<CategoriaId, "todos">
  precio: number
  precioAnterior: number | null
  descripcion: string
  imagen: string
  badge: ProductoBadge | null
  stock: boolean
}

export const categorias: Categoria[] = [
  { id: "todos", nombre: "Todos" },
  { id: "equipo", nombre: "Equipo" },
  { id: "ropa", nombre: "Ropa" },
  { id: "accesorios", nombre: "Accesorios" },
  { id: "suplementos", nombre: "Suplementos" },
  { id: "botellas", nombre: "Botellas" },
  { id: "giftcards", nombre: "Gift Cards" },
]

export const formatPrecio = (precio: number): string =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(precio)

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Bungee Cord Profesional",
    categoria: "equipo",
    precio: 89990,
    precioAnterior: null,
    descripcion:
      "Cuerda elástica profesional para Bungee Fitness. Resistencia ajustable, ideal para entrenamientos de alta intensidad.",
    imagen: "/images/products/bungee-cord.png",
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
    imagen: "/images/products/arnes.png",
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
    imagen: "/images/products/kit-montaje.png",
    badge: null,
    stock: true,
  },
  {
    id: 4,
    nombre: "Leggings BellaFit Signature",
    categoria: "ropa",
    precio: 32990,
    precioAnterior: null,
    descripcion:
      "Leggings de compresión con tejido transpirable. Diseño exclusivo BellaFit con cintura alta.",
    imagen: "/images/products/leggings.png",
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
    imagen: "/images/products/top-deportivo.png",
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
    imagen: "/images/products/hoodie.png",
    badge: null,
    stock: true,
  },
  {
    id: 7,
    nombre: "Banda de Resistencia Set x3",
    categoria: "accesorios",
    precio: 18990,
    precioAnterior: null,
    descripcion:
      "Set de 3 bandas elásticas con diferentes niveles de resistencia. Incluye bolsa de transporte.",
    imagen: "/images/products/bandas.png",
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
    imagen: "/images/products/mat-yoga.png",
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
    imagen: "/images/products/guantes.png",
    badge: null,
    stock: false,
  },
  {
    id: 10,
    nombre: "Proteína Whey Vainilla 1kg",
    categoria: "suplementos",
    precio: 34990,
    precioAnterior: null,
    descripcion:
      "Proteína de suero de alta calidad. 24g de proteína por servicio. Sabor vainilla natural.",
    imagen: "/images/products/proteina.png",
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
    imagen: "/images/products/bcaa.png",
    badge: null,
    stock: true,
  },
  {
    id: 12,
    nombre: "Botella Térmica BellaFit 750ml",
    categoria: "botellas",
    precio: 19990,
    precioAnterior: null,
    descripcion:
      "Botella de acero inoxidable con doble pared. Mantiene frío 24h y caliente 12h. Logo grabado.",
    imagen: "/images/products/botella.png",
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
    imagen: "/images/products/shaker.png",
    badge: "OFERTA",
    stock: true,
  },
  {
    id: 14,
    nombre: "Gift Card $25.000",
    categoria: "giftcards",
    precio: 25000,
    precioAnterior: null,
    descripcion:
      "Tarjeta de regalo para usar en tienda o clases BellaFit. Válida por 6 meses.",
    imagen: "/images/products/giftcard-25.png",
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
    imagen: "/images/products/giftcard-50.png",
    badge: "REGALO",
    stock: true,
  },
]

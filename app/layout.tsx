import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BellaFit · Bungee Fitness & Bienestar para Mujeres",
  description:
    "BellaFit es un centro de Bungee Fitness y bienestar para mujeres. Clases presenciales y online, formaciones, nutrición y tienda. Vuela, entrena y diviértete.",
  keywords: [
    "Bungee Fitness",
    "fitness mujeres",
    "wellness",
    "pilates",
    "yoga",
    "BellaFit",
  ],
  openGraph: {
    title: "BellaFit · Bungee Fitness & Bienestar",
    description:
      "Vuela, entrena y diviértete. Un espacio de bienestar y transformación para mujeres.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#9c565f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body style={{ background: "var(--background)" }}>{children}</body>
    </html>
  );
}

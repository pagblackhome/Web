import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Home | Cortinas Modernas y Decoración en Chile",

  description:
    "Cortinas roller, blackout, duo y motorizadas en Chile. Diseño moderno y elegante.",

  keywords: [
    "cortinas roller",
    "blackout",
    "cortinas chile",
    "roller duo",
    "black home",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
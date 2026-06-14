"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

type HeaderProps = {
  onOpenGuide?: () => void;
};

export default function Header({ onOpenGuide }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // resto del código...
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Home | Cortinas Modernas y Decoración en Chile",

  description:
    "Cortinas roller, blackout, duo y motorizadas en Chile. Diseño moderno y elegante.",

  icons: {
    icon: [
      {
        url: "/BH.png?v=999",
        type: "image/png",
      },
    ],
    shortcut: ["/BH.png?v=999"],
    apple: ["/BH.png?v=999"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/BH.png?v=999" type="image/png" />
        <link rel="shortcut icon" href="/BH.png?v=999" />
        <link rel="apple-touch-icon" href="/BH.png?v=999" />
      </head>

      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}
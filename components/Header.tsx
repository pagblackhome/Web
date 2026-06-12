"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="
      fixed top-0 left-0 w-full z-50
      bg-[rgba(74,72,72,0.92)]
      backdrop-blur-2xl
      border-b border-[#c6a77b]/10
      shadow-[0_10px_40px_rgba(0,0,0,0.45)]
      h-20
      "
    >
      <div className="max-w-7xl mx-auto h-full px-6">
        <div className="flex justify-between items-center h-full">

          {/* LOGO + TEXTO */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/images/BH.png"
              alt="Black Home"
              width={170}
              height={70}
              className="object-contain"
            />

            <div className="hidden md:block leading-none ml-[-6px]">
              <h1 className="text-white text-xl font-light">
                Black <span className="text-[#d54a2c]">Home</span>
              </h1>
              <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase">
                Diseño y Decoración
              </p>
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              ["Inicio", "/"],
              ["Productos", "/productos"],
              ["Cotizador", "/cotizador"],
              ["Arregla tu Cortina", "/reparacion"],
              ["Contacto", "/contacto"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-white text-[14px] hover:text-[#f1d39a] transition"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* MENU MOBILE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-20 left-0 w-full bg-black z-40 lg:hidden">
          <div className="flex flex-col p-6">
            {[
              ["Inicio", "/"],
              ["Productos", "/productos"],
              ["Cotizador", "/cotizador"],
              ["Arregla tu Cortina", "/reparacion"],
              ["Contacto", "/contacto"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="py-4 text-white border-b border-gray-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
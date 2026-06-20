"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

interface HeaderProps {
  onOpenGuide?: () => void;
}

export default function Header({ onOpenGuide }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[rgba(74,72,72,0.92)] backdrop-blur-2xl border-b border-[#c6a77b]/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] h-24">
      <div className="max-w-7xl mx-auto h-full px-6">
        <div className="flex justify-between items-center h-full">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-1">
            <Image src="/images/BH.png" alt="Black Home" width={190} height={80} className="object-contain" priority />
            <div className="hidden md:block leading-none ml-[-6px]">
              <h1 className="text-white text-2xl font-semibold">
                Black <span className="text-[#d54a2c]">Home</span>
              </h1>
              <p className="text-xs tracking-[0.22em] text-gray-300 uppercase font-medium">Diseño y Decoración</p>
            </div>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { href: "/",          label: "Inicio" },
              { href: "/productos", label: "Productos" },
              { href: "/cotizador", label: "Cotizador" },
              { href: "/agendar",   label: "Agendar" },   // ← nuevo
              { href: "/#contacto", label: "Contacto" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="text-white text-[16px] font-medium hover:text-[#f1d39a] transition duration-300">
                {label}
              </Link>
            ))}
            <button type="button" onClick={() => onOpenGuide?.()}
              className="text-white text-[16px] font-medium hover:text-[#f1d39a] transition duration-300">
              Mide tu Cortina
            </button>
          </nav>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white" type="button" aria-label="Abrir menú">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-24 left-0 w-full bg-black z-40 lg:hidden">
          <div className="flex flex-col p-6">
            {[
              { href: "/",          label: "Inicio" },
              { href: "/productos", label: "Productos" },
              { href: "/cotizador", label: "Cotizador" },
              { href: "/agendar",   label: "Agendar" },   // ← nuevo
              { href: "/#contacto", label: "Contacto" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="py-4 text-white text-lg font-medium border-b border-gray-800"
                onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <button type="button"
              onClick={() => { setMenuOpen(false); onOpenGuide?.(); }}
              className="py-4 text-left text-white text-lg font-medium border-b border-gray-800">
              Mide tu Cortina
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

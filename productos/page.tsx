"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: "all", name: "Todas", image: "/images/cortinarollerduo.png" },
  { id: "duo", name: "Roller Duo", image: "/images/cortinarollerduo.png" },
  { id: "blackout", name: "Blackout", image: "/images/roller blackout.png" },
  { id: "sunscreen", name: "Sunscreen", image: "/images/roller blackout.png" },
  { id: "vertical", name: "Vertical", image: "/images/vertical.png" },
  { id: "exterior", name: "Exterior", image: "/images/roman.png" },
  { id: "motor", name: "Motorizadas", image: "/images/motor.png" },
];

const allProducts = [
  {
    id: 1,
    slug: "roller-duo-beige",
    name: "Roller Duo Beige",
    category: "duo",
    image: "/images/20.jpg",
    price: 89990,
    featured: true,
  },
  {
    id: 2,
    slug: "blackout-premium",
    name: "Blackout Premium",
    category: "blackout",
    image: "/images/25.jpg",
    price: 119990,
    featured: true,
  },
  {
    id: 3,
    slug: "sunscreen-white",
    name: "Sunscreen White",
    category: "sunscreen",
    image: "/images/33.jpg",
    price: 69990,
    featured: false,
  },
  {
    id: 4,
    slug: "vertical-gris",
    name: "Vertical Gris",
    category: "vertical",
    image: "/images/vertilux_rollershades_008.jpg",
    price: 99990,
    featured: false,
  },
];

export default function ProductosPage() {

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [sortBy, setSortBy] = useState("featured");

  // POPUP GUIA
  const [openGuide, setOpenGuide] = useState(false);

  let filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  if (sortBy === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (sortBy === "featured") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.featured) - Number(a.featured)
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 h-20">
  <div className="max-w-7xl mx-auto flex justify-between items-center pl-2 pr-6 md:pl-4 md:pr-10 h-full">  

            {/* LOGO */}
            <div className="flex items-center gap-2">

  <Image
    src="/images/BH.png"
    alt="Black Home Logo"
    width={160}
    height={160}
    priority
    className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
  />

  <div>

    <h1 className="text-white text-2xl font-semibold tracking-[0.18em]">
      BLACK HOME
    </h1>

    <p className="text-white/50 text-[10px] tracking-[0.35em]">
      DISEÑO Y DECORACIÓN
    </p>

  </div>

</div>

            {/* NAV */}
            <nav className="hidden md:flex items-center gap-10 text-sm text-white font-medium">

  <Link
    href="/"
    className="hover:text-white/80 transition duration-300"
  >
    Inicio
  </Link>

  <Link
    href="/productos"
    className="hover:text-white/80 transition duration-300"
  >
    Productos
  </Link>

  <button
    onClick={() => setOpenGuide(true)}
    className="hover:text-white/80 transition duration-300"
  >
    Cómo medir mi cortina
  </button>

  <Link
    href="/cotizador"
    className="hover:text-white/80 transition duration-300"
  >
    Cotizador
  </Link>

  <a
  href="#contacto"
  className="hover:text-white/80 transition duration-300"
>
  Contacto
</a>

</nav>

          </div>

        </header>

        {/* POPUP MEDIDAS */}
{openGuide && (

  <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">

    <div className="relative bg-[#f7f4ee] rounded-[35px] overflow-hidden max-w-4xl w-full shadow-2xl border border-white/20">

      {/* BOTON CERRAR */}
      <button
        onClick={() => setOpenGuide(false)}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black text-white text-xl hover:scale-110 transition"
      >
        ×
      </button>

      {/* IMAGEN */}
      <img
        src="/images/medir-cortinas.png"
        alt="Cómo medir cortinas roller"
        className="w-full h-auto object-cover"
      />

    </div>

  </div>

)}

      {/* CONTENT */}
      <div className="px-6 py-10">

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Productos
          </h1>

          <p className="text-gray-500 text-sm md:text-base">
            Explora nuestras cortinas premium
          </p>

        </div>

        {/* CATEGORIES */}
        <section className="max-w-5xl mx-auto mb-10">

          <div className="grid grid-cols-3 md:grid-cols-7 gap-3">

            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`border rounded-xl p-2 transition hover:shadow-md hover:-translate-y-1 duration-300 bg-white ${
                  selectedCategory === c.id
                    ? "border-black shadow-sm"
                    : "border-gray-200"
                }`}
              >

                <Image
                  src={c.image}
                  alt={c.name}
                  width={45}
                  height={45}
                  className="mx-auto mb-2"
                />

                <p className="text-[11px] md:text-xs font-medium">
                  {c.name}
                </p>

              </button>
            ))}

          </div>

        </section>

        {/* FILTERS */}
        <div className="max-w-5xl mx-auto flex justify-end mb-6">

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border text-sm rounded-lg px-3 py-2 bg-white"
          >

            <option value="featured">Destacados</option>
            <option value="low">Menor precio</option>
            <option value="high">Mayor precio</option>

          </select>

        </div>

        {/* PRODUCTS */}
        <section className="max-w-5xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

            {filteredProducts.map((p) => (
              <Link
                key={p.id}
                href={`/productos/${p.slug}`}
                className="group"
              >

                <div className="overflow-hidden rounded-2xl relative">

                  <Image
                    src={p.image}
                    alt={p.name}
                    width={400}
                    height={400}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

                </div>

                <div className="mt-3">

                  <h3 className="text-sm md:text-base font-semibold">
                    {p.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    ${p.price.toLocaleString("es-CL")}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </section>

      </div>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/56934007366"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >

        <div className="w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:scale-110 transition duration-300">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            className="w-7 h-7"
          >
            <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 3.122.904 6.034 2.463 8.49L0 32l7.336-2.414a15.94 15.94 0 0 0 8.664 2.543c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.09a13.06 13.06 0 0 1-6.654-1.82l-.477-.283-4.35 1.43 1.416-4.24-.31-.49a13.01 13.01 0 0 1-2.005-6.947c0-7.18 5.84-13.02 13.02-13.02s13.02 5.84 13.02 13.02-5.84 13.02-13.02 13.02zm7.144-9.77c-.39-.196-2.31-1.14-2.67-1.27-.36-.13-.62-.196-.88.197-.26.39-1.01 1.27-1.24 1.53-.23.26-.46.29-.85.1-.39-.2-1.64-.6-3.13-1.92-1.16-1.03-1.94-2.3-2.17-2.69-.23-.39-.025-.6.17-.79.18-.18.39-.46.59-.69.2-.23.26-.39.39-.65.13-.26.07-.49-.03-.69-.1-.2-.88-2.12-1.2-2.9-.32-.77-.65-.67-.88-.68h-.75c-.26 0-.69.1-1.05.49-.36.39-1.38 1.35-1.38 3.29s1.41 3.82 1.61 4.08c.2.26 2.78 4.25 6.74 5.96.94.4 1.67.64 2.24.82.94.3 1.8.26 2.48.16.76-.11 2.31-.94 2.64-1.84.33-.9.33-1.67.23-1.84-.1-.16-.36-.26-.75-.46z"/>
          </svg>

        </div>

      </a>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10 mt-16">

        <div className="max-w-5xl mx-auto text-center text-sm text-gray-400">

          <p>Blackhome — Cortinas modernas y elegantes</p>

          <p className="mt-2">
            © 2026 Todos los derechos reservados
          </p>

        </div>

      </footer>

    </main>
  );
}
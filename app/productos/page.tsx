"use client";
import Header from "../../components/Header";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Map,
  Building2,
  Blinds,
  Receipt,
  ShieldCheck,
  Ruler,
  Truck,
  Plus,
  Info,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

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
    price: 25990,
    featured: true,
  },
  {
    id: 2,
    slug: "blackout-premium",
    name: "Blackout Premium",
    category: "blackout",
    image: "/images/25.jpg",
    price: 25990,
    featured: true,
  },
  {
    id: 3,
    slug: "sunscreen-white",
    name: "Sunscreen White",
    category: "sunscreen",
    image: "/images/33.jpg",
    price: 25990,
    featured: false,
  },
  {
    id: 4,
    slug: "vertical-gris",
    name: "Vertical Gris",
    category: "vertical",
    image: "/images/vertilux_rollershades_008.jpg",
    price: 25990,
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
 <Header />

        {/* POPUP MEDIDAS */}
<section id="mide-tu-cortina">

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

</section>

      {/* CONTENT */}
      <div className="px-6 py-10">

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Productos
          </h1>

        

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
  href="https://wa.me/56963653017"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50"
>
  <div className="
    w-14 h-14
    rounded-full
    bg-[#25D366]
    shadow-lg
    flex items-center justify-center
    hover:scale-110
    transition-transform duration-300
  ">
    <FaWhatsapp size={28} className="text-white" />
  </div>
</a>

      {/* FOOTER */}
      <footer className="mt-16 bg-[#413d3d] text-white">
          
            <div className="max-w-6xl mx-auto px-8 py-8">
          
              <div className="grid md:grid-cols-[1fr_auto_1.4fr_auto_1fr] items-center gap-8">
          
                {/* LOGO */}
                <div className="flex justify-center h-[90px] items-center">
                  <Image
                    src="/images/BH.png"
                    alt="Black Home"
                    width={190}
                    height={190}
                    priority
                    className="object-contain"
                  />
                </div>
          
                {/* LINEA DIVISORIA */}
                <div className="hidden md:block h-28 w-px bg-[#D4B06A]/30" />
          
                {/* CONTACTO */}
                <div className="flex justify-center">
                  <div className="space-y-4">
          
                    <div className="flex items-center gap-4">
                      <Phone size={18} className="text-[#D4B06A]" />
                      <span className="text-base">+56 9 3400 7366</span>
                    </div>
          
                    <div className="flex items-center gap-4">
                      <Mail size={18} className="text-[#D4B06A]" />
                      <span className="text-base">contacto@blackhome.cl</span>
                    </div>
          
                    <div className="flex items-center gap-4">
                      <MapPin size={18} className="text-[#D4B06A]" />
                      <span className="text-base">Santiago, Chile</span>
                    </div>
          
                  </div>
                </div>
          
                {/* LINEA DIVISORIA */}
                <div className="hidden md:block h-28 w-px bg-[#D4B06A]/30" />
          
                {/* REDES SOCIALES */}
                <div className="flex flex-col items-center">
          
                  <h3 className="text-[#D4B06A] font-semibold text-2xl mb-4 tracking-wide">
                    SÍGUENOS
                  </h3>
          
                  <div className="flex gap-4">
          
                    <a
                      href="#"
                      className="
                        w-12 h-12
                        rounded-full
                        border border-[#D4B06A]
                        text-[#D4B06A]
                        flex items-center justify-center
                        hover:bg-[#D4B06A]/10
                        transition-all duration-300
                      "
                    >
                      <FaInstagram size={18} />
                    </a>
          
                    <a
                      href="#"
                      className="
                        w-12 h-12
                        rounded-full
                        border border-[#D4B06A]
                        text-[#D4B06A]
                        flex items-center justify-center
                        hover:bg-[#D4B06A]/10
                        transition-all duration-300
                      "
                    >
                      <FaFacebookF size={18} />
                    </a>
          
                    <a
                      href="tel:+56963653017"
                      className="
                        w-12 h-12
                        rounded-full
                        border border-[#D4B06A]
                        text-[#D4B06A]
                        flex items-center justify-center
                        hover:bg-[#D4B06A]/10
                        transition-all duration-300
                      "
                    >
                      <Phone size={18} />
                    </a>
          
                  </div>
          
                </div>
          
              </div>
          
              {/* LINEA INFERIOR */}
              <div className="border-t border-[#D4B06A]/30 mt-8 pt-5">
                <p className="text-center text-sm text-gray-300">
                  © 2026 Black Home. Todos los derechos reservados.
                </p>
              </div>
          
            </div>
          
          </footer>

    </main>
  );
}
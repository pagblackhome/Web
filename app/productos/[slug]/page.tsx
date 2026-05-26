"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const product = {
  name: "Roller Duo Beige",

  price: 89990,

  images: [
    "/images/20.jpg",
    "/images/25.jpg",
    "/images/33.jpg",
  ],

  description:
    "La cortina Roller Duo combina elegancia, privacidad y control de luz para crear espacios modernos y sofisticados. Su diseño dual permite regular la entrada de luz de manera práctica y estética.",

  material: "Polyester Premium",
  opacity: "Semi Blackout",
  warranty: "12 meses",
  installation: "Instalación incluida",
};

const relatedProducts = [
  {
    name: "Roller Blackout",
    price: "$79.990",
    image: "/images/20.jpg",
  },

  {
    name: "Roller Screen",
    price: "$69.990",
    image: "/images/25.jpg",
  },

  {
    name: "Roller Duo Gris",
    price: "$89.990",
    image: "/images/33.jpg",
  },

  {
    name: "Roller Sunscreen",
    price: "$69.990",
    image: "/images/20.jpg",
  },
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const [openGuide, setOpenGuide] = useState(false);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("");

  const pricePerM2 = 34990;

  const total =
    Number(width || 0) *
    Number(height || 0) *
    Number(quantity || 0) *
    pricePerM2;

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-black overflow-x-hidden relative">

      {/* FONDO */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-[#f1b24f]/30 rounded-bl-[120px]" />

        <div className="absolute top-[200px] left-0 w-[120px] h-[300px] bg-[#d65c34]/20 rounded-tr-[100px]" />

        <div className="absolute bottom-[250px] right-0 w-[240px] h-[240px] bg-[#6e8d63]/20 rounded-tl-[120px]" />

      </div>

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

            <button
              onClick={() => setOpenGuide(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black text-white text-xl hover:scale-110 transition"
            >
              ×
            </button>

            <img
              src="/images/medir-cortinas.png"
              alt="Cómo medir cortinas roller"
              className="w-full h-auto object-cover"
            />

          </div>

        </div>

      )}

      {/* CONTENT */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20">

        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[45px] shadow-[0_10px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">

          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* IMAGENES */}
            <div>

              <div className="overflow-hidden rounded-[35px] shadow-xl bg-white">

                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={900}
                  height={900}
                  priority
                  className="w-full h-[520px] object-cover transition duration-700"
                />

              </div>

              <div className="flex justify-center gap-4 mt-5">

                {product.images.map((img) => (

                  <button
                    key={img}
                    onClick={() => setSelectedImage(img)}
                    className={`
                      rounded-2xl overflow-hidden border-2 transition duration-300
                      ${
                        selectedImage === img
                          ? "border-black scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }
                    `}
                  >

                    <Image
                      src={img}
                      alt="Miniatura"
                      width={88}
                      height={88}
                      className="w-[88px] h-[88px] object-cover"
                    />

                  </button>

                ))}

              </div>

            </div>

            {/* INFO */}
            <div className="pt-2">

              <p className="text-[10px] tracking-[0.28em] uppercase text-[#d65c34] font-semibold mb-2">
                Cortina Roller Duo
              </p>

              <h1 className="text-[28px] md:text-[32px] font-bold leading-tight mb-3">
                {product.name}
              </h1>

              <div className="mb-6">

                <h2 className="text-[24px] md:text-[28px] font-semibold leading-none">
                  ${product.price.toLocaleString("es-CL")}
                </h2>

                <p className="text-[13px] text-black/50 mt-2">
                  Valor referencial por metro cuadrado
                </p>

              </div>

              {/* COTIZADOR */}
              <div className="bg-white rounded-[24px] border border-black/5 p-5 shadow-lg mb-6">

                <h3 className="text-[20px] font-semibold mb-5">
                  Cotiza tu cortina
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">

                  <div>

                    <label className="text-[12px] text-black/60 mb-2 block">
                      Ancho de la cortina (m)
                    </label>

                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-4 text-sm outline-none focus:border-black/30 transition"
                      placeholder="Ej: 2.00"
                    />

                  </div>

                  <div>

                    <label className="text-[12px] text-black/60 mb-2 block">
                      Alto de la cortina (m)
                    </label>

                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-4 text-sm outline-none focus:border-black/30 transition"
                      placeholder="Ej: 2.40"
                    />

                  </div>

                </div>

                <div className="mb-4">

                  <label className="text-[12px] text-black/60 mb-2 block">
                    Cantidad de cortinas
                  </label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-4 text-sm outline-none focus:border-black/30 transition"
                    placeholder="Ej: 2"
                  />

                </div>

                <div className="bg-[#f8f5f1] rounded-2xl p-4 mb-4 border border-black/5">

                  <p className="text-[12px] text-black/50 mb-1">
                    Total estimado
                  </p>

                  <h4 className="text-[24px] font-bold text-[#d65c34]">
                    ${total.toLocaleString("es-CL")}
                  </h4>

                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                  <Link
                    href="/cotizador"
                    className="flex-1 h-10 rounded-xl bg-black text-white flex items-center justify-center text-[13px] font-medium hover:bg-zinc-900 transition duration-300"
                  >
                    Solicitar cotización
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

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
            <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 3.122.904 6.034 2.463 8.49L0 32l7.336-2.414a15.94 15.94 0 0 0 8.664 2.543c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.09a13.06 13.06 0 0 1-6.654-1.82l-.477-.283-4.35 1.43 1.416-4.24-.31-.49a13.01 13.01 0 0 1-2.005-6.947c0-7.18 5.84-13.02 13.02-13.02s13.02 5.84 13.02 13.02-5.84 13.02-13.02 13.02z"/>
          </svg>

        </div>

      </a>

    </main>
  );
}
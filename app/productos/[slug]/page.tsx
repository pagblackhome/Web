"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CurtainSimulator from "@/components/CurtainSimulator";



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

  const [showSimulator, setShowSimulator] = useState(false);

// POPUP GUIA MEDIDAS
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
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20">

        {/* CONTAINER GENERAL */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[45px] shadow-[0_10px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">

          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* IMAGENES */}
            <div>

              {/* IMAGEN PRINCIPAL */}
              <div className="overflow-hidden rounded-[35px] shadow-xl bg-white group cursor-zoom-in">

                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={900}
                  height={900}
                  priority
                  className="w-full h-[520px] object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              {/* MINIATURAS */}
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

              {/* TITULO */}
              <h1 className="text-[28px] md:text-[32px] font-bold leading-tight mb-3">
                {product.name}
              </h1>

              {/* PRECIO */}
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

                {/* INPUTS */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">

                  {/* ANCHO */}
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

                  {/* ALTO */}
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

                {/* CANTIDAD */}
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
                                {/* TOTAL */}
                <div className="bg-[#f8f5f1] rounded-2xl p-4 mb-4 border border-black/5">

                  <p className="text-[12px] text-black/50 mb-1">
                    Total estimado
                  </p>

                  <h4 className="text-[24px] font-bold text-[#d65c34]">
                    ${total.toLocaleString("es-CL")}
                  </h4>

                </div>

                {/* BOTONES */}
                <div className="flex flex-col sm:flex-row gap-3">

                  <Link
                    href="/cotizador"
                    className="flex-1 h-10 rounded-xl bg-black text-white flex items-center justify-center text-[13px] font-medium hover:bg-zinc-900 transition duration-300"
                  >
                    Solicitar cotización
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowSimulator(true)}
                    className="flex-1 h-10 rounded-xl border border-black/10 text-[13px] hover:bg-black hover:text-white transition duration-300"
                  >
                    Probar tu cortina
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* BANNER DESPACHO */}
          <div className="mt-12 mb-12">

            <div className="relative overflow-hidden rounded-[38px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] min-h-[360px] border border-black/5">

              {/* IMAGEN */}
              <Image
                src="/images/bdespacho.png"
                alt="Despacho Black Home"
                fill
                priority
                className="object-cover"
              />

            </div>

          </div>

          {/* DESCRIPCION + ESPECIFICACIONES */}
          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            {/* DESCRIPCION */}
            <div className="bg-white rounded-[28px] border border-black/5 p-6 shadow-md">

              <h3 className="text-[26px] font-bold mb-5">
                Descripción del producto
              </h3>

              <p className="text-[15px] text-black/70 leading-7 mb-5">
                {product.description}
              </p>

              <div className="flex flex-col gap-3">

                {[
                  "Tejido premium de alta calidad",
                  "Excelente control de luz y privacidad",
                  "Diseño elegante y minimalista",
                  "Fácil limpieza y mantenimiento",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f1b24f]" />

                    <p className="text-[14px] text-black/70">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* ESPECIFICACIONES */}
            <div className="bg-white rounded-[28px] border border-black/5 p-6 shadow-md">

              <h3 className="text-[26px] font-bold mb-6">
                Especificaciones
              </h3>

              <div className="space-y-4">

                {[
                  {
                    title: "Material",
                    value: product.material,
                  },

                  {
                    title: "Opacidad",
                    value: product.opacity,
                  },

                  {
                    title: "Garantía",
                    value: product.warranty,
                  },

                  {
                    title: "Instalación",
                    value: product.installation,
                  },
                ].map((item) => (

                  <div
                    key={item.title}
                    className="flex items-center justify-between border-b border-black/5 pb-3"
                  >

                    <p className="text-sm text-black/50">
                      {item.title}
                    </p>

                    <p className="text-sm font-semibold">
                      {item.value}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* MEDIOS DE PAGO */}
          <div className="mt-14 bg-white rounded-[30px] border border-black/5 shadow-md p-8">

            <div className="grid md:grid-cols-[1fr_1.4fr] items-center gap-16">

              <div>

                <h3 className="text-2xl font-bold mb-2">
                  Medios de pago
                </h3>

                <p className="text-black/50">
                  Compra segura y protegida
                </p>

              </div>

              {/* IMAGENES MEDIOS DE PAGO */}
              
<div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center w-full">

  <Image
    src="/images/visa.webp"
    alt="Visa"
    width={130}
    height={60}
    className="object-contain h-auto opacity-90 hover:scale-105 hover:opacity-100 transition duration-300"
  />

  <Image
    src="/images/MasterCard_Logo.webp"
    alt="Mastercard"
    width={130}
    height={60}
    className="object-contain h-auto opacity-90 hover:scale-105 hover:opacity-100 transition duration-300"
  />

  <Image
    src="/images/webpay-cl.webp"
    alt="Webpay"
    width={150}
    height={60}
    className="object-contain h-auto opacity-90 hover:scale-105 hover:opacity-100 transition duration-300"
  />

  <Image
    src="/images/mercadopago.webp"
    alt="Mercado Pago"
    width={160}
    height={60}
    className="object-contain h-auto opacity-90 hover:scale-105 hover:opacity-100 transition duration-300"
  />

</div>

            </div>

          </div>

          {/* RELACIONADOS */}
          <div className="mt-16">

            <h3 className="text-3xl font-bold mb-10 text-center">
              También te puede interesar
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {relatedProducts.map((item) => (

                <Link
                  href="/productos"
                  key={item.name}
                  className="group"
                >

                  <div className="bg-white rounded-[30px] overflow-hidden border border-black/5 shadow-md hover:-translate-y-2 transition duration-500">

                    <div className="overflow-hidden">

                      <Image
                        src={item.image}
                        alt={item.name}
                        width={500}
                        height={400}
                        className="w-full h-[240px] object-cover group-hover:scale-105 transition duration-700"
                      />

                    </div>

                    <div className="p-5">

                      <h4 className="font-semibold text-lg mb-2">
                        {item.name}
                      </h4>

                      <p className="text-[#d65c34] font-bold">
                        {item.price}
                      </p>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* MODAL */}
      {showSimulator && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">

          <div className="bg-white rounded-[35px] w-full max-w-5xl p-5 relative shadow-2xl">

            <button
              onClick={() => setShowSimulator(false)}
              className="absolute top-5 right-6 text-3xl text-black/60 hover:text-black transition"
            >
              ×
            </button>

            <CurtainSimulator image={product.images[0]} />

          </div>

        </div>

      )}
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
      <footer className="bg-black text-white py-14 px-6 relative z-10">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

          <div>

            <h3 className="text-3xl font-bold mb-5">
              BLACK HOME
            </h3>

            <p className="text-white/60 leading-7 text-sm">
              Diseñamos soluciones modernas y elegantes
              para transformar tus espacios con estilo.
            </p>

          </div>

          <div>

            <h4 className="font-semibold mb-5">
              Navegación
            </h4>

            <div className="flex flex-col gap-3 text-white/60 text-sm">

              <Link href="/">Inicio</Link>
              <Link href="/productos">Productos</Link>
              <Link href="/cotizador">Cotizador</Link>
              <Link href="/contacto">Contacto</Link>

            </div>

          </div>

          <div>

            <h4 className="font-semibold mb-5">
              Categorías
            </h4>

            <div className="flex flex-col gap-3 text-white/60 text-sm">

              <p>Roller Duo</p>
              <p>Blackout</p>
              <p>Screen</p>
              <p>Motorizadas</p>

            </div>

          </div>

          <div>

            <h4 className="font-semibold mb-5">
              Contacto
            </h4>

            <div className="flex flex-col gap-3 text-white/60 text-sm">

              <p>Santiago, Chile</p>
              <p>contacto@blackhome.cl</p>
              <p>+56 9 3400 7366</p>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/40 text-sm">
          © 2026 Blackhome. Todos los derechos reservados.
        </div>

      </footer>

    </main>
  );
}
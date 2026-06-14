"use client";


import Header from "../../../components/Header";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

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

const product = {
  name: "Roller Duo Beige",
  price: 89990,

  images: ["/images/20.jpg", "/images/25.jpg", "/images/33.jpg"],

  description:
    "La cortina Roller Duo combina elegancia, privacidad y control de luz para crear espacios modernos y sofisticados. Su diseño dual permite regular la entrada de luz de manera práctica y estética.",

  material: "Polyester Premium",
  opacity: "Semi Blackout",
  warranty: "12 meses",
  installation: "",
};

const relatedProducts = [
  { name: "Roller Blackout", price: "$25.990", image: "/images/20.jpg" },
  { name: "Roller Screen", price: "$25.990", image: "/images/25.jpg" },
  { name: "Roller Duo Gris", price: "$25.990", image: "/images/33.jpg" },
  { name: "Roller Sunscreen", price: "$25.990", image: "/images/20.jpg" },
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
       <Header />

      {/* FONDO */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-[#f1b24f]/30 rounded-bl-[120px]" />
        <div className="absolute top-[200px] left-0 w-[120px] h-[300px] bg-[#d65c34]/20 rounded-tr-[100px]" />
        <div className="absolute bottom-[250px] right-0 w-[240px] h-[240px] bg-[#6e8d63]/20 rounded-tl-[120px]" />
      </div>




      {/* POPUP MEDIDAS */}
      {openGuide && (
        <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative bg-[#f7f4ee] rounded-[35px] overflow-hidden max-w-4xl w-full shadow-2xl border border-white/20">

            <button
              onClick={() => setOpenGuide(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black text-white text-xl"
            >
              ×
            </button>

            <img
              src="/images/medir-cortinas.png"
              alt="Guía de medición"
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

              <div className="flex justify-center gap-4 mt-5">
                {product.images.map((img) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-2xl overflow-hidden border-2 transition duration-300 ${
                      selectedImage === img
                        ? "border-black scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt="Miniatura producto"
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

              {/* COTIZADOR (RESTO ORIGINAL SIN CAMBIOS) */}
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
                      className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-4 text-sm"
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
                      className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-4 text-sm"
                    />
                  </div>

                </div>

                <div className="mb-4">
                  <label className="text-[12px] text-black/60 mb-2 block">
                    Cantidad
                  </label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-4 text-sm"
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

                <Link
                  href="/cotizador"
                  className="flex-1 h-10 rounded-xl bg-black text-white flex items-center justify-center text-[13px]"
                >
                  Solicitar cotización
                </Link>

              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN + ESPECIFICACIONES (RESTAURADO COMPLETO) */}
          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <div className="bg-white rounded-[28px] p-6 border shadow-md">
              <h3 className="text-[26px] font-bold mb-5">
                Descripción del producto
              </h3>

              <p className="text-[15px] text-black/70 leading-7">
                {product.description}
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-6 border shadow-md">

              <h3 className="text-[26px] font-bold mb-6">
                Especificaciones
              </h3>

              <div className="space-y-4">

                {[
                  { title: "Material", value: product.material },
                  { title: "Opacidad", value: product.opacity },
                  { title: "Garantía", value: product.warranty },
                  { title: "Instalación", value: product.installation },
                ].map((item) => (
                  <div key={item.title} className="flex justify-between border-b pb-2">
                    <span className="text-black/50">{item.title}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* BANNER RESTAURADO */}
          <div className="mt-12">
            <Image
              src="/images/bdespacho.png"
              alt="Banner despacho"
              width={1200}
              height={400}
              className="w-full rounded-[30px] object-cover"
            />
          </div>

          {/* RELACIONADOS RESTAURADO */}
          <div className="mt-16">

            <h3 className="text-3xl font-bold mb-10 text-center">
              También te puede interesar
            </h3>

            <div className="grid md:grid-cols-4 gap-6">

              {relatedProducts.map((item) => (
                <div key={item.name} className="bg-white rounded-[30px] overflow-hidden border shadow-md">

                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={400}
                    className="w-full h-[240px] object-cover"
                  />

                  <div className="p-5">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-[#d65c34] font-bold">{item.price}</p>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      </section>
      <a
  href="https://wa.me/56934007366"
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
                       href="tel:+56934007366"
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
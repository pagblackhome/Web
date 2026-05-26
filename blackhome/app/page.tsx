"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function Home() {

  const [showPopup, setShowPopup] = useState(false);
  const [activeLink, setActiveLink] = useState("inicio");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openGuide, setOpenGuide] = useState(false);

  const galleryImages = [
    "/images/vertilux_rollershades_008.jpg",
    "/images/20.jpg",
    "/images/25.jpg",
    "/images/33.jpg",
  ];
  useEffect(() => {
  setShowPopup(true);
}, []);

  return (
    <>
{showPopup && (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">

    <div className="relative w-full max-w-xl rounded-[35px] bg-[#f7f4ee] shadow-2xl border border-white/40 p-10 text-center animate-fadeIn overflow-hidden">

      {/* 🔴 FIGURAS DE FONDO (BRANDING) */}
      <div className="absolute top-[-60px] left-[-60px] w-40 h-40 bg-[#d54a2c]/30 rounded-br-[100px] blur-xl" />

      <div className="absolute bottom-[-60px] right-[-60px] w-52 h-52 bg-[#7caf6f]/30 rounded-tl-[120px] blur-xl" />

      <div className="absolute top-[20%] right-[-30px] w-24 h-24 border-[12px] border-[#f0b233]/30 rounded-full" />

      <div className="absolute bottom-[20%] left-[-20px] w-20 h-20 bg-[#1d7ed6]/20 rounded-full" />

      {/* BOTÓN CERRAR */}
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black text-white hover:scale-110 transition z-20"
      >
        ×
      </button>

      {/* LOGO GRANDE */}
      <div className="flex justify-center mb-6 relative z-10">
        <Image
          src="/images/BH.png"
          alt="Black Home Logo"
          width={140}
          height={140}
          className="object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        />
      </div>

      {/* TÍTULO */}
      <h2 className="text-2xl md:text-3xl font-bold text-black tracking-wide relative z-10">
        Estamos preparando algo increíble
      </h2>

      {/* TEXTO */}
      <p className="mt-4 text-black/70 leading-7 relative z-10">
        Muy pronto lanzaremos nuestros nuevos productos y mejoras en la experiencia Black Home.
        <br />
        Queremos entregarte un servicio más moderno, elegante y personalizado.
      </p>

      {/* BADGE */}
      <div className="mt-6 inline-block px-5 py-2 rounded-full bg-black text-white text-sm tracking-widest relative z-10">
        PRÓXIMAMENTE
      </div>

    </div>
  </div>
)}
      {/* SEO */}
    

      <main className="min-h-screen bg-white text-black overflow-x-hidden">

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

        {/* HERO */}
        <section
          id="inicio"
          className="relative h-[90vh]"
        >

          <Image
            src="/images/frontpage.jpg"
            alt="Cortinas modernas Black Home"
            fill
            priority
            quality={85}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">

            <h2 className="text-5xl md:text-7xl font-bold leading-tight">

              Cortinas
              <span className="block text-white/80">
                Black Home
              </span>

            </h2>

            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-8">
              Diseño moderno, elegancia y funcionalidad
              para transformar tus espacios.
            </p>

          </div>

        </section>

        {/* PRODUCTOS */}
        <section
          id="productos"
          className="py-24 px-6 bg-white"
        >

          <h2 className="text-4xl font-bold text-center mb-16">
            Conoce nuestros productos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {[
              {
                img: "/images/log1.png",
                title: "ROLLER DUO",
                text: "Elegancia y control de luz moderno.",
              },
              {
                img: "/images/log2.png",
                title: "BLACKOUT",
                text: "Oscurecimiento y privacidad total.",
              },
              {
                img: "/images/log3.png",
                title: "MOTORIZADAS",
                text: "Automatización elegante.",
              },
              {
                img: "/images/log4.png",
                title: "ROLLER VERTICAL",
                text: "Elegancia y control de luz moderno.",
              },
              {
                img: "/images/log5.png",
                title: "CORTINA EXTERIOR",
                text: "Oscurecimiento y privacidad total.",
              },
              {
                img: "/images/log6.png",
                title: "MOTORIZADAS",
                text: "Automatización elegante.",
              },
            ].map((item, i) => (

              <Link
                href="/productos"
                key={i}
                className="group"
              >

                <div className="rounded-[28px] border border-black/5 bg-white p-6 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

                  <Image
                    src={item.img}
                    alt={item.title}
                    width={58}
                    height={58}
                    loading="lazy"
                    className="mx-auto mb-5 group-hover:scale-110 transition duration-500"
                  />

                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {item.text}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* SERVICIOS */}
        <section
          id="cotizador"
          className="relative py-32 overflow-hidden"
        >

          {/* IMAGEN COMO ANTES */}
          <Image
            src="/images/servicio.png"
            alt="Servicios premium"
            fill
            quality={90}
            loading="lazy"
            className="object-cover"
          />

          {/* OVERLAY MÁS CLARO */}
          <div className="absolute inset-0 bg-white/15" />

          {/* CONTENIDO */}
          <div className="relative z-10 max-w-5xl mx-auto text-center text-black px-6">

            <h2 className="text-4xl font-bold mb-6">
              Servicio
            </h2>

            <p className="text-sm md:text-base text-black/80 leading-8 max-w-3xl mx-auto">
              En BlackHome, no solo proporcionamos materiales para cortinas:
              diseñamos soluciones integrales que transforman los espacios donde
              vives y trabajas. Nuestro compromiso es ofrecer productos de alta
              calidad, respaldados por una amplia experiencia y un enfoque en el
              diseño funcional y moderno. Creamos recubrimientos de ventanas que
              equilibran decoración, iluminación, temperatura, visibilidad,
              seguridad y practicidad, elevando cada ambiente a un nuevo nivel
              de confort y estilo.
            </p>

          </div>

        </section>

        {/* BENEFICIOS BANNER */}
<section className="relative py-10 px-5 overflow-hidden">

  {/* TÍTULO */}
  <div className="text-center mb-10 relative z-10">
    <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-black">
      Beneficios
    </h2>

    <p className="text-black/60 mt-3 text-sm md:text-base">
      Diseño, calidad y elegancia en cada detalle
    </p>
  </div>

  {/* FIGURAS FONDO */}
  <div className="absolute top-0 left-0 w-44 h-44 bg-[#d54a2c] rounded-br-[100px] opacity-90" />
  <div className="absolute bottom-0 right-0 w-52 h-52 bg-[#7caf6f] rounded-tl-[120px] opacity-90" />
  <div className="absolute top-[15%] right-[8%] w-32 h-32 border-[18px] border-[#f0b233] rounded-full opacity-40" />
  <div className="absolute bottom-[15%] left-[6%] w-20 h-20 bg-[#1d7ed6] rounded-full opacity-20" />

  <div className="absolute top-[25%] left-[10%] grid grid-cols-4 gap-3 opacity-40">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#d54a2c]"
      />
    ))}
  </div>

  <div className="absolute bottom-[20%] right-[10%] grid grid-cols-4 gap-3 opacity-40">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#7caf6f]"
      />
    ))}
  </div>

  {/* CONTENIDO */}
  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="bg-[#f7f4ee]/90 backdrop-blur-xl border border-white/50 rounded-[45px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden">

      <Image
        src="/images/banner-beneficios.png"
        alt="Beneficios Black Home"
        width={1920}
        height={550}
        className="
          w-full
          h-[220px]
          md:h-[320px]
          lg:h-[420px]
          object-contain
          bg-[#f7f4ee]
        "
        priority
      />

    </div>
  </div>

</section>

        {/* GALERIA */}
        <section className="py-24 bg-[#f7f7f7] overflow-hidden">

          <h2 className="text-4xl font-bold text-center mb-16">
            Galería
          </h2>

          <div className="relative overflow-hidden">

            <div className="flex animate-scroll gap-6 w-max px-6">

              {[...galleryImages, ...galleryImages].map((img, i) => (

                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className="cursor-pointer w-[320px] md:w-[500px] rounded-[30px] overflow-hidden flex-shrink-0 shadow-xl group"
                >

                  <Image
                    src={img}
                    alt="Galería Black Home"
                    width={700}
                    height={500}
                    quality={75}
                    loading="lazy"
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* POPUP GALERIA */}
        {selectedImage && (

          <div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >

            <div
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-14 right-0 text-white text-5xl"
              >
                ×
              </button>

              <Image
                src={selectedImage}
                alt="Imagen ampliada"
                width={1400}
                height={900}
                quality={85}
                className="rounded-[30px] w-full h-auto object-cover"
              />

            </div>

          </div>

        )}

        {/* CONTACTO */}
        <section
          id="contacto"
          className="relative py-28 overflow-hidden"
        >

          {/* FONDO */}
          <div className="absolute inset-0 bg-[#f5f1eb]" />

          {/* FIGURAS */}
          <div className="absolute top-0 left-0 w-[260px] h-[420px] bg-[#cb4f2d] rounded-br-[160px]" />

          <div className="absolute top-0 right-0 w-[280px] h-[420px] bg-[#efb54d] rounded-bl-[160px]" />

          <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-[#758b6b] rounded-tl-[160px]" />

          <div className="absolute top-[100px] right-[260px] w-[110px] h-[110px] bg-[#2d86d6] rounded-[20px]" />

          <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#d8d1ca]/60 rounded-full blur-sm" />

          {/* CONTENIDO */}
          <div className="relative z-10 max-w-6xl mx-auto px-6">

            {/* TITULO CENTRADO */}
            <div className="text-center mb-16">

              <h2 className="text-5xl font-bold mb-5">
                Contacto
              </h2>

              <p className="text-black/60 text-lg">
                Completa tus datos y nos pondremos en contacto contigo.
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">

              {/* IMAGEN */}
              <div className="relative">

                <Image
                  src="/images/vertilux_rollershades_008.jpg"
                  alt="Contacto Black Home"
                  width={700}
                  height={800}
                  className="rounded-[35px] shadow-2xl object-cover h-full"
                />

                <div className="absolute inset-0 rounded-[35px] bg-black/10" />

              </div>

              {/* FORM */}
              <form className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-lg border border-white/50">

                <div className="grid md:grid-cols-2 gap-5 mb-5">

                  <input
                    placeholder="Nombre"
                    className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30 transition"
                  />

                  <input
                    placeholder="Apellido"
                    className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30 transition"
                  />

                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-5">

                  <input
                    placeholder="Teléfono"
                    className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30 transition"
                  />

                  <input
                    placeholder="Correo"
                    className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30 transition"
                  />

                </div>

                <textarea
                  placeholder="Mensaje"
                  className="w-full h-40 rounded-2xl border border-black/10 p-5 bg-white/70 outline-none focus:border-black/30 transition"
                />

                <button className="mt-6 w-full h-14 rounded-2xl bg-black text-white font-semibold hover:scale-[1.01] hover:bg-zinc-900 transition-all duration-300">

                  Enviar mensaje

                </button>

              </form>

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="bg-black text-white py-12 px-6">

          <div className="max-w-6xl mx-auto text-center">

            <h3 className="text-4xl font-bold mb-6">
              BLACK HOME
            </h3>

            <div className="flex flex-wrap justify-center gap-6 text-white/70 mb-6">

              <p>Santiago</p>
              <p>contacto@blackhome.cl</p>
              <p>+56 9 3400 7366</p>

            </div>

            <p className="text-white/40 text-sm">
              © 2026 Blackhome. Todos los derechos reservados.
            </p>

          </div>

        </footer>

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

        {/* ANIMACIONES */}
        <style jsx global>{`

        @keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.35s ease-out;
}
          html {
            scroll-behavior: smooth;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 55s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

      </main>
    </>
  );
}
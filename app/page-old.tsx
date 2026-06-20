"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openGuide, setOpenGuide] = useState(false);

  const galleryImages = [
    "/images/vertilux_rollershades_008.jpg",
    "/images/20.jpg",
    "/images/25.jpg",
    "/images/33.jpg",
  ];

  const products = [
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
      text: "Diseño moderno y funcional.",
    },
    {
      img: "/images/log5.png",
      title: "CORTINA EXTERIOR",
      text: "Protección solar y elegancia.",
    },
    {
      img: "/images/log6.png",
      title: "SCREEN",
      text: "Control de luz y visibilidad.",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-white text-black overflow-x-hidden">
        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 h-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center pl-2 pr-6 md:pl-4 md:pr-10 h-full">
            {/* LOGO */}
            <div className="flex items-center gap-2">
              <Image
                src="/images/BH.png"
                alt="Black Home cortinas roller y decoración"
                width={160}
                height={160}
                priority
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
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

              <Image
                src="/images/medir-cortinas.png"
                alt="Guía para medir cortinas roller Black Home"
                width={1600}
                height={1000}
                className="w-full h-auto object-cover"
                priority
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
            alt="Cortinas roller modernas Black Home en Santiago Chile"
            fill
            priority
            quality={90}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Cortinas
              <span className="block text-white/80">
                Black Home
              </span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-8">
              Cortinas roller modernas, blackout y motorizadas
              para transformar tus espacios con elegancia y diseño.
            </p>

            
          </div>
        </section>

        {/* PRODUCTOS */}
        <section
          id="productos"
          className="py-24 px-6 bg-white"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-5">
              Cortinas Roller y Soluciones Modernas
            </h2>

            <p className="text-center text-black/60 max-w-3xl mx-auto mb-16 leading-7">
              Descubre nuestra línea de cortinas roller blackout,
              duo, screen y motorizadas diseñadas para entregar
              elegancia, privacidad y control de luz.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {products.map((item) => (
                <Link
                  href="/productos"
                  key={item.title}
                  className="group"
                >
                  <article className="rounded-[28px] border border-black/5 bg-white p-6 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
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
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICIO */}
        <section
          id="servicio"
          className="relative py-32 overflow-hidden"
        >
          <Image
            src="/images/servicio.png"
            alt="Servicio premium de instalación de cortinas Black Home"
            fill
            quality={90}
            loading="lazy"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-white/20" />

          <div className="relative z-10 max-w-5xl mx-auto text-center text-black px-6">
            <h2 className="text-4xl font-bold mb-6">
              Servicio Premium
            </h2>

            <p className="text-sm md:text-base text-black/80 leading-8 max-w-3xl mx-auto">
              En Black Home diseñamos soluciones integrales para
              cortinas modernas y decoración de interiores.
              Ofrecemos productos de alta calidad, instalación
              profesional y asesoría personalizada en Santiago y
              todo Chile.
            </p>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="relative py-10 px-5 overflow-hidden">
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-black">
              Beneficios
            </h2>

            <p className="text-black/60 mt-3 text-sm md:text-base">
              Calidad, elegancia y tecnología en cada detalle
            </p>
          </div>

          <div className="absolute top-0 left-0 w-44 h-44 bg-[#d54a2c] rounded-br-[100px] opacity-90" />
          <div className="absolute bottom-0 right-0 w-52 h-52 bg-[#7caf6f] rounded-tl-[120px] opacity-90" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="bg-[#f7f4ee]/90 backdrop-blur-xl border border-white/50 rounded-[45px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden">
              <Image
                src="/images/banner-beneficios.png"
                alt="Beneficios de las cortinas Black Home"
                width={1920}
                height={550}
                className="w-full h-[220px] md:h-[320px] lg:h-[420px] object-contain bg-[#f7f4ee]"
                priority
              />
            </div>
          </div>
        </section>
                {/* GALERÍA */}
        <section className="py-24 bg-[#f7f7f7] overflow-hidden">
          <h2 className="text-4xl font-bold text-center mb-16">
            Galería de proyectos
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
                    alt="Proyectos Black Home cortinas roller"
                    width={700}
                    height={500}
                    quality={80}
                    loading="lazy"
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POPUP IMAGEN */}
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
                alt="Imagen ampliada Black Home"
                width={1400}
                height={900}
                quality={90}
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
          <div className="absolute inset-0 bg-[#f5f1eb]" />

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-5">
                Contacto
              </h2>

              <p className="text-black/60 text-lg">
                Te asesoramos en tu proyecto de cortinas roller
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <Image
                src="/images/vertilux_rollershades_008.jpg"
                alt="Instalación de cortinas Black Home"
                width={700}
                height={800}
                className="rounded-[35px] shadow-2xl object-cover"
              />

              <form className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-lg border border-white/50">
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <input
                    placeholder="Nombre"
                    className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30"
                  />
                  <input
                    placeholder="Apellido"
                    className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <input
                    placeholder="Teléfono"
                    className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30"
                  />
                  <input
                    placeholder="Correo"
                    className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30"
                  />
                </div>

                <textarea
                  placeholder="Mensaje"
                  className="w-full h-40 rounded-2xl border border-black/10 p-5 bg-white/70 outline-none focus:border-black/30"
                />

                <button className="mt-6 w-full h-14 rounded-2xl bg-black text-white font-semibold hover:bg-zinc-900 transition">
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
              <p>Santiago, Chile</p>
              <p>contacto@blackhome.cl</p>
              <p>+56 9 3400 7366</p>
            </div>

            <p className="text-white/40 text-sm">
              © 2026 Black Home. Todos los derechos reservados.
            </p>
          </div>
        </footer>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/56934007366"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:scale-110 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="white"
              className="w-7 h-7"
            >
              <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 3.122.904 6.034 2.463 8.49L0 32l7.336-2.414a15.94 15.94 0 0 0 8.664 2.543c8.836 0 16-7.164 16-16S24.836.396 16 .396z" />
            </svg>
          </div>
        </a>

        {/* ANIMACIONES */}
        
      </main>
    </>
  );
}
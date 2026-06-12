"use client";

import Header from "../components/Header";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    { img: "/images/log1.png", title: "ROLLER DUO", text: "Elegancia y control de luz moderno." },
    { img: "/images/log2.png", title: "BLACKOUT", text: "Oscurecimiento y privacidad total." },
    { img: "/images/log3.png", title: "MOTORIZADAS", text: "Automatización elegante." },
    { img: "/images/log4.png", title: "ROLLER VERTICAL", text: "Diseño moderno y funcional." },
    { img: "/images/log5.png", title: "CORTINA EXTERIOR", text: "Protección solar y elegancia." },
    { img: "/images/log6.png", title: "SCREEN", text: "Control de luz y visibilidad." },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white text-black overflow-x-hidden">
      
 
            {/* HERO */}
      <section className="relative h-[90vh] mt-20">
        <Image src="/images/frontpage.jpg" alt="Hero" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h2 className="text-5xl md:text-7xl font-bold">
            Cortinas <span className="block text-white/80">Black Home</span>
          </h2>
          <p className="mt-6 max-w-2xl text-white/80">
            Cortinas modernas, blackout y motorizadas para tu hogar.
          </p>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">Productos</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p) => (
              <Link key={p.title} href="/productos">
                <div className="p-6 border rounded-2xl text-center hover:shadow-xl transition">
                  <Image src={p.img} alt={p.title} width={60} height={60} className="mx-auto" />
                  <h3 className="font-semibold mt-4">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

  {/* SERVICIO */}
<section className="relative py-32">
  <Image
    src="/images/servicio.png"
    alt="Servicio"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-white/10" />

  <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
    <h2 className="text-5xl font-light tracking-wide mb-6 text-gray-900">
      Servicios
    </h2>

    <p className="text-lg leading-relaxed text-gray-700 mb-5 font-light">
      Nos dedicamos a crear soluciones de cortinaje a medida que combinan diseño, funcionalidad y calidad en cada detalle. Entendemos que cada espacio es único, por eso ofrecemos una atención personalizada que va desde la elección del producto ideal hasta su instalación final.
    </p>

    <p className="text-lg leading-relaxed text-gray-700 font-light">
      Nuestro compromiso es entregar resultados que aporten estilo, confort y durabilidad, transformando ambientes en lugares más acogedores y con identidad propia.
    </p>
  </div>
</section>
            {/* BENEFICIOS (SIN FIGURAS DE COLORES) */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-4xl font-bold">Envíos</h2>

<div className="mt-10 max-w-7xl mx-auto bg-[#f7f4ee] rounded-3xl p-6 shadow">
  <Image
    src="/images/despacho_banner.webp"
    alt="Beneficios"
    width={1600}
    height={600}
    className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl"
  />
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
            alt="Proyectos Black Home"
            width={700}
            height={500}
            className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      ))}
    </div>
  </div>
</section>
         {/* CONTACTO */}
{/* CONTACTO */}
<section
  id="contacto"
  className="relative py-28 overflow-hidden bg-[#f5f1eb]"
>

  {/* CAPA BASE SUAVE */}
  <div className="absolute inset-0 bg-[#f5f1eb]" />

  {/* FIGURAS DECORATIVAS (DETALLES DE MARCA) */}

  {/* superior izquierda - rojo/naranjo fuerte */}
  <div className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-[#e24b2d] rounded-[60px] rotate-12 opacity-90 blur-[0px]" />

  {/* sombra gris detrás del contenido (tipo “papel”) */}
  <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[85%] h-[70%] bg-black/5 rounded-[50px] blur-[0px]" />

  {/* superior derecha - amarillo + celeste pequeño */}
  <div className="absolute top-10 right-10 w-28 h-28 bg-[#f6c453] rounded-3xl rotate-12 opacity-90" />
  <div className="absolute top-20 right-32 w-20 h-20 bg-[#6ccff6] rounded-2xl rotate-[-10deg] opacity-80" />

  {/* inferior izquierda - verde */}
  <div className="absolute bottom-[-40px] left-10 w-64 h-64 bg-[#6fa86b] rounded-[80px] rotate-6 opacity-90" />

  {/* CONTENIDO */}
  <div className="relative z-10 max-w-6xl mx-auto px-6">

    {/* TITULO */}
    <div className="text-center mb-16">
      <h2 className="font-playfair text-5xl">
  Contacto
</h2>

      <p className="text-black/60 text-lg">
        Te asesoramos en tu proyecto de cortinas roller
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-10 items-center">

      {/* IMAGEN */}
      <Image
        src="/images/vertilux_rollershades_008.jpg"
        alt="Contacto Black Home"
        width={700}
        height={800}
        className="rounded-[35px] shadow-2xl object-cover"
      />

      {/* FORM */}
      <form
  className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-lg border border-white/50"
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/send-quote/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Mensaje enviado correctamente ✅");
        form.reset();
      } else {
        alert("Error al enviar el mensaje ❌");
      }
    } catch (error) {
      alert("Error de conexión ❌");
      console.error(error);
    }
  }}
>
  {/* NOMBRE + APELLIDO */}
  <div className="grid md:grid-cols-2 gap-5 mb-5">
    <input
      name="name"
      placeholder="Nombre"
      className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30"
      required
    />

    <input
      name="lastName"
      placeholder="Apellido"
      className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30"
    />
  </div>

  {/* TELÉFONO + CORREO */}
  <div className="grid md:grid-cols-2 gap-5 mb-5">
    <input
      name="phone"
      placeholder="Teléfono"
      className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30"
    />

    <input
      name="email"
      type="email"
      placeholder="Correo"
      className="h-14 rounded-2xl border border-black/10 px-5 bg-white/70 outline-none focus:border-black/30"
      required
    />
  </div>

  {/* MENSAJE */}
  <textarea
    name="message"
    placeholder="Mensaje"
    className="w-full h-40 rounded-2xl border border-black/10 p-5 bg-white/70 outline-none focus:border-black/30"
    required
  />

  {/* BOTÓN */}
  <button
    type="submit"
    className="mt-6 w-full h-14 rounded-2xl bg-black text-white font-semibold hover:bg-zinc-900 transition"
  >
    Enviar mensaje
  </button>
</form>
    </div>
  </div>
</section>
      {/* FOOTER */}

      <footer
  className="
  bg-[#070707]
  relative
  mt-24
  overflow-hidden
  border-t
  border-[#c6a77b]/15
"
>

  {/* brillo premium */}

  <div className="absolute inset-0 pointer-events-none">

    <div
      className="
      absolute
      top-0
      left-1/2
      -translate-x-1/2
      w-[900px]
      h-[300px]
      bg-[#c6a77b]/5
      blur-[180px]
      "
    />

  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">

    <div className="grid lg:grid-cols-4 gap-8">

      {/* LOGO */}

      <div>

        <Image
          src="/images/BH.png"
    alt="Black Home"
    width={190}
    height={80}
    priority
    className="
      object-contain
      drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]
      drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]
    "
        />

      </div>


      {/* CONTACTO */}

      <div className="space-y-7">

        <div className="flex items-center gap-4">

          <Phone
            size={24}
            className="text-[#c6a77b]"
          />

          <span className="text-gray-200 text-lg">
            +56 9 3400 7366
          </span>

        </div>

        <div className="flex items-center gap-4">

          <Mail
            size={24}
            className="text-[#c6a77b]"
          />

          <span className="text-gray-200 text-lg">
            contacto@blackhome.cl
          </span>

        </div>

        <div className="flex items-center gap-4">

          <MapPin
            size={24}
            className="text-[#c6a77b]"
          />

          <span className="text-gray-200 text-lg">
            Santiago, Chile
          </span>

        </div>

      </div>

      {/* REDES */}

      <div className="border-l border-[#c6a77b]/40 pl-10">

        <h3
          className="
          text-[#c6a77b]
          text-2xl
          font-semibold
          mb-8
          tracking-wide
          "
        >
          SÍGUENOS
        </h3>

        <div className="flex gap-5">

          <a
            href="#"
            className="
w-14 h-14
rounded-full
border
border-[#c6a77b]
bg-[#c6a77b]/10
flex items-center
justify-center
text-[#c6a77b]
shadow-[0_0_15px_rgba(198,167,123,0.35)]
"
          >
           <FaInstagram size={24} />
          </a>

          <a
            href="#"
            className="
w-14 h-14
rounded-full
border
border-[#c6a77b]
bg-[#c6a77b]/10
flex items-center
justify-center
text-[#c6a77b]
shadow-[0_0_15px_rgba(198,167,123,0.35)]
"
          >
            <FaFacebookF size={24} />
          </a>

          <a
            href="https://wa.me/56934007366"
            target="_blank"
            className="
w-14 h-14
rounded-full
border
border-[#c6a77b]
bg-[#c6a77b]/10
flex items-center
justify-center
text-[#c6a77b]
shadow-[0_0_15px_rgba(198,167,123,0.35)]
"
          >
            <Phone size={22} />
          </a>

        </div>

      </div>

    </div>

    <div
      className="
      mt-16
      pt-8
      border-t
      border-[#c6a77b]/20
      text-center
      text-gray-500
      "
    >
      © 2026 Black Home. Todos los derechos reservados.
    </div>

  </div>

</footer>

      {/* WHATSAPP */}
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
    </main>
    </>
  );
}
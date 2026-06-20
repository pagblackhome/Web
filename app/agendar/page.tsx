import Header from "../../components/Header";
import AgendarCalendar from "@/components/Agendarcalendario";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Agendar visita | Black Home",
  description: "Agenda tu rectificación o instalación de cortinas fácil y rápido.",
};

export default function AgendarPage() {
  return (
    <main className="min-h-screen bg-[#f5f1eb] text-black overflow-x-hidden relative">
      <Header />

      {/* Blobs decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[200px] md:w-[260px] h-[200px] md:h-[260px] bg-[#f1b24f]/30 rounded-bl-[120px]" />
        <div className="absolute top-[200px] left-0 w-[80px] md:w-[120px] h-[200px] md:h-[300px] bg-[#d65c34]/20 rounded-tr-[100px]" />
        <div className="absolute bottom-[250px] right-0 w-[160px] md:w-[240px] h-[160px] md:h-[240px] bg-[#6e8d63]/20 rounded-tl-[120px]" />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20">

        {/* Encabezado */}
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#d65c34] font-semibold mb-2">
            Visita técnica
          </p>
          <h1 className="text-[28px] md:text-[36px] font-bold leading-tight mb-3">
            Agenda tu hora
          </h1>
          <p className="text-black/50 text-[15px] max-w-md mx-auto leading-relaxed">
            Elige el día y horario que más te acomode. Llegamos a medir o instalar tus cortinas donde estés.
          </p>
        </div>

        {/* Tarjetas informativas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="bg-[#FFF8E1] rounded-[18px] border border-[#E9A800]/20 p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E9A800]/20 flex items-center justify-center flex-shrink-0 text-lg">
              📐
            </div>
            <div>
              <p className="font-semibold text-[#7A5500] text-[14px]">Rectificación</p>
              <p className="text-[12px] text-[#7A5500]/70 mt-0.5 leading-relaxed">
                Medición profesional en tu hogar. Disponible lunes a viernes.
              </p>
            </div>
          </div>
          <div className="bg-[#E8F5EE] rounded-[18px] border border-[#2E7D52]/15 p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2E7D52]/15 flex items-center justify-center flex-shrink-0 text-lg">
              🔧
            </div>
            <div>
              <p className="font-semibold text-[#1A4D32] text-[14px]">Instalación</p>
              <p className="text-[12px] text-[#1A4D32]/70 mt-0.5 leading-relaxed">
                Instalación incluida en tu pedido. Disponible lunes a sábado.
              </p>
            </div>
          </div>
        </div>

        {/* Calendario — componente cliente */}
        <AgendarCalendar />
      </section>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/56963653017"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <FaWhatsapp size={28} className="text-white" />
        </div>
      </a>

      {/* Footer */}
      <footer className="mt-16 bg-[#413d3d] text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.4fr_auto_1fr] items-center gap-6 md:gap-8">
            <div className="flex justify-center h-[90px] items-center">
              <Image src="/images/BH.png" alt="Black Home" width={190} height={190} priority className="object-contain" />
            </div>
            <div className="hidden md:block h-28 w-px bg-[#D4B06A]/30" />
            <div className="flex justify-center">
              <div className="space-y-4">
                {[
                  { I: Phone,  t: "+56 9 3400 7366" },
                  { I: Mail,   t: "contacto@blackhome.cl" },
                  { I: MapPin, t: "Santiago, Chile" },
                ].map(({ I, t }) => (
                  <div key={t} className="flex items-center gap-4">
                    <I size={18} className="text-[#D4B06A]" />
                    <span className="text-base">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block h-28 w-px bg-[#D4B06A]/30" />
            <div className="flex flex-col items-center">
              <h3 className="text-[#D4B06A] font-semibold text-xl md:text-2xl mb-4 tracking-wide">SÍGUENOS</h3>
              <div className="flex gap-4">
                {[
                  { h: "#",                   i: <FaInstagram size={18} /> },
                  { h: "#",                   i: <FaFacebookF size={18} /> },
                  { h: "tel:+56963653017",    i: <Phone size={18} /> },
                ].map(({ h, i }, idx) => (
                  <a key={idx} href={h}
                    className="w-12 h-12 rounded-full border border-[#D4B06A] text-[#D4B06A] flex items-center justify-center hover:bg-[#D4B06A]/10 transition-all duration-300">
                    {i}
                  </a>
                ))}
              </div>
            </div>
          </div>
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

// components/Footer.tsx

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
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
  );
}
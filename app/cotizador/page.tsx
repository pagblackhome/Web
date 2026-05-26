"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Item = {
  type: string;
  qty: number;
  width: number;
  height: number;
  pricePerM2: number;
};

const regiones = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Región Metropolitana",
  "O’Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes",
];

const comunas: Record<string, string[]> = {
  "Arica y Parinacota": [
    "Arica",
    "Camarones",
    "Putre",
    "General Lagos",
  ],

  Tarapacá: [
    "Iquique",
    "Alto Hospicio",
    "Pozo Almonte",
    "Pica",
    "Huara",
    "Camiña",
    "Colchane",
  ],

  Antofagasta: [
    "Antofagasta",
    "Mejillones",
    "Sierra Gorda",
    "Taltal",
    "Calama",
    "Ollagüe",
    "San Pedro de Atacama",
    "Tocopilla",
    "María Elena",
  ],

  Atacama: [
    "Copiapó",
    "Caldera",
    "Tierra Amarilla",
    "Chañaral",
    "Diego de Almagro",
    "Vallenar",
    "Freirina",
    "Huasco",
  ],

  Coquimbo: [
    "La Serena",
    "Coquimbo",
    "Andacollo",
    "Paihuano",
    "Vicuña",
    "Ovalle",
    "Monte Patria",
    "Punitaqui",
    "Combarbalá",
    "Illapel",
    "Los Vilos",
    "Salamanca",
  ],

  Valparaíso: [
    "Valparaíso",
    "Viña del Mar",
    "Quilpué",
    "Villa Alemana",
    "Concón",
    "San Antonio",
    "Quillota",
    "La Calera",
    "Casablanca",
    "Cartagena",
  ],

  "Región Metropolitana": [
    "Santiago",
    "Providencia",
    "Las Condes",
    "Vitacura",
    "Ñuñoa",
    "La Reina",
    "Maipú",
    "Puente Alto",
    "San Bernardo",
    "La Florida",
    "Peñalolén",
    "Recoleta",
    "Independencia",
    "Estación Central",
    "Huechuraba",
    "Lo Barnechea",
    "Quilicura",
    "Pudahuel",
    "Macul",
    "San Miguel",
  ],

  "O’Higgins": [
    "Rancagua",
    "Machalí",
    "San Fernando",
    "Santa Cruz",
    "Pichilemu",
  ],

  Maule: [
    "Talca",
    "Curicó",
    "Linares",
    "Constitución",
    "Parral",
  ],

  Ñuble: [
    "Chillán",
    "San Carlos",
    "Bulnes",
    "Yungay",
  ],

  Biobío: [
    "Concepción",
    "Talcahuano",
    "San Pedro de la Paz",
    "Chiguayante",
    "Los Ángeles",
    "Coronel",
    "Lota",
  ],

  "La Araucanía": [
    "Temuco",
    "Villarrica",
    "Pucón",
    "Angol",
    "Padre Las Casas",
  ],

  "Los Ríos": [
    "Valdivia",
    "La Unión",
    "Panguipulli",
  ],

  "Los Lagos": [
    "Puerto Montt",
    "Puerto Varas",
    "Osorno",
    "Castro",
  ],

  Aysén: [
    "Coyhaique",
    "Puerto Aysén",
  ],

  Magallanes: [
    "Punta Arenas",
    "Puerto Natales",
    "Porvenir",
  ],
};

export default function Cotizador() {
  const [items, setItems] = useState<Item[]>([]);

  const [form, setForm] = useState<Item>({
    type: "Blackout",
    qty: 1,
    width: 0,
    height: 0,
    pricePerM2: 0,
  });

  const [client, setClient] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    region: "",
    comuna: "",
  });

  const addItem = () => {
    setItems([...items, form]);

    setForm({
      type: "Blackout",
      qty: 1,
      width: 0,
      height: 0,
      pricePerM2: 0,
    });
  };

  const area = (i: Item) => i.width * i.height;

  const subtotal = (i: Item) =>
    area(i) * i.pricePerM2 * i.qty;

  const total = items.reduce(
    (acc, i) => acc + subtotal(i),
    0
  );

  const sendQuote = async () => {
    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client,
          items,
          total,
        }),
      });

      if (response.ok) {
        alert("Cotización enviada correctamente");
      } else {
        alert("Error al enviar cotización");
      }
    } catch (error) {
      console.error(error);
      alert("Error al enviar");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-black overflow-hidden relative">

      {/* FONDO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 left-0 w-[260px] h-[500px] bg-[#d54a2c] rounded-br-[120px] opacity-90" />

        <div className="absolute top-[120px] right-[8%] w-[260px] h-[260px] border-[70px] border-[#f0b233] rounded-full" />

        <div className="absolute top-[70px] right-[15%] w-[120px] h-[60px] bg-[#1d7ed6] rounded-md rotate-6" />

        <div className="absolute top-0 right-0 w-[90px] h-[320px] bg-[#7caf6f] rounded-bl-[60px]" />

        <div className="absolute bottom-[180px] right-0 w-[260px] h-[260px] bg-[#b8c8b0] rounded-tl-[120px] opacity-70" />

        <div className="absolute top-[80px] left-[45%] w-[400px] h-[400px] bg-[#ebe4db] rounded-full opacity-80" />

      </div>

      {/* HEADER */}
     <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 h-20">
  <div className="max-w-7xl mx-auto flex justify-between items-center pl-2 pr-6 md:pl-4 md:pr-10 h-full">  

<Link href="/" className="flex items-center gap-2">

  <Image
    src="/images/BH.png"
    alt="Black Home Logo"
    width={120}
    height={120}
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

</Link>
          <nav className="hidden md:flex gap-10 text-sm text-white font-medium">

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

            <Link
              href="/cotizador"
              className="relative pb-2"
            >

              Cotizador

              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />

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

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 pt-36 pb-16">

        {/* CONTAINER GLOBAL */}
        <div className="bg-white/75 backdrop-blur-xl border border-white/40 rounded-[40px] shadow-[0_10px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">

          {/* TITULO */}
          <div className="text-center mb-10">

            <p className="text-[11px] tracking-[0.30em] uppercase text-[#c6a77b] font-semibold mb-3">
              BLACK HOME
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cotizador
            </h1>

            <p className="text-gray-500 text-sm md:text-base">
              Completa tus datos y calcula tu cotización personalizada
            </p>

          </div>

          {/* DATOS CLIENTE */}
          <div className="bg-white rounded-[30px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-black/5 mb-6">

            <h2 className="text-[22px] font-semibold mb-5 text-[#c6a77b]">
              Datos del cliente
            </h2>

            <div className="grid md:grid-cols-2 gap-3">

              <input
                placeholder="Nombre"
                className="border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setClient({
                    ...client,
                    name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Apellidos"
                className="border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setClient({
                    ...client,
                    lastname: e.target.value,
                  })
                }
              />

              <input
                placeholder="Teléfono"
                className="border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setClient({
                    ...client,
                    phone: e.target.value,
                  })
                }
              />

              <input
                placeholder="Correo"
                className="border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setClient({
                    ...client,
                    email: e.target.value,
                  })
                }
              />

              <input
                placeholder="Dirección"
                className="border border-gray-200 rounded-xl p-3 text-sm outline-none md:col-span-2 focus:border-black/30"
                onChange={(e) =>
                  setClient({
                    ...client,
                    address: e.target.value,
                  })
                }
              />

              <select
                className="border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setClient({
                    ...client,
                    region: e.target.value,
                    comuna: "",
                  })
                }
              >

                <option>Selecciona región</option>

                {regiones.map((r) => (
                  <option key={r}>{r}</option>
                ))}

              </select>

              <select
                className="border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setClient({
                    ...client,
                    comuna: e.target.value,
                  })
                }
              >

                <option>Selecciona comuna</option>

                {comunas[client.region]?.map((c) => (
                  <option key={c}>{c}</option>
                ))}

              </select>

            </div>

          </div>

          {/* CORTINAS */}
          <div className="bg-white rounded-[30px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-black/5 mb-6">

            <h2 className="text-[22px] font-semibold mb-5 text-[#c6a77b]">
              Cotiza tus cortinas
            </h2>

            <div className="space-y-3">

              <select
                value={form.type}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
              >
                <option>Blackout</option>
                <option>Duo</option>
                <option>Sunscreen</option>
                <option>Vertical</option>
              </select>

              <input
                type="number"
                placeholder="Cantidad"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setForm({
                    ...form,
                    qty: Number(e.target.value),
                  })
                }
              />

              <div className="grid grid-cols-2 gap-3">

                <input
                  type="number"
                  placeholder="Ancho (m)"
                  className="border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      width: Number(e.target.value),
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Alto (m)"
                  className="border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      height: Number(e.target.value),
                    })
                  }
                />

              </div>

              <input
                type="number"
                placeholder="Precio por m²"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black/30"
                onChange={(e) =>
                  setForm({
                    ...form,
                    pricePerM2: Number(e.target.value),
                  })
                }
              />

              <button
                onClick={addItem}
                className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 transition"
              >
                Agregar cortina
              </button>

            </div>

          </div>

          {/* RESUMEN */}
          <div className="bg-white rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-black/5 overflow-hidden">

            <div className="p-5 border-b border-gray-100">

              <h2 className="text-[22px] font-semibold text-[#c6a77b]">
                Resumen cotización
              </h2>

            </div>

            {items.length === 0 ? (

              <div className="p-6 text-center text-gray-500 text-sm">
                Aún no agregas cortinas a la cotización
              </div>

            ) : (

              items.map((i, idx) => (

                <div
                  key={idx}
                  className="p-5 border-b border-gray-100 flex justify-between items-center"
                >

                  <div>

                    <p className="font-semibold">
                      {i.type}
                    </p>

                    <p className="text-gray-500 text-xs">
                      {i.qty} unidad · {area(i).toFixed(2)} m²
                    </p>

                  </div>

                  <p className="font-bold text-lg">
                    ${subtotal(i).toLocaleString("es-CL")}
                  </p>

                </div>

              ))

            )}

            <div className="p-5">

              <div className="text-right text-2xl font-bold mb-4">
                Total: ${total.toLocaleString("es-CL")}
              </div>

              <button
                onClick={sendQuote}
                className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-neutral-800 transition"
              >
                Enviar cotización
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white py-14 px-6 relative z-10">

        <div className="max-w-5xl mx-auto text-center text-sm text-gray-400">

          <p className="text-white text-lg font-bold mb-3">
            BLACK HOME
          </p>

          <p>
            📍 Santiago · ✉️ contacto@blackhome.cl · 📞 +56 9 3400 7366
          </p>

          <p className="mt-5 text-gray-500">
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

    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Item = {
  type: string;
  qty: number;
  width: number;
  height: number;
};

const curtainPrices: Record<string, number> = {
  Blackout: 24000,
  Sunscreen: 25000,
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
};

export default function Cotizador() {
  const [items, setItems] = useState<Item[]>([]);

  const [form, setForm] = useState<Item>({
    type: "Blackout",
    qty: 1,
    width: 0,
    height: 0,
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
    });
  };

  const area = (i: Item) => i.width * i.height;

  const subtotal = (i: Item) => {
    const price = curtainPrices[i.type] || 0;
    return area(i) * price * i.qty;
  };

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

        <div className="absolute top-0 left-0 w-[300px] h-[600px] bg-[#d54a2c] rounded-br-[140px] opacity-80" />

        <div className="absolute top-20 right-10 w-[280px] h-[280px] border-[70px] border-[#f0b233] rounded-full opacity-70" />

        <div className="absolute top-[35%] left-[-80px] w-[250px] h-[250px] bg-[#7caf6f] rounded-full blur-3xl opacity-40" />

        <div className="absolute bottom-[10%] right-[-60px] w-[320px] h-[320px] bg-[#1d7ed6] rounded-full blur-3xl opacity-20" />

        <div className="absolute top-[65%] left-[35%] w-[450px] h-[450px] bg-[#ebe4db] rounded-full opacity-60" />

      </div>

      {/* HEADER */}

      <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 h-20">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 h-full">

          <Link href="/" className="flex items-center gap-3">

            <Image
              src="/images/BH.png"
              alt="Black Home Logo"
              width={110}
              height={110}
              priority
              className="object-contain"
            />

            <div>

              <h1 className="text-white text-xl md:text-2xl font-semibold tracking-[0.18em]">
                BLACK HOME
              </h1>

              <p className="text-white/50 text-[10px] tracking-[0.35em]">
                DISEÑO Y DECORACIÓN
              </p>

            </div>

          </Link>

        </div>

      </header>

      {/* CONTENIDO */}

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-28 pb-16">

        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] border border-white shadow-[0_20px_80px_rgba(0,0,0,0.12)] p-5 md:p-8">

          <div className="text-center mb-10">

            <p className="text-[11px] tracking-[0.30em] uppercase text-[#c6a77b] font-semibold mb-3">
              BLACK HOME
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cotizador
            </h1>

            <p className="text-gray-500">
              Completa tus datos y calcula tu cotización personalizada
            </p>

          </div>

          {/* DATOS CLIENTE */}

          <div className="bg-white rounded-[24px] p-6 shadow-xl border border-black/5 mb-6">

            <h2 className="text-xl md:text-2xl font-semibold mb-5 text-[#c6a77b]">
              Datos del cliente
            </h2>

            <div className="grid md:grid-cols-2 gap-3">

              <input
                placeholder="Nombre"
                className="border border-gray-200 rounded-xl p-3"
                onChange={(e) =>
                  setClient({
                    ...client,
                    name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Apellidos"
                className="border border-gray-200 rounded-xl p-3"
                onChange={(e) =>
                  setClient({
                    ...client,
                    lastname: e.target.value,
                  })
                }
              />

              <input
                placeholder="Teléfono"
                className="border border-gray-200 rounded-xl p-3"
                onChange={(e) =>
                  setClient({
                    ...client,
                    phone: e.target.value,
                  })
                }
              />

              <input
                placeholder="Correo"
                className="border border-gray-200 rounded-xl p-3"
                onChange={(e) =>
                  setClient({
                    ...client,
                    email: e.target.value,
                  })
                }
              />
                            <input
                placeholder="Dirección"
                className="border border-gray-200 rounded-xl p-3 md:col-span-2"
                onChange={(e) =>
                  setClient({
                    ...client,
                    address: e.target.value,
                  })
                }
              />

              <select
                className="border border-gray-200 rounded-xl p-3"
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
                className="border border-gray-200 rounded-xl p-3"
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

          <div className="bg-white rounded-[24px] p-6 shadow-xl border border-black/5 mb-6">

            <h2 className="text-xl md:text-2xl font-semibold mb-5 text-[#c6a77b]">
              Cotiza tus cortinas
            </h2>

            <div className="space-y-3">

              <select
                value={form.type}
                className="w-full border border-gray-200 rounded-xl p-3"
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
              >
                <option>Blackout</option>
                <option>Sunscreen</option>
                <option>Duo</option>
                <option>Vertical</option>
              </select>

              <input
                type="number"
                placeholder="Cantidad"
                className="w-full border border-gray-200 rounded-xl p-3"
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
                  className="border border-gray-200 rounded-xl p-3"
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
                  className="border border-gray-200 rounded-xl p-3"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      height: Number(e.target.value),
                    })
                  }
                />

              </div>

              <div className="text-sm text-gray-500 bg-[#f8f8f8] p-4 rounded-xl">

                {form.type === "Blackout" &&
                  "Precio automático: $24.000 por m²"}

                {form.type === "Sunscreen" &&
                  "Precio automático: $25.000 por m²"}

                {form.type === "Duo" &&
                  "Solicitar cotización personalizada"}

                {form.type === "Vertical" &&
                  "Solicitar cotización personalizada"}

              </div>

              <button
                onClick={addItem}
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-neutral-800 transition"
              >
                Agregar cortina
              </button>

            </div>

          </div>

          {/* RESUMEN */}

          <div className="bg-white rounded-[24px] shadow-xl border border-black/5 overflow-hidden">

            <div className="p-5 border-b border-gray-100">

              <h2 className="text-xl md:text-2xl font-semibold text-[#c6a77b]">
                Resumen cotización
              </h2>

            </div>

            {items.length === 0 ? (

              <div className="p-8 text-center text-gray-500">
                Aún no agregas productos
              </div>

            ) : (

              items.map((i, idx) => (

                <div
                  key={idx}
                  className="p-4 border-b border-gray-100 flex justify-between items-center"
                >

                  <div>

                    <p className="font-semibold">
                      {i.type}
                    </p>

                    <p className="text-xs text-gray-500">
                      {i.qty} unidad · {area(i).toFixed(2)} m²
                    </p>

                  </div>

                  <p className="font-bold">
                    $
                    {subtotal(i).toLocaleString("es-CL")}
                  </p>

                </div>

              ))

            )}

            <div className="p-6">

              <div className="flex justify-between items-center mb-5">

                <span className="text-gray-500">
                  Total estimado
                </span>

                <span className="text-2xl font-bold">
                  $
                  {total.toLocaleString("es-CL")}
                </span>

              </div>

              <button
                onClick={sendQuote}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-neutral-800 transition"
              >
                Solicitar Cotización
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="bg-black text-white py-14 px-6 relative z-10 mt-20">

        <div className="max-w-5xl mx-auto text-center">

          <p className="text-2xl font-bold mb-3">
            BLACK HOME
          </p>

          <p className="text-gray-400">
            Diseño y Decoración
          </p>

          <p className="mt-4 text-gray-500">
            📞 +56 9 3400 7366
          </p>

          <p className="text-gray-500">
            contacto@blackhome.cl
          </p>

          <p className="mt-8 text-gray-600 text-sm">
            © 2026 Black Home. Todos los derechos reservados.
          </p>

        </div>

      </footer>

      {/* WHATSAPP */}

      <a
        href="https://wa.me/56934007366"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
      >

        <div className="flex items-center gap-3 bg-[#25D366] px-5 py-3 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-all">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            className="w-7 h-7"
          >
            <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 3.122.904 6.034 2.463 8.49L0 32l7.336-2.414a15.94 15.94 0 0 0 8.664 2.543c8.836 0 16-7.164 16-16S24.836.396 16 .396z"/>
          </svg>

          <span className="hidden md:block text-white font-semibold">
            WhatsApp
          </span>

        </div>

      </a>

    </div>
  );
}
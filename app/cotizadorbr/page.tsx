"use client";
import { Menu } from "lucide-react";
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
type Item = {
  type: string;
  model: string;
  color: string;
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
const [menuOpen, setMenuOpen] = useState(false);

const [form, setForm] = useState<Item>({
  type: "Blackout",
  model: "Modelo 1",
  color: "Color 1",
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
  if (
    form.qty <= 0 ||
    form.width <= 0 ||
    form.height <= 0
  ) {
    alert(
      "Debes ingresar cantidad, ancho y alto mayores a 0"
    );
    return;
  }

  setItems((prev) => [...prev, form]);

  setForm({
    type: "Blackout",
    model: "Modelo 1",
    color: "Color 1",
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
    if (!client.name.trim()) {
  alert("Debes ingresar tu nombre");
  return;
}

if (!client.lastname.trim()) {
  alert("Debes ingresar tus apellidos");
  return;
}

if (!client.phone.trim()) {
  alert("Debes ingresar tu teléfono");
  return;
}

if (!client.email.trim()) {
  alert("Debes ingresar tu correo");
  return;
}

if (!client.address.trim()) {
  alert("Debes ingresar tu dirección");
  return;
}

if (!client.region) {
  alert("Debes seleccionar una región");
  return;
}

if (!client.comuna) {
  alert("Debes seleccionar una comuna");
  return;
}

if (items.length === 0) {
  alert("Debes agregar al menos una cortina");
  return;
}
    try {
      console.log({
  client,
  items,
  total,
});
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

{/* FONDO general */}
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-black overflow-x-hidden relative">

      {/* FONDO */}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#c6a77b]/10 blur-[180px]" />

        <div className="absolute top-0 left-0 w-[300px] h-[600px] bg-[#d54a2c] rounded-br-[140px] opacity-80" />

        <div className="absolute top-20 right-10 w-[280px] h-[280px] border-[70px] border-[#f0b233] rounded-full opacity-20 -z-10" />

        <div className="absolute top-[35%] left-[-80px] w-[250px] h-[250px] bg-[#7caf6f] rounded-full blur-3xl opacity-40" />

        <div className="absolute bottom-[10%] right-[-60px] w-[320px] h-[320px] bg-[#1d7ed6] rounded-full blur-3xl opacity-20" />

        

      </div>

      {/* HEADER */}

      <header
  className="
  fixed top-0 left-0 w-full z-50
  bg-[rgba(8,8,8,0.92)]
  backdrop-blur-2xl
  border-b border-[#c6a77b]/10
  shadow-[0_10px_40px_rgba(0,0,0,0.45)]
  h-20
"
>
  <div className="max-w-7xl mx-auto h-full px-6">

    <div className="flex justify-between items-center h-full">

    <Link
  href="/"
  className="flex items-center gap-0"
>

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

  <div className="hidden md:block">

    <h1
      className="
      text-white
      text-2xl
      font-light
      tracking-wide
      leading-none
      "
    >
      Black
      <span className="text-[#d54a2c]">
        Home
      </span>
    </h1>

    <p
      className="
      text-[#9a9a9a]
      text-xs
      tracking-[0.35em]
      uppercase
      mt-1
      "
    >
      Diseño y Decoración
    </p>

  </div>

</Link>

      <nav className="hidden lg:flex items-center gap-14">

        {[
          ["Inicio", "/"],
          ["Productos", "/productos"],
          ["Cotizador", "/cotizador"],
          ["Arregla tu Cortina", "/reparacion"],
          ["Contacto", "/contacto"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="
            relative
            text-white
            text-[15px]
            tracking-wide
            font-medium
            transition-all
            duration-300
            hover:text-[#f1d39a]
            after:absolute
            after:left-0
            after:-bottom-2
            after:h-[2px]
            after:w-0
            after:bg-[#c6a77b]
            after:transition-all
            after:duration-300
            hover:after:w-full
            "
          >
            {label}
          </Link>
        ))}

      </nav>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden text-white"
      >
        <Menu size={30} />
      </button>

    </div>

  </div>
</header>
     {
  menuOpen && (
    <div
      className="
      fixed
      top-20
      left-0
      w-full
      bg-[#0a0a0a]
      backdrop-blur-xl
      border-b border-[#c6a77b]/10
      z-40
      lg:hidden
      "
    >
      <div className="flex flex-col p-6">

        {[
          ["Inicio", "/"],
          ["Productos", "/productos"],
          ["Cotizador", "/cotizador"],
          ["Arregla tu Cortina", "/reparacion"],
          ["Contacto", "/contacto"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="
            py-4
            text-white
            border-b
            border-[#1b1b1b]
            hover:text-[#c6a77b]
            transition-all
            "
          >
            {label}
          </Link>
        ))}

      </div>
    </div>
  )
}

      {/* CONTENIDO */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">

        <div
className="
bg-[#f5f1eb]
rounded-[40px]
border-2 border-[#c6a77b]
shadow-[0_0_40px_rgba(198,167,123,0.35)]
overflow-hidden
px-6 md:px-10
pb-10
"
>

          <div className="h-2 bg-[#c6a77b]" />
          <div className="text-center mb-10 p-4 md:p-10">

            <p className="text-[11px] tracking-[0.30em] uppercase text-[#c6a77b] font-semibold mb-3">
              BLACK HOME
            </p>

             <h1 className="text-5xl font-bold mb-4 tracking-tight text-[#111]">
  Cotiza tus Cortinas
</h1>
<p className="text-gray-600 text-lg">
  Cortinas a medida con la mejor calidad, diseño e instalación profesional.
</p>
<div className="flex justify-center mt-8">
  <div className="w-32 h-[2px] bg-[#c6a77b]" />
</div>

            {/*<p className="text-gray-500">
              Completa tus datos y calcula tu cotización personalizada
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
  Blackout, Sunscreen, Duo y Verticales fabricadas a medida para tu hogar.
</p>*/}
</div>
        <div className="grid lg:grid-cols-2 gap-4 mb-6">

     {/* DATOS CLIENTE */}

{/* DATOS CLIENTE */}

<div className="bg-white backdrop-blur-md rounded-[28px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white mb-6">

  <div className="mb-6">

    <div className="flex items-center gap-3">

      <div className="bg-[#c6a77b]/15 p-2 rounded-xl">
        <User className="w-5 h-5 text-[#c6a77b]" />
      </div>

      <div>
        <h2 className="text-lg md:text-xl font-semibold text-[#c6a77b]">
          Datos del Cliente
        </h2>

        <p className="text-xs text-gray-500">
          Completa la información para recibir tu cotización.
        </p>
      </div>

    </div>

    <div className="mt-3 h-[2px] w-24 bg-[#c6a77b] rounded-full" />

  </div>
<div
  className="
  flex
  items-start
  gap-3
  bg-[#fff8ef]
  border
  border-[#e8d6b8]
  rounded-2xl
  p-4
  mt-4
  mb-6
  "
>
  <Info
    size={18}
    className="text-[#c6a77b] mt-0.5 flex-shrink-0"
  />

  <div>
    <p className="text-sm font-semibold text-[#8b6c42]">
      Información importante
    </p>

    <p className="text-xs text-[#7a7a7a] leading-relaxed">
      Estos datos son obligatorios para poder realizar la cotización
      y permitir que nuestro equipo pueda contactarte correctamente.
    </p>
  </div>
</div>
  <div className="grid md:grid-cols-2 gap-4">

    {/* NOMBRE */}

    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <User size={15} className="text-[#c6a77b]" />
        Nombre
        <span className="text-[#c6a77b]">*</span>
      </label>

      <input
        className="w-full border border-[#e4ddd3] rounded-xl p-3 bg-white"
        onChange={(e) =>
          setClient({
            ...client,
            name: e.target.value,
          })
        }
      />
    </div>

    {/* APELLIDOS */}

    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <User size={15} className="text-[#c6a77b]" />
        Apellidos
        <span className="text-[#c6a77b]">*</span>
      </label>

      <input
        className="w-full border border-[#e4ddd3] rounded-xl p-3 bg-white"
        onChange={(e) =>
          setClient({
            ...client,
            lastname: e.target.value,
          })
        }
      />
    </div>

    {/* TELEFONO */}

    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <Phone size={15} className="text-[#c6a77b]" />
        Teléfono
        <span className="text-[#c6a77b]">*</span>
      </label>

      <input
        className="w-full border border-[#e4ddd3] rounded-xl p-3 bg-white"
        onChange={(e) =>
          setClient({
            ...client,
            phone: e.target.value,
          })
        }
      />
    </div>

    {/* EMAIL */}

    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <Mail size={15} className="text-[#c6a77b]" />
        Correo Electrónico
        <span className="text-[#c6a77b]">*</span>
      </label>

      <input
        type="email"
        className="w-full border border-[#e4ddd3] rounded-xl p-3 bg-white"
        onChange={(e) =>
          setClient({
            ...client,
            email: e.target.value,
          })
        }
      />
    </div>

    {/* DIRECCION */}

    <div className="md:col-span-2">
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <MapPin size={15} className="text-[#c6a77b]" />
        Dirección
      </label>

      <input
        className="w-full border border-[#e4ddd3] rounded-xl p-3 bg-white"
        onChange={(e) =>
          setClient({
            ...client,
            address: e.target.value,
          })
        }
      />
    </div>

    {/* REGION */}

    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <Map size={15} className="text-[#c6a77b]" />
        Región
      </label>

      <select
        className="w-full border border-[#e4ddd3] rounded-xl p-3 bg-white"
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
    </div>

    {/* COMUNA */}

    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <Building2 size={15} className="text-[#c6a77b]" />
        Comuna
      </label>

      <select
        className="w-full border border-[#e4ddd3] rounded-xl p-3 bg-white"
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

</div>

          {/* CORTINAS */}

          {/* CORTINAS */}

<div className="bg-white backdrop-blur-md rounded-[28px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white mb-6">

  <div className="mb-6">

    <div className="flex items-center gap-3">

      <div className="bg-[#c6a77b]/15 p-2 rounded-xl">
        <Blinds className="w-5 h-5 text-[#c6a77b]" />
      </div>

      <div>
        <h2 className="text-lg md:text-xl font-semibold text-[#c6a77b]">
          Cotiza tus Cortinas
        </h2>

        <p className="text-xs text-gray-500">
          Selecciona el tipo, cantidad y medidas.
        </p>
      </div>

    </div>

    <div className="mt-3 h-[2px] w-24 bg-[#c6a77b] rounded-full" />

  </div>

  <div className="space-y-4">

    <select
      value={form.type}
      className="w-full border border-[#e4ddd3] rounded-xl p-3"
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

    <select
      value={form.model}
      className="w-full border border-[#e4ddd3] rounded-xl p-3"
      onChange={(e) =>
        setForm({
          ...form,
          model: e.target.value,
        })
      }
    >
      <option>Modelo 1</option>
      <option>Modelo 2</option>
      <option>Modelo 3</option>
    </select>

    <select
      value={form.color}
      className="w-full border border-[#e4ddd3] rounded-xl p-3"
      onChange={(e) =>
        setForm({
          ...form,
          color: e.target.value,
        })
      }
    >
      <option>Color 1</option>
      <option>Color 2</option>
      <option>Color 3</option>
    </select>

    <input
      type="number"
      placeholder="Cantidad"
      className="w-full border border-[#e4ddd3] rounded-xl p-3"
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
        className="border border-[#e4ddd3] rounded-xl p-3"
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
        className="border border-[#e4ddd3] rounded-xl p-3"
        onChange={(e) =>
          setForm({
            ...form,
            height: Number(e.target.value),
          })
        }
      />

    </div>

    <div className="flex gap-3 bg-[#fff8ef] border border-[#ead8b7] rounded-2xl p-4">

      <Info
        size={18}
        className="text-[#c6a77b] flex-shrink-0 mt-0.5"
      />

      <div>

        <p className="text-sm font-semibold text-[#8b6c42]">
          Medidas aproximadas
        </p>

        <p className="text-xs text-gray-500">
          Ingresa las medidas en metros.
          Nuestro equipo verificará las medidas
          antes de fabricar e instalar.
        </p>

      </div>

    </div>

    <div className="bg-[#faf7f2] border border-[#eadfce] rounded-2xl p-4">

      <div className="flex items-center gap-2 mb-2">

        <Receipt
          size={16}
          className="text-[#c6a77b]"
        />

        <span className="text-sm font-semibold text-[#8b6c42]">
          Información de precio
        </span>

      </div>

      <div className="text-sm text-gray-500">

        {form.type === "Blackout" &&
          "Precio automático: $24.000 por m²"}

        {form.type === "Sunscreen" &&
          "Precio automático: $25.000 por m²"}

        {form.type === "Duo" &&
          "Solicitar cotización personalizada"}

        {form.type === "Vertical" &&
          "Solicitar cotización personalizada"}

      </div>

    </div>

    <button
      onClick={addItem}
      className="
      w-full
      flex
      items-center
      justify-center
      gap-2
      bg-gradient-to-r
      from-[#0a0a0a]
      via-[#111]
      to-[#2a2a2a]
      text-white
      py-3
      rounded-2xl
      font-semibold
      shadow-lg
      hover:scale-[1.01]
      transition-all
      "
    >
      <Plus size={18} />
      Agregar Cortina
    </button>

  </div>

</div>
</div>
          {/* RESUMEN */}

<div
className="
bg-white
rounded-[30px]
border border-[#e8dfd3]
shadow-[0_10px_30px_rgba(0,0,0,0.08)]
overflow-hidden
mt-8
"
>
            <div className="p-5 border-b border-gray-100">

              <div className="flex items-center gap-3">
  <div className="bg-[#c6a77b]/15 p-2 rounded-xl">
    <Receipt className="w-5 h-5 text-[#c6a77b]" />
  </div>

  <h2 className="text-lg md:text-xl font-semibold text-[#c6a77b]">
    Resumen cotización
  </h2>
</div>

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

            <div className="p-4">

              <div className="flex justify-between items-center mb-5 bg-[#f8f6f2] rounded-2xl p-5">

                <span className="text-gray-500">
                  Total estimado
                </span>

                <span className="text-3xl md:text-4xl font-bold text-[#c6a77b]">
                  $
                  {total.toLocaleString("es-CL")}
                </span>

              </div>

              <button
                onClick={sendQuote}
                className="w-full bg-gradient-to-r from-black to-neutral-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
              >
                Solicitar Cotización
              </button>

            </div>

          </div>

        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-12 px-6">
  <div className="grid md:grid-cols-3 gap-0 bg-[#0d0d0d] rounded-[28px] overflow-hidden border border-r border-[#252525]">

  <div className="flex items-center gap-4 p-6 border-r border-[#252525]">

  <div
    className="
    flex-shrink-0
    p-3
    rounded-2xl
    bg-[#151515]
    border border-[#c6a77b]/30
    shadow-[0_0_25px_rgba(198,167,123,0.25)]
    "
  >
    <ShieldCheck className="w-7 h-7 text-[#c6a77b]" />
  </div>

  <div>
    <h3 className="font-semibold text-white">
      Calidad Premium
    </h3>

    <p className="text-sm text-gray-400">
      Materiales seleccionados y fabricación a medida.
    </p>
  </div>

</div>

  <div className="flex items-center gap-4 p-6 border-r border-[#252525]">

  <div
    className="
    flex-shrink-0
    p-3
    rounded-2xl
    bg-[#151515]
    border border-[#c6a77b]/30
    shadow-[0_0_25px_rgba(198,167,123,0.25)]
    "
  >
    <Ruler className="w-7 h-7 text-[#c6a77b]" />
  </div>

  <div>
    <h3 className="font-semibold text-white">
      Medición Profesional
    </h3>

    <p className="text-sm text-gray-400">
      Asesoría especializada para obtener medidas exactas.
    </p>
  </div>

</div>

<div className="flex items-center gap-4 p-6">

  <div
    className="
    flex-shrink-0
    p-3
    rounded-2xl
    bg-[#151515]
    border border-[#c6a77b]/30
    shadow-[0_0_25px_rgba(198,167,123,0.25)]
    "
  >
    <Truck className="w-7 h-7 text-[#c6a77b]" />
  </div>

  <div>
    <h3 className="font-semibold text-white">
      Instalación
    </h3>

    <p className="text-sm text-gray-400">
      Instalación profesional para un acabado perfecto.
    </p>
  </div>

</div>
</div>
</div>
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

    </div>
  );
}
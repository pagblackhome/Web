"use client";

import Header from "../../../components/Header";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Camera,
  X, ZoomIn, ZoomOut,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  ShieldCheck, RotateCcw, Check, Move,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const colorVariants = [
  { id: "beige",  name: "Beige",  swatch: "#C8B89A", images: ["/images/20.jpg", "/images/25.jpg", "/images/33.jpg"] },
  { id: "gris",   name: "Gris",   swatch: "#9A9A9A", images: ["/images/25.jpg", "/images/33.jpg", "/images/20.jpg"] },
  { id: "blanco", name: "Blanco", swatch: "#F0EDE8", images: ["/images/33.jpg", "/images/20.jpg", "/images/25.jpg"] },
  { id: "negro",  name: "Negro",  swatch: "#2A2A2A", images: ["/images/20.jpg", "/images/33.jpg", "/images/25.jpg"] },
];

const baseProduct = {
  name: "Roller Duo",
  price: 25990,
  description:
    "La cortina Roller Duo combina elegancia, privacidad y control de luz para crear espacios modernos y sofisticados. Su diseño dual permite regular la entrada de luz de manera práctica y estética.",
  material: "Polyester Premium",
  opacity: "Semi Blackout",
  warranty: "12 meses",
  installation: "Incluida",
};

const relatedProducts = [
  { name: "Roller Blackout",  price: "$25.990", image: "/images/20.jpg" },
  { name: "Roller Screen",    price: "$25.990", image: "/images/25.jpg" },
  { name: "Roller Duo Gris",  price: "$25.990", image: "/images/33.jpg" },
  { name: "Roller Sunscreen", price: "$25.990", image: "/images/20.jpg" },
];

// ─────────────────────────────────────────────────────────────────────────────
// COLOR SELECTOR — usado UNA sola vez, posicionado condicionalmente via CSS
// ─────────────────────────────────────────────────────────────────────────────

function ColorSelector({ variants, selectedId, onSelect }) {
  const selected = variants.find(v => v.id === selectedId);
  return (
    <div className="bg-[#faf8f5] rounded-[20px] px-4 py-4 border border-black/5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold text-black/50 uppercase tracking-widest">Color</p>
        <span className="text-[13px] text-[#d65c34] font-semibold">{selected?.name}</span>
      </div>
      <div className="flex gap-3 flex-wrap">
        {variants.map((v) => {
          const active = v.id === selectedId;
          const isLight = parseInt(v.swatch.replace("#",""), 16) > 0xAAAAAA;
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              aria-label={`Color ${v.name}`}
              className="flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <div
                className={`w-10 h-10 rounded-full border-[2.5px] flex items-center justify-center shadow-sm transition-all duration-200 ${
                  active ? "border-black scale-110 shadow-md" : "border-transparent hover:border-black/20"
                }`}
                style={{ backgroundColor: v.swatch }}
              >
                {active && <Check size={13} strokeWidth={3} className={isLight ? "text-black/70" : "text-white"} />}
              </div>
              <span className={`text-[10px] transition-colors ${active ? "text-black font-semibold" : "text-black/40"}`}>
                {v.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSENT MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ConsentModal({ onAccept, onReject }) {
  return (
    <div className="fixed inset-0 z-[999999] bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center">
      {/* Sheet on mobile, centered card on desktop */}
      <div className="bg-[#f7f4ee] w-full sm:max-w-md sm:mx-4 sm:rounded-[32px] rounded-t-[32px] shadow-2xl overflow-hidden">

        <div className="bg-[#111] px-6 pt-6 pb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4B06A]/20 flex items-center justify-center flex-shrink-0">
            <Camera size={20} className="text-[#D4B06A]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-[17px]">Prueba virtual AR</h2>
            <p className="text-white/45 text-[12px] mt-0.5">Visualiza la cortina en tu ventana</p>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-start gap-3 mb-4 bg-emerald-50 rounded-2xl px-4 py-3 border border-emerald-100">
            <ShieldCheck size={17} className="text-emerald-600 mt-0.5 flex-shrink-0" />
            <p className="text-[13px] text-emerald-800 leading-relaxed">
              <strong>Sin grabación.</strong> La cámara se usa solo en tu dispositivo. Ninguna imagen es enviada a ningún servidor.
            </p>
          </div>

          <ul className="space-y-2 mb-5">
            {[
              "Cortina superpuesta en tiempo real",
              "Todo ocurre localmente en tu dispositivo",
              "Puedes cerrar en cualquier momento",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] text-black/65">
                <span className="w-4 h-4 rounded-full bg-[#d65c34]/15 text-[#d65c34] text-[9px] font-black flex items-center justify-center flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-[10.5px] text-black/35 leading-relaxed mb-5">
            Al continuar, aceptas el uso de la cámara conforme a la Ley 19.628 de Protección de Datos de Chile. El consentimiento es voluntario y revocable cerrando la herramienta.
          </p>

          <div className="flex gap-3">
            <button onClick={onReject} className="flex-1 h-12 rounded-2xl border border-black/12 text-black/55 text-[14px] hover:bg-black/5 transition">
              Cancelar
            </button>
            <button onClick={onAccept} className="flex-1 h-12 rounded-2xl bg-[#111] text-white text-[14px] font-semibold hover:bg-black transition flex items-center justify-center gap-2">
              <Camera size={16} />
              Activar cámara
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CURTAIN TRY-ON  — recibe SOLO images[0] del color activo
// ─────────────────────────────────────────────────────────────────────────────

function CurtainTryOn({ curtainImage, productName, onClose }) {
  const videoRef    = useRef(null);
  const streamRef   = useRef(null);
  const containerRef= useRef(null);
  const isDragging  = useRef(false);
  const dragStart   = useRef({ x:0, y:0, cx:0, cy:0 });

  const [step,     setStep]     = useState("consent");
  const [errorMsg, setErrorMsg] = useState("");
  const [cx, setCx] = useState(15);   // left %
  const [cy, setCy] = useState(5);    // top %
  const [cw, setCw] = useState(65);   // width %
  const [ch, setCh] = useState(88);   // height %
  const [opacity, setOpacity] = useState(88);

  const startCamera = useCallback(async () => {
    setStep("loading");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width:{ ideal:1280 }, height:{ ideal:720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      setStep("active");
    } catch (err) {
      setErrorMsg(
        err.name === "NotAllowedError" ? "Permiso denegado. Habilita la cámara en ajustes de tu navegador." :
        err.name === "NotFoundError"   ? "No se encontró cámara en este dispositivo." :
        "No se pudo acceder a la cámara."
      );
      setStep("error");
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    onClose?.();
  }, [onClose]);

  useEffect(() => () => { streamRef.current?.getTracks().forEach(t => t.stop()); }, []);

  // Drag
  const onPD = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, cx, cy };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPM = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragStart.current.x) / r.width)  * 100;
    const dy = ((e.clientY - dragStart.current.y) / r.height) * 100;
    setCx(Math.max(0, Math.min(100 - cw, dragStart.current.cx + dx)));
    setCy(Math.max(0, Math.min(100 - ch, dragStart.current.cy + dy)));
  };
  const onPU = () => { isDragging.current = false; };
  const reset = () => { setCx(15); setCy(5); setCw(65); setCh(88); setOpacity(88); };

  // ── LAYOUT ──────────────────────────────────────────────────────────────

  return (
    <>
      {step === "consent" && <ConsentModal onAccept={startCamera} onReject={onClose} />}

      {["loading","active","error"].includes(step) && (
        <div className="fixed inset-0 z-[999999] bg-[#0a0a0a] flex flex-col md:flex-row">

          {/* ── CAMERA PANEL ────────────────────────────────────────────── */}
          <div ref={containerRef} className="relative flex-1 overflow-hidden">

            {/* Loading spinner */}
            {step === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-11 h-11 border-2 border-white/15 border-t-white rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/50 text-sm">Iniciando cámara...</p>
                </div>
              </div>
            )}

            {/* Error */}
            {step === "error" && (
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="text-center max-w-xs">
                  <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                    <Camera size={26} className="text-red-400" />
                  </div>
                  <p className="text-white font-semibold mb-2">Error de cámara</p>
                  <p className="text-white/50 text-sm mb-5">{errorMsg}</p>
                  <button onClick={stopCamera} className="px-6 h-10 rounded-full bg-white text-black text-sm font-semibold">Cerrar</button>
                </div>
              </div>
            )}

            {/* Video */}
            <video
              ref={videoRef}
              playsInline muted
              className={`w-full h-full object-cover transition-opacity duration-500 ${step!=="active"?"opacity-0":"opacity-100"}`}
            />

            {/* Cortina draggable */}
            {step === "active" && (
              <div
                className="absolute cursor-grab active:cursor-grabbing select-none touch-none"
                style={{ left:`${cx}%`, top:`${cy}%`, width:`${cw}%`, height:`${ch}%`, opacity: opacity/100 }}
                onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}
              >
                <img src={curtainImage} alt={productName} className="w-full h-full object-cover rounded-xl pointer-events-none shadow-2xl" draggable={false} />
                {/* Corner markers */}
                {["tl","tr","bl","br"].map(c => (
                  <div key={c} className={`absolute w-5 h-5 border-2 border-white/70
                    ${c.includes("t")?"top-0":"bottom-0"} ${c.includes("l")?"left-0":"right-0"}
                    ${c==="tl"?"rounded-tl-lg":c==="tr"?"rounded-tr-lg":c==="bl"?"rounded-bl-lg":"rounded-br-lg"}
                    border-r-0 border-b-0 ${c.includes("r")?"border-l-0 border-r-2":""} ${c.includes("b")?"border-t-0 border-b-2":""}`}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/30 backdrop-blur-sm rounded-full p-2">
                    <Move size={18} className="text-white/60" />
                  </div>
                </div>
              </div>
            )}

            {/* Top-left badges */}
            {step === "active" && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-black/55 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <ShieldCheck size={11} className="text-emerald-400" />
                  <span className="text-white/80 text-[10px] font-medium">Sin grabación</span>
                </div>
                <div className="bg-black/55 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <span className="text-white/70 text-[10px]">{productName}</span>
                </div>
              </div>
            )}

            {/* Close — top right of camera */}
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition"
            >
              <X size={17} className="text-white" />
            </button>
          </div>

          {/* ── CONTROLS PANEL ──────────────────────────────────────────── */}
          {step === "active" && (
            <div className="
              bg-[#111] flex-shrink-0
              md:w-[260px] md:flex md:flex-col md:justify-between md:py-8 md:px-5 md:rounded-none
              px-4 pt-4 pb-6
            ">
              {/* Header — only desktop */}
              <div className="hidden md:block mb-6">
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Ajustes</p>
                <p className="text-white font-semibold text-[16px]">Posicionar cortina</p>
                <p className="text-white/40 text-[12px] mt-1">Arrastra sobre la imagen o usa los controles</p>
              </div>

              {/* Size row */}
              <div className="flex md:flex-col gap-3 md:gap-4 mb-3 md:mb-0">

                {/* Width */}
                <div className="flex-1">
                  <p className="text-white/40 text-[10px] mb-1.5 text-center md:text-left uppercase tracking-wider">Ancho</p>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button onClick={()=>setCw(w=>Math.max(10,w-5))} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition active:scale-90">
                      <ZoomOut size={15} className="text-white/70" />
                    </button>
                    <div className="flex-1 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                      <span className="text-white text-[13px] font-semibold tabular-nums">{Math.round(cw)}%</span>
                    </div>
                    <button onClick={()=>setCw(w=>Math.min(100,w+5))} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition active:scale-90">
                      <ZoomIn size={15} className="text-white/70" />
                    </button>
                  </div>
                </div>

                {/* Height */}
                <div className="flex-1">
                  <p className="text-white/40 text-[10px] mb-1.5 text-center md:text-left uppercase tracking-wider">Alto</p>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button onClick={()=>setCh(h=>Math.max(10,h-5))} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition active:scale-90">
                      <ChevronUp size={15} className="text-white/70" />
                    </button>
                    <div className="flex-1 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                      <span className="text-white text-[13px] font-semibold tabular-nums">{Math.round(ch)}%</span>
                    </div>
                    <button onClick={()=>setCh(h=>Math.min(100,h+5))} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition active:scale-90">
                      <ChevronDown size={15} className="text-white/70" />
                    </button>
                  </div>
                </div>

              </div>

              {/* D-pad — centrado, compacto */}
              <div className="flex justify-center my-3 md:my-5">
                <div className="grid grid-cols-3 gap-1.5" style={{width:116}}>
                  <span/>
                  <button onClick={()=>setCy(y=>Math.max(0,y-3))} className="w-[35px] h-[35px] rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition active:scale-90"><ChevronUp size={16} className="text-white/70"/></button>
                  <span/>
                  <button onClick={()=>setCx(x=>Math.max(0,x-3))} className="w-[35px] h-[35px] rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition active:scale-90"><ChevronLeft size={16} className="text-white/70"/></button>
                  <button onClick={reset} className="w-[35px] h-[35px] rounded-xl bg-white/12 hover:bg-white/20 flex items-center justify-center transition active:scale-90" title="Restablecer"><RotateCcw size={13} className="text-white/50"/></button>
                  <button onClick={()=>setCx(x=>Math.min(100-cw,x+3))} className="w-[35px] h-[35px] rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition active:scale-90"><ChevronRight size={16} className="text-white/70"/></button>
                  <span/>
                  <button onClick={()=>setCy(y=>Math.min(100-ch,y+3))} className="w-[35px] h-[35px] rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition active:scale-90"><ChevronDown size={16} className="text-white/70"/></button>
                  <span/>
                </div>
              </div>

              {/* Opacity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/40 text-[10px] uppercase tracking-wider">Opacidad</p>
                  <span className="text-white/60 text-[12px] tabular-nums">{opacity}%</span>
                </div>
                <input type="range" min="15" max="100" value={opacity} onChange={e=>setOpacity(Number(e.target.value))} className="w-full accent-[#D4B06A]" />
              </div>

              {/* Close — only visible in desktop panel */}
              <button
                onClick={stopCamera}
                className="hidden md:flex mt-6 w-full h-11 rounded-2xl border border-white/10 text-white/50 hover:border-white/20 hover:text-white/80 items-center justify-center gap-2 text-[13px] transition"
              >
                <X size={15} />
                Salir de prueba virtual
              </button>
            </div>
          )}

        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const [selectedColorId, setSelectedColorId] = useState(colorVariants[0].id);
  const [selectedImage,   setSelectedImage]   = useState(colorVariants[0].images[0]);
  const [showTryOn,       setShowTryOn]       = useState(false);
  const [width,    setWidth]    = useState("");
  const [height,   setHeight]   = useState("");
  const [quantity, setQuantity] = useState("");

  const selectedVariant = colorVariants.find(v => v.id === selectedColorId);
  const tryOnImage = selectedVariant?.images[0] ?? "";   // ← SIEMPRE solo images[0]

  const handleColorSelect = (id) => {
    setSelectedColorId(id);
    const v = colorVariants.find(c => c.id === id);
    if (v) setSelectedImage(v.images[0]);
  };

  const total = Number(width||0) * Number(height||0) * Number(quantity||0) * 25990;
  const fullName = `${baseProduct.name} ${selectedVariant?.name || ""}`;

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-black overflow-x-hidden relative">
      <Header />

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[200px] md:w-[260px] h-[200px] md:h-[260px] bg-[#f1b24f]/30 rounded-bl-[120px]" />
        <div className="absolute top-[200px] left-0 w-[80px] md:w-[120px] h-[200px] md:h-[300px] bg-[#d65c34]/20 rounded-tr-[100px]" />
        <div className="absolute bottom-[250px] right-0 w-[160px] md:w-[240px] h-[160px] md:h-[240px] bg-[#6e8d63]/20 rounded-tl-[120px]" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[28px] md:rounded-[45px] shadow-[0_10px_60px_rgba(0,0,0,0.08)] p-4 sm:p-6 md:p-8">

          {/* ── TOP GRID ── */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">

            {/* LEFT: Images + Color + Try-on button */}
            <div>
              {/* Main image */}
              <div className="relative overflow-hidden rounded-[20px] md:rounded-[35px] shadow-xl bg-white group">
                <Image
                  src={selectedImage}
                  alt={fullName}
                  width={900} height={900}
                  priority
                  className="w-full h-[300px] sm:h-[420px] md:h-[520px] object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-black/55 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <Camera size={12} className="text-[#D4B06A]" />
                  <span className="text-white text-[10px] font-medium tracking-wide">Vista AR</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2.5 mt-3">
                {selectedVariant?.images.map((img, i) => (
                  <button
                    key={img+i}
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-[14px] overflow-hidden border-2 transition duration-300 ${
                      selectedImage === img ? "border-black scale-105 shadow-md" : "border-transparent opacity-55 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Miniatura" width={88} height={88} className="w-[68px] h-[68px] md:w-[84px] md:h-[84px] object-cover" />
                  </button>
                ))}
              </div>

              {/* Try-on button */}
              <button
                onClick={() => setShowTryOn(true)}
                className="mt-4 w-full h-12 rounded-[18px] bg-[#111] text-white font-semibold text-[14px] hover:bg-black active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg"
              >
                <Camera size={17} />
                Probar en mi ventana
                <span className="hidden sm:inline text-[11px] text-white/45 font-normal">· Tiempo real</span>
              </button>

              {/* COLOR SELECTOR ── MOBILE: aparece aquí (bajo el botón) */}
              <div className="mt-3 lg:hidden">
                <ColorSelector variants={colorVariants} selectedId={selectedColorId} onSelect={handleColorSelect} />
              </div>
            </div>

            {/* RIGHT: Info + Cotizador */}
            <div className="pt-1">
              <p className="text-[10px] tracking-[0.28em] uppercase text-[#d65c34] font-semibold mb-2">Cortina Roller Duo</p>
              <h1 className="text-[26px] md:text-[32px] font-bold leading-tight mb-3">{fullName}</h1>

              <div className="mb-5">
                <h2 className="text-[22px] md:text-[28px] font-semibold">${baseProduct.price.toLocaleString("es-CL")}</h2>
                <p className="text-[13px] text-black/45 mt-1">Valor referencial por metro cuadrado</p>
              </div>

              {/* Cotizador */}
              <div className="bg-white rounded-[20px] border border-black/5 p-4 md:p-5 shadow-md mb-4">
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4">Cotiza tu cortina</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-[12px] text-black/55 mb-1.5 block">Ancho (m)</label>
                    <input type="number" value={width} onChange={e=>setWidth(e.target.value)} placeholder="Ej: 1.5"
                      className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
                  </div>
                  <div>
                    <label className="text-[12px] text-black/55 mb-1.5 block">Alto (m)</label>
                    <input type="number" value={height} onChange={e=>setHeight(e.target.value)} placeholder="Ej: 2.0"
                      className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-[12px] text-black/55 mb-1.5 block">Cantidad</label>
                  <input type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="Ej: 2"
                    className="w-full h-11 rounded-xl border border-black/10 bg-[#faf8f5] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
                </div>
                <div className="bg-[#f8f5f1] rounded-2xl p-4 mb-4 border border-black/5">
                  <p className="text-[12px] text-black/45 mb-1">Total estimado</p>
                  <h4 className="text-[22px] md:text-[24px] font-bold text-[#d65c34]">${total.toLocaleString("es-CL")}</h4>
                </div>
                <Link href="/cotizador" className="flex w-full h-11 rounded-xl bg-black text-white items-center justify-center text-[14px] font-medium hover:bg-black/80 transition">
                  Solicitar cotización
                </Link>
              </div>

              {/* COLOR SELECTOR ── DESKTOP: aparece aquí (en la columna derecha) */}
              <div className="hidden lg:block">
                <ColorSelector variants={colorVariants} selectedId={selectedColorId} onSelect={handleColorSelect} />
              </div>
            </div>
          </div>

          {/* ── DESCRIPCIÓN + ESPECIFICACIONES ── */}
          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-8 md:mt-10">
            <div className="bg-white rounded-[22px] md:rounded-[28px] p-5 md:p-6 border shadow-md">
              <h3 className="text-[20px] md:text-[26px] font-bold mb-4">Descripción del producto</h3>
              <p className="text-[14px] md:text-[15px] text-black/70 leading-7">{baseProduct.description}</p>
            </div>
            <div className="bg-white rounded-[22px] md:rounded-[28px] p-5 md:p-6 border shadow-md">
              <h3 className="text-[20px] md:text-[26px] font-bold mb-5">Especificaciones</h3>
              <div className="space-y-3">
                {[
                  { title:"Material",     value: baseProduct.material },
                  { title:"Opacidad",     value: baseProduct.opacity },
                  { title:"Garantía",     value: baseProduct.warranty },
                  { title:"Instalación",  value: baseProduct.installation },
                  { title:"Color",        value: selectedVariant?.name || "—" },
                ].map(item => (
                  <div key={item.title} className="flex justify-between border-b border-black/5 pb-2.5">
                    <span className="text-black/45 text-[13px] md:text-[14px]">{item.title}</span>
                    <span className="font-semibold text-[13px] md:text-[14px]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BANNER ── */}
          <div className="mt-8 md:mt-12">
            <Image src="/images/bdespacho.png" alt="Banner despacho" width={1200} height={400}
              className="w-full rounded-[18px] md:rounded-[30px] object-cover" />
          </div>

          {/* ── PRODUCTOS RELACIONADOS ── */}
          <div className="mt-12 md:mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">También te puede interesar</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {relatedProducts.map(item => (
                <div key={item.name} className="bg-white rounded-[18px] md:rounded-[30px] overflow-hidden border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Image src={item.image} alt={item.name} width={500} height={400} className="w-full h-[140px] md:h-[240px] object-cover" />
                  <div className="p-3 md:p-5">
                    <h4 className="font-semibold text-[12px] md:text-[15px]">{item.name}</h4>
                    <p className="text-[#d65c34] font-bold text-[12px] md:text-[15px] mt-0.5">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/56963653017" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50">
        <div className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <FaWhatsapp size={28} className="text-white" />
        </div>
      </a>

      {/* ── FOOTER ── */}
      <footer className="mt-16 bg-[#413d3d] text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.4fr_auto_1fr] items-center gap-6 md:gap-8">
            <div className="flex justify-center h-[90px] items-center">
              <Image src="/images/BH.png" alt="Black Home" width={190} height={190} priority className="object-contain" />
            </div>
            <div className="hidden md:block h-28 w-px bg-[#D4B06A]/30" />
            <div className="flex justify-center">
              <div className="space-y-4">
                {[{I:Phone,t:"+56 9 3400 7366"},{I:Mail,t:"contacto@blackhome.cl"},{I:MapPin,t:"Santiago, Chile"}].map(({I,t})=>(
                  <div key={t} className="flex items-center gap-4"><I size={18} className="text-[#D4B06A]"/><span className="text-base">{t}</span></div>
                ))}
              </div>
            </div>
            <div className="hidden md:block h-28 w-px bg-[#D4B06A]/30" />
            <div className="flex flex-col items-center">
              <h3 className="text-[#D4B06A] font-semibold text-xl md:text-2xl mb-4 tracking-wide">SÍGUENOS</h3>
              <div className="flex gap-4">
                {[{h:"#",i:<FaInstagram size={18}/>},{h:"#",i:<FaFacebookF size={18}/>},{h:"tel:+56963653017",i:<Phone size={18}/>}].map(({h,i},idx)=>(
                  <a key={idx} href={h} className="w-12 h-12 rounded-full border border-[#D4B06A] text-[#D4B06A] flex items-center justify-center hover:bg-[#D4B06A]/10 transition-all duration-300">{i}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#D4B06A]/30 mt-8 pt-5">
            <p className="text-center text-sm text-gray-300">© 2026 Black Home. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* TRY-ON — usa SOLO images[0] del color activo */}
      {showTryOn && (
        <CurtainTryOn
          curtainImage={tryOnImage}
          productName={fullName}
          onClose={() => setShowTryOn(false)}
        />
      )}

    </main>
  );
}

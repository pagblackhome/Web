"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Camera, ZoomIn, ZoomOut, Move, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ShieldCheck, RotateCcw } from "lucide-react";

// ─── Consent Modal ────────────────────────────────────────────────────────────
function ConsentModal({ onAccept, onReject }) {
  return (
    <div className="fixed inset-0 z-[999999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-[#f7f4ee] rounded-[32px] max-w-md w-full shadow-2xl border border-white/30 overflow-hidden">

        {/* Header */}
        <div className="bg-[#1a1a1a] px-6 pt-6 pb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4B06A]/20 flex items-center justify-center">
            <Camera size={20} className="text-[#D4B06A]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-[17px] leading-tight">
              Prueba virtual de cortinas
            </h2>
            <p className="text-white/50 text-[12px] mt-0.5">Uso de cámara requerido</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex items-start gap-3 mb-4 bg-[#e8f4e8] rounded-2xl px-4 py-3 border border-green-200">
            <ShieldCheck size={18} className="text-green-700 mt-0.5 flex-shrink-0" />
            <p className="text-[13px] text-green-800 leading-relaxed">
              <strong>Tu privacidad está protegida.</strong> La cámara solo funciona en tu dispositivo. Ninguna imagen, video ni dato personal es capturado, almacenado ni enviado a ningún servidor.
            </p>
          </div>

          <h3 className="font-semibold text-[14px] mb-3 text-black">
            ¿Para qué usamos la cámara?
          </h3>
          <ul className="space-y-2 mb-5">
            {[
              "Mostrar la cortina superpuesta en tiempo real sobre tu ventana",
              "Todo el procesamiento ocurre localmente en tu dispositivo",
              "No se graba ni comparte ningún video o imagen",
              "Puedes cerrar la cámara en cualquier momento",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-black/70">
                <span className="w-4 h-4 rounded-full bg-[#d65c34]/15 text-[#d65c34] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-[11px] text-black/40 leading-relaxed mb-5">
            Al continuar, consientes el acceso a la cámara de tu dispositivo para uso exclusivo de esta función, conforme a la Ley 19.628 sobre Protección de la Vida Privada de Chile. El consentimiento es voluntario y revocable en cualquier momento cerrando la herramienta.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onReject}
              className="flex-1 h-11 rounded-2xl border border-black/15 text-black/60 text-[14px] hover:bg-black/5 transition"
            >
              Cancelar
            </button>
            <button
              onClick={onAccept}
              className="flex-1 h-11 rounded-2xl bg-[#1a1a1a] text-white text-[14px] font-semibold hover:bg-black transition flex items-center justify-center gap-2"
            >
              <Camera size={16} />
              Activar cámara
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function CurtainTryOn({ productImage, productName, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [step, setStep] = useState("consent"); // consent | loading | active | error
  const [errorMsg, setErrorMsg] = useState("");

  // Curtain transform state
  const [curtainX, setCurtainX] = useState(50);   // % from left
  const [curtainY, setCurtainY] = useState(10);   // % from top
  const [curtainW, setCurtainW] = useState(60);   // % width
  const [curtainH, setCurtainH] = useState(80);   // % height
  const [opacity, setOpacity] = useState(85);     // 0–100

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const containerRef = useRef(null);

  // ── Start camera ──────────────────────────────────────────────────────────
  const startCamera = useCallback(async () => {
    setStep("loading");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStep("active");
    } catch (err) {
      let msg = "No se pudo acceder a la cámara.";
      if (err.name === "NotAllowedError") msg = "Permiso denegado. Debes permitir el acceso a la cámara en tu navegador.";
      else if (err.name === "NotFoundError") msg = "No se encontró ninguna cámara en este dispositivo.";
      setErrorMsg(msg);
      setStep("error");
    }
  }, []);

  // ── Stop camera ───────────────────────────────────────────────────────────
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    onClose?.();
  }, [onClose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  // ── Drag to move curtain ──────────────────────────────────────────────────
  const onPointerDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, cx: curtainX, cy: curtainY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragStart.current.x) / rect.width) * 100;
    const dy = ((e.clientY - dragStart.current.y) / rect.height) * 100;
    setCurtainX(Math.max(0, Math.min(100 - curtainW, dragStart.current.cx + dx)));
    setCurtainY(Math.max(0, Math.min(100 - curtainH, dragStart.current.cy + dy)));
  };

  const onPointerUp = () => { isDragging.current = false; };

  const resetPosition = () => {
    setCurtainX(50); setCurtainY(10); setCurtainW(60); setCurtainH(80); setOpacity(85);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Consent */}
      {step === "consent" && (
        <ConsentModal
          onAccept={startCamera}
          onReject={onClose}
        />
      )}

      {/* Camera view */}
      {(step === "loading" || step === "active" || step === "error") && (
        <div className="fixed inset-0 z-[999999] bg-black flex flex-col">

          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/80 flex-shrink-0">
            <div>
              <p className="text-white font-semibold text-[15px]">{productName}</p>
              <p className="text-white/50 text-[11px]">Arrastra la cortina para posicionarla</p>
            </div>
            <button
              onClick={stopCamera}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Camera area */}
          <div ref={containerRef} className="relative flex-1 overflow-hidden">

            {/* Loading */}
            {step === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/70 text-sm">Iniciando cámara...</p>
                </div>
              </div>
            )}

            {/* Error */}
            {step === "error" && (
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="bg-white/10 rounded-3xl p-6 text-center max-w-sm">
                  <Camera size={32} className="text-red-400 mx-auto mb-3" />
                  <p className="text-white font-semibold mb-2">Error de cámara</p>
                  <p className="text-white/70 text-sm mb-4">{errorMsg}</p>
                  <button
                    onClick={stopCamera}
                    className="w-full h-10 rounded-2xl bg-white text-black text-sm font-semibold"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

            {/* Video feed */}
            <video
              ref={videoRef}
              playsInline
              muted
              className={`w-full h-full object-cover ${step !== "active" ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
            />

            {/* Curtain overlay — draggable */}
            {step === "active" && (
              <div
                className="absolute cursor-grab active:cursor-grabbing select-none touch-none"
                style={{
                  left: `${curtainX}%`,
                  top: `${curtainY}%`,
                  width: `${curtainW}%`,
                  height: `${curtainH}%`,
                  opacity: opacity / 100,
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-cover rounded-lg pointer-events-none"
                  draggable={false}
                />
                {/* Drag hint corners */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/60 rounded-tl-md" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/60 rounded-tr-md" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/60 rounded-bl-md" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/60 rounded-br-md" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Move size={22} className="text-white/40" />
                </div>
              </div>
            )}

            {/* Privacy badge */}
            {step === "active" && (
              <div className="absolute top-3 left-3 bg-black/60 rounded-full px-3 py-1 flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-green-400" />
                <span className="text-white/80 text-[10px]">Sin grabación</span>
              </div>
            )}
          </div>

          {/* Controls */}
          {step === "active" && (
            <div className="bg-black/90 px-4 pt-3 pb-6 flex-shrink-0">

              {/* Size controls */}
              <div className="grid grid-cols-2 gap-3 mb-3">

                <div>
                  <p className="text-white/50 text-[10px] mb-1.5 text-center">Ancho</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurtainW(w => Math.max(10, w - 5))}
                      className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition"
                    >
                      <ZoomOut size={16} className="text-white" />
                    </button>
                    <div className="flex-1 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                      <span className="text-white text-[13px] font-semibold">{Math.round(curtainW)}%</span>
                    </div>
                    <button
                      onClick={() => setCurtainW(w => Math.min(100, w + 5))}
                      className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition"
                    >
                      <ZoomIn size={16} className="text-white" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-white/50 text-[10px] mb-1.5 text-center">Alto</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurtainH(h => Math.max(10, h - 5))}
                      className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition"
                    >
                      <ChevronUp size={16} className="text-white" />
                    </button>
                    <div className="flex-1 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                      <span className="text-white text-[13px] font-semibold">{Math.round(curtainH)}%</span>
                    </div>
                    <button
                      onClick={() => setCurtainH(h => Math.min(100, h + 5))}
                      className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition"
                    >
                      <ChevronDown size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Move controls cross */}
              <div className="flex items-center justify-center mb-3">
                <div className="grid grid-cols-3 gap-1.5" style={{ width: 120 }}>
                  <div />
                  <button
                    onClick={() => setCurtainY(y => Math.max(0, y - 3))}
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition"
                  >
                    <ChevronUp size={18} className="text-white" />
                  </button>
                  <div />
                  <button
                    onClick={() => setCurtainX(x => Math.max(0, x - 3))}
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition"
                  >
                    <ChevronLeft size={18} className="text-white" />
                  </button>
                  <button
                    onClick={resetPosition}
                    className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center active:scale-95 transition"
                    title="Restablecer"
                  >
                    <RotateCcw size={14} className="text-white/70" />
                  </button>
                  <button
                    onClick={() => setCurtainX(x => Math.min(100 - curtainW, x + 3))}
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition"
                  >
                    <ChevronRight size={18} className="text-white" />
                  </button>
                  <div />
                  <button
                    onClick={() => setCurtainY(y => Math.min(100 - curtainH, y + 3))}
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition"
                  >
                    <ChevronDown size={18} className="text-white" />
                  </button>
                  <div />
                </div>
              </div>

              {/* Opacity slider */}
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-[11px] w-16">Opacidad</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={opacity}
                  onChange={e => setOpacity(Number(e.target.value))}
                  className="flex-1 accent-[#D4B06A] h-1"
                />
                <span className="text-white/70 text-[12px] w-8 text-right">{opacity}%</span>
              </div>

            </div>
          )}

        </div>
      )}
    </>
  );
}

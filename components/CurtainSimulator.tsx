/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

export default function CurtainSimulator({
  image,
}: {
  image: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const curtainRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const [dragging, setDragging] = useState(false);

  const [scale, setScale] = useState(1);

  // ACTIVAR CÁMARA
  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });

      setStream(media);

      if (videoRef.current) {
        videoRef.current.srcObject = media;
        videoRef.current.style.display = "block";
      }

      if (imageRef.current) {
        imageRef.current.style.display = "none";
      }

    } catch (err) {
      console.error(err);
      alert("No se pudo acceder a la cámara");
    }
  };

  // DETENER CÁMARA
  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);

    if (videoRef.current) {
      videoRef.current.style.display = "none";
    }

    if (imageRef.current) {
      imageRef.current.style.display = "block";
    }
  };

  // SUBIR IMAGEN
  const loadFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    if (imageRef.current) {
      imageRef.current.src = url;
      imageRef.current.style.display = "block";
    }

    if (videoRef.current) {
      videoRef.current.style.display = "none";
    }

    stopCamera();
  };

  // MOVER CORTINA
  const moveCurtain = (
    clientX: number,
    clientY: number
  ) => {
    const rect =
      stageRef.current?.getBoundingClientRect();

    if (!rect || !curtainRef.current) return;

    const x = clientX - rect.left - 100;
    const y = clientY - rect.top - 100;

    curtainRef.current.style.left = `${x}px`;
    curtainRef.current.style.top = `${y}px`;
  };

  // DESKTOP
  const handleMouseMove = (
    e: React.MouseEvent
  ) => {
    if (!dragging) return;

    moveCurtain(e.clientX, e.clientY);
  };

  // MOBILE
  const handleTouchMove = (
    e: React.TouchEvent
  ) => {
    if (!dragging) return;

    const touch = e.touches[0];

    moveCurtain(
      touch.clientX,
      touch.clientY
    );
  };

  // LIMPIAR CÁMARA
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-7 text-center">

        <p
          className="
            text-[11px]
            tracking-[0.30em]
            uppercase
            text-[#c6a77b]
            font-semibold
            mb-3
          "
        >
          BLACK HOME EXPERIENCE
        </p>

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            mb-3
          "
        >
          Prueba tus cortinas
        </h2>

        <p
          className="
            text-gray-500
            text-sm
            md:text-base
            max-w-xl
            mx-auto
          "
        >
          Arrastra tu cortina y ajusta
          el tamaño según tu espacio.
        </p>

      </div>

      {/* STAGE */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={() => setDragging(false)}
        onTouchEnd={() => setDragging(false)}
        className="
          relative
          w-full
          h-[550px]
          rounded-[35px]
          overflow-hidden
          bg-[#f4f1eb]
          border
          border-black/5
          shadow-[0_20px_80px_rgba(0,0,0,0.08)]
        "
      >

        {/* BOTÓN CERRAR */}
        <button
          onClick={() => {
            stopCamera();

            if (imageRef.current) {
              imageRef.current.style.display =
                "block";
            }
          }}
          className="
            absolute
            top-4
            right-4
            z-50
            w-11
            h-11
            rounded-full
            bg-white/90
            backdrop-blur-xl
            shadow-lg
            flex
            items-center
            justify-center
            text-xl
            hover:scale-105
            transition
          "
        >
          ✕
        </button>

        {/* FIGURAS DECORATIVAS */}
        <div
          className="
            absolute
            top-[-60px]
            right-[-60px]
            w-[220px]
            h-[220px]
            rounded-full
            bg-[#d9a066]/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-40px]
            left-[-40px]
            w-[180px]
            h-[180px]
            rounded-full
            bg-[#c96f4a]/20
            blur-3xl
          "
        />

        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            hidden
          "
        />

        {/* IMAGEN BASE */}
        <img
          ref={imageRef}
          src="/images/room.jpg"
          alt="Room"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-black/10
            pointer-events-none
          "
        />

        {/* CORTINA */}
        <img
          ref={curtainRef}
          src={image}
          alt="Curtain"
          draggable={false}
          onMouseDown={() =>
            setDragging(true)
          }
          onTouchStart={() =>
            setDragging(true)
          }
          className="
            absolute
            top-[120px]
            left-[120px]
            w-[170px]
            md:w-[300px]
            object-contain
            cursor-grab
            active:cursor-grabbing
            select-none
            drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)]
            transition-all
            duration-200
          "
          style={{
            transform: `scale(${scale})`,
          }}
        />

      </div>
            {/* BOTONES */}
      <div className="flex flex-wrap gap-3 mt-6">

        <button
          onClick={startCamera}
          className="
            px-5
            py-3
            rounded-2xl
            bg-black
            text-white
            text-sm
            font-medium
            hover:scale-[1.03]
            transition-all
          "
        >
          Activar cámara
        </button>

        <button
          onClick={stopCamera}
          className="
            px-5
            py-3
            rounded-2xl
            border
            border-black/10
            bg-white
            text-sm
            font-medium
            hover:bg-gray-50
            transition
          "
        >
          Desactivar
        </button>

        <label
          className="
            px-5
            py-3
            rounded-2xl
            bg-[#c96f4a]
            text-white
            text-sm
            font-medium
            cursor-pointer
            hover:scale-[1.03]
            transition-all
          "
        >
          Subir imagen

          <input
            type="file"
            accept="image/*"
            onChange={loadFile}
            className="hidden"
          />
        </label>

      </div>

      {/* CONTROL TAMAÑO */}
      <div
        className="
          mt-7
          bg-[#faf8f5]
          rounded-[28px]
          p-5
          border
          border-black/5
          shadow-[0_10px_30px_rgba(0,0,0,0.04)]
        "
      >

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-sm font-semibold">
              Tamaño de cortina
            </p>

            <p className="text-xs text-gray-500">
              Ajusta el tamaño para visualizar mejor
            </p>

          </div>

          <div
            className="
              text-sm
              font-bold
              bg-[#c96f4a]
              text-white
              px-4
              py-2
              rounded-full
            "
          >
            {Math.round(scale * 100)}%
          </div>

        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setScale((prev) =>
                Math.max(0.5, prev - 0.1)
              )
            }
            className="
              w-12
              h-12
              rounded-full
              bg-black
              text-white
              text-xl
              hover:scale-105
              transition
            "
          >
            −
          </button>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) =>
              setScale(Number(e.target.value))
            }
            className="w-full accent-[#c96f4a]"
          />

          <button
            onClick={() =>
              setScale((prev) =>
                Math.min(2, prev + 0.1)
              )
            }
            className="
              w-12
              h-12
              rounded-full
              bg-[#c96f4a]
              text-white
              text-xl
              hover:scale-105
              transition
            "
          >
            +
          </button>

        </div>

      </div>

      {/* TEXTO INFERIOR */}
      <div className="mt-6 text-center">

        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Usa tu cámara o sube una fotografía para visualizar
          cómo quedarían tus cortinas roller en tu espacio
          antes de cotizar.
        </p>

      </div>

      {/* PANEL CONTROLES */}
      <div className="mt-6">

        {/* INFO */}
        <div
          className="
            mb-5
            bg-white
            rounded-[28px]
            border
            border-black/5
            shadow-[0_10px_40px_rgba(0,0,0,0.05)]
            p-5
          "
        >

          <h3 className="text-lg font-semibold mb-2">
            Simula tu cortina roller
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed">
            Arrastra la cortina sobre tu espacio y ajusta el tamaño
            para visualizar cómo quedaría instalada.
          </p>

        </div>

        {/* BOTONES */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={startCamera}
            className="
              px-5
              py-3
              rounded-2xl
              bg-black
              text-white
              text-sm
              font-medium
              hover:scale-[1.02]
              transition
            "
          >
            Activar cámara
          </button>

          <button
            onClick={stopCamera}
            className="
              px-5
              py-3
              rounded-2xl
              border
              border-black/10
              bg-white
              text-sm
              font-medium
            "
          >
            Desactivar
          </button>

          <label
            className="
              px-5
              py-3
              rounded-2xl
              bg-[#c96f4a]
              text-white
              text-sm
              font-medium
              cursor-pointer
            "
          >
            Subir imagen

            <input
              type="file"
              accept="image/*"
              onChange={loadFile}
              className="hidden"
            />
          </label>

        </div>

        {/* TAMAÑO */}
        <div
          className="
            mt-7
            bg-[#faf8f5]
            rounded-[28px]
            p-5
            border
            border-black/5
          "
        >

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-sm font-semibold">
                Tamaño de cortina
              </p>

              <p className="text-xs text-gray-500">
                Ajusta el tamaño
              </p>

            </div>

            <div
              className="
                text-sm
                font-bold
                bg-[#c96f4a]
                text-white
                px-4
                py-2
                rounded-full
              "
            >
              {Math.round(scale * 100)}%
            </div>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setScale((prev) =>
                  Math.max(0.5, prev - 0.1)
                )
              }
              className="
                w-12
                h-12
                rounded-full
                bg-black
                text-white
                text-xl
              "
            >
              −
            </button>

            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={scale}
              onChange={(e) =>
                setScale(Number(e.target.value))
              }
              className="w-full accent-[#c96f4a]"
            />

            <button
              onClick={() =>
                setScale((prev) =>
                  Math.min(2, prev + 0.1)
                )
              }
              className="
                w-12
                h-12
                rounded-full
                bg-[#c96f4a]
                text-white
                text-xl
              "
            >
              +
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
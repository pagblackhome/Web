"use client";

import { useState, useCallback } from "react";
import {
  ChevronLeft, ChevronRight, Clock, CalendarCheck,
  User, Phone, MapPin, Mail, FileText, CheckCircle, X, ArrowLeft,
} from "lucide-react";

// ─── CONFIGURACIÓN ────────────────────────────────────────────────
const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];
const DOWS = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

const RECT_TIMES = ["09:00","10:00","11:00","12:00","15:00","16:00"];
const INST_TIMES = ["10:00","11:00","14:00","15:00","16:00","17:00"];

// ⬇️ Modifica estos para bloquear horarios/días ocupados
const TAKEN_RECT = ["10:00"];
const TAKEN_INST = ["11:00"];
const FULL_DAYS  = [22, 25]; // aparecen en rojo

function fmtGCal(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// ─── STEP BAR ─────────────────────────────────────────────────────
function StepBar({ step }) {
  const steps = ["Elegir día", "Horario", "Tus datos", "Confirmado"];
  return (
    <div className="flex items-center mb-8">
      {steps.map((label, i) => {
        const n = i + 1;
        const isDone   = n < step;
        const isActive = n === step;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={[
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-[1.5px] transition-all duration-300",
                isDone   ? "bg-[#2E7D52] border-[#2E7D52] text-white" :
                isActive ? "bg-[#C0392B] border-[#C0392B] text-white" :
                           "border-black/20 text-black/35",
              ].join(" ")}>
                {isDone ? "✓" : n}
              </div>
              <span className={[
                "text-xs whitespace-nowrap transition-colors",
                isActive ? "text-black font-medium" :
                isDone   ? "text-[#2E7D52]" : "text-black/35",
              ].join(" ")}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-black/10 mx-3" />}
          </div>
        );
      })}
    </div>
  );
}

// ─── LEYENDA ──────────────────────────────────────────────────────
function Legend() {
  return (
    <div className="flex flex-wrap gap-5 mb-5">
      {[
        { color: "#E9A800", label: "Rectificación (medición)" },
        { color: "#2E7D52", label: "Instalación" },
        { color: "#EF4444", label: "Sin disponibilidad" },
      ].map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2 text-xs text-black/55">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
          {label}
        </div>
      ))}
    </div>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────────
function Calendar({ yr, mo, selDay, onPickDay, onPrevMonth, onNextMonth }) {
  const today     = new Date();
  const firstDow  = new Date(yr, mo, 1).getDay();
  const totalDays = new Date(yr, mo + 1, 0).getDate();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button onClick={onPrevMonth} className="w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center transition" aria-label="Mes anterior">
          <ChevronLeft size={18} className="text-black/60" />
        </button>
        <h2 className="text-[17px] font-semibold text-black">{MONTHS[mo]} {yr}</h2>
        <button onClick={onNextMonth} className="w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center transition" aria-label="Mes siguiente">
          <ChevronRight size={18} className="text-black/60" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {DOWS.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-black/35 uppercase tracking-wider py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: firstDow }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((d) => {
          const dateObj  = new Date(yr, mo, d);
          const isPast   = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isSun    = dateObj.getDay() === 0;
          const isFull   = FULL_DAYS.includes(d);
          const isToday  = d === today.getDate() && mo === today.getMonth() && yr === today.getFullYear();
          const isSel    = d === selDay;
          const disabled = isPast || isSun;
          const canRect  = dateObj.getDay() >= 1 && dateObj.getDay() <= 5;
          const canInst  = dateObj.getDay() >= 1;

          return (
            <button
              key={d}
              disabled={disabled || isFull}
              onClick={() => onPickDay(d)}
              className={[
                "relative rounded-xl border pt-1.5 pb-2 px-1 flex flex-col items-center gap-1 transition-all duration-150 min-h-[60px]",
                disabled        ? "opacity-30 cursor-not-allowed bg-transparent border-transparent" : "",
                isFull && !disabled ? "bg-red-50 border-red-200 cursor-not-allowed opacity-100" : "",
                !disabled && !isFull ? "bg-white border-black/8 hover:border-[#C0392B] hover:bg-[#FAECE7] cursor-pointer" : "",
                isSel           ? "!border-[#C0392B] !bg-[#FAECE7] !border-2" : "",
              ].join(" ")}
            >
              <span className={[
                "text-[13px] font-medium leading-none",
                isToday ? "w-6 h-6 rounded-full bg-[#3D3D3D] text-white flex items-center justify-center text-[11px]" : "text-black",
                isFull && !isPast && !isSun ? "text-red-600" : "",
              ].join(" ")}>
                {d}
              </span>

              {isFull && !isPast && !isSun ? (
                <span className="text-red-400 text-[13px] leading-none">✕</span>
              ) : !disabled && !isFull ? (
                <div className="flex gap-[3px]">
                  {canRect && <div className="w-[6px] h-[6px] rounded-full bg-[#E9A800]" />}
                  {canInst && <div className="w-[6px] h-[6px] rounded-full bg-[#2E7D52]" />}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── SLOTS PANEL ──────────────────────────────────────────────────
function SlotsPanel({ yr, mo, day, selSlot, selType, onPickSlot, onClose }) {
  const dow     = new Date(yr, mo, day).getDay();
  const canRect = dow >= 1 && dow <= 5;
  const canInst = dow >= 1;
  const allTimes = [...new Set([...RECT_TIMES, ...INST_TIMES])].sort();

  return (
    <div className="mt-5 bg-white rounded-[20px] border border-black/8 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-[#F5F3F0] border-b border-black/6">
        <div>
          <p className="text-[15px] font-semibold text-black">{day} de {MONTHS[mo]} — elige horario</p>
          <p className="text-[12px] text-black/45 mt-0.5">Selecciona tipo de visita y hora</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/8 hover:bg-black/12 flex items-center justify-center transition" aria-label="Cerrar">
          <X size={15} className="text-black/50" />
        </button>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {allTimes.map((t) => {
          const showRect  = canRect && RECT_TIMES.includes(t);
          const showInst  = canInst && INST_TIMES.includes(t);
          const takenRect = TAKEN_RECT.includes(t);
          const takenInst = TAKEN_INST.includes(t);
          return (
            <div key={t} className="flex flex-col gap-2">
              {showRect && (takenRect ? (
                <div className="rounded-xl border border-black/8 bg-black/4 px-3 py-2.5 opacity-40 cursor-not-allowed">
                  <div className="flex items-center gap-1.5 text-[13px] text-black/40"><Clock size={13} />{t} hrs</div>
                  <span className="text-[10px] bg-black/8 text-black/35 rounded-full px-2 py-0.5 mt-1 inline-block">Ocupado</span>
                </div>
              ) : (
                <button onClick={() => onPickSlot(t, "rect")}
                  className={[
                    "rounded-xl border-l-[3px] border border-[#E9A800] px-3 py-2.5 text-left transition-all",
                    selSlot === t && selType === "rect" ? "bg-[#FFF8E1] !border-2 !border-[#E9A800]" : "bg-white hover:bg-[#FFF8E1]",
                  ].join(" ")}>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-black"><Clock size={13} className="text-[#E9A800]" />{t} hrs</div>
                  <span className="text-[10px] bg-[#FFF8E1] text-[#7A5500] rounded-full px-2 py-0.5 mt-1 inline-block font-medium">Rectificación</span>
                </button>
              ))}
              {showInst && (takenInst ? (
                <div className="rounded-xl border border-black/8 bg-black/4 px-3 py-2.5 opacity-40 cursor-not-allowed">
                  <div className="flex items-center gap-1.5 text-[13px] text-black/40"><Clock size={13} />{t} hrs</div>
                  <span className="text-[10px] bg-black/8 text-black/35 rounded-full px-2 py-0.5 mt-1 inline-block">Ocupado</span>
                </div>
              ) : (
                <button onClick={() => onPickSlot(t, "inst")}
                  className={[
                    "rounded-xl border-l-[3px] border border-[#2E7D52] px-3 py-2.5 text-left transition-all",
                    selSlot === t && selType === "inst" ? "bg-[#E8F5EE] !border-2 !border-[#2E7D52]" : "bg-white hover:bg-[#E8F5EE]",
                  ].join(" ")}>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-black"><Clock size={13} className="text-[#2E7D52]" />{t} hrs</div>
                  <span className="text-[10px] bg-[#E8F5EE] text-[#1A4D32] rounded-full px-2 py-0.5 mt-1 inline-block font-medium">Instalación</span>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── FORM PANEL ───────────────────────────────────────────────────
function FormPanel({ yr, mo, day, slot, type, onSubmit, onBack }) {
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");
  const [addr,  setAddr]  = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const typeName = type === "rect" ? "Rectificación (medición)" : "Instalación de cortinas";
  const dotColor = type === "rect" ? "#E9A800" : "#2E7D52";
  const ic = "w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/20 focus:border-[#C0392B] transition";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !addr || !email) return;
    onSubmit({ name, phone, addr, email, notes });
  };

  return (
    <div className="mt-5 bg-white rounded-[20px] border border-black/8 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-[#F5F3F0] border-b border-black/6">
        <div>
          <p className="text-[15px] font-semibold text-black">Completa tus datos</p>
          <p className="text-[12px] text-black/45 mt-0.5">{day} de {MONTHS[mo]} · {slot} hrs · {typeName}</p>
        </div>
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-black/8 hover:bg-black/12 flex items-center justify-center transition" aria-label="Volver">
          <ArrowLeft size={15} className="text-black/50" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="flex items-center gap-1.5 text-[12px] font-medium text-black/55 mb-1.5"><User size={12} />Nombre completo</label>
            <input className={ic} required value={name} onChange={e => setName(e.target.value)} placeholder="Juan García" />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-[12px] font-medium text-black/55 mb-1.5"><Phone size={12} />Teléfono</label>
            <input className={ic} required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+56 9 XXXX XXXX" />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-1.5 text-[12px] font-medium text-black/55 mb-1.5"><MapPin size={12} />Dirección</label>
            <input className={ic} required value={addr} onChange={e => setAddr(e.target.value)} placeholder="Av. Las Condes 1234, Santiago" />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-1.5 text-[12px] font-medium text-black/55 mb-1.5"><Mail size={12} />Correo electrónico</label>
            <input className={ic} required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.cl" />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-1.5 text-[12px] font-medium text-black/55 mb-1.5"><FileText size={12} />Notas (opcional)</label>
            <textarea className={ic} rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ej: 3er piso, dpto 302, llamar antes de llegar" />
          </div>
        </div>

        <div className="bg-[#F5F3F0] rounded-[14px] p-4 mb-4 border border-black/6">
          {[
            { label: "Servicio", value: typeName, dot: dotColor },
            { label: "Fecha",   value: `${day} de ${MONTHS[mo]} ${yr}` },
            { label: "Hora",    value: `${slot} hrs` },
          ].map(({ label, value, dot }) => (
            <div key={label} className="flex justify-between items-center text-sm py-1.5 border-b border-black/5 last:border-0">
              <span className="text-black/45">{label}</span>
              <span className="font-medium text-black flex items-center gap-2">
                {dot && <span className="w-2 h-2 rounded-full inline-block" style={{ background: dot }} />}
                {value}
              </span>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full h-12 rounded-[14px] bg-[#C0392B] hover:bg-[#a93226] text-white font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]">
          <CalendarCheck size={18} />
          Confirmar agendamiento
        </button>
      </form>
    </div>
  );
}

// ─── SUCCESS ──────────────────────────────────────────────────────
function SuccessPanel({ yr, mo, day, slot, type, clientName, addr, gcalUrl, onReset }) {
  const typeName = type === "rect" ? "Rectificación Black Home" : "Instalación cortinas Black Home";
  return (
    <div className="mt-5 bg-white rounded-[20px] border border-black/8 p-8 text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-[#E8F5EE] flex items-center justify-center">
        <CheckCircle size={36} className="text-[#2E7D52]" strokeWidth={1.5} />
      </div>
      <h3 className="text-[20px] font-semibold text-[#1A4D32]">¡Hora agendada!</h3>
      <p className="text-sm text-black/55 max-w-xs leading-relaxed">
        {typeName} confirmada para el <strong>{day} de {MONTHS[mo]}</strong> a las <strong>{slot} hrs</strong> en {addr}, {clientName}.
      </p>
      <a href={gcalUrl} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-black/10 bg-[#FAF8F5] hover:bg-black/5 text-sm text-black/70 transition">
        <CalendarCheck size={16} className="text-[#C0392B]" />
        Agregar a Google Calendar
      </a>
      <button onClick={onReset} className="text-sm text-black/35 hover:text-black/55 underline transition mt-1">
        Agendar otra visita
      </button>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────
export default function AgendarCalendar() {
  const now = new Date();
  const [yr,         setYr]         = useState(now.getFullYear());
  const [mo,         setMo]         = useState(now.getMonth());
  const [step,       setStep]       = useState(1);
  const [selDay,     setSelDay]     = useState(null);
  const [selSlot,    setSelSlot]    = useState(null);
  const [selType,    setSelType]    = useState(null);
  const [gcalUrl,    setGcalUrl]    = useState("");
  const [clientData, setClientData] = useState(null);

const changeMonth = (dir) => {
  setMo((m) => {
    const nm = m + dir;
    if (nm < 0)  { setYr((y) => y - 1); return 11; }
    if (nm > 11) { setYr((y) => y + 1); return 0; }
    return nm;
  });
  setSelDay(null); 
  setSelSlot(null); 
  setSelType(null); 
  setStep(1);
};

  const handlePickDay  = (d) => { setSelDay(d); setSelSlot(null); setSelType(null); setStep(2); };
  const handlePickSlot = (t, tp) => { setSelSlot(t); setSelType(tp); setStep(3); };

  const handleSubmit = ({ name, phone, addr, email, notes }) => {
    const typeName = selType === "rect" ? "Rectificación Black Home" : "Instalación cortinas Black Home";
    const [h, mn]  = selSlot.split(":");
    const start    = new Date(yr, mo, selDay, parseInt(h), parseInt(mn));
    const end      = new Date(start.getTime() + 60 * 60 * 1000);
    const details  = [
      `Servicio: ${typeName}`,
      `Cliente: ${name}`,
      `Tel: ${phone}`,
      `Dir: ${addr}`,
      notes ? `Notas: ${notes}` : "",
    ].filter(Boolean).join("%0A");

    const url = [
      "https://calendar.google.com/calendar/render?action=TEMPLATE",
      `&text=${encodeURIComponent(typeName)}`,
      `&dates=${fmtGCal(start)}/${fmtGCal(end)}`,
      `&details=${details}`,
      `&location=${encodeURIComponent(addr)}`,
    ].join("");

    setGcalUrl(url);
    setClientData({ name, addr });
    setStep(4);
  };

  const handleReset = () => {
    setSelDay(null); setSelSlot(null); setSelType(null);
    setClientData(null); setGcalUrl(""); setStep(1);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[28px] md:rounded-[40px] shadow-[0_8px_50px_rgba(0,0,0,0.07)] p-6 md:p-8">
      {/* Brand bar */}
      <div className="flex items-center gap-3 mb-7 pb-5 border-b border-black/6">
        <div className="w-10 h-10 rounded-xl bg-[#3D3D3D] flex items-center justify-center text-white font-semibold text-sm">BH</div>
        <div>
          <p className="text-[16px] font-semibold text-black leading-none">Black<span className="text-[#C0392B]">Home</span></p>
          <p className="text-[12px] text-black/45 mt-0.5">Agendar visita técnica</p>
        </div>
      </div>

      <StepBar step={step} />
      <Legend />

      <Calendar
        yr={yr} mo={mo} selDay={selDay}
        onPickDay={handlePickDay}
        onPrevMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
      />

      {step >= 2 && selDay && (
        <SlotsPanel
          yr={yr} mo={mo} day={selDay}
          selSlot={selSlot} selType={selType}
          onPickSlot={handlePickSlot}
          onClose={() => { setSelDay(null); setSelSlot(null); setSelType(null); setStep(1); }}
        />
      )}

      {step >= 3 && selSlot && selType && selDay && (
        <FormPanel
          yr={yr} mo={mo} day={selDay}
          slot={selSlot} type={selType}
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && clientData && selDay && selSlot && selType && (
        <SuccessPanel
          yr={yr} mo={mo} day={selDay}
          slot={selSlot} type={selType}
          clientName={clientData.name}
          addr={clientData.addr}
          gcalUrl={gcalUrl}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

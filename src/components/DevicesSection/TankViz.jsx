// src/components/DevicesSection/TankViz.jsx
import React, { useId, useMemo } from "react";

/**
 * TankViz
 * - level: 0..100 (%)
 * - capacityLiters: número (ej. 500)  -> usado para mostrar litros
 * - variant: "rect" | "drum" | "cyl"
 * - indicator: "chip" | "bar" | "none"
 * - valveOpen: true/false
 * - showValveLabel: mostrar texto en el chip (por defecto true)
 * - showHeader: muestra el título interno "Tanque XXX L" (por defecto false)
 * - showPercent: muestra %/litros arriba a la derecha (por defecto true)
 * - className: estilos extra
 */
export default function TankViz({
  level = 60,
  capacityLiters = 500,
  variant = "rect",
  indicator = "chip",
  valveOpen = true,
  showValveLabel = true,
  showHeader = false,
  showPercent = true,
  className = "",
}) {
  const rid = typeof useId === "function" ? useId() : `id-${Math.random().toString(36).slice(2)}`;
  const clipId = `${rid}-clip`;
  const gradId = `${rid}-grad`;

  const W = 260;
  const H = 180;
  const viewBox = `0 0 ${W} ${H}`;

  // Forma base (sin escalera ni tapones)
  const shape = useMemo(() => {
    switch (variant) {
      case "drum": {
        const x = 40, y = 26, w = 180, h = 130, r = 20;
        return {
          content: { x, y, w, h },
          clipPath: <path d={roundedRectPath(x, y, w, h, r)} />,
          outline: <path d={roundedRectPath(x, y, w, h, r)} stroke="#0f172a" strokeWidth="3" fill="none" />,
        };
      }
      case "cyl": {
        const x = 30, y = 40, w = 200, h = 100, r = 50;
        return {
          content: { x, y, w, h },
          clipPath: <rect x={x} y={y} width={w} height={h} rx={r} ry={r} />,
          outline: <rect x={x} y={y} width={w} height={h} rx={r} ry={r} stroke="#0f172a" strokeWidth="3" fill="none" />,
        };
      }
      case "rect":
      default: {
        const x = 30, y = 20, w = 180, h = 140, r = 12;
        return {
          content: { x, y, w, h },
          clipPath: <rect x={x} y={y} width={w} height={h} rx={r} ry={r} />,
          outline: <rect x={x} y={y} width={w} height={h} rx={r} ry={r} stroke="#0f172a" strokeWidth="3" fill="none" />,
        };
      }
    }
  }, [variant]);

  // nivel / agua
  const { x, y, w, h } = shape.content;
  const pct = Math.max(0, Math.min(100, level));
  const waterTop = y + (1 - pct / 100) * h;

  // NEW: litros calculados desde capacidad y porcentaje
  const liters = Math.max(0, Math.round((capacityLiters || 0) * (pct / 100))); // NEW
  const litersText = capacityLiters > 0 ? `${liters.toLocaleString()} L` : ""; // NEW

  const valveColor = valveOpen ? "#10b981" : "#ef4444";
  const valveText  = valveOpen ? "Válvula abierta" : "Válvula cerrada";

  // burbujas (recortadas al tanque)
  const bubbles = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => {
        const bx = x + 16 + ((i * 27) % (w - 32));
        const delay = (i * 0.6).toFixed(2) + "s";
        const dur = (3 + (i % 3)) + "s";
        const r = 2 + (i % 3);
        return (
          <circle
            key={i}
            cx={bx}
            cy={y + h - 6}
            r={r}
            fill="rgba(255,255,255,.85)"
            style={{ animation: `bubbleUp ${dur} ease-in infinite`, animationDelay: delay }}
          />
        );
      }),
    [x, y, w, h]
  );

  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-sm ${className}`}>
      {showHeader && (
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-semibold text-gray-900">Tanque {capacityLiters.toLocaleString()} L</h3>
          {/* NEW: % + litros juntos */}
          <span className="text-sm text-gray-500">
            {pct}%{capacityLiters > 0 ? ` • ${litersText}` : ""}
          </span>
        </div>
      )}

      <div className="relative mx-auto aspect-[13/9] w-full max-w-[520px]">
        {/* indicador tipo chip (fuera del SVG, no tapa el tanque) */}
        {indicator === "chip" && (
          <div
            className={`absolute left-2 top-2 inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm
              ${valveOpen ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: valveColor }}
              aria-hidden
            />
            {showValveLabel && <span>{valveText}</span>}
          </div>
        )}

        {/* % (y litros) arriba a la derecha cuando no usamos header */}
        {!showHeader && showPercent && (
          <div className="absolute right-2 top-2 rounded-full bg-white/70 px-2 py-0.5 text-xs text-gray-700 backdrop-blur">
            {pct}%{capacityLiters > 0 ? ` • ${litersText}` : ""} {/* NEW */}
          </div>
        )}

        <svg viewBox={viewBox} className="h-full w-full">
          <defs>
            <clipPath id={clipId}>{shape.clipPath}</clipPath>

            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            <style>{`
              @keyframes waveShift { 0% { transform: translateX(0); } 100% { transform: translateX(-140px); } }
              @keyframes bob      { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
              @keyframes bubbleUp { 0% { transform: translateY(0); opacity: .0; }
                                     10% { opacity: .8; }
                                     100% { transform: translateY(-${h - 14}px); opacity: 0; } }
              .wave1 { animation: waveShift 5s linear infinite, bob 4s ease-in-out infinite; }
              .wave2 { animation: waveShift 9s linear infinite, bob 6s ease-in-out infinite; opacity: .55; }
            `}</style>
          </defs>

          {/* agua recortada a la forma */}
          <g clipPath={`url(#${clipId})`}>
            <rect x={x} y={waterTop} width={w} height={y + h - waterTop} fill={`url(#${gradId})`} />

            <g transform={`translate(${x}, ${waterTop - 12})`}>
              <path className="wave1" d={wavePath(w + 240, 10, 24)} fill={`url(#${gradId})`} />
              <path className="wave2" d={wavePath(w + 240, 12, 18)} fill="#3b82f6" />
            </g>

            {bubbles}
          </g>

          {/* contorno */}
          {shape.outline}

          {/* indicador tipo barra (opcional) */}
          {indicator === "bar" && (
            <g transform={`translate(${12}, ${y})`}>
              <rect x="0" y="8" width="6" height={h - 16} rx="3" fill={valveColor} />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

/* ---------------- helpers SVG ---------------- */

function roundedRectPath(x, y, w, h, r) {
  return [
    `M ${x + r},${y}`,
    `H ${x + w - r}`,
    `A ${r},${r} 0 0 1 ${x + w},${y + r}`,
    `V ${y + h - r}`,
    `A ${r},${r} 0 0 1 ${x + w - r},${y + h}`,
    `H ${x + r}`,
    `A ${r},${r} 0 0 1 ${x},${y + h - r}`,
    `V ${y + r}`,
    `A ${r},${r} 0 0 1 ${x + r},${y}`,
    "Z",
  ].join(" ");
}

// ola (ancho, amplitud, periodo)
function wavePath(width = 200, amp = 10, period = 24) {
  const step = period;
  const midY = amp;
  let d = `M 0 ${midY}`;
  for (let xx = 0; xx <= width + step; xx += step) {
    const yy = midY + Math.sin((xx / period) * Math.PI * 2) * amp * 0.6;
    d += ` L ${xx} ${yy}`;
  }
  d += ` L ${width} ${amp * 2 + 40} L 0 ${amp * 2 + 40} Z`;
  return d;
}

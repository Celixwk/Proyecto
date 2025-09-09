// src/components/DevicesSection/TankViz.jsx
import React, { useId, useMemo } from "react";

/**
 * TankViz
 * - level: 0..100 (%)
 * - capacityLiters: número (ej. 500)  -> usado para mostrar litros
 * - variant: "rect" | "drum" | "cyl"
 * - indicator: "chip" | "bar" | "none"
 *      "chip": (compat) ahora muestra SOLO el icono SVG grande de válvula, sin fondo ni texto
 *      "bar" : barrita lateral
 *      "none": sin indicador
 * - valveOpen: true/false
 * - valveSpin: true/false => anima un "vaivén" corto (útil al simular registro)
 * - showHeader: muestra el título interno "Tanque XXX L"
 * - showPercent: muestra %/litros arriba a la derecha
 * - className: estilos extra
 */
export default function TankViz({
  level = 60,
  capacityLiters = 500,
  variant = "rect",
  indicator = "chip",
  valveOpen = true,
  valveSpin = false,   // NUEVO: vaivén opcional
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

  // litros calculados
  const liters = Math.max(0, Math.round((capacityLiters || 0) * (pct / 100)));
  const litersText = capacityLiters > 0 ? `${liters.toLocaleString()} L` : "";

  const valveColor = valveOpen ? "#10b981" : "#ef4444";

  // burbujas
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
      {/* Animaciones locales MEJORADAS */}
      <style>{`
        @keyframes valveWiggle {
          0% { transform: translateX(0) rotate(0) scale(1); }
          25% { transform: translateX(8px) rotate(12deg) scale(1.05); }
          50% { transform: translateX(12px) rotate(18deg) scale(1.08); }
          75% { transform: translateX(8px) rotate(12deg) scale(1.05); }
          100%{ transform: translateX(0) rotate(0) scale(1); }
        }

        @keyframes valveOpen {
          0% { transform: translateX(0) rotate(0) scale(1); }
          50% { transform: translateX(6px) rotate(9deg) scale(1.03); }
          100% { transform: translateX(12px) rotate(16deg) scale(1.02); }
        }

        @keyframes valveClose {
          0% { transform: translateX(12px) rotate(16deg) scale(1.02); }
          50% { transform: translateX(6px) rotate(8deg) scale(1.03); }
          100% { transform: translateX(0) rotate(0) scale(1); }
        }

        @keyframes valvePulse {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(16, 185, 129, 0)); }
          50% { filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4)); }
        }

        @keyframes valvePulseRed {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(239, 68, 68, 0)); }
          50% { filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.4)); }
        }

        .valve-root { 
          display: inline-block; 
          transform-origin: 50% 50%; 
        }

        .valve-body { 
          transform-origin: 50% 50%; 
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .valve-open {
          animation: valveOpen 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     valvePulse 2s ease-in-out infinite 0.8s;
        }

        .valve-closed {
          animation: valveClose 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     valvePulseRed 3s ease-in-out infinite 0.6s;
        }

        .valve-wiggle {
          animation: valveWiggle 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards !important;
        }

        @keyframes waveShift { 0% { transform: translateX(0); } 100% { transform: translateX(-140px); } }
        @keyframes bob      { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes bubbleUp { 0% { transform: translateY(0); opacity: .0; }
                              10% { opacity: .8; }
                              100% { transform: translateY(-${h - 14}px); opacity: 0; } }
        .wave1 { animation: waveShift 5s linear infinite, bob 4s ease-in-out infinite; }
        .wave2 { animation: waveShift 9s linear infinite, bob 6s ease-in-out infinite; opacity: .55; }
      `}</style>

      {showHeader && (
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-semibold text-gray-900">Tanque {capacityLiters.toLocaleString()} L</h3>
          <span className="text-sm text-gray-500">
            {pct}%{capacityLiters > 0 ? ` • ${litersText}` : ""}
          </span>
        </div>
      )}

      <div className="relative mx-auto aspect-[13/9] w-full max-w-[520px]">
        {/* Indicador: icono de válvula grande (sin texto ni fondo) */}
        {indicator !== "none" && indicator !== "bar" && (
          <div className="absolute left-2 top-2">
            <ValveIcon
              size={28}
              color={valveColor}
              className={[
                "valve-root",
                valveSpin ? "valve-wiggle" : "",
              ].join(" ")}
              stateClass={valveOpen ? "valve-open" : "valve-closed"}
            />
          </div>
        )}

        {/* %/litros arriba a la derecha (cuando no usamos header) */}
        {!showHeader && showPercent && (
          <div className="absolute right-2 top-2 rounded-full bg-white/70 px-2 py-0.5 text-xs text-gray-700 backdrop-blur">
            {pct}%{capacityLiters > 0 ? ` • ${litersText}` : ""}
          </div>
        )}

        <svg viewBox={viewBox} className="h-full w-full">
          <defs>
            <clipPath id={clipId}>{shape.clipPath}</clipPath>

            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Agua recortada */}
          <g clipPath={`url(#${clipId})`}>
            <rect x={x} y={waterTop} width={w} height={y + h - waterTop} fill={`url(#${gradId})`} />

            <g transform={`translate(${x}, ${waterTop - 12})`}>
              <path className="wave1" d={wavePath(w + 240, 10, 24)} fill={`url(#${gradId})`} />
              <path className="wave2" d={wavePath(w + 240, 12, 18)} fill="#3b82f6" />
            </g>

            {bubbles}
          </g>

          {/* Contorno del tanque */}
          {shape.outline}

          {/* Indicador tipo barra (si se elige) */}
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

/* ===== Helpers ===== */

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

/**
 * ValveIcon: Válvula industrial moderna con diseño mejorado
 * - size: px del lado (alto/alto)
 * - color: usa currentColor
 * - stateClass: "valve-open" | "valve-closed" 
 * - className: clases adicionales
 */
function ValveIcon({ size = 42, color = "#10b981", stateClass = "", className = "" }) {
  return (
    <div className={`valve-root ${stateClass} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        style={{ color }}
        aria-hidden
      >
        {/* Sombra base */}
        <defs>
          <radialGradient id="metalGradient" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </radialGradient>
          <filter id="innerShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="1" dy="1" result="offset"/>
            <feComposite in="SourceGraphic" in2="offset" operator="over"/>
          </filter>
        </defs>

        {/* Cuerpo principal de la válvula */}
        <g className="valve-body" filter="url(#innerShadow)">
          {/* Base exterior con efecto metálico */}
          <circle 
            cx="60" 
            cy="60" 
            r="52" 
            fill="none" 
            stroke="url(#metalGradient)" 
            strokeWidth="6"
          />
          
          {/* Anillo intermedio */}
          <circle 
            cx="60" 
            cy="60" 
            r="42" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            strokeOpacity="0.6"
          />
          
          {/* Centro de la válvula */}
          <circle 
            cx="60" 
            cy="60" 
            r="30" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4"
          />

          {/* Manija principal - cruz moderna */}
          <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
            <line x1="60" y1="35" x2="60" y2="85" />
            <line x1="35" y1="60" x2="85" y2="60" />
          </g>

          {/* Detalles adicionales - líneas de agarre */}
          <g stroke="currentColor" strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round">
            <line x1="45" y1="45" x2="75" y2="75" />
            <line x1="75" y1="45" x2="45" y2="75" />
          </g>

          {/* Tornillos decorativos en posiciones estratégicas */}
          <g fill="currentColor" stroke="none">
            <circle cx="35" cy="25" r="4" opacity="0.8" />
            <circle cx="85" cy="25" r="4" opacity="0.8" />
            <circle cx="85" cy="95" r="4" opacity="0.8" />
            <circle cx="35" cy="95" r="4" opacity="0.8" />
            
            {/* Tornillos internos */}
            <circle cx="45" cy="35" r="2.5" opacity="0.6" />
            <circle cx="75" cy="35" r="2.5" opacity="0.6" />
            <circle cx="75" cy="85" r="2.5" opacity="0.6" />
            <circle cx="45" cy="85" r="2.5" opacity="0.6" />
          </g>

          {/* Centro sólido con gradiente */}
          <circle 
            cx="60" 
            cy="60" 
            r="8" 
            fill="url(#metalGradient)" 
            stroke="currentColor" 
            strokeWidth="1"
          />

          {/* Indicador de dirección */}
          <polygon 
            points="60,15 65,25 55,25" 
            fill="currentColor" 
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}
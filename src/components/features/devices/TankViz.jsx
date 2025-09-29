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

  // burbujas pequeñas y sutiles
  const bubbles = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => {
        const bx = x + 25 + ((i * 22) % (w - 50));
        const delay = (i * 0.4).toFixed(2) + "s";
        const r = 0.8 + (i % 3) * 0.3; // solo burbujas pequeñas
        
        return (
          <circle
            key={i}
            cx={bx}
            cy={y + h - 10}
            r={r}
            fill="rgba(255,255,255,0.8)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.3"
            className="bubble-small"
            style={{ animationDelay: delay }}
          />
        );
      }),
    [x, y, w, h]
  );

  // Efectos de flujo cuando la válvula está abierta (dentro del tanque)
  const flowEffects = useMemo(() => {
    if (!valveOpen || level <= 5) return null;
    
    return Array.from({ length: 4 }).map((_, i) => {
      const flowX = x + 20 + (i * 35);
      const flowY = waterTop + 15 + (i * 8);
      
      // Solo mostrar si está dentro del área del agua
      if (flowY > waterTop && flowY < y + h - 10) {
        return (
          <g key={`flow-${i}`} clipPath={`url(#${clipId})`}>
            <path
              d={`M ${flowX} ${flowY} Q ${flowX + 15} ${flowY - 3} ${flowX + 30} ${flowY} Q ${flowX + 45} ${flowY + 3} ${flowX + 60} ${flowY}`}
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="1.5"
              fill="none"
              className="flow-effect"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </g>
        );
      }
      return null;
    });
  }, [valveOpen, x, w, waterTop, y, h, level, clipId]);

  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-sm ${className}`}>
      {/* Animaciones MEJORADAS y REALISTAS */}
      <style>{`
        /* === ANIMACIONES DE VÁLVULA === */
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

        /* === ANIMACIONES DE AGUA REALISTAS === */
        @keyframes waveShift { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-120px); } 
        }
        
        @keyframes waveBob { 
          0%, 100% { transform: translateY(0) scaleY(1); } 
          33% { transform: translateY(-1px) scaleY(1.02); }
          66% { transform: translateY(1px) scaleY(0.98); }
        }
        
        @keyframes waveRipple { 
          0% { transform: translateY(0) scale(1); opacity: 0.9; } 
          50% { transform: translateY(-0.5px) scale(1.01); opacity: 0.7; }
          100% { transform: translateY(0) scale(1); opacity: 0.9; } 
        }
        
        @keyframes waterReflection { 
          0% { transform: translateX(0) scaleX(1); opacity: 0.8; } 
          50% { transform: translateX(-10px) scaleX(1.02); opacity: 0.6; }
          100% { transform: translateX(-20px) scaleX(1); opacity: 0.8; } 
        }
        
        @keyframes surfaceShimmer { 
          0% { opacity: 0.8; transform: translateY(0); }
          25% { opacity: 1; transform: translateY(-0.5px); }
          50% { opacity: 0.9; transform: translateY(0); }
          75% { opacity: 0.7; transform: translateY(0.5px); }
          100% { opacity: 0.8; transform: translateY(0); }
        }

        /* === ANIMACIONES DE BURBUJAS MEJORADAS === */
        @keyframes bubbleUp { 
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          10% { opacity: 0.8; transform: scale(1); }
          90% { opacity: 0.6; }
          100% { transform: translateY(-${h - 14}px) scale(0.3); opacity: 0; } 
        }
        
        @keyframes bubbleFloat { 
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(3px) translateY(-1px); }
          50% { transform: translateX(0) translateY(-2px); }
          75% { transform: translateX(-3px) translateY(-1px); }
          100% { transform: translateX(0) translateY(0); }
        }

        /* === ANIMACIONES DE LLENADO === */
        @keyframes fillRipple { 
          0% { transform: scale(0.8) translateY(0); opacity: 0.8; }
          50% { transform: scale(1.1) translateY(-2px); opacity: 0.6; }
          100% { transform: scale(1.2) translateY(-4px); opacity: 0; }
        }
        
        @keyframes fillWave { 
          0% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-5px) scaleY(1.2); }
          100% { transform: translateY(-8px) scaleY(1.4); }
        }

        /* === ANIMACIONES DE FLUJO MEJORADAS === */
        @keyframes waterFlow { 
          0% { transform: translateX(-30px) translateY(0); opacity: 0.3; }
          25% { transform: translateX(-15px) translateY(-1px); opacity: 0.7; }
          50% { transform: translateX(0) translateY(-2px); opacity: 0.9; }
          75% { transform: translateX(15px) translateY(-1px); opacity: 0.7; }
          100% { transform: translateX(30px) translateY(0); opacity: 0.3; }
        }
        
        @keyframes streamEffect { 
          0% { transform: translateY(0) scaleY(1) scaleX(1); opacity: 0.8; }
          50% { transform: translateY(5px) scaleY(1.1) scaleX(1.05); opacity: 0.6; }
          100% { transform: translateY(10px) scaleY(1.2) scaleX(1.1); opacity: 0.3; }
        }
        
        @keyframes flowRipple { 
          0% { transform: scale(0.8) translateY(0); opacity: 0.6; }
          50% { transform: scale(1.1) translateY(-2px); opacity: 0.8; }
          100% { transform: scale(1.3) translateY(-4px); opacity: 0.2; }
        }

        /* === CLASES DE ANIMACIÓN === */
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

        /* === CLASES DEL AGUA REALISTAS === */
        .wave1 { 
          animation: waveShift 8s linear infinite, 
                     waveBob 6s ease-in-out infinite,
                     surfaceShimmer 4s ease-in-out infinite; 
        }
        
        .wave2 { 
          animation: waveShift 10s linear infinite reverse, 
                     waveBob 8s ease-in-out infinite, 
                     waterReflection 12s ease-in-out infinite;
        }
        
        .wave3 { 
          animation: waveShift 9s linear infinite, 
                     waveBob 7s ease-in-out infinite,
                     waveRipple 6s ease-in-out infinite;
        }

        /* === CLASES DE BURBUJAS === */
        .bubble-small { 
          animation: bubbleUp 4s ease-in infinite, bubbleFloat 2.5s ease-in-out infinite;
        }

        /* === CLASES DE EFECTOS === */
        .water-surface { 
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.3));
        }
        
        .fill-effect { 
          animation: fillRipple 2s ease-out infinite;
        }
        
        .flow-effect { 
          animation: waterFlow 4s linear infinite, 
                     streamEffect 3s ease-in-out infinite,
                     flowRipple 2s ease-in-out infinite;
        }
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

            {/* Gradiente principal del agua - más contrastante */}
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
              <stop offset="20%" stopColor="#0284c7" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#0369a1" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#075985" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="1" />
            </linearGradient>

            {/* Gradiente de superficie muy visible */}
            <linearGradient id={`${gradId}-surface`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#e0f2fe" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#7dd3fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
            </linearGradient>

            {/* Gradiente de ondas principales */}
            <linearGradient id={`${gradId}-waves`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
            </linearGradient>

            {/* Gradiente de reflexión */}
            <linearGradient id={`${gradId}-reflection`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.2" />
            </linearGradient>

            {/* Gradiente de profundidad */}
            <linearGradient id={`${gradId}-depth`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Agua recortada con múltiples capas */}
          <g clipPath={`url(#${clipId})`}>
            {/* Base del agua con gradiente */}
            <rect 
              x={x} 
              y={waterTop} 
              width={w} 
              height={y + h - waterTop} 
              fill={`url(#${gradId})`} 
              className="water-surface"
            />
            
            {/* Sombra interna para dar profundidad */}
            <rect 
              x={x + 2} 
              y={waterTop + 2} 
              width={w - 4} 
              height={y + h - waterTop - 4} 
              fill="rgba(0, 0, 0, 0.1)"
              opacity="0.3"
            />

            {/* Superficie del agua - más visible y realista */}
            <g transform={`translate(${x}, ${waterTop - 8})`}>
              {/* Línea de superficie principal - muy visible */}
              <path 
                className="wave1" 
                d={wavePath(w + 240, 6, 32, 0.8)} 
                fill={`url(#${gradId}-surface)`} 
                opacity="1"
              />
              
              {/* Segunda capa de ondas */}
              <path 
                className="wave2" 
                d={wavePath(w + 240, 4, 24, 0.6)} 
                fill={`url(#${gradId}-waves)`} 
                opacity="0.8"
              />
              
              {/* Tercera capa sutil */}
              <path 
                className="wave3" 
                d={reflectionWavePath(w + 240, 3, 40)} 
                fill={`url(#${gradId}-reflection)`} 
                opacity="0.6"
              />
            </g>

            {/* Línea de superficie visible para marcar el nivel exacto */}
            <line
              x1={x}
              y1={waterTop}
              x2={x + w}
              y2={waterTop}
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2"
              className="water-surface"
            />

            {/* Efectos de llenado cuando el nivel cambia */}
            {level > 0 && level < 100 && (
              <g transform={`translate(${x + w/2}, ${waterTop + 5})`}>
                <circle
                  r="10"
                  fill="rgba(255, 255, 255, 0.3)"
                  className="fill-effect"
                />
              </g>
            )}

            {/* Efectos de flujo internos (dentro del agua) */}
            {flowEffects}

            {/* Burbujas mejoradas */}
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

// Función mejorada para crear ondas más naturales
function wavePath(width = 200, amp = 10, period = 24, complexity = 1) {
  const step = period / 4; // Más puntos para suavidad
  const midY = amp;
  let d = `M 0 ${midY}`;
  
  for (let xx = 0; xx <= width + step; xx += step) {
    // Múltiples frecuencias para ondas más naturales
    const wave1 = Math.sin((xx / period) * Math.PI * 2) * amp * 0.6;
    const wave2 = Math.sin((xx / (period * 0.7)) * Math.PI * 2) * amp * 0.3;
    const wave3 = Math.sin((xx / (period * 1.3)) * Math.PI * 2) * amp * 0.1;
    
    const yy = midY + (wave1 + wave2 + wave3) * complexity;
    d += ` L ${xx} ${yy}`;
  }
  
  // Cerrar la forma con una línea suave
  d += ` L ${width} ${amp * 2 + 40} L 0 ${amp * 2 + 40} Z`;
  return d;
}

// Función para ondas de reflexión más sutiles
function reflectionWavePath(width = 200, amp = 6, period = 32) {
  const step = period / 3;
  const midY = amp;
  let d = `M 0 ${midY}`;
  
  for (let xx = 0; xx <= width + step; xx += step) {
    // Ondas más suaves para reflexión
    const wave1 = Math.sin((xx / period) * Math.PI * 2) * amp * 0.4;
    const wave2 = Math.cos((xx / (period * 1.5)) * Math.PI * 2) * amp * 0.2;
    
    const yy = midY + wave1 + wave2;
    d += ` L ${xx} ${yy}`;
  }
  
  d += ` L ${width} ${amp * 2 + 30} L 0 ${amp * 2 + 30} Z`;
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
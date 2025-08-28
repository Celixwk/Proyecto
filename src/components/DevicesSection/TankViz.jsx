// src/components/DevicesSection/TankViz.jsx
import React from "react";

/**
 * Props:
 * - level: 0..100 (porcentaje)
 * - capacityLiters: número (ej. 500)
 * - valveOpen: boolean (true = abierta)
 * - trend: "up" | "down" | "steady"
 */
export default function TankViz({
  level = 50,
  capacityLiters = 500,
  valveOpen = false,
  trend = "steady",
}) {
  const clamped = Math.max(0, Math.min(100, level));
  const liters = Math.round((clamped / 100) * capacityLiters);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      {/* CSS local para las animaciones */}
      <style>{`
        .tviz-wrap { position: relative; height: 240px; }
        .tviz-tank {
          position: absolute; inset: 8px 18px 8px 8px;
          border-radius: 16px; border: 2px solid #e5e7eb; overflow: hidden;
          background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
        }
        .tviz-water {
          position: absolute; left:0; right:0; bottom:0;
          background: linear-gradient(180deg, #60a5fa 0%, #2563eb 100%);
          transition: height 600ms ease;
        }
        /* Onda superficial */
        .tviz-wave {
          position:absolute; left:-20%; right:-20%; top:-18px; height:40px;
          background: radial-gradient(40px 22px at 20px 20px, rgba(255,255,255,.9) 40%, rgba(255,255,255,0) 41%) repeat-x;
          background-size: 40px 22px;
          opacity:.35;
          animation: tviz-wave 4s linear infinite;
        }
        .tviz-wave2 {
          top:-12px; opacity:.25; animation-duration: 6.5s; animation-direction: reverse;
        }
        @keyframes tviz-wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(40px); }
        }

        /* Barrita lateral de la válvula */
        .tviz-valve {
          position:absolute; top:12px; bottom:12px; right:6px; width:10px; border-radius:10px; overflow:hidden;
        }
        .tviz-valve.open { background: linear-gradient(180deg, #34d399, #059669); }
        .tviz-valve.closed { background: linear-gradient(180deg, #fb7185, #ef4444); }
        .tviz-valve .flow {
          position:absolute; inset:0;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,.7), transparent);
          background-size: 100% 120%;
          opacity:.6;
          animation: tviz-flow 1.2s linear infinite;
        }
        .tviz-valve.closed .flow {
          animation: tviz-pulse 1.2s ease-in-out infinite;
          background: rgba(255,255,255,.35);
        }
        @keyframes tviz-flow {
          0% { background-position-y: 120%; }
          100% { background-position-y: -20%; }
        }
        @keyframes tviz-pulse {
          0%,100% { opacity:.3; } 50% { opacity:.8; }
        }

        /* Burbujas (nivel subiendo) */
        .tviz-bubble {
          position:absolute; bottom:8px; left:25%; width:8px; height:8px;
          border-radius:9999px; background: rgba(255,255,255,.9);
          animation: tviz-bubble 2.2s ease-in infinite;
        }
        .tviz-bubble:nth-child(2) { left:48%; animation-delay: .4s; }
        .tviz-bubble:nth-child(3) { left:70%; animation-delay: .9s; }
        @keyframes tviz-bubble {
          0% { transform: translateY(0) scale(1); opacity:.9; }
          80% { opacity:.6; }
          100% { transform: translateY(-120px) scale(.6); opacity:0; }
        }

        /* Goteo (nivel bajando) */
        .tviz-drop {
          position:absolute; top:-16px; left:50%; margin-left:-6px;
          width:12px; height:18px;
          background: #60a5fa; border-radius: 50% 50% 60% 60%/55% 55% 45% 45%;
          box-shadow: inset 0 0 4px rgba(255,255,255,.7);
          animation: tviz-drop 1.6s ease-in infinite;
        }
        .tviz-drop:nth-child(2) { left:30%; animation-delay:.5s; }
        .tviz-drop:nth-child(3) { left:70%; animation-delay:1s; }
        @keyframes tviz-drop {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: .95; }
          100% { transform: translateY(120px) scale(.9); opacity: 0; }
        }
      `}</style>

      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700">
          Tanque ({capacityLiters} L)
        </h4>
        <div className="text-xs text-gray-500">
          {liters} L • {clamped}% {trend === "up" ? "↗" : trend === "down" ? "↘" : ""}
        </div>
      </div>

      <div className="tviz-wrap">
        {/* Contenedor visual del tanque */}
        <div className="tviz-tank">
          {/* Contenido de agua */}
          <div
            className="tviz-water"
            style={{ height: `${clamped}%` }}
          >
            {/* Olas superficiales */}
            <div className="tviz-wave" />
            <div className="tviz-wave tviz-wave2" />

            {/* Partículas según tendencia */}
            {trend === "up" && (
              <>
                <div className="tviz-bubble" />
                <div className="tviz-bubble" />
                <div className="tviz-bubble" />
              </>
            )}
            {trend === "down" && (
              <>
                <div className="tviz-drop" />
                <div className="tviz-drop" />
                <div className="tviz-drop" />
              </>
            )}
          </div>
        </div>

        {/* Barrita de estado (válvula) */}
        <div className={`tviz-valve ${valveOpen ? "open" : "closed"}`}>
          <div className="flow" />
        </div>
      </div>
    </div>
  );
}

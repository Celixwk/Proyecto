// src/components/DevicesSection/SystemDetailsModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  X, MapPin, Wifi, Clock, Download, PlusCircle,
  Droplets, Activity, Settings
} from "lucide-react";
import TankViz from "@/components/DevicesSection/TankViz";

const HIST_KEY = "gd_history";
const MAX_ROWS = 500;

/** Carga historial para un sistema */
function loadHistoryFor(systemId) {
  try {
    const map = JSON.parse(localStorage.getItem(HIST_KEY) ?? "{}");
    const arr = Array.isArray(map[systemId]) ? map[systemId] : [];
    return arr.map((r) => ({ ...r, ts: new Date(r.ts) })); // ISO -> Date
  } catch {
    return [];
  }
}

/** Guarda historial para un sistema */
function saveHistoryFor(systemId, rows) {
  try {
    const map = JSON.parse(localStorage.getItem(HIST_KEY) ?? "{}");
    map[systemId] = rows.map((r) => ({
      ...r,
      ts: r.ts instanceof Date ? r.ts.toISOString() : r.ts, // Date -> ISO
    }));
    localStorage.setItem(HIST_KEY, JSON.stringify(map));
  } catch {}
}

// Icono por módulo
const iconFor = (key) => (key === "nivel" ? Droplets : key === "sensor" ? Activity : Settings);

export default function SystemDetailsModal({ open, onClose, system }) {
  const [rows, setRows] = useState([]);

  // Nivel actual (para el tanque animado)
  const currentLevel = Math.round(rows.at(-1)?.nivel ?? 60);

  // ---- NUEVO: válvula abierta y tendencia del nivel (para animaciones) ----
  const last = rows.at(-1) || {};
  const prev = rows.at(-2) || null;
  const valveOpen = String(last.valvula || "").toLowerCase() === "abierta";
  const trend = prev
    ? last.nivel > prev.nivel
      ? "up"
      : last.nivel < prev.nivel
      ? "down"
      : "steady"
    : "steady";
  // ------------------------------------------------------------------------

  // Semilla de registros de ejemplo (si no hay persistidos)
  const seedRows = useMemo(() => {
    const out = [];
    const now = Date.now();
    for (let i = 0; i < 30; i++) {
      out.push({
        ts: new Date(now - i * 60 * 60 * 1000), // cada hora
        nivel: Math.max(0, Math.min(100, 50 + Math.round(Math.sin(i / 3) * 15) + (i % 7))),
        sensor: Math.max(0, Math.round(35 + Math.cos(i / 2) * 3 + (i % 5) * 0.3)), // cm
        valvula: i % 2 === 0 ? "Abierta" : "Cerrada",
        signal: Math.max(50, 90 - (i % 9) * 2),
        note: "—",
      });
    }
    return out.reverse();
  }, []);

  // Cargar historial (persistido o seed) cuando se abre
  useEffect(() => {
    if (!open || !system?.id) return;
    const persisted = loadHistoryFor(system.id);
    setRows(persisted.length ? persisted : seedRows);
  }, [open, system?.id, seedRows]);

  // Guardar historial cuando cambie
  useEffect(() => {
    if (!open || !system?.id) return;
    saveHistoryFor(system.id, rows);
  }, [open, system?.id, rows]);

  if (!open || !system) return null;

  const statusOk = (system.controller?.status || "offline") === "online";
  const statusChip = statusOk ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700";

  // Agregar un registro de ejemplo (útil mientras no llega telemetría real)
  const addFakeRow = () => {
    setRows((prev) => {
      const next = [
        ...prev,
        {
          ts: new Date(),
          nivel: Math.max(0, Math.min(100, (prev.at(-1)?.nivel ?? 60) + (Math.random() * 6 - 3))),
          sensor: Math.max(0, (prev.at(-1)?.sensor ?? 35) + (Math.random() * 1.5 - 0.7)),
          valvula: Math.random() > 0.5 ? "Abierta" : "Cerrada",
          signal: Math.max(40, Math.min(100, (prev.at(-1)?.signal ?? 80) + (Math.random() * 10 - 5))),
          note: "—",
        },
      ];
      if (next.length > MAX_ROWS) next.splice(0, next.length - MAX_ROWS);
      return next;
    });
  };

  const exportCSV = () => {
    const header = "Fecha/Hora,Nivel (%),Sensor (cm),Válvula,Señal (%),Nota\n";
    const lines = rows
      .map((r) =>
        [
          r.ts.toLocaleString(),
          String(Math.round(r.nivel)),
          String(Number(r.sensor ?? 0).toFixed(1)),
          r.valvula,
          String(Math.round(r.signal)),
          r.note,
        ].join(",")
      )
      .join("\n");
    const blob = new Blob([header + lines], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `historial_${system.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Layout: header / body (scroll) / footer */}
        <div className="grid max-h-[85vh] grid-rows-[auto_1fr_auto]">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold">
                Detalles de {system.name || "Sistema"}
              </h3>
              <p className="text-xs text-gray-500">{system.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs ${statusChip}`}>
                {statusOk ? "En línea" : "Fuera de línea"}
              </span>
              <button
                aria-label="Cerrar"
                onClick={onClose}
                className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body (scrollable) */}
          <div className="overflow-y-auto p-4">
            {/* Arriba: tanque + panel derecho */}
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <TankViz
                level={currentLevel}
                capacityLiters={500}
                valveOpen={valveOpen}   
                trend={trend}           
              />

              <div className="grid gap-4">
                <div className="rounded-xl border p-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">Resumen del sistema</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {system.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Wifi className="h-4 w-4 text-gray-400" />
                      Señal: {system.controller?.signal ?? 0}%
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-4 w-4 text-gray-400" />
                      Actualizado:{" "}
                      {system.controller?.lastSeen
                        ? new Date(system.controller.lastSeen).toLocaleString()
                        : "—"}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      ID: <span className="font-mono text-xs">{system.id}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border p-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">Módulos</h4>
                  <div className="flex flex-wrap gap-2">
                    {(system.modules || []).map((m, idx) => {
                      const Icon = iconFor(m.key);
                      const chip =
                        m.status === "online"
                          ? "bg-green-100 text-green-700"
                          : "bg-rose-100 text-rose-700";
                      return (
                        <div
                          key={`${m.key}-${idx}`}
                          className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs ${chip}`}
                          title={`${m.name} • Señal ${m.signal ?? 0}%`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span className="font-medium">{m.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Historial + acciones */}
            <div className="rounded-xl border">
              <div className="flex items-center justify-between gap-3 border-b p-3">
                <h4 className="text-sm font-semibold text-gray-700">Historial de telemetría</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addFakeRow}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                    title="Agregar un registro de ejemplo"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Simular registro
                  </button>
                  <button
                    onClick={exportCSV}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                    title="Exportar CSV"
                  >
                    <Download className="h-4 w-4" />
                    Exportar CSV
                  </button>
                </div>
              </div>

              <div className="max-h-[50vh] overflow-auto">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">Fecha / hora</th>
                      <th className="px-4 py-2 text-right">Nivel (%)</th>
                      <th className="px-4 py-2 text-right">Sensor (cm)</th>
                      <th className="px-4 py-2 text-left">Válvula</th>
                      <th className="px-4 py-2 text-right">Señal (%)</th>
                      <th className="px-4 py-2 text-left">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.ts instanceof Date ? r.ts.getTime() : i} className="border-t">
                        <td className="px-4 py-2">{r.ts.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right">{Math.round(r.nivel)}</td>
                        <td className="px-4 py-2 text-right">{Number(r.sensor ?? 0).toFixed(1)}</td>
                        <td className="px-4 py-2">{r.valvula}</td>
                        <td className="px-4 py-2 text-right">{Math.round(r.signal)}</td>
                        <td className="px-4 py-2">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t p-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

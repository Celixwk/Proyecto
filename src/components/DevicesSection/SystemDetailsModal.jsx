// src/components/DevicesSection/SystemDetailsModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  X, MapPin, Wifi, Clock, PlusCircle,
  Droplets, Activity, Settings, Calendar, ChevronLeft, ChevronRight,
  Lock, Unlock // ⬅️ NEW
} from "lucide-react";
import TankViz from "@/components/DevicesSection/TankViz";

const HIST_KEY = "gd_history";
const MAX_ROWS = 500;
const PAGE_SIZE = 10; // tamaño de página

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

// helpers de fecha/paginación
const pad2 = (n) => String(n).padStart(2, "0");
const dateKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; // yyyy-mm-dd

function getPageNumbers(total, current) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push("…");
  const middle = [current - 1, current, current + 1].filter(
    (p) => p > 1 && p < total
  );
  pages.push(...middle);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function SystemDetailsModal({ open, onClose, system }) {
  const [rows, setRows] = useState([]);

  // Nivel actual (para el tanque animado)
  const currentLevel = Math.round(rows.at(-1)?.nivel ?? 60);

  // Tendencia y estado de válvula
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

  // Semilla
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

  // fecha seleccionada y página
  const [selectedDate, setSelectedDate] = useState(null);
  const [page, setPage] = useState(1);

  // Cargar historial
  useEffect(() => {
    if (!open || !system?.id) return;
    const persisted = loadHistoryFor(system.id);
    const initial = persisted.length ? persisted : seedRows;
    setRows(initial);
    const lastDate = initial.at(-1)?.ts || new Date();
    setSelectedDate(new Date(lastDate));
    setPage(1);
  }, [open, system?.id, seedRows]);

  // Guardar
  useEffect(() => {
    if (!open || !system?.id) return;
    saveHistoryFor(system.id, rows);
  }, [open, system?.id, rows]);

  // Filtro por día
  const filteredRows = useMemo(() => {
    if (!selectedDate) return rows;
    const key = dateKey(selectedDate);
    return rows.filter((r) => dateKey(r.ts) === key);
  }, [rows, selectedDate]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  useEffect(() => setPage(1), [selectedDate, rows]);
  const pageRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, page]);

  if (!open || !system) return null;

  const statusOk = (system.controller?.status || "offline") === "online";
  const statusChip = statusOk ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700";

  // Simular registro (igual que antes)
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

  // ⬅️ NEW: Abrir/Cerrar válvula con efecto sobre el nivel
  const toggleValve = () => {
    setRows((prev) => {
      const last = prev.at(-1) || {};
      const wasOpen = String(last.valvula || "").toLowerCase() === "abierta";
      const willOpen = !wasOpen;

      const prevLevel = Number(last.nivel ?? 60);
      // si abrimos: sube 2–4%; si cerramos: variación mínima -0.5..+0.5%
      const delta = willOpen ? (1.5 + Math.random() * 2.5) : (Math.random() * 1 - 0.5);
      const nextLevel = Math.max(0, Math.min(100, prevLevel + delta));

      const next = [
        ...prev,
        {
          ts: new Date(),
          nivel: nextLevel,
          sensor: Math.max(0, (last.sensor ?? 35) + (Math.random() * 1.2 - 0.6)),
          valvula: willOpen ? "Abierta" : "Cerrada",
          signal: Math.max(40, Math.min(100, (last.signal ?? 80) + (Math.random() * 6 - 3))),
          note: "—",
        },
      ];
      if (next.length > MAX_ROWS) next.splice(0, next.length - MAX_ROWS);

      // Mostrar el nuevo registro (hoy) y resetear a página 1
      const now = new Date();
      setSelectedDate((d) => (!d || dateKey(d) !== dateKey(now) ? now : d));
      setPage(1);

      return next;
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">
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

          {/* Body */}
          <div className="overflow-y-auto p-4">
            {/* Tanque + resumen */}
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
              <div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
                <h4 className="text-sm font-semibold text-gray-700">Historial de telemetría</h4>

                <div className="flex flex-wrap items-center gap-2">
                  {/* ⬅️ NEW: Abrir/Cerrar válvula */}
                  <button
                    onClick={toggleValve}
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs
                      ${valveOpen
                        ? "border border-rose-200 text-rose-700 hover:bg-rose-50"
                        : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"}`}
                    title={valveOpen ? "Cerrar válvula" : "Abrir válvula"}
                  >
                    {valveOpen ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                    {valveOpen ? "Cerrar válvula" : "Abrir válvula"}
                  </button>

                  {/* Simular registro */}
                  <button
                    onClick={addFakeRow}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                    title="Agregar un registro de ejemplo"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Simular registro
                  </button>

                  {/* Selector de fecha */}
                  <div className="relative inline-flex items-center rounded-md border px-2 py-1.5 text-xs text-gray-700">
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      className="bg-transparent outline-none"
                      value={selectedDate ? dateKey(selectedDate) : ""}
                      onChange={(e) => {
                        if (!e.target.value) return;
                        setSelectedDate(new Date(e.target.value));
                      }}
                    />
                  </div>

                  {/* Paginación */}
                  <nav className="inline-flex items-center gap-1">
                    <button
                      className="rounded-md border px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {getPageNumbers(totalPages, page).map((p, idx) =>
                      p === "…" ? (
                        <span key={`dots-${idx}`} className="px-2 text-xs text-gray-400">…</span>
                      ) : (
                        <button
                          key={`p-${p}`}
                          onClick={() => setPage(p)}
                          className={`rounded-md border px-2 py-1.5 text-xs ${
                            p === page ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}

                    <button
                      className="rounded-md border px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </nav>
                </div>
              </div>

              {/* Tabla paginada */}
              <div className="max-h-[50vh] overflow-auto">
                {pageRows.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-500">
                    Sin registros para la fecha seleccionada.
                  </div>
                ) : (
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
                      {pageRows.map((r, i) => (
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
                )}
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

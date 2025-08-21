import React, { useEffect, useMemo, useState } from "react";
import { Radar, RefreshCw, Plus, MapPin, Wifi, Power, Clock } from "lucide-react";

const LS_KEY = "gd_devices";

const loadDevices = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
};
const saveDevices = (arr) => {
  try { localStorage.setItem(LS_KEY, JSON.stringify(arr)); } catch {}
};

// (opcional) seed de demo si está vacío
const seedIfEmpty = () => {
  const cur = loadDevices();
  if (cur.length) return cur;
  const seed = [
    { id:"dev-001", name:"Tanque 500L", type:"nivel",    status:"online",  location:"Bloque A • Lab 1", signal:92, lastSeen:new Date().toISOString() },
    { id:"dev-002", name:"Sensor HC-SR04", type:"sensor",  status:"offline", location:"Bloque B • Sala 3", signal:0,  lastSeen:new Date(Date.now()-42*60*1000).toISOString() },
    { id:"dev-003", name:"Válvula Solenoide", type:"actuador", status:"online",  location:"Planta piloto",       signal:77, lastSeen:new Date(Date.now()-3*60*1000).toISOString() },
  ];
  saveDevices(seed);
  return seed;
};

const timeAgo = (iso) => {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff/60000);
    if (m < 1) return "ahora";
    if (m < 60) return `${m} min`;
    const h = Math.floor(m/60);
    if (h < 24) return `${h} h`;
    const d = Math.floor(h/24);
    return `${d} d`;
  } catch { return "—"; }
};

export default function DevicesSection() {
  const [devices, setDevices] = useState([]);

  useEffect(() => { setDevices(seedIfEmpty()); }, []);
  const metrics = useMemo(() => {
    const total = devices.length;
    const online = devices.filter(d => d.status === "online").length;
    return { total, online, offline: total - online };
  }, [devices]);

  const refresh = () => setDevices(loadDevices());

  return (
    <div className="max-w-6xl mx-auto">
      {/* Título + acciones */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">Dispositivos</h1>
        <div className="flex items-center gap-2">
          <button onClick={refresh} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" /> Refrescar
          </button>
          <button
            onClick={() => {
              const next = [
                ...devices,
                { id:`dev-${Math.random().toString(36).slice(2,7)}`, name:"Dispositivo nuevo", type:"sensor", status:"online", location:"Ubicación", signal:65, lastSeen:new Date().toISOString() },
              ];
              saveDevices(next); setDevices(next);
            }}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Agregar dispositivo
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-gray-500">Total</p>
          <p className="mt-1 text-2xl font-semibold">{metrics.total}</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-gray-500">En línea</p>
          <p className="mt-1 text-2xl font-semibold text-green-600">{metrics.online}</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-gray-500">Fuera de línea</p>
          <p className="mt-1 text-2xl font-semibold text-rose-600">{metrics.offline}</p>
        </div>
      </div>

      {/* Vacío */}
      {devices.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gray-100">
            <Radar className="h-7 w-7 text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Sin dispositivos</h2>
          <p className="mt-1 text-sm text-gray-600">Cuando conectes tus dispositivos aparecerán aquí.</p>
          <button onClick={refresh} className="mt-5 rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
            Volver a intentar
          </button>
        </div>
      ) : (
        /* Grid de cards */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {devices.map((d) => (
            <article key={d.id} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">
                    <Radar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{d.name}</h3>
                    <p className="text-xs text-gray-500 capitalize">{d.type}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${d.status === "online" ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"}`}>
                  {d.status === "online" ? "En línea" : "Fuera de línea"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" /> <span className="truncate" title={d.location}>{d.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Wifi className="h-4 w-4 text-gray-400" /> Señal: {d.signal}%
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-4 w-4 text-gray-400" /> Hace {timeAgo(d.lastSeen)}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Power className="h-4 w-4 text-gray-400" /> ID: <span className="font-mono text-xs">{d.id}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button className="rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50">Ver detalles</button>
                <button
                  className="rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50"
                  onClick={() => { const next = devices.filter(x => x.id !== d.id); saveDevices(next); setDevices(next); }}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

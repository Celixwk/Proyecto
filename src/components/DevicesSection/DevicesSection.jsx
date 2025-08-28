import React, { useEffect, useMemo, useState } from "react";
import {
  Radar, RefreshCw, Plus, MapPin, Wifi, Power, Clock,
  Droplets, Activity, Settings, Wrench
} from "lucide-react";
import FirmwareModal from "@/components/DevicesSection/FirmwareModal";
import SystemDetailsModal from "@/components/DevicesSection/SystemDetailsModal";
const LS_KEY = "gd_systems";

const loadSystems = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
};
const saveSystems = (arr) => {
  try { localStorage.setItem(LS_KEY, JSON.stringify(arr)); } catch {}
};

// MIGRACIÓN: junta los 3 dispositivos sueltos (gd_devices) en 1 sistema con controller (ESP32)
const migrateLegacyIfNeeded = () => {
  try {
    const legacy = JSON.parse(localStorage.getItem("gd_devices") || "[]");
    const current = loadSystems();
    if (current.length || !Array.isArray(legacy) || legacy.length === 0) return;

    const modules = [];
    const pick = (type, fallbackName) => {
      const found = legacy.find(d => (d.type || "").toLowerCase().includes(type));
      if (!found) return null;
      return {
        key: type, // "nivel" | "sensor" | "actuador"
        name: found.name || fallbackName,
        status: found.status || "online",
        signal: found.signal ?? 0,
        location: found.location || "",
        lastSeen: found.lastSeen || new Date().toISOString(),
      };
    };
    const mTank   = pick("nivel",    "Tanque 500L");
    const mSensor = pick("sensor",   "Sensor HC-SR04");
    const mValve  = pick("actuador", "Válvula Solenoide");
    if (mTank)   modules.push(mTank);
    if (mSensor) modules.push(mSensor);
    if (mValve)  modules.push(mValve);

    // Controller (ESP32) derivado: online si alguno online; señal = máx; lastSeen más reciente.
    const anyOnline = legacy.some(d => d.status === "online");
    const bestSignal = Math.max(0, ...legacy.map(d => d.signal ?? 0));
    const lastSeen = legacy
      .map(d => new Date(d.lastSeen || Date.now()).getTime())
      .reduce((a, b) => Math.max(a, b), Date.now());

    const system = {
      id: "sys-" + Math.random().toString(36).slice(2, 8),
      name: "Sistema de Agua #1",
      location: mTank?.location || mSensor?.location || mValve?.location || "Planta piloto",
      createdAt: new Date().toISOString(),
      controller: {
        status: anyOnline ? "online" : "offline",
        signal: bestSignal,
        lastSeen: new Date(lastSeen).toISOString(),
      },
      modules,
    };

    saveSystems([system]);
    // Opcional: limpiar lo viejo
    // localStorage.removeItem("gd_devices");
  } catch {}
};

// SEED de demo si no hay nada
const seedIfEmpty = () => {
  const cur = loadSystems();
  if (cur.length) return cur;

  const demo = [{
    id: "sys-001",
    name: "Sistema de Agua #1",
    location: "Planta piloto",
    createdAt: new Date().toISOString(),
    controller: {
      status: "online",
      signal: 88,
      lastSeen: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    modules: [
      {
        key: "nivel", name: "Tanque 500L", status: "online", signal: 92,
        location: "Bloque A • Lab 1",
        lastSeen: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        key: "sensor", name: "Sensor HC-SR04", status: "offline", signal: 0,
        location: "Bloque B • Sala 3",
        lastSeen: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        key: "actuador", name: "Válvula Solenoide", status: "online", signal: 77,
        location: "Planta piloto",
        lastSeen: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  }];

  saveSystems(demo);
  return demo;
};

const timeAgo = (iso) => {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "ahora";
    if (m < 60) return `${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} h`;
    const d = Math.floor(h / 24);
    return `${d} d`;
  } catch { return "—"; }
};

const ModuleChip = ({ m }) => {
  const Icon =
    m.key === "nivel" ? Droplets :
    m.key === "sensor" ? Activity :
    Settings;
  const color =
    m.status === "online" ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${color}`}>
      <Icon className="h-3.5 w-3.5" />
      {m.name}
    </span>
  );
};

export default function DevicesSection() {
  const [systems, setSystems] = useState([]);
  const [openFw, setOpenFw] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);


  useEffect(() => {
    migrateLegacyIfNeeded();
    setSystems(seedIfEmpty());
  }, []);

  // MÉTRICAS desde controller
  const metrics = useMemo(() => {
    const total = systems.length;
    const online = systems.filter(sys => sys.controller?.status === "online").length;
    const offline = total - online;
    return { total, online, offline };
  }, [systems]);

  const refresh = () => setSystems(loadSystems());

  const addSystem = () => {
    const next = [
      ...systems,
      {
        id: "sys-" + Math.random().toString(36).slice(2, 8),
        name: `Sistema de Agua #${systems.length + 1}`,
        location: "Planta piloto",
        createdAt: new Date().toISOString(),
        controller: {
          status: "online",
          signal: 80,
          lastSeen: new Date().toISOString(),
        },
        modules: [
          { key: "nivel", name: "Tanque 500L", status: "online", signal: 90, location: "Bloque A", lastSeen: new Date().toISOString() },
          { key: "sensor", name: "Sensor HC-SR04", status: "online", signal: 88, location: "Bloque A", lastSeen: new Date().toISOString() },
          { key: "actuador", name: "Válvula Solenoide", status: "online", signal: 86, location: "Bloque A", lastSeen: new Date().toISOString() },
        ],
      }
    ];
    saveSystems(next);
    setSystems(next);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Título + acciones */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">Dispositivos</h1>
        <div className="flex items-center gap-2">
          <button onClick={refresh} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" /> Refrescar
          </button>
          <button onClick={addSystem} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Agregar sistema
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
      {systems.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gray-100">
            <Radar className="h-7 w-7 text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Sin sistemas</h2>
          <p className="mt-1 text-sm text-gray-600">Cuando conectes tu ESP32 aparecerá aquí.</p>
          <button onClick={refresh} className="mt-5 rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
            Volver a intentar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {systems.map((sys) => {
            const online = sys.controller?.status === "online";
            const statusClass = online ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700";
            const statusLabel = online ? "En línea" : "Fuera de línea";
            const refSignal = sys.controller?.signal ?? 0;
            const lastSeen = sys.controller?.lastSeen || sys.modules[0]?.lastSeen;

            return (
              <article key={sys.id} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">
                      <Radar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{sys.name}</h3>
                      <p className="text-xs text-gray-500">{sys.location}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${statusClass}`}>
                    {statusLabel}
                  </span>
                </div>

                {/* Módulos */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {sys.modules.map((m, i) => (<ModuleChip key={i} m={m} />))}
                </div>

                {/* Info rápida (desde controller) */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400" /> <span className="truncate" title={sys.location}>{sys.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Wifi className="h-4 w-4 text-gray-400" /> Señal: {refSignal}%
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-4 w-4 text-gray-400" /> Actualizado: {timeAgo(lastSeen)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Power className="h-4 w-4 text-gray-400" /> ID: <span className="font-mono text-xs">{sys.id}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  {(() => {
                    const btn = {
                      primary:
                        "inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-xs text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300",
                      outline:
                        "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200",
                      danger:
                        "inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200",
                    };

                    return (
                      <>
                        <button
                          className={btn.primary}
                          onClick={() => {
                            setCurrentSystem(sys);
                            setOpenDetails(true);
                          }}
                        >
                          Ver detalles
                        </button>

                        <button
                          className={btn.outline}
                          onClick={() => {
                            setCurrentSystem(sys);
                            setOpenFw(true);
                          }}
                        >
                          Configurar
                        </button>

                        <button
                          className={btn.danger}
                          onClick={() => {
                            const next = systems.filter((x) => x.id !== sys.id);
                            saveSystems(next);
                            setSystems(next);
                          }}
                        >
                          Eliminar
                        </button>
                      </>
                    );
                  })()}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <FirmwareModal
        open={openFw}
        onClose={() => setOpenFw(false)}
        device={currentSystem}
      />

      <SystemDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        system={currentSystem}    
      />
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { Wifi, WifiOff, RefreshCw, MapPin, Activity, Signal, PlugZap } from "lucide-react";

/** Mocks — cámbialos luego por tu fetch real */
const MOCK_DEVICES = [
  {
    id: "tank-500l",
    name: "Tanque 500L",
    type: "tanque",
    location: "Planta A",
    status: "online",
    lastSeen: "hace 2 min",
    metrics: { nivel: "44%", volumen: "220 L" },
  },
  {
    id: "hc-sr04-01",
    name: "Sensor Ultrasonido HC-SR04",
    type: "sensor",
    location: "Planta A",
    status: "online",
    lastSeen: "hace 1 min",
    metrics: { distancia: "64 cm", bateria: "92%" },
  },
  {
    id: "valve-entr",
    name: "Válvula Solenoide Entrada",
    type: "valvula",
    location: "Planta A",
    status: "offline",
    lastSeen: "hace 3 h",
    metrics: { apertura: "0%", ciclos: 1203 },
  },
];

function StatusPill({ status = "offline" }) {
  const online = status === "online";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        online ? "bg-green-50 text-green-700 ring-1 ring-green-200" : "bg-red-50 text-red-700 ring-1 ring-red-200"
      }`}
    >
      {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
      {online ? "En línea" : "Desconectado"}
    </span>
  );
}

function DeviceCard({ d }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{d.name}</h3>
          <p className="text-xs text-gray-500 capitalize">{d.type}</p>
        </div>
        <StatusPill status={d.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="truncate">{d.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 justify-end">
          <Activity className="h-4 w-4 text-gray-400" />
          <span>Última señal: {d.lastSeen}</span>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-gray-50 p-3">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
          <Signal className="h-4 w-4" /> Métricas
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(d.metrics || {}).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-md bg-white px-3 py-2 border">
              <span className="text-gray-600 capitalize">{k}</span>
              <span className="font-medium text-gray-900">{String(v)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">Detalles</button>
        <button className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
          <PlugZap className="h-4 w-4" /> Acciones
        </button>
      </div>
    </div>
  );
}

export default function DevicesPage() {
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState(MOCK_DEVICES); // deja [] para probar vacío

  const totals = useMemo(() => {
    const online = devices.filter((d) => d.status === "online").length;
    return { total: devices.length, online, offline: devices.length - online };
  }, [devices]);

  const refresh = async () => {
    setLoading(true);
    // aquí harías fetch(...) a tu API
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
  };

  // Estado vacío bonito
  if (!loading && devices.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gray-100">
            <WifiOff className="h-6 w-6 text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">No hay dispositivos conectados</h2>
          <p className="mt-1 text-sm text-gray-600">
            Conecta un dispositivo o verifica tu red. También puedes intentar refrescar el listado.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={refresh}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refrescar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* encabezado + resumen */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">Dispositivos</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">Total: {totals.total}</span>
          <span className="rounded-full bg-green-100 px-2.5 py-1 text-green-700">En línea: {totals.online}</span>
          <span className="rounded-full bg-red-100 px-2.5 py-1 text-red-700">Off: {totals.offline}</span>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </button>
        </div>
      </div>

      {/* grilla responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {devices.map((d) => (
          <DeviceCard key={d.id} d={d} />
        ))}
      </div>
    </div>
  );
}

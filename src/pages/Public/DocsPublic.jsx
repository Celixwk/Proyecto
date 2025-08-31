// src/pages/Public/DocsPublic.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Droplets, Radio, Cpu, PlugZap, LayoutGrid, Puzzle, Gauge, Activity, Wrench } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const SECTIONS = [
  { id: "overview",     title: "Visión general",     icon: <LayoutGrid className="h-4 w-4" /> },
  { id: "componentes",  title: "Componentes",        icon: <Puzzle className="h-4 w-4" /> },
  { id: "tanque",       title: "Tanque",             icon: <Gauge className="h-4 w-4" /> },
  { id: "sensor",       title: "Sensor ultrasónico", icon: <Activity className="h-4 w-4" /> },
  { id: "valvula",      title: "Válvula solenoide",  icon: <Wrench className="h-4 w-4" /> },
  { id: "matematicas",  title: "Matemáticas",        icon: <Droplets className="h-4 w-4" /> },
  { id: "aplicaciones", title: "Aplicaciones",       icon: <Radio className="h-4 w-4" /> },
  { id: "dispositivos", title: "Dispositivos/FW",    icon: <Cpu className="h-4 w-4" /> },
];

export default function DocsPublic() {
  const { user } = useAuth();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight">
            Monitoreo de nivel de agua con ESP32
          </h1>
        <p className="mt-3 text-gray-600">
            Plataforma web para visualizar el nivel de un tanque, controlar una válvula solenoide y
            cargar firmware al ESP32 desde tu navegador.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={user ? "/app/overview" : "/login"}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {user ? "Ir al panel" : "Iniciar sesión"}
            </Link>
            {!user && (
              <Link to="/register" className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                Crear cuenta
              </Link>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-6 space-y-2 text-sm text-gray-700">
          <p>• Visual: tanque animado, historial persistente y métricas del sistema.</p>
          <p>• Control: abrir/cerrar válvula, estado en tiempo real.</p>
          <p>• Configuración: Web Serial API para conectar con el ESP32.</p>
        </div>
      </section>

      {/* Índice + contenido largo */}
      <div className="lg:flex lg:items-start lg:gap-10">
        {/* Índice pegajoso */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="sticky top-20 space-y-1">
            <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Índice</p>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                {s.icon}
                <span>{s.title}</span>
              </a>
            ))}
            <a href="#top" className="mt-2 block rounded-md px-2 py-1.5 text-xs text-gray-500 hover:bg-gray-100">
              ↑ Volver arriba
            </a>
          </nav>
        </aside>

        {/* Contenido scrolleable */}
        <article className="min-w-0 flex-1 space-y-12">
          <DocSection id="overview"    title="Visión general">
            <p>
              El sistema une un <strong>ESP32</strong> con un sensor ultrasónico para medir nivel y una
              <strong> válvula solenoide</strong> para control. La web muestra el tanque con animación,
              guarda un historial por sistema en el navegador (localStorage) y permite exportar a CSV.
            </p>
          </DocSection>

          <DocSection id="componentes" title="Componentes">
            <ul className="list-disc pl-6 space-y-1">
              <li>ESP32 (controlador principal).</li>
              <li>HC-SR04 u otro sensor de distancia compatible.</li>
              <li>Válvula solenoide + relevador o driver.</li>
              <li>Fuente apropiada e instalación eléctrica segura.</li>
            </ul>
          </DocSection>

          <DocSection id="tanque" title="Tanque">
            <p>
              La visualización del tanque usa <em>SVG</em> con olas y burbujas. Muestra porcentaje y
              litros estimados (en base a la capacidad configurada). También indica el estado de la válvula.
            </p>
          </DocSection>

          <DocSection id="sensor" title="Sensor ultrasónico">
            <p>
              Medimos la distancia al espejo de agua; con la geometría conocida del tanque, transformamos
              distancia en porcentaje. Es importante filtrar ruido y calibrar el cero/lleno.
            </p>
          </DocSection>

          <DocSection id="valvula" title="Válvula solenoide">
            <p>
              Se controla con un pin del ESP32 vía relevador/driver. En la UI verás un chip (verde/rojo)
              y acciones (abrir/cerrar) cuando se integre el control remoto.
            </p>
          </DocSection>

          <DocSection id="matematicas" title="Matemáticas">
            <p>
              Para un tanque rectangular: <code>nivel% = (altura-agua)/altura * 100</code>. Para otras
              geometrías (cilindro, etc.) se usan fórmulas específicas (sección Matemáticas del panel).
            </p>
          </DocSection>

          <DocSection id="aplicaciones" title="Aplicaciones">
            <p>
              Riego, plantas piloto, depósitos domésticos o industriales. La app está pensada para usuarios
              no técnicos: todo se hace desde el navegador.
            </p>
          </DocSection>

          <DocSection id="dispositivos" title="Dispositivos y firmware">
            <p>
              Desde <strong>Configurar</strong> puedes conectar el ESP32 con Web Serial para enviar comandos
              o cargar código (cuando integres el firmware final). El historial de telemetría se guarda por
              <em> system.id</em> en localStorage.
            </p>
            <div className="mt-3 text-sm">
              <Link to={user ? "/app/devices" : "/login"} className="text-blue-600 hover:underline">
                Ver dispositivos
              </Link>
            </div>
          </DocSection>
        </article>
      </div>
    </div>
  );
}

function DocSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      <div className="prose prose-sm max-w-none text-gray-700">{children}</div>
    </section>
  );
}

import React, { useMemo, useState } from "react";
import useWebSerial from "@/hooks/useWebSerial";
import { X, Upload, PlugZap, Usb } from "lucide-react";

export default function FirmwareModal({ open, onClose, device }) {
  const {
    supported, connected, baudRate, setBaudRate,
    log, isBusy, connect, disconnect, sendLine, enterBootloader, write
  } = useWebSerial();

  // ⬇️ AQUÍ PEGA MÁS ADELANTE TU CÓDIGO/PLANTILLA POR DEFECTO
  const defaultSketch = useMemo(() => `
// --- Código de ejemplo (placeholder) ---
// Aquí irá TU código cuando lo tengas listo.
// Mientras tanto, puedes escribir comandos y enviarlos via serie.
//
// Ejemplo para MicroPython (si el ESP32 tiene MicroPython):
// print("Hola desde WebSerial!")
  `.trim(), []);

  const [code, setCode] = useState(defaultSketch);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="text-lg font-semibold">Cargar código a {device?.name || "dispositivo"}</h3>
            {!supported && (
              <p className="text-sm text-red-600">
                Este navegador no soporta Web Serial. Usa Chrome/Edge y HTTPS o localhost.
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b p-3">
          <label className="text-sm text-gray-600">
            Baudios:&nbsp;
            <select
              className="rounded-md border px-2 py-1 text-sm"
              value={baudRate}
              onChange={(e) => setBaudRate(Number(e.target.value))}
              disabled={connected}
            >
              {[9600, 19200, 38400, 57600, 115200, 230400, 460800].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>

          {!connected ? (
            <button
              onClick={connect}
              disabled={!supported}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Usb className="h-4 w-4" /> Conectar
            </button>
          ) : (
            <button
              onClick={disconnect}
              className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1.5 text-sm hover:bg-gray-300"
            >
              Desconectar
            </button>
          )}

          <button
            onClick={enterBootloader}
            disabled={!connected || isBusy}
            className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-sm text-white hover:bg-orange-700 disabled:opacity-50"
            title="Intenta poner el ESP32 en modo bootloader (DTR/RTS)"
          >
            <PlugZap className="h-4 w-4" /> Bootloader
          </button>

          <button
            onClick={() => write(code)}
            disabled={!connected}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
            title="Enviar contenido del editor tal cual por el puerto serie"
          >
            <Upload className="h-4 w-4" /> Enviar por serie
          </button>

          {/* Placeholder para integrar flasheo de binarios en el futuro */}
          {/* 
            TODO: integrar 'esp-web-tools' para flashear .bin:
            import 'esp-web-tools/dist/web/install-button.js'
            y usar <esp-web-install-button manifest="url-a-tu-manifest.json"></esp-web-install-button>
          */}
        </div>

        {/* Editor + Consola */}
        <div className="grid gap-0 md:grid-cols-2">
          <div className="border-r p-3">
            <label className="mb-2 block text-sm font-medium text-gray-700">Editor</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="h-[340px] w-full resize-none rounded-lg border bg-gray-50 p-3 font-mono text-xs outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="// Escribe o pega tu código aquí…"
            />
            <p className="mt-2 text-xs text-gray-500">
              Tip: también puedes enviar líneas sueltas con <code className="rounded bg-gray-100 px-1">Enter</code> desde la consola.
            </p>
          </div>

          <div className="p-3">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Consola (RX/TX)
            </label>
            <div className="h-[340px] overflow-auto rounded-lg border bg-black p-2 font-mono text-xs text-gray-100">
              {log.map((l, i) => (
                <div key={i} className={l.type === "error" ? "text-red-400" : l.type === "out" ? "text-emerald-300" : l.type === "in" ? "text-cyan-300" : "text-gray-300"}>
                  [{l.ts.toLocaleTimeString()}] {l.msg}
                </div>
              ))}
            </div>

            {/* Entrada de una sola línea (estilo terminal) */}
            <form
              className="mt-2 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const line = e.target.elements.line.value;
                if (line?.length) sendLine(line);
                e.target.reset();
              }}
            >
              <input
                name="line"
                className="flex-1 rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Escribe un comando y Enter…"
                autoComplete="off"
              />
              <button className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700">
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t p-3 text-xs text-gray-500">
          <div>
            {supported ? "Web Serial disponible." : "Web Serial no disponible."} 
            {"  "}Usa Chrome/Edge en HTTPS o localhost.
          </div>
          <button onClick={onClose} className="rounded-md px-3 py-1 hover:bg-gray-100">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

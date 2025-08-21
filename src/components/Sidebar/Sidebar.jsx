import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { documentationItems, extraItems } from "./SidebarData";
import { Waves, ChevronLeft, ChevronRight, ChevronDown, FileText } from "lucide-react";

export default function Sidebar({ className = "", mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const [docsOpen, setDocsOpen] = useState(true);

  // clases base: fijo en móvil (off-canvas), estático en md+
  const base =
    "bg-white shadow-xl transition-all duration-300 flex flex-col z-40 md:z-auto";
  const mobile =
    "fixed inset-y-0 left-0 w-72 transform " +
    (mobileOpen ? "translate-x-0" : "-translate-x-full");
  const desktop = `${collapsed ? "md:w-16" : "md:w-80"} md:static md:translate-x-0`;
  const asideClass = `${base} ${mobile} ${desktop} ${className}`;

  return (
    <>
      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside className={asideClass}>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">Gemelo Digital</h1>
                  <p className="text-xs text-gray-500">Control de Agua</p>
                </div>
              </div>
            )}

            {/* Botón colapsar (solo escritorio) */}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:inline-flex"
              aria-label="Alternar ancho sidebar"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Secciones extra (si las mantienes) */}
          {extraItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setMobileOpen?.(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 text-blue-700"
                      : "hover:bg-gray-50 text-gray-700"
                  }`
                }
              >
                <Icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                <span className="font-medium truncate">{item.label}</span>
              </NavLink>
            );
          })}

          {/* Grupo Documentación */}
          <div className="space-y-1">
            <button
              onClick={() => setDocsOpen((v) => !v)}
              disabled={collapsed}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-all ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                {!collapsed && <span className="font-medium">Documentación</span>}
              </div>
              {!collapsed && (
                <ChevronDown className={`w-4 h-4 transition-transform ${docsOpen ? "rotate-180" : ""}`} />
              )}
            </button>

            {docsOpen && !collapsed && (
              <div className="pl-4 space-y-1">
                {documentationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileOpen?.(false)}
                      className={({ isActive }) =>
                        `w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 text-blue-700"
                            : "hover:bg-gray-50 text-gray-600"
                        }`
                      }
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="font-medium truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-1">Universidad de la Amazonia</p>
            <p className="text-xs text-gray-400">Ingeniería de Sistemas</p>
          </div>
        )}
      </aside>
    </>
  );
}

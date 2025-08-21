import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

import MainLayout from "@/components/MainLayout/Layout";

import ProtectedRoute from "@/routes/ProtectedRoute";

import InicioPage from "@/pages/Inicio/InicioPage";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import DevicesPage from "@/pages/Devices/DevicesPage";
import UsersPage from "@/pages/Admin/UsersPage";

import OverviewSection from "@/components/Overview/OverviewSection";
import ComponentsSection from "@/components/ComponentsSection/ComponentsSection";
import TankSection from "@/components/TankSection/TankSection";
import SensorSection from "@/components/SensorSection/SensorSection";
import ValveSection from "@/components/ValveSection/ValveSection";
import MathematicsSection from "@/components/MathematicsSection/MathematicsSection";
import ApplicationsSection from "@/components/ApplicationsSection/ApplicationsSection";
import DevicesSection from "@/components/DevicesSection/DevicesSection";

function NotFound() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-gray-600">Página no encontrada.</p>
    </div>
  );
}
console.log("App render")
export default function App() {
  return (
    // Si aún no tienes AuthProvider, cambia por <React.Fragment>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirige raíz a /inicio */}
          <Route path="/" element={<Navigate to="/dispositivos" replace />} />

          {/* Públicas */}
          <Route path="/dispositivos" element={<InicioPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/inicio" element={<Navigate to="/dispositivos" replace />} />

          {/* Protegidas (dashboard) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<MainLayout />}>
              <Route index element={<OverviewSection />} />
              <Route index element={<OverviewSection />} />
              <Route path="overview" element={<OverviewSection />} />
              <Route path="components" element={<ComponentsSection />} />
              <Route path="tank" element={<TankSection />} />
              <Route path="sensor" element={<SensorSection />} />
              <Route path="valve" element={<ValveSection />} />
              <Route path="mathematics" element={<MathematicsSection />} />
              <Route path="applications" element={<ApplicationsSection />} />
              <Route path="devices" element={<DevicesPage />} />
              <Route path="admin/users" element={<UsersPage />} />
              <Route path="devices" element={<DevicesSection />} />
              <Route path="*" element={<NotFound />} />

              {/* --- ADMIN --- */}
              <Route element={<ProtectedRoute requireAdmin />}>
                <Route path="admin/users" element={<UsersPage />} />
              </Route>

              {/* 404 dentro de /app */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute requireAdmin />}></Route>
          <Route path="/admin/users" element={<div className="p-6">Gestión de usuarios (admin)</div>} />
          

          {/* 404 global */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

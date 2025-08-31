// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

import ProtectedRoute from "@/routes/ProtectedRoute";
import MainLayout from "@/components/MainLayout/Layout";

import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";

import PublicLayout from "@/components/PublicLayout/PublicLayout";
import DocsPublic from "@/pages/Public/DocsPublic";

import OverviewSection from "@/components/Overview/OverviewSection";
import ComponentsSection from "@/components/ComponentsSection/ComponentsSection";
import TankSection from "@/components/TankSection/TankSection";
import SensorSection from "@/components/SensorSection/SensorSection";
import ValveSection from "@/components/ValveSection/ValveSection";
import MathematicsSection from "@/components/MathematicsSection/MathematicsSection";
import ApplicationsSection from "@/components/ApplicationsSection/ApplicationsSection";
import DevicesSection from "@/components/DevicesSection/DevicesSection";
import UsersPage from "@/pages/Admin/UsersPage";

function NotFound() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-gray-600">Página no encontrada.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* --- Públicas --- */}
          <Route element={<PublicLayout />}>
            <Route index element={<DocsPublic />} />        {/* / */}
            <Route path="docs" element={<DocsPublic />} />  {/* /docs */}
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* --- Protegidas (/app/**) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<MainLayout />}>
              <Route index element={<OverviewSection />} />
              <Route path="overview" element={<OverviewSection />} />
              <Route path="components" element={<ComponentsSection />} />
              <Route path="tank" element={<TankSection />} />
              <Route path="sensor" element={<SensorSection />} />
              <Route path="valve" element={<ValveSection />} />
              <Route path="mathematics" element={<MathematicsSection />} />
              <Route path="applications" element={<ApplicationsSection />} />
              <Route path="devices" element={<DevicesSection />} />

              {/* Solo admin */}
              <Route element={<ProtectedRoute requireAdmin />}>
                <Route path="admin/users" element={<UsersPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* 404 global */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

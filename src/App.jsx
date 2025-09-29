// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

import ProtectedRoute from "@/routes/ProtectedRoute";
import MainLayout from "@/components/layout/Layout";

import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";

import PublicLayout from "@/components/layout/PublicLayout";
import DocsPublic from "@/pages/Public/DocsPublic";

import OverviewSection from "@/components/features/dashboard/OverviewSection";
import ComponentsSection from "@/components/features/dashboard/ComponentsSection";
import TankSection from "@/components/features/dashboard/TankSection";
import SensorSection from "@/components/features/dashboard/SensorSection";
import ValveSection from "@/components/features/dashboard/ValveSection";
import MathematicsSection from "@/components/features/dashboard/MathematicsSection";
import ApplicationsSection from "@/components/features/dashboard/ApplicationsSection";
import DevicesSection from "@/components/features/devices/DevicesSection";
import UsersPage from "@/components/features/admin/UsersPage";
import ApiDiagnostic from "@/components/features/admin/ApiDiagnostic";
import ProfilePage from "@/pages/Profile/ProfilePage";

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
              <Route path="profile" element={<ProfilePage />} />

              {/* Solo admin */}
              <Route element={<ProtectedRoute requireAdmin />}>
                <Route path="admin/users" element={<UsersPage />} />
                <Route path="admin/diagnostic" element={<ApiDiagnostic />} />
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

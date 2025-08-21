import {
  Monitor,
  Container,
  Droplets,
  Activity,
  Settings,
  BarChart3,
  Target,
  FileText,
  Radar,
  Users,
} from "lucide-react";

/** Ítems que van al grupo “Documentación” (ahora con path explícito) */
export const documentationItems = [
  { id: "overview",     label: "Resumen General",   icon: Monitor,  color: "text-blue-500",   path: "/app/overview" },
  { id: "components",   label: "Componentes 3D",    icon: Container, color: "text-green-500", path: "/app/components" },
  { id: "tank",         label: "Tanque 500L",       icon: Droplets, color: "text-cyan-500",   path: "/app/tank" },
  { id: "sensor",       label: "Sensor HC-SR04",    icon: Activity, color: "text-purple-500", path: "/app/sensor" },
  { id: "valve",        label: "Válvula Solenoide", icon: Settings, color: "text-orange-500", path: "/app/valve" },
  { id: "mathematics",  label: "Modelos Matemáticos", icon: BarChart3, color: "text-red-500", path: "/app/mathematics" },
  { id: "applications", label: "Aplicaciones",      icon: Target,   color: "text-indigo-500", path: "/app/applications" },
];

/** Ítems “sueltos” arriba del grupo Documentación  */
export const extraItems = [
  { id: "devices", label: "Dispositivos", icon: Radar, color: "text-teal-600", path: "/app/devices" },
  { id: "users",  label: "Usuarios (admin)",icon: Users,  color: "text-fuchsia-600", path: "/app/admin/users" },
];

// Alias por si lo usas en algún sitio como “sidebarItems”
export const sidebarItems = documentationItems;

// (Opcional) Estructura con submenú
export const mainMenuItems = [
  { id: "documentation", label: "Documentación", icon: FileText, color: "text-gray-600", hasSubmenu: true, submenuItems: documentationItems },
];

// Config general del sidebar
export const sidebarConfig = {
  title: "Gemelo Digital",
  subtitle: "Control de Agua",
  footer: {
    university: "Universidad de la Amazonia",
    program: "Ingeniería de Sistemas",
  },
};

export default sidebarItems;

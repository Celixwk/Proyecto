import React from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PublicLayout() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const goLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-block h-6 w-6 rounded bg-blue-600" />
            <span>Gemelo digital</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <NavLink
              to="/docs"
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive || pathname === "/" ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              Documentación
            </NavLink>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/app/overview"
                  className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  Ir al panel
                </Link>
                <button
                  onClick={goLogout}
                  className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Contenido público */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Agua IoT — Demo educativa
      </footer>
    </div>
  );
}

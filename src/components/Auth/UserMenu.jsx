import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-50"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white rounded-md px-3 py-2 text-sm hover:bg-blue-700"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  const initials = (user?.name || user?.email || "U").slice(0, 2).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border px-2 py-1.5 hover:bg-gray-50"
        aria-label="Abrir menú de usuario"
      >
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center text-sm font-semibold">
          {initials}
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl ring-1 ring-black/5 border border-gray-200 z-50">
          {/* flechita */}
          <div className="absolute -top-2 right-6 h-3 w-3 rotate-45 bg-white border-l border-t border-gray-200"></div>

          <div className="px-4 pt-3 pb-2">
            <p className="text-sm font-semibold text-gray-900">{user?.name || "Admin"}</p>
            {user?.email && <p className="text-xs text-gray-500">{user.email}</p>}
          </div>
          <div className="h-px bg-gray-200" />

          <Link
            to="/app/overview"
            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50"
          >
            <UserIcon className="h-4 w-4" /> Mi cuenta
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function LoginPage() {
  const { login, resetDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/app";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await axios.post("/api/user/login", form);
      await login(form.email.trim(), form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || "Error al iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[80vh] grid place-items-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Iniciar Sesión</h1>
          <p className="text-sm text-gray-500">Accede a tu panel</p>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">Correo</label>
          <input
            id="email" name="email" type="email" autoComplete="email"
            value={form.email} onChange={onChange}
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
          <div className="relative">
            <input
              id="password" name="password" type={showPwd ? "text" : "password"}
              autoComplete="current-password"
              value={form.password} onChange={onChange}
              className="w-full rounded-md border px-3 py-2 pr-20 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-900"
            >
              {showPwd ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Ingresando..." : "Entrar"}
        </button>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            ¿No tienes cuenta?{" "}
            <Link className="text-blue-600 hover:underline" to="/register">Regístrate</Link>
          </span>
          {/* DEV only: restablecer datos demo */}
          <button type="button" onClick={resetDemo} className="text-red-600 hover:underline">
            Restablecer demo
          </button>
        </div>
      </form>
    </div>
  );
}

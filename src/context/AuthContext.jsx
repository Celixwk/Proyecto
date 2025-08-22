// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "gd_users";
const SESSION_KEY = "gd_session";

// Admin de demo (solo para desarrollo)
const DEMO_ADMIN = {
  id: crypto?.randomUUID?.() || String(Date.now()),
  name: "Admin Demo",
  email: "admin@demo.com",
  password: "admin123", // ⚠️ demo (texto plano)
  role: "admin",
  active: true,
  createdAt: new Date().toISOString(),
};

// helpers de localStorage
const read = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sembrar admin de demo si no existe + hidratar sesión
  useEffect(() => {
    const current = read(USERS_KEY, []);
    if (!current.some(u => (u.email || "").toLowerCase() === "admin@demo.com")) {
      write(USERS_KEY, [...current, DEMO_ADMIN]);
    }
    const session = read(SESSION_KEY, null);
    setUser(session || null);
    setLoading(false);
  }, []);

  // API
  const register = async ({ name, email, password, role = "user" }) => {
    const users = read(USERS_KEY, []);
    if (users.some(u => (u.email || "").toLowerCase() === email.toLowerCase())) {
      throw new Error("El correo ya está registrado");
    }
    const newUser = {
      id: crypto?.randomUUID?.() || String(Date.now()),
      name,
      email,
      password, // ⚠️ demo
      role,
      active: true,
      createdAt: new Date().toISOString(),
    };
    write(USERS_KEY, [...users, newUser]);
    return newUser; // no inicia sesión automáticamente
  };

  const login = async (email, password) => {
    const users = read(USERS_KEY, []);
    const found = users.find(
      u => (u.email || "").toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error("Credenciales inválidas");

    // Guardamos en sesión sin password
    const session = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role || "user",
      isAdmin: (found.role || "").toLowerCase() === "admin",
    };
    write(SESSION_KEY, session);
    setUser(session);
    return session;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const listUsers = () => read(USERS_KEY, []);

  const resetDemo = () => {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SESSION_KEY);
    write(USERS_KEY, [DEMO_ADMIN]);
    setUser(null);
  };

  const isAdmin =
    user?.isAdmin === true || (user?.role || "").toLowerCase() === "admin";

  const value = useMemo(
    () => ({ user, loading, isAdmin, register, login, logout, listUsers, resetDemo }),
    [user, loading, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

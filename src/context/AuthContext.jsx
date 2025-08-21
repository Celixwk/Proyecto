import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "gd_users";
const SESSION_KEY = "gd_session";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadUsers());
  const [user, setUser] = useState(() => loadSession());

  // Semilla: crea admin demo si no existe
  useEffect(() => {
    const current = loadUsers();
    if (!current.some((u) => u.email === "admin@demo.com")) {
      const admin = {
        name: "Admin Demo",
        email: "admin@demo.com",
        password: "admin123",   // ⚠️ Solo demo
        role: "admin",
        active: true,
        createdAt: new Date().toISOString(),
      };
      const next = [...current, admin];
      saveUsers(next);
      setUsers(next);
    }
  }, []);

  const register = async ({ name, email, password, role = "user" }) => {
    const current = loadUsers();
    if (current.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("El correo ya está registrado");
    }
    const newUser = {
      name,
      email,
      password, // ⚠️ Solo demo (texto plano)
      role,
      active: true,
      createdAt: new Date().toISOString(),
    };
    const next = [...current, newUser];
    saveUsers(next);
    setUsers(next);
    return newUser;
  };

  const login = async (email, password) => {
    const current = loadUsers();
    const found = current.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error("Credenciales inválidas");
    setUser(found);
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    return found;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const listUsers = () => loadUsers();

  const isAdmin = user?.role?.toLowerCase() === "admin";

  const value = useMemo(
    () => ({ user, isAdmin, register, login, logout, listUsers }),
    [user, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

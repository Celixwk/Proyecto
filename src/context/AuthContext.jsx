// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import apiService from "@/services/api";

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

  // API - Con fallback a localStorage para desarrollo
  const register = async ({ name, email, password, role = "user" }) => {
    try {
      // Intentar conectar con la API real
      const response = await apiService.register({ name, email, password, role });
      return response;
    } catch (error) {
      // Fallback a localStorage si la API no está disponible
      console.warn('API no disponible, usando localStorage:', error.message);
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
      return newUser;
    }
  };

  const login = async (email, password) => {
    try {
      // Intentar conectar con la API real
      const response = await apiService.login(email, password);
      
      // Guardar token si la API lo proporciona
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      
      // Crear sesión del usuario
      const session = {
        id: response.user?.id || response.id,
        name: response.user?.name || response.name,
        email: response.user?.email || response.email,
        role: response.user?.role || response.role || "user",
        isAdmin: ((response.user?.role || response.role || "")).toLowerCase() === "admin",
      };
      
      write(SESSION_KEY, session);
      setUser(session);
      return session;
    } catch (error) {
      // Fallback a localStorage si la API no está disponible
      console.warn('API no disponible, usando localStorage:', error.message);
      const users = read(USERS_KEY, []);
      const found = users.find(
        u => (u.email || "").toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!found) throw new Error("Credenciales inválidas");

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
    }
  };

  const logout = async () => {
    try {
      // Intentar logout en la API
      await apiService.logout();
    } catch (error) {
      console.warn('Error al hacer logout en API:', error.message);
    } finally {
      // Limpiar datos locales
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      // Intentar actualizar en la API
      const response = await apiService.updateProfile(profileData);
      
      // Actualizar sesión local si es necesario
      if (response.user) {
        const updatedSession = {
          ...user,
          ...response.user,
          isAdmin: (response.user.role || "").toLowerCase() === "admin",
        };
        write(SESSION_KEY, updatedSession);
        setUser(updatedSession);
      }
      
      return response;
    } catch (error) {
      console.warn('Error al actualizar perfil en API:', error.message);
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Intentar cambiar contraseña en la API
      return await apiService.changePassword(currentPassword, newPassword);
    } catch (error) {
      console.warn('Error al cambiar contraseña en API:', error.message);
      throw error;
    }
  };

  const listUsers = () => read(USERS_KEY, []);

  const resetDemo = () => {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('auth_token');
    write(USERS_KEY, [DEMO_ADMIN]);
    setUser(null);
  };

  const isAdmin =
    user?.isAdmin === true || (user?.role || "").toLowerCase() === "admin";

  const value = useMemo(
    () => ({ 
      user, 
      loading, 
      isAdmin, 
      register, 
      login, 
      logout, 
      updateProfile,
      changePassword,
      listUsers, 
      resetDemo 
    }),
    [user, loading, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.jsx  — fully frontend / no backend
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initStore, getUsers, saveUsers, genId } from '../data/mockData';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Seed localStorage on very first visit
  useEffect(() => {
    initStore();
    const saved = localStorage.getItem('laxmi_current_user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  // ── Login ────────────────────────────────────────────────────
  const login = async (email, password) => {
    const users = getUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      const err = new Error('Invalid email or password.');
      err.response = { data: { message: err.message } };
      throw err;
    }
    const { password: _, ...safeUser } = found; // strip password before storing
    localStorage.setItem('laxmi_current_user', JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  // ── Register (Customer only) ─────────────────────────────────
  const register = async (name, email, phone, password) => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      const err = new Error('An account with this email already exists.');
      err.response = { data: { message: err.message } };
      throw err;
    }
    const newUser = { id: genId('u'), name, email, phone, password, role: 'Customer' };
    saveUsers([...users, newUser]);
    // Auto-login
    return await login(email, password);
  };

  // ── Logout ───────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('laxmi_current_user');
    setUser(null);
  };

  const hasRole = (roles) => user && roles.includes(user.role);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

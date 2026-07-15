"use client";

import { create } from "zustand";

interface AuthState {
  token: string | null;
  initialized: boolean;

  setToken: (token: string) => void;
  loadToken: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  initialized: false,

  setToken: (token) => {
    localStorage.setItem("token", token);

    set({
      token,
      initialized: true,
    });
  },

  loadToken: () => {
    const token = localStorage.getItem("token");

    set({
      token,
      initialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      initialized: true,
    });
  },
}));
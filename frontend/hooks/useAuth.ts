"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const token = useAuthStore((state) => state.token);
  const initialized = useAuthStore((state) => state.initialized);
  const loadToken = useAuthStore((state) => state.loadToken);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return {
    token,
    initialized,
    isAuthenticated: !!token,
  };
}
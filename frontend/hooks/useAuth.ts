"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const token = useAuthStore(
    (state) => state.token
  );

  const loadToken = useAuthStore(
    (state) => state.loadToken
  );

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return {
    token,
    isAuthenticated: !!token,
  };
}
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/axios";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (!token) {
      alert("Invalid reset link");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        token,
        password,
      });

      alert("Password reset successfully");

      window.location.href = "/login";
    } catch (err: any) {
      alert(
        err.response?.data?.detail ??
        "Failed to reset password"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
}
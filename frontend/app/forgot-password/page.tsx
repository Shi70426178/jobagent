"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/forgot-password", {
        email,
      });

      alert("If an account exists, a reset link has been sent.");

      router.push("/login");
    } catch (err: any) {
      alert(
        err.response?.data?.detail ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
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
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
}
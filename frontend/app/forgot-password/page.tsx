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

      alert(
        "If an account exists, a reset link has been sent."
      );

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
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-sans text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">

      <div className="w-full max-w-[400px]">

        {/* Card */}

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">

          {/* Header */}

          <div className="mb-6">

            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Forgot Password
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Enter your email address and we'll send you a link to reset your password.
            </p>

          </div>

          {/* Form */}

          <div className="flex flex-col gap-4">

            <div>

              <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-zinc-200
                  bg-zinc-50
                  px-3
                  text-sm
                  text-zinc-900
                  outline-none
                  transition
                  placeholder:text-zinc-400
                  focus:border-zinc-400
                  focus:bg-white
                  dark:border-zinc-800
                  dark:bg-zinc-950
                  dark:text-white
                  dark:placeholder:text-zinc-600
                  dark:focus:border-zinc-600
                  dark:focus:bg-black
                "
              />

            </div>

            {/* Submit */}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                h-11
                w-full
                rounded-lg
                bg-zinc-900
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-zinc-700
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:bg-white
                dark:text-black
                dark:hover:bg-zinc-200
              "
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

          </div>

          {/* Back to Login */}

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-5 w-full text-center text-xs text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            ← Back to Login
          </button>

        </div>

      </div>

    </div>
  );
}
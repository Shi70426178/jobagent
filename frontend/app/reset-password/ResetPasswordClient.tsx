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
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-sans text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">

      <div className="w-full max-w-[400px]">

        {/* Card */}

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">

          {/* Heading */}

          <div className="mb-6">

            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Reset Password
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Enter your new password below to reset your account password.
            </p>

          </div>

          {/* Form */}

          <div className="flex flex-col gap-4">

            {/* New Password */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                New Password
              </label>

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
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

            {/* Confirm Password */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
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

            {/* Reset Button */}

            <button
              onClick={handleReset}
              className="
                mt-1
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
                dark:bg-white
                dark:text-black
                dark:hover:bg-zinc-200
              "
            >
              Reset Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your email and password.",
        confirmButtonText: "OK",
        confirmButtonColor: "#18181b",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setToken(response.data.access_token);

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);

      const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");

      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          err?.response?.data?.detail ||
          "Invalid email or password. Please try again.",
        confirmButtonText: "Try Again",

        width: "420px",

        background: isDark ? "#0a0a0a" : "#ffffff",
        color: isDark ? "#ffffff" : "#18181b",

        backdrop: isDark
          ? "rgba(0, 0, 0, 0.75)"
          : "rgba(0, 0, 0, 0.25)",

        buttonsStyling: true,

        confirmButtonColor: isDark ? "#ffffff" : "#18181b",

        customClass: {
          popup: "login-alert-popup",
          title: "login-alert-title",
          htmlContainer: "login-alert-text",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-black dark:text-white dark:selection:bg-white dark:selection:text-black">

      {/* ================= HEADER ================= */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-900">

        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-900 transition hover:opacity-80 dark:text-white"
        >
          oneXjob
        </Link>

        <Link
          href="/register"
          className="rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Sign Up
        </Link>

      </header>

      {/* ================= LOGIN ================= */}
      <main className="my-auto flex flex-col items-center justify-center px-4 py-12">

        <div className="w-full max-w-[360px]">

          {/* Heading */}
          <div className="mb-7 text-center">

            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Log in to oneXjob
            </h1>

            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
              Sign in to continue to your account
            </p>

          </div>

          {/* ================= FORM ================= */}
          <div className="space-y-3">

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-400"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-0"
              />

            </div>

            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-400"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      login();
                    }
                  }}
                  className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 pr-10 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-0"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>

              </div>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={login}
              disabled={loading}
              className="mt-2 h-10 w-full rounded-md bg-zinc-900 text-xs font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {loading ? "Signing in..." : "Continue with Email"}
            </button>

          </div>

          {/* ================= DIVIDER ================= */}
          <div className="my-6 flex items-center">

            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-900" />

            <span className="px-3 text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              OR
            </span>

            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-900" />

          </div>

          {/* ================= GOOGLE ================= */}
          <div
            className="
              flex w-full justify-center
              [&_button]:!h-10
              [&_button]:!w-full
              [&_button]:!rounded-md
              [&_button]:!border-zinc-200
              [&_button]:!bg-white
              [&_button]:!text-xs
              [&_button]:!font-medium
              [&_button]:!text-zinc-700
              [&_button]:hover:!bg-zinc-50
              dark:[&_button]:!border-zinc-800
              dark:[&_button]:!bg-[#0a0a0a]
              dark:[&_button]:!text-zinc-300
              dark:[&_button]:hover:!bg-zinc-900
              dark:[&_button]:hover:!text-white
            "
          >
            <GoogleLoginButton />
          </div>

          {/* ================= LINKS ================= */}
          <div className="mt-7 flex flex-col items-center gap-3 text-xs">

            <Link
              href="/forgot-password"
              className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-300"
            >
              Forgot password?
            </Link>

            <p className="text-zinc-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-zinc-900 underline underline-offset-4 transition hover:text-zinc-500 dark:text-white dark:hover:text-zinc-300"
              >
                Sign up
              </Link>
            </p>

          </div>

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-zinc-200 py-6 text-center text-[11px] text-zinc-500 dark:border-zinc-900 dark:text-zinc-600">

        By continuing, you agree to our{" "}

        <Link
          href="/terms"
          className="underline transition hover:text-zinc-900 dark:hover:text-zinc-400"
        >
          Terms
        </Link>{" "}

        and{" "}

        <Link
          href="/privacy"
          className="underline transition hover:text-zinc-900 dark:hover:text-zinc-400"
        >
          Privacy Policy
        </Link>
        .

      </footer>

    </div>
  );
}
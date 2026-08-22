"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { api } from "@/lib/axios";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const showError = (message: string) => {
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: message,

      width: "360px",
      padding: "1rem",

      background: isDark ? "#0f172a" : "#ffffff",
      color: isDark ? "#f8fafc" : "#18181b",

      confirmButtonText: "OK",
      confirmButtonColor: isDark ? "#ffffff" : "#18181b",

      customClass: {
        popup: "rounded-xl",
        title: "text-lg font-semibold",
        htmlContainer: "text-sm",
        confirmButton: "px-5 py-2 text-sm rounded-lg",
        icon: "swal-small-icon",
      },
    });
  };

  const showSuccess = (message: string) => {
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: message,

      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: true,

      width: "300px",

      background: isDark ? "#0f172a" : "#ffffff",
      color: isDark ? "#f8fafc" : "#18181b",

      customClass: {
        popup: "rounded-xl",
        title: "text-sm font-medium",
        icon: "swal-small-icon",
      },
    });
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      showError("Please enter your full name.");
      return false;
    }

    if (!email.trim()) {
      showError("Please enter your email address.");
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      showError("Please enter a valid email address.");
      return false;
    }

    if (!password.trim()) {
      showError("Please enter your password.");
      return false;
    }

    if (password.length < 8) {
      showError("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  const register = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await api.post("/auth/register", {
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      showSuccess("Account created successfully");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      console.error("Registration error:", error);

      showError(
        error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "Unable to create account."
      );
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
          href="/login"
          className="rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Log In
        </Link>

      </header>

      {/* ================= REGISTER FORM ================= */}

      <main className="my-auto flex flex-col items-center justify-center px-4 py-12">

        <div className="w-full max-w-[360px]">

          {/* Heading */}

          <div className="mb-7 text-center">

            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Sign up for oneXjob
            </h1>

            <p className="mt-2 text-xs text-zinc-500">
              Create your account and start finding jobs
            </p>

          </div>

          {/* ================= FORM ================= */}

          <div className="space-y-3">

            {/* Full Name */}

            <div>

              <label
                htmlFor="fullName"
                className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-400"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-0"
              />

            </div>

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
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Password (min. 8 characters)"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      register();
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

            {/* Register Button */}

            <button
              type="button"
              onClick={register}
              disabled={loading}
              className="mt-2 h-10 w-full rounded-md bg-zinc-900 text-xs font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {loading ? "Creating account..." : "Sign Up with Email"}
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

          {/* ================= LOGIN LINK ================= */}

          <div className="mt-7 text-center">

            <p className="text-xs text-zinc-500">
              Already have an account?{" "}

              <Link
                href="/login"
                className="font-medium text-zinc-900 underline underline-offset-4 transition hover:text-zinc-500 dark:text-white dark:hover:text-zinc-300"
              >
                Log in
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
          Terms of Service
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
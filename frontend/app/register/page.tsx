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

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const showError = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: message,
      width: "320px",
      padding: "1rem",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonText: "OK",
      confirmButtonColor: "#7c3aed",
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
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: true,
      width: "300px",
      background: "#0f172a",
      color: "#f8fafc",
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black flex flex-col justify-between">
      
      {/* Vercel Header Bar */}
      <header className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition">
          oneXjob
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 hover:border-zinc-700"
        >
          Log In
        </Link>
      </header>

      {/* Main Form Stack */}
      <main className="my-auto flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[320px] text-center">
          
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-6">
            Sign up for oneXjob
          </h1>

          {/* Input Stack */}
          <div className="space-y-2.5 text-left">
            
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-10 w-full rounded-md border border-zinc-800 bg-[#0a0a0a] px-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-zinc-500 focus:bg-black focus:ring-0 [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#0a0a0a_inset]"
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="email@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-md border border-zinc-800 bg-[#0a0a0a] px-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-zinc-500 focus:bg-black focus:ring-0 [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#0a0a0a_inset]"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min. 8 characters)"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-md border border-zinc-800 bg-[#0a0a0a] px-3 pr-10 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-zinc-500 focus:bg-black focus:ring-0 [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#0a0a0a_inset]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={register}
              disabled={loading}
              className="h-10 w-full rounded-md bg-white text-xs font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50 mt-1"
            >
              {loading ? "Creating account..." : "Sign Up with Email"}
            </button>

          </div>

          {/* Divider */}
          <div className="my-5 flex items-center">
            <div className="h-px flex-1 bg-zinc-900" />
            <span className="px-2 text-[10px] uppercase tracking-wider text-zinc-600">
              OR
            </span>
            <div className="h-px flex-1 bg-zinc-900" />
          </div>

          {/* Social Logins */}
          <div className="w-full flex justify-center [&_button]:!h-10 [&_button]:!w-full [&_button]:!rounded-md [&_button]:!border-zinc-800 [&_button]:!bg-[#0a0a0a] [&_button]:!text-xs [&_button]:!font-medium [&_button]:!text-zinc-300 [&_button]:hover:!bg-zinc-900 [&_button]:hover:!text-white transition">
            <GoogleLoginButton />
          </div>

          {/* Account Switching Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white underline underline-offset-4 hover:text-zinc-300 transition"
              >
                Log in
              </Link>
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-zinc-600">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-zinc-400">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-zinc-400">
          Privacy Policy
        </Link>
        .
      </footer>
    </div>
  );
}
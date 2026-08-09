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
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setToken(response.data.access_token);

      router.push("/agent");
    } catch (err: any) {
  console.error("Login error:", err);

await Swal.fire({
  icon: "error",
  title: "Login Failed",
  text:
    err?.response?.data?.detail ||
    "Invalid email or password. Please try again.",
  confirmButtonText: "Try Again",

  width: "420px",
  background: "#0a0a0a",
  color: "#ffffff",

  backdrop: `
    rgba(0, 0, 0, 0.75)
  `,

  buttonsStyling: false,

  customClass: {
    popup: "resume-success-popup",
    title: "resume-success-title",
    htmlContainer: "resume-success-text",
    confirmButton: "resume-success-button",
    icon: "login-error-icon",
  },
});
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black flex flex-col justify-between">
      
      {/* Vercel Top Bar */}
      <header className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition">
          oneXjob
        </Link>
        <Link
          href="/register"
          className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 hover:border-zinc-700"
        >
          Sign Up
        </Link>
      </header>

      {/* Center Layout */}
      <main className="my-auto flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[320px] text-center">
          
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-6">
            Log in to oneXjob
          </h1>

          {/* Input Stack */}
          <div className="space-y-2.5 text-left">
            
            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-md border border-zinc-800 bg-[#0a0a0a] px-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-zinc-500 focus:bg-black focus:ring-0 [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#0a0a0a_inset]"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            {/* Primary Email Button */}
            <button
              onClick={login}
              disabled={loading}
              className="h-10 w-full rounded-md bg-white text-xs font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50 mt-1"
            >
              {loading ? "Signing in..." : "Continue with Email"}
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

          {/* Navigation Links */}
          <div className="mt-6 flex flex-col items-center gap-2 text-xs">
            <Link
              href="/forgot-password"
              className="text-zinc-500 transition hover:text-zinc-300"
            >
              Forgot password?
            </Link>

            <p className="text-zinc-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-white underline underline-offset-4 hover:text-zinc-300 transition"
              >
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-zinc-600">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-zinc-400">
          Terms
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
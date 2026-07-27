"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles } from "lucide-react";

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

      router.push("/dashboard");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "Verified jobs",
    "Resume AI",
    "Recruiter emails",
    "Application tracker",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-260px] h-[850px] w-[850px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

        <div className="absolute -left-32 bottom-[-150px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.06),transparent_55%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />

      </div>

      {/* ================= CONTENT ================= */}

      <div
        className="
    relative
    z-10
    mx-auto
    flex
    min-h-screen
    max-w-7xl
    flex-col
    items-center
    gap-8
    px-5
    py-8
    lg:flex-row
    lg:items-center
    lg:justify-between
    lg:gap-12
    lg:px-10
  "
      >
        {/* ================= LEFT SIDE ================= */}

        <div className="hidden w-full lg:block lg:w-1/2">

          <div className="max-w-lg">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">

              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-xs text-zinc-300">
                Trusted by ambitious job seekers
              </span>

            </div>

            <h1 className="mt-8 text-6xl font-black tracking-tight leading-none">

              one
              <span className="text-violet-400">X</span>
              job

            </h1>

            <h2 className="mt-5 text-5xl font-bold leading-tight">

              WE GUARANTEE
              <br />
              JOB INTERVIEWS

            </h2>

            <p className="mt-5 max-w-md text-lg leading-8 text-zinc-400">

              Discover verified jobs, improve your resume,
              generate recruiter-ready emails and land
              interviews faster using AI.

            </p>
            {/* ================= FEATURES ================= */}

            <div className="mt-8 space-y-3">

              {features.map((item) => (

                <div
                  key={item}
                  className="
                    flex items-center gap-3
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.03]
                    px-4 py-3
                    backdrop-blur-2xl
                    transition-all duration-300
                    hover:border-violet-500/40
                    hover:bg-white/[0.05]
                    hover:translate-x-1
                  "
                >

                  <div
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-full
                      bg-gradient-to-r
                      from-violet-600
                      to-cyan-500
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    ✓
                  </div>

                  <span className="text-sm text-zinc-200">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ================= MOBILE HERO ================= */}

        <div className="w-full lg:hidden">

          <div className="mx-auto max-w-sm">

            <div className="text-center">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">

                <Sparkles className="h-4 w-4 text-violet-400" />

                <span className="text-xs text-zinc-300">
                  AI Career Assistant
                </span>

              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">

                one
                <span className="text-violet-400">X</span>
                job

              </h1>

              <p className="mt-3 text-sm leading-6 text-zinc-400">

                Find verified jobs faster with AI.

              </p>

            </div>

            <div className="hidden mt-6 grid gap-2">
              {features.slice(0, 3).map((item) => (

                <div
                  key={item}
                  className="
                    flex items-center gap-3
                    rounded-xl
                    border border-white/10
                    bg-white/[0.03]
                    px-3 py-2.5
                    backdrop-blur-xl
                  "
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-[11px] font-bold">

                    ✓

                  </div>

                  <span className="text-xs text-zinc-300">

                    {item}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ================= LOGIN CARD ================= */}

        <div
          className="
    w-full
    max-w-md
    lg:max-w-none
    lg:w-[360px]
    xl:w-[370px]
  "
        >

          <div
            className="
      w-full
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      px-5
      py-6
      sm:px-6
      lg:px-7
      backdrop-blur-3xl
      shadow-[0_30px_80px_rgba(0,0,0,.55)]
    "
          >
            {/* ================= HEADER ================= */}

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Sign in to continue your AI-powered job search.
            </p>

            {/* ================= GOOGLE ================= */}

            <div className="mt-5 flex justify-center">
              <div className="w-full flex justify-center">
                <GoogleLoginButton />
              </div>
            </div>
            {/* ================= DIVIDER ================= */}

            <div className="my-4 flex items-center">

              <div className="h-px flex-1 bg-white/10" />

              <span className="px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                Continue with Email
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>

            {/* ================= FORM ================= */}

            <div className="space-y-3">

              {/* EMAIL */}

              <div className="mx-auto w-full max-w-full lg:max-w-[270px]">

                <label className="mb-1 block text-xs font-medium text-zinc-300">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
  h-11
  w-full
  rounded-xl
  border
  border-white/10
  bg-white/[0.04]
  px-4
  text-sm
  text-white
  placeholder:text-zinc-500
  outline-none
  transition-all
  hover:border-white/20
  focus:border-violet-500
  focus:ring-2
  focus:ring-violet-500/20
"
                />

              </div>

              {/* PASSWORD */}

              <div className="mx-auto w-full max-w-full lg:max-w-[270px]">

                <label className="mb-1 block text-xs font-medium text-zinc-300">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
          h-11
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/[0.04]
          px-4
          pr-11
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          transition-all
          hover:border-white/20
          focus:border-violet-500
          focus:ring-2
          focus:ring-violet-500/20
        "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-zinc-500
          transition
          hover:text-white
        "
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>

                </div>

              </div>

              {/* FORGOT PASSWORD */}

              <div className="mx-auto flex w-full max-w-full lg:max-w-[270px] justify-end">

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-violet-400 transition hover:text-violet-300"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* SIGN IN */}

              <div className="mx-auto w-full max-w-full lg:max-w-[270px]">

                <button
                  onClick={login}
                  disabled={loading}
                  className="
      h-11
      w-full
      rounded-xl
      bg-gradient-to-r
      from-violet-600
      via-indigo-600
      to-cyan-500
      text-sm
      font-semibold
      text-white
      transition-all
      duration-300
      hover:scale-[1.01]
      hover:shadow-[0_0_25px_rgba(99,102,241,.35)]
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </div>

            {/* REGISTER */}

            <div className="my-5 flex items-center">

              <div className="h-px flex-1 bg-white/10" />

              <span className="px-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                or
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>

            <div className="text-center">

              <p className="text-sm text-zinc-400">
                New to oneXjob?
              </p>

              <div className="mx-auto mt-3 w-full max-w-full lg:max-w-[270px]">

                <button
                  onClick={() => router.push("/register")}
                  className="
        h-10
        w-full
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        text-sm
        font-semibold
        text-white
        transition-all
        hover:border-violet-500/40
        hover:bg-white/[0.05]
        hover:text-violet-300
      "
                >
                  Create Free Account →
                </button>

              </div>

            </div>
            {/* ================= TERMS ================= */}

            <p className="mt-5 text-center text-[11px] leading-5 text-zinc-500">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="text-violet-400 transition hover:text-violet-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-violet-400 transition hover:text-violet-300"
              >
                Privacy Policy
              </Link>
              .
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
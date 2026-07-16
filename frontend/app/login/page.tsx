"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

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
      const response = await api.post("/auth/login", { email, password });
      setToken(response.data.access_token);
      router.push("/dashboard");
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Login_BG.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/45" />

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* LEFT PANEL */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] items-center justify-center px-6 xl:px-8 2xl:px-12">
          <div className="max-w-sm">
            <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-300">
              🚀 Trusted by ambitious job seekers
            </div>

            <h1 className="mt-3 text-2xl xl:text-3xl 2xl:text-4xl font-black tracking-tight text-white">
              oneXjob
            </h1>

            <h2 className="mt-1.5 text-base xl:text-lg font-semibold text-zinc-100">
              WE GUARANTEE JOB INTERVIEWS            </h2>

            <p className="mt-3 max-w-sm text-[12px] leading-6 text-zinc-300">
              Discover better opportunities, generate recruiter-ready emails,
              optimize your resume, track every application and land more
              interviews—all powered by AI.
            </p>

            <div className="mt-5 space-y-2.5">
              {[
                "Discover thousands of verified jobs instantly",
                "AI-powered resume matching",
                "Generate recruiter-ready emails",
                "Increase your chances of getting hired",
              ].map((item) => (
                <div
                  key={item}
                  className="
        flex items-center gap-2.5
        rounded-lg border border-white/10 bg-white/5
        px-3 py-2.5
        backdrop-blur-xl
        shadow-[0_0_20px_rgba(255,255,255,0.10)]
        transition-all duration-300
        md:hover:translate-x-1
        hover:border-violet-500/40
      "
                >
                  <div
                    className="
          flex h-6 w-6 items-center justify-center
          rounded-full
          bg-gradient-to-r from-violet-600 to-cyan-500
          text-[10px] font-bold text-white
          shadow-[0_0_10px_rgba(255,255,255,0.15)]
        "
                  >
                    ✓
                  </div>
                  <p className="text-xs text-zinc-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOGIN PANEL */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-6 md:px-8 py-6 lg:py-10">
          <div className="w-full max-w-xs sm:max-w-sm">
            {/* MOBILE HERO */}
            <div className="mb-6 text-center lg:hidden">
              <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] text-violet-300">
                AI Career Assistant
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl font-black text-white">
                oneXjob
              </h1>
              <p className="mt-1.5 text-xs text-zinc-300">
                Find Jobs. Get Interviews. Faster.
              </p>
            </div>

            {/* Login Card */}
            <div
              className="
                rounded-xl
                border border-white/10 bg-black/45
                p-4 sm:p-5 md:p-6
                shadow-[0_15px_40px_rgba(0,0,0,.55)]
                backdrop-blur-2xl
              "
            >
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Welcome Back
              </h2>

              <p className="mt-1.5 text-xs text-zinc-400 leading-5">
                Continue building your career with AI-powered job search.
              </p>

              <div className="mt-5 space-y-3.5">
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs text-zinc-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full rounded-lg
                      border border-white/10 bg-white/5
                      px-3.5 py-2.5
                      text-sm text-white
                      placeholder:text-zinc-500
                      outline-none transition
                      focus:border-violet-500
                      focus:ring-2 focus:ring-violet-500/30
                    "
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-xs text-zinc-300">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="
        w-full rounded-lg
        border border-white/10 bg-white/5
        px-3.5 py-2.5 pr-11
        text-sm text-white
        placeholder:text-zinc-500
        outline-none transition
        focus:border-violet-500
        focus:ring-2 focus:ring-violet-500/30
      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
        absolute right-3 top-1/2
        -translate-y-1/2
        text-zinc-400
        transition
      "
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  onClick={login}
                  disabled={loading}
                  className="
                    w-full rounded-lg
                    bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500
                    py-2.5
                    text-sm font-semibold text-white
                    transition-all duration-300
                    md:hover:scale-[1.01]
                    hover:shadow-[0_0_25px_rgba(99,102,241,.4)]
                    disabled:opacity-60
                  "
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>

              {/* Divider */}
              <div className="my-5 flex items-center">
                <div className="h-px flex-1 bg-white/10" />
                <span className="px-2.5 text-[11px] text-zinc-500">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Register */}
              <div className="text-center">
                <p className="text-xs text-zinc-400">New to oneXjob?</p>
                <button
                  onClick={() => router.push("/register")}
                  className="
                    mt-1.5 text-xs font-semibold text-violet-400
                    transition hover:text-violet-300
                  "
                >
                  Create your free account →
                </button>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 mt-4 text-center">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
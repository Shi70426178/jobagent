"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();

  const { setToken } = useAuthStore();

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
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
    relative
    min-h-screen
    overflow-x-hidden
    overflow-y-auto
    bg-cover
    bg-center
    bg-no-repeat
  "
      style={{
        backgroundImage: "url('/Login_BG.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/45" />
      <div
        className="
    relative
    z-10
    flex
    min-h-screen
    flex-col
    lg:flex-row
  "
      >
        {/* LEFT PANEL */}

        <div
          className="
    hidden
    lg:flex
    lg:w-1/2
    xl:w-[55%]
    items-center
    justify-center
    px-6
    xl:px-10
    2xl:px-16
  "
        >
          <div className="max-w-lg">
            <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-300">
              🚀 Trusted by ambitious job seekers
            </div>

            <h1
              className="
      mt-4
      text-3xl
      xl:text-4xl
      2xl:text-5xl
      font-black
      tracking-tight
      text-white
    "
            >
              oneXjob
            </h1>

            <h2
              className="
      mt-2
      text-lg
      xl:text-xl
      font-semibold
      text-zinc-100
    "
            >
              Your Personal AI Job Search Copilot
            </h2>

            <p
              className="
      mt-4
      max-w-md
      text-[14px]
      leading-7
      text-zinc-300
    "
            >
              Discover better opportunities, generate recruiter-ready emails,
              optimize your resume, track every application and land more
              interviews—all powered by AI.
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Discover thousands of verified jobs instantly",
                "AI-powered resume matching",
                "Generate recruiter-ready emails",
                "Increase your chances of getting hired",
              ].map((item) => (
                <div
                  key={item}
                  className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3.5
            backdrop-blur-xl
            transition-all
            duration-300
            md:hover:translate-x-1
            hover:border-violet-500/40
          "
                >
                  <div
                    className="
            flex
            h-8
            w-8
            items-center
            justify-center
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

                  <p className="text-sm text-zinc-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOGIN PANEL */}

        <div
          className="
    flex
    flex-1
    items-center
    justify-center
    px-4
    sm:px-6
    md:px-8
    py-8
    lg:py-12
  "
        >
          <div
            className="
    w-full
    max-w-sm
    sm:max-w-md
  "
          >
            {/* MOBILE HERO */}

            <div className="mb-8 text-center lg:hidden">
              <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                AI Career Assistant
              </div>

              <h1
  className="
    mt-4
    text-3xl
    sm:text-4xl
    font-black
    text-white
  "
>
                oneXjob
              </h1>

              <p className="mt-2 text-sm text-zinc-300">
                Find Jobs. Get Interviews. Faster.
              </p>
            </div>

            {/* Login Card */}

            <div
              className="
        rounded-2xl
        border
        border-white/10
        bg-black/45
        p-5
sm:p-6
md:p-7
        shadow-[0_15px_40px_rgba(0,0,0,.55)]
        backdrop-blur-2xl
      "
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h2>

              <p className="mt-2 text-sm text-zinc-400 leading-6">
                Continue building your career with AI-powered job search.
              </p>

              <div className="mt-6 space-y-5">
                {/* Email */}

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3.5
              text-sm
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/30
            "
                  />
                </div>

                {/* Password */}

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3.5
              text-sm
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/30
            "
                  />
                </div>

                {/* Login Button */}

                <button
                  onClick={login}
                  disabled={loading}
                  className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            via-indigo-600
            to-cyan-500
            py-3.5
            text-sm sm:text-base
            font-semibold
            text-white
            transition-all
            duration-300
            md:hover:scale-[1.01]
            hover:shadow-[0_0_25px_rgba(99,102,241,.4)]
            disabled:opacity-60
          "
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>

              {/* Divider */}

              <div className="my-6 flex items-center">
                <div className="h-px flex-1 bg-white/10" />

                <span className="px-3 text-xs text-zinc-500">or</span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Register */}

              <div className="text-center">
                <p className="text-sm text-zinc-400">New to oneXjob?</p>

                <button
                  onClick={() => router.push("/register")}
                  className="
            mt-2
            text-sm
            font-semibold
            text-violet-400
            transition
            hover:text-violet-300
          "
                >
                  Create your free account →
                </button>
              </div>
            </div>


            <p className="text-sm text-zinc-500 mt-6 text-center">
  By continuing, you agree to our{" "}
  <a
    href="/terms"
    className="text-blue-500 hover:underline"
  >
    Terms of Service
  </a>{" "}
  and{" "}
  <a
    href="/privacy"
    className="text-blue-500 hover:underline"
  >
    Privacy Policy
  </a>.
</p>
          </div>
        </div>
      </div>
    </div>
  );
}

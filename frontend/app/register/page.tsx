"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      setLoading(true);

      await api.post("/auth/register", {
        email,
        full_name: fullName,
        password,
      });

      router.push("/login");
    } catch (error) {
      alert("Registration failed");
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
      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/50" />

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
        {/* ================= LEFT PANEL ================= */}

        <div
className="
hidden
lg:flex
lg:w-1/2
xl:w-[58%]
items-center
justify-center
px-6
xl:px-10
2xl:px-16
"
>
          <div className="max-w-md">
            <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs
sm:text-sm font-medium text-violet-300">
              🚀 Join thousands of successful job seekers
            </div>

            <h1
              className="
                mt-5
                text-4xl
                xl:text-5xl
                2xl:text-6xl
                font-black
                tracking-tight
                text-white
              "
            >
              oneXjob
            </h1>

            <h2
              className="
                mt-3
                text-xl
                xl:text-2xl
                font-bold
                text-white
              "
            >
              Build Your Career With AI
            </h2>

            <p
              className="
                mt-5
                max-w-md
                text-[14px]
                leading-7
                text-zinc-300
              "
            >
              Create your free account and let AI discover jobs, personalize
              recruiter emails, optimize your resume, and help you land more
              interviews.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Automated job discovery",
                "AI generated recruiter emails",
                "Resume match score",
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
                    py-3
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    md:hover:translate-x-1
                    hover:border-violet-500/40
                    hover:bg-white/10
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-r
                      from-violet-600
                      to-cyan-500
                      text-sm
                      font-bold
                      text-white
                    "
                  >
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">{item}</p>

                    <p className="text-xs
sm:text-sm text-zinc-400">
                      Powered by advanced AI
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}

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
            {/* MOBILE HEADER */}

            <div className="mb-6 text-center lg:hidden">
              <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs
sm:text-sm text-violet-300">
                AI Career Assistant
              </div>

              <h1 className="mt-3 text-3xl font-black text-white">
                oneXjob
              </h1>

              <p className="mt-2 text-sm text-zinc-300">
                Start your AI-powered career journey.
              </p>
            </div>

            {/* REGISTER CARD */}

            <div
              className="
        rounded-2xl
        border
        border-white/10
        bg-black/45
        p-5
sm:p-6
md:p-7
        shadow-[0_12px_35px_rgba(0,0,0,.55)]
        backdrop-blur-2xl
      "
            >
              <h2
className="
text-xl
md:text-2xl
font-bold
text-white
"
>
                Create Your Account
              </h2>

              <p className="mt-2 text-sm leading-5 text-zinc-400">
                Join oneXjob and accelerate your job search with AI.
              </p>

              <div className="mt-4 space-y-3">
                {/* Full Name */}

                <div>
                  <label className="mb-1 block text-xs
sm:text-sm text-zinc-300">
                    Full Name
                  </label>

                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Shivam Kumar"
                    className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-3
              py-3
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

                {/* Email */}

                <div>
                  <label className="mb-1 block text-xs
sm:text-sm text-zinc-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-3
              py-3
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
                  <label className="mb-1 block text-xs
sm:text-sm text-zinc-300">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-3
              py-3
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

                  <p className="mt-1 text-xs leading-4 text-zinc-500">
                    Use at least 8 characters with letters and numbers.
                  </p>
                </div>

                {/* Register Button */}

                <button
                  onClick={register}
                  disabled={loading}
                  className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            via-indigo-600
            to-cyan-500
            py-3.5
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            md:hover:scale-[1.01]
            hover:shadow-[0_0_20px_rgba(99,102,241,.35)]
          "
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>

              {/* Divider */}

              <div className="my-4 flex items-center">
                <div className="h-px flex-1 bg-white/10" />

                <span className="px-3 text-xs text-zinc-500">
                  Start Your Career
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Login Link */}

              <div className="text-center">
                <p className="text-sm text-zinc-400">
                  Already have an account?
                </p>

                <button
                  onClick={() => router.push("/login")}
                  className="
            mt-2
            text-sm
            font-semibold
            text-violet-400
            hover:text-violet-300
          "
                >
                  Sign In →
                </button>
              </div>
            </div>

            {/* Footer */}

            <div className="mt-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

                <span className="text-xs
sm:text-sm text-emerald-300">
                  Secure Registration
                </span>
              </div>

              <p className="mt-3 text-xs
sm:text-sm leading-5 text-zinc-400">
                🔒 Your information is encrypted and protected.
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                © {new Date().getFullYear()} oneXjob. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

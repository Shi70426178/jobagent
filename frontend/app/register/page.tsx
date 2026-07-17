"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { api } from "@/lib/axios";
import { Eye, EyeOff } from "lucide-react";
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
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Login_BG.png')",
      }}
    >
      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/45" />

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">

        {/* ================= LEFT PANEL ================= */}

        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] items-center justify-center px-6 xl:px-8 2xl:px-12">

          <div className="max-w-sm">

            {/* Badge */}

            <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-300">
              🚀 Join thousands of successful job seekers
            </div>

            {/* Logo */}

            <h1 className="mt-3 text-2xl xl:text-3xl 2xl:text-4xl font-black tracking-tight text-white">
              oneXjob
            </h1>

            {/* Heading */}

            <h2 className="mt-1.5 text-xl xl:text-2xl font-bold leading-tight text-white">
              Build Your Career
              <br />
              With AI
            </h2>

            {/* Description */}

            <p className="mt-3 max-w-sm text-[12px] leading-6 text-zinc-300">
              Create your free account and let AI discover jobs,
              personalize recruiter emails, optimize your resume,
              and automatically connect you with the right
              opportunities.
            </p>

            {/* Features */}

            <div className="mt-5 space-y-2.5">

              {[
                {
                  title: "Automated Job Discovery",
                  subtitle: "Find matching jobs instantly.",
                },
                {
                  title: "AI Recruiter Emails",
                  subtitle: "Generate personalized emails.",
                },
                {
                  title: "Resume Match Score",
                  subtitle: "Know your ATS compatibility.",
                },
              ].map((item) => (

                <div
                  key={item.title}
                  className="
                  flex
                  items-center
                  gap-2.5
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  px-3
                  py-2.5
                  backdrop-blur-xl
                  shadow-[0_0_20px_rgba(255,255,255,0.08)]
                  transition-all
                  duration-300
                  hover:border-violet-500/40
                  hover:translate-x-1
                "
                >

                  <div
                    className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-violet-600
                    to-cyan-500
                    text-[10px]
                    font-bold
                    text-white
                  "
                  >
                    ✓
                  </div>

                  <div>

                    <h3 className="text-xs font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-zinc-400">
                      {item.subtitle}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ================= RIGHT PANEL ================= */}

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
                Build Your Career With AI
              </p>

            </div>

            {/* ================= REGISTER CARD ================= */}
            {/* ================= REGISTER CARD ================= */}

            <div
              className="
    rounded-xl
    border border-white/10
    bg-black/45
    p-4 sm:p-5 md:p-6
    shadow-[0_15px_40px_rgba(0,0,0,.55)]
    backdrop-blur-2xl
  "
            >

              <h2 className="text-xl md:text-2xl font-bold text-white">
                Create Your Account
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-zinc-400">
                Join oneXjob and accelerate your job search with AI.
              </p>

              <div className="mt-5 space-y-3.5">

                {/* Full Name */}

                <div>

                  <label className="mb-1.5 block text-xs text-zinc-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Shivam Singh"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="
          w-full rounded-lg
          border border-white/10
          bg-white/5
          px-3.5 py-2.5
          text-sm text-white
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

                  <label className="mb-1.5 block text-xs text-zinc-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
          w-full rounded-lg
          border border-white/10
          bg-white/5
          px-3.5 py-2.5
          text-sm text-white
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

                  <label className="mb-1.5 block text-xs text-zinc-300">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="
      w-full rounded-lg
      border border-white/10
      bg-white/5
      px-3.5 py-2.5 pr-11
      text-sm text-white
      placeholder:text-zinc-500
      outline-none
      transition
      focus:border-violet-500
      focus:ring-2
      focus:ring-violet-500/30
    "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>

                  </div>

                  <p className="mt-1 text-[11px] text-zinc-500">
                    Password must be at least 8 characters long.
                  </p>

                </div>

                {/* Register Button */}

                <button
                  onClick={register}
                  disabled={loading}
                  className="
        w-full rounded-lg
        bg-gradient-to-r
        from-violet-600
        via-indigo-600
        to-cyan-500
        py-2.5
        text-sm
        font-semibold
        text-white
        transition-all
        duration-300
        hover:scale-[1.01]
        hover:shadow-[0_0_25px_rgba(99,102,241,.4)]
        disabled:opacity-60
      "
                >

                  {loading ? (

                    <div className="flex items-center justify-center gap-2">

                      <div
                        className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-white
              border-t-transparent
            "
                      />

                      Creating Account...

                    </div>

                  ) : (

                    "Create Account"

                  )}

                </button>

              </div>

              {/* Divider */}

              <div className="my-5 flex items-center">

                <div className="h-px flex-1 bg-white/10" />

                <span className="px-2.5 text-[11px] text-zinc-500">
                  or
                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>

              {/* Login */}

              <div className="text-center">

                <p className="text-xs text-zinc-400">
                  Already have an account?
                </p>

                <button
                  onClick={() => router.push("/login")}
                  className="
        mt-1.5
        text-xs
        font-semibold
        text-violet-400
        transition
        hover:text-violet-300
      "
                >
                  Sign In →
                </button>

              </div>

            </div>
            {/* Terms & Privacy */}

            <p className="mt-4 text-center text-[11px] leading-5 text-zinc-500">
              By creating an account, you agree to our{" "}
              <a
                href="/terms"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Secure Badge */}

            <div className="mt-4 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-emerald-300">
                  Secure Registration
                </span>
              </div>
            </div>

            {/* Footer */}

            <p className="mt-4 text-center text-[11px] text-zinc-500">
              © {new Date().getFullYear()} oneXjob. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
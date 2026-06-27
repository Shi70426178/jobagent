"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const register = async () => {
    try {
      setLoading(true);

      await api.post(
        "/auth/register",
        {
          email,
          full_name: fullName,
          password,
        }
      );

      router.push("/login");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      <div className="hidden lg:flex w-1/2 border-r border-zinc-800 items-center justify-center">

        <div className="max-w-md">

          <div className="mb-8">

            <h1 className="text-5xl font-bold text-white">
              Project22
            </h1>

            <p className="text-zinc-500 mt-3">
              AI Job Agent
            </p>

          </div>

          <div className="space-y-4 text-zinc-400">

            <p>
              • Automated job discovery
            </p>

            <p>
              • AI generated emails
            </p>

            <p>
              • Resume matching
            </p>

            <p>
              • Recruiter tracking
            </p>

          </div>

        </div>

      </div>

      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          <div className="mb-10">

            <h2 className="text-3xl font-semibold text-white">
              Create account
            </h2>

            <p className="text-zinc-500 mt-2">
              Start using Project22 today.
            </p>

          </div>

          <div className="space-y-5">

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Full Name
              </label>

              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                placeholder="Shivam Kumar"
                className="
                  w-full
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-zinc-600
                "
              />

            </div>

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="you@example.com"
                className="
                  w-full
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-zinc-600
                "
              />

            </div>

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="••••••••"
                className="
                  w-full
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-zinc-600
                "
              />

            </div>

            <button
              onClick={register}
              disabled={loading}
              className="
                w-full
                bg-white
                text-black
                py-3
                rounded-xl
                font-medium
                hover:bg-zinc-200
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

          </div>

          <p className="text-center text-zinc-500 mt-8">

            Already have an account?

            <span
              onClick={() =>
                router.push("/login")
              }
              className="
                ml-2
                text-white
                cursor-pointer
                hover:text-zinc-300
              "
            >
              Login
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}
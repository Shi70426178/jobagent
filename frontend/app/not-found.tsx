"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/Login_BG.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/70" />

      {/* Glow */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[150px]" />
      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[160px]" />

      <div className="relative z-10 w-full max-w-3xl px-6">

        <div className="rounded-3xl border border-white/10 bg-black/40 p-12 text-center backdrop-blur-2xl">

          <div className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            Error 404
          </div>

          <h1 className="mt-8 text-7xl font-black text-white">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Page Not Found
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-8 text-zinc-400">
            Sorry, the page you're looking for doesn't exist,
            has been moved, or the URL may be incorrect.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/"
              className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-3 font-semibold text-white transition hover:scale-105"
            >
              Go Home
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-white transition hover:bg-white/10"
            >
              Dashboard
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}
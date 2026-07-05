"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Login_BG.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10">
        {/* ================= NAVBAR ================= */}

        <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-3xl font-black text-white">
                one<span className="text-cyan-400">X</span>job
              </h1>

              <p className="text-xs text-zinc-400">
                AI Career Assistant
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="rounded-xl border border-white/20 px-6 py-2 text-white transition hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-6 py-2 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* ================= HERO ================= */}

        <section
  id="hero"
  className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center"
>
          <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            🚀 AI-Powered Career Assistant
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-black leading-tight text-white md:text-7xl">
            Find Your Dream Job
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              Faster with AI
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Discover verified jobs, optimize your resume, generate recruiter-ready
            emails, and track every application—all powered by AI.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white transition hover:scale-105"
            >
              Create Free Account
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}

          <div className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="text-3xl font-black text-cyan-400">
                24/7
              </h2>

              <p className="mt-2 text-zinc-300">
                AI Job Monitoring
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="text-3xl font-black text-violet-400">
                AI
              </h2>

              <p className="mt-2 text-zinc-300">
                Resume Optimization
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="text-3xl font-black text-cyan-400">
                1 Click
              </h2>

              <p className="mt-2 text-zinc-300">
                AI Applications
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="text-3xl font-black text-violet-400">
                Smart
              </h2>

              <p className="mt-2 text-zinc-300">
                Career Tracking
              </p>
            </div>
          </div>
                </section>

        {/* ================= FEATURES ================= */}

        <section
  id="features"
  className="mx-auto max-w-7xl px-6 pb-24"
>
          <div className="text-center">
            <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Powerful Features
            </div>

            <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
              Everything You Need
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              oneXjob automates your entire job search workflow so you can
              spend less time applying and more time getting interviews.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {/* CARD */}

            <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-3xl">
                🔍
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Smart Job Search
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Discover thousands of verified jobs tailored to your skills,
                experience and preferred locations.
              </p>
            </div>

            {/* CARD */}

            <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-3xl">
                📄
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Resume Matching
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                AI compares your resume with every job and recommends
                improvements before applying.
              </p>
            </div>

            {/* CARD */}

            <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-3xl">
                ✉️
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                AI Email Writer
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Generate recruiter-ready application emails personalized for
                every company in seconds.
              </p>
            </div>

            {/* CARD */}

            <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-3xl">
                📊
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Application Tracker
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Keep track of every application, interview and recruiter
                response from one dashboard.
              </p>
            </div>

          </div>
        </section>
                {/* ================= HOW IT WORKS ================= */}

        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="text-center">

            <div className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              How It Works
            </div>

            <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
              Apply for Jobs in Minutes
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              oneXjob automates every step of your job search so you can focus
              on getting interviews instead of filling endless applications.
            </p>

          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                Create Account
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Register for free and build your professional profile in just a few minutes.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                Upload Resume
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Let our AI analyze your resume and prepare it for every opportunity.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                Find Jobs
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Browse AI-curated opportunities matched to your skills and career goals.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-xl font-bold text-white">
                4
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                Apply with AI
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Generate personalized application emails and track every application from one dashboard.
              </p>

            </div>

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section
  id="features"
  className="mx-auto max-w-7xl px-6 pb-24"
>

          <div className="overflow-hidden rounded-[32px] border border-violet-500/20 bg-gradient-to-r from-violet-900/40 via-black/40 to-cyan-900/40 p-10 backdrop-blur-2xl">

            <div className="mx-auto max-w-4xl text-center">

              <h2 className="text-4xl font-black text-white md:text-5xl">
                Ready to Land Your Next Job?
              </h2>

              <p className="mt-6 text-lg leading-8 text-zinc-300">
                Join oneXjob today and let AI handle the repetitive work while
                you focus on interviews and your career.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white transition hover:scale-105"
                >
                  Get Started Free
                </Link>

                <Link
                  href="/login"
                  className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg text-white transition hover:bg-white/10"
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* ================= FOOTER ================= */}

        <footer
  id="contact" className="border-t border-white/10 bg-black/40 backdrop-blur-xl">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

            <div>

              <h2 className="text-2xl font-black text-white">
                one<span className="text-cyan-400">X</span>job
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                AI-powered career platform built for ambitious professionals.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-8 text-sm">

              <Link
                href="/privacy"
                className="text-zinc-400 transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-zinc-400 transition hover:text-white"
              >
                Terms of Service
              </Link>

              <Link
                href="/contact"
                className="text-zinc-400 transition hover:text-white"
              >
                Contact
              </Link>

            </div>

          </div>

          <div className="border-t border-white/10 py-6 text-center text-sm text-zinc-500">
            © 2026 oneXjob. All rights reserved.
          </div>

        </footer>

      </div>
    </div>
  );
}

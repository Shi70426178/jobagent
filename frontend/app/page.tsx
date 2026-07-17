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
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />

      <div className="relative z-10">
        {/* ================= NAVBAR ================= */}

        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-black text-white">
                one<span className="text-cyan-400">X</span>job
              </h1>

              <p className="text-[11px] text-zinc-400">
                AI Career Assistant
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-lg border border-white/20 px-5 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* ================= HERO ================= */}

        <section
          id="hero"
          className="mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-6 text-center"
        >
          <div className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            AI Powered Career Assistant
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
            Find Your Dream Job
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              Faster in 5 Simple steps
            </span>
          </h1>

          
{/* 5 Simple Steps */}
{/* ================= HOW IT WORKS ================= */}

<section className="mx-auto max-w-7xl px-6 py-12">

  {/* Heading */}

  



  {/* Cards */}

  <div className="grid gap-5 md:grid-cols-5">

    {[
      {
        icon: "📄",
        title: "Upload Resume",
        desc: "Upload your latest resume for AI analysis."
      },
      {
        icon: "📧",
        title: "Connect Gmail",
        desc: "Securely connect Gmail for one-click AI applications."
      },
      {
        icon: "🔍",
        title: "Search Jobs",
        desc: "AI finds jobs matching your skills and preferences."
      },
      {
        icon: "🤖",
        title: "Generate Email",
        desc: "AI writes a personalized recruiter-ready application email."
      },
      {
        icon: "🚀",
        title: "Apply",
        desc: "Review everything and apply instantly with a single click."
      }
    ].map((item, index) => (
      <div
        key={index}
        className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-xl">
          {item.icon}
        </div>

        <h3 className="mt-4 text-base font-semibold text-white">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {item.desc}
        </p>
      </div>
    ))}

  </div>

</section>


          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-7 py-3 text-base font-semibold text-white transition hover:scale-105"
            >
              Create Free Account
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-white/20 bg-white/5 px-7 py-3 text-base text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>

          {/* ================= QUICK STATS ================= */}

          <div className="mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h2 className="text-2xl font-black text-cyan-400">
                24/7
              </h2>

              <p className="mt-1 text-sm text-zinc-300">
                AI Job Monitoring
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h2 className="text-2xl font-black text-violet-400">
                AI
              </h2>

              <p className="mt-1 text-sm text-zinc-300">
                Resume Optimization
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h2 className="text-2xl font-black text-cyan-400">
                1 Click
              </h2>

              <p className="mt-1 text-sm text-zinc-300">
                Smart Applications
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h2 className="text-2xl font-black text-violet-400">
                Smart
              </h2>

              <p className="mt-1 text-sm text-zinc-300">
                Career Tracking
              </p>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}

<section
  id="features"
  className="mx-auto max-w-7xl px-6 py-12"
>
  <div className="text-center">
    <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
      Powerful Features
    </div>

    <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
      Everything You Need
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
      oneXjob automates your complete job search workflow so you spend less
      time applying and more time getting interviews.
    </p>
  </div>

  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

    {/* CARD 1 */}

    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-500/40">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-2xl">
        🔍
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">
        Smart Job Search
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Discover verified jobs based on your skills, experience and preferred
        locations.
      </p>

    </div>

    {/* CARD 2 */}

    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-2xl">
        📄
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">
        Resume Matching
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        AI compares your resume with every job and recommends improvements
        before you apply.
      </p>

    </div>

    {/* CARD 3 */}

    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-500/40">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-2xl">
        ✉️
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">
        AI Email Writer
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Generate recruiter-ready application emails personalized for every
        company in seconds.
      </p>

    </div>

    {/* CARD 4 */}

    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-2xl">
        📊
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">
        Application Tracker
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Track applications, interviews and recruiter responses from one smart
        dashboard.
      </p>

    </div>

  </div>
</section>



{/* ================= CTA ================= */}

<section
  id="cta"
  className="mx-auto max-w-7xl px-6 py-12"
>
  <div className="overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-900/40 via-black/40 to-cyan-900/40 p-8 backdrop-blur-2xl">

    <div className="mx-auto max-w-3xl text-center">

      <h2 className="text-3xl font-black text-white md:text-4xl">
        Ready to Land Your Next Job?
      </h2>

      <p className="mt-4 text-base leading-7 text-zinc-300">
        Join thousands of professionals using AI to automate job searching,
        resume matching and recruiter outreach.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

        <Link
          href="/register"
          className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-7 py-3 text-base font-semibold text-white transition duration-300 hover:scale-105"
        >
          Get Started Free
        </Link>

        <Link
          href="/login"
          className="rounded-xl border border-white/20 bg-white/5 px-7 py-3 text-base text-white transition duration-300 hover:bg-white/10"
        >
          Login
        </Link>

      </div>

    </div>

  </div>

</section>

{/* ================= FOOTER ================= */}

<footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">

  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">

    <div>

      <h2 className="text-2xl font-black text-white">
        one<span className="text-cyan-400">X</span>job
      </h2>

      <p className="mt-2 max-w-sm text-sm text-zinc-400">
        AI-powered career platform helping professionals discover, apply and
        track jobs faster.
      </p>

    </div>

    <div className="flex flex-wrap items-center gap-6 text-sm">

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

  <div className="border-t border-white/10 py-5 text-center text-sm text-zinc-500">
    © 2026 oneXjob. All rights reserved.
  </div>

</footer>

</div>

</div>
);
}
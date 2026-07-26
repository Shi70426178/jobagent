"use client";

import Link from "next/link";
import { Fondamento } from "next/font/google";

const fondamento = Fondamento({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050816] to-black" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/5 blur-[180px]" />

      <div className="relative z-10">
        {/* ================= NAVBAR ================= */}

        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

            {/* Logo */}

            <div>

              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                oneXjob
              </h1>

              <p className="mt-0.5 text-xs text-zinc-500">
                AI Career Assistant
              </p>

            </div>

            {/* Buttons */}

            <div className="flex items-center gap-3">

              {/* Login */}

              <Link
                href="/login"
                className="
                inline-flex
                items-center
                justify-center
                rounded-lg
                border
                border-white/15
                bg-white/5
                px-5
                py-2
                text-sm
                font-medium
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-white/25
                hover:bg-white/10
                hover:-translate-y-0.5
                hover:shadow-[0_0_18px_rgba(255,255,255,.08)]
              "
              >
                Login
              </Link>

              {/* Get Started */}

              <Link
                href="/register"
                className="
                inline-flex
                items-center
                justify-center
                rounded-lg
                border
                border-white
                bg-white
                px-5
                py-2
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:bg-zinc-100
                hover:-translate-y-0.5
                hover:shadow-[0_0_22px_rgba(255,255,255,.18)]
              "
              >
                Get Started
              </Link>

            </div>

          </div>
        </header>
        {/* ================= HERO ================= */}

<section
  id="hero"
  className="relative mx-auto flex min-h-[82vh] max-w-7xl flex-col items-center justify-center px-6 text-center"
>

  {/* Hero Glow */}
  <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/5 blur-[150px]" />

  {/* Badge */}

  <div className="relative inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">

    <span className="mr-2 text-base">✨</span>

    <span className="text-sm font-medium tracking-wide text-gray-300">
      AI Career Assistant
    </span>

  </div>

  {/* Main Heading */}

  <h1
    className={`${fondamento.className} mt-8 max-w-5xl text-5xl leading-tight text-gray-100 md:text-7xl`}
    style={{
      textShadow:
        "0 0 10px rgba(255,255,255,.15), 0 0 24px rgba(255,255,255,.08)",
    }}
  >
    Find Your Dream Job
    <br />

    <span
      className="text-gray-300"
      style={{
        textShadow:
          "0 0 8px rgba(255,255,255,.12), 0 0 20px rgba(255,255,255,.05)",
      }}
    >
      Faster in 5 Simple Steps
    </span>
  </h1>

  {/* Subtitle */}

  <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
    Discover verified opportunities, optimize your resume, generate
    recruiter-ready emails, and apply faster with AI—all from one modern
    platform.
  </p>

  {/* Buttons */}

  <div className="mt-12 flex flex-col gap-4 sm:flex-row">

    {/* Primary */}

    <Link
      href="/register"
      className="
        inline-flex
        items-center
        justify-center
        rounded-xl
        border
        border-white
        bg-white
        px-8
        py-3.5
        text-base
        font-semibold
        text-black
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-zinc-100
        hover:shadow-[0_0_24px_rgba(255,255,255,.18)]
      "
    >
      Create Free Account
    </Link>

    {/* Secondary */}

    <Link
      href="/login"
      className="
        inline-flex
        items-center
        justify-center
        rounded-xl
        border
        border-white/15
        bg-white/5
        px-8
        py-3.5
        text-base
        font-medium
        text-white
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-white/30
        hover:bg-white/10
      "
    >
      Sign In
    </Link>

  </div>

  {/* Bottom Stats */}

  <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">

    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-white"></div>
      AI Powered
    </div>

    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-white"></div>
      Resume Matching
    </div>

    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-white"></div>
      One Click Apply
    </div>

    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-white"></div>
      Career Tracking
    </div>

  </div>

</section>
{/* ================= HOW IT WORKS ================= */}

<section
  id="how-it-works"
  className="mx-auto max-w-7xl px-6 py-24"
>
  {/* Heading */}

  <div className="text-center">

    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
      <span className="text-sm text-gray-300">
        Your Journey
      </span>
    </div>

    <h2
      className={`${fondamento.className} mt-6 text-4xl text-gray-200 md:text-5xl`}
      style={{
        textShadow:
          "0 0 8px rgba(255,255,255,.15),0 0 18px rgba(255,255,255,.06)",
      }}
    >
      Faster in 5 Simple Steps
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-400">
      oneXjob automates your complete application process so you can focus on
      getting interviews instead of filling repetitive forms.
    </p>

  </div>

  {/* Cards */}

  <div className="mt-16 grid gap-6 md:grid-cols-5">

    {[
      {
        no: "01",
        icon: "📄",
        title: "Upload Resume",
        desc: "Upload your latest resume and let AI understand your profile.",
      },
      {
        no: "02",
        icon: "📧",
        title: "Connect Gmail",
        desc: "Securely connect Gmail to generate recruiter-ready emails.",
      },
      {
        no: "03",
        icon: "🔍",
        title: "Search Jobs",
        desc: "Discover opportunities tailored to your experience and skills.",
      },
      {
        no: "04",
        icon: "🤖",
        title: "Generate Email",
        desc: "AI creates personalized application emails in seconds.",
      },
      {
        no: "05",
        icon: "🚀",
        title: "Apply",
        desc: "Review everything and submit applications with one click.",
      },
    ].map((item) => (

      <div
        key={item.no}
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-6
          backdrop-blur-2xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-white/20
          hover:bg-white/[0.05]
          hover:shadow-[0_20px_40px_rgba(255,255,255,.06)]
        "
      >

        {/* Glow */}

        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Step */}

        <div className="relative flex items-center justify-between">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/5
              text-2xl
              backdrop-blur-xl
            "
          >
            {item.icon}
          </div>

          <span className="text-xs font-semibold tracking-[0.25em] text-zinc-600">
            {item.no}
          </span>

        </div>

        <h3 className="relative mt-7 text-lg font-semibold text-white">
          {item.title}
        </h3>

        <p className="relative mt-3 text-sm leading-7 text-zinc-400">
          {item.desc}
        </p>

      </div>

    ))}

  </div>
</section>
{/* ================= QUICK STATS ================= */}

<section className="mx-auto max-w-7xl px-6 pb-24">

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

    {[
      {
        number: "24/7",
        title: "AI Job Monitoring",
        desc: "Continuously scans multiple job portals so you never miss new opportunities.",
      },
      {
        number: "AI",
        title: "Resume Optimization",
        desc: "Matches your resume against job descriptions and suggests improvements.",
      },
      {
        number: "1 Click",
        title: "Smart Applications",
        desc: "Generate personalized emails and apply to jobs within seconds.",
      },
      {
        number: "100%",
        title: "Career Tracking",
        desc: "Track applications, interviews and recruiter responses from one dashboard.",
      },
    ].map((item, index) => (

      <div
        key={index}
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-7
          backdrop-blur-2xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-white/20
          hover:bg-white/[0.05]
          hover:shadow-[0_20px_45px_rgba(255,255,255,.06)]
        "
      >

        {/* Glow */}

        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Number */}

        <h2
          className="relative text-4xl font-bold text-white"
          style={{
            textShadow:
              "0 0 10px rgba(255,255,255,.15),0 0 20px rgba(255,255,255,.05)",
          }}
        >
          {item.number}
        </h2>

        {/* Title */}

        <h3 className="relative mt-4 text-lg font-semibold text-white">
          {item.title}
        </h3>

        {/* Description */}

        <p className="relative mt-3 text-sm leading-7 text-zinc-400">
          {item.desc}
        </p>

      </div>

    ))}

  </div>

</section>
{/* ================= FEATURES ================= */}

<section
  id="features"
  className="mx-auto max-w-7xl px-6 py-24"
>
  {/* Heading */}

  <div className="text-center">

    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
      <span className="text-sm text-gray-300">
        Powerful Features
      </span>
    </div>

    <h2
      className={`${fondamento.className} mt-6 text-4xl text-gray-200 md:text-5xl`}
      style={{
        textShadow:
          "0 0 10px rgba(255,255,255,.15),0 0 22px rgba(255,255,255,.06)",
      }}
    >
      Everything You Need
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-400">
      oneXjob automates your complete job search journey—from discovering
      opportunities to generating recruiter-ready applications and tracking
      every response in one place.
    </p>

  </div>

  {/* Feature Cards */}

  <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

    {[
      {
        icon: "🔍",
        title: "Smart Job Search",
        desc: "AI finds verified jobs that closely match your skills, experience and preferred locations.",
      },
      {
        icon: "📄",
        title: "Resume Matching",
        desc: "Automatically compares your resume with every job description and highlights missing skills.",
      },
      {
        icon: "✉️",
        title: "AI Email Writer",
        desc: "Generate professional recruiter-ready application emails tailored for every company.",
      },
      {
        icon: "📊",
        title: "Application Tracker",
        desc: "Track applications, interviews, offers and recruiter replies from one dashboard.",
      },
    ].map((feature, index) => (

      <div
        key={index}
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-7
          backdrop-blur-2xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-white/20
          hover:bg-white/[0.05]
          hover:shadow-[0_20px_45px_rgba(255,255,255,.06)]
        "
      >

        {/* Hover Glow */}

        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

        {/* Icon */}

        <div
          className="
            relative
            flex
            h-16
            w-16
                       items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/5
            text-3xl
            backdrop-blur-xl
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:bg-white/10
          "
        >
          {feature.icon}
        </div>

        {/* Title */}

        <h3 className="relative mt-7 text-xl font-semibold text-white">
          {feature.title}
        </h3>

        {/* Description */}

        <p className="relative mt-4 text-sm leading-7 text-zinc-400">
          {feature.desc}
        </p>

        {/* Learn More */}

        <button
          className="
            relative
            mt-8
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-300
            transition-all
            duration-300
            group-hover:text-white
          "
        >
          Learn More

          <span
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>

        </button>

      </div>

    ))}

  </div>

</section>
{/* ================= CTA ================= */}

<section
  id="cta"
  className="mx-auto max-w-7xl px-6 py-24"
>
  <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-3xl md:p-16">

    {/* Background Glow */}

    <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />
    <div className="absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />

    <div className="relative mx-auto max-w-4xl text-center">

      {/* Badge */}

      <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">

        <span className="mr-2">🚀</span>

        <span className="text-sm text-gray-300">
          Start Your Journey Today
        </span>

      </div>

      {/* Heading */}

      <h2
        className={`${fondamento.className} mt-8 text-4xl leading-tight text-gray-100 md:text-6xl`}
        style={{
          textShadow:
            "0 0 10px rgba(255,255,255,.15),0 0 24px rgba(255,255,255,.06)",
        }}
      >
        Ready to Land
        <br />
        Your Next Job?
      </h2>

      {/* Description */}

      <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-zinc-400">
        Join thousands of professionals who use AI to discover better
        opportunities, improve their resumes, generate personalized recruiter
        emails and apply faster than ever before.
      </p>

      {/* Buttons */}

      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

        {/* Primary */}

        <Link
          href="/register"
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-white
            bg-white
            px-9
            py-4
            text-base
            font-semibold
            text-black
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-zinc-100
            hover:shadow-[0_0_30px_rgba(255,255,255,.18)]
          "
        >
          Get Started Free
        </Link>

        {/* Secondary */}

        <Link
          href="/login"
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-white/15
            bg-white/5
            px-9
            py-4
            text-base
            font-medium
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-white/30
            hover:bg-white/10
          "
        >
          Sign In
        </Link>

      </div>

      {/* Bottom Features */}

      <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white"></span>
          AI Powered
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white"></span>
          Secure Login
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white"></span>
          One-Click Apply
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white"></span>
          Real-Time Tracking
        </div>

      </div>

    </div>

  </div>

</section>
{/* ================= FOOTER ================= */}

<footer className="border-t border-white/10 bg-black/40 backdrop-blur-2xl">

  <div className="mx-auto max-w-7xl px-6 py-16">

    <div className="grid gap-12 md:grid-cols-4">

      {/* Logo */}

      <div className="md:col-span-2">

        <h2
          className={`${fondamento.className} text-4xl text-white`}
          style={{
            textShadow:
              "0 0 8px rgba(255,255,255,.12),0 0 18px rgba(255,255,255,.05)",
          }}
        >
          oneXjob
        </h2>

        <p className="mt-6 max-w-md leading-8 text-zinc-400">
          oneXjob is an AI-powered career platform that helps professionals
          discover opportunities, optimize resumes, generate personalized
          recruiter emails, and apply to jobs faster—all from one intelligent
          workspace.
        </p>

        <div className="mt-8 flex gap-4">

          <a
            href="#"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            💼
          </a>

          <a
            href="#"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            📧
          </a>

          <a
            href="#"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            🌐
          </a>

        </div>

      </div>

      {/* Product */}

      <div>

        <h3 className="text-lg font-semibold text-white">
          Product
        </h3>

        <ul className="mt-6 space-y-4">

          <li>
            <Link
              href="/"
              className="text-zinc-400 transition hover:text-white"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/register"
              className="text-zinc-400 transition hover:text-white"
            >
              Get Started
            </Link>
          </li>

          <li>
            <Link
              href="/login"
              className="text-zinc-400 transition hover:text-white"
            >
              Login
            </Link>
          </li>

        </ul>

      </div>

      {/* Company */}

      <div>

        <h3 className="text-lg font-semibold text-white">
          Company
        </h3>

        <ul className="mt-6 space-y-4">

          <li>
            <Link
              href="/privacy"
              className="text-zinc-400 transition hover:text-white"
            >
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link
              href="/terms"
              className="text-zinc-400 transition hover:text-white"
            >
              Terms of Service
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="text-zinc-400 transition hover:text-white"
            >
              Contact Us
            </Link>
          </li>

        </ul>

      </div>

    </div>

    {/* Divider */}

    <div className="my-10 border-t border-white/10"></div>

    {/* Bottom */}

    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

      <p className="text-sm text-zinc-500">
        © 2026 oneXjob. All rights reserved.
      </p>

      <div className="flex flex-wrap gap-6">

        <Link
          href="/privacy"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          Privacy
        </Link>

        <Link
          href="/terms"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          Terms
        </Link>

        <Link
          href="/contact"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          Support
        </Link>

      </div>

    </div>

  </div>

</footer>

</div>
</div>
);
}
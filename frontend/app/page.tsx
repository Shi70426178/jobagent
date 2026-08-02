"use client";

import Link from "next/link";
import {
  FileText,
  Mail,
  Search,
  CheckCircle2,
  ArrowRight,
  Globe,
  Briefcase,
  LayoutDashboard,
  Check,
  Zap,
} from "lucide-react";
import Image from "next/image";
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white font-sans selection:bg-white/20 selection:text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712]" />

      {/* Background Subtle Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[140px]" />

      <div className="relative z-10">
        {/* ================= NAVBAR ================= */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            {/* Logo */}
            <div>
              <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition">
                oneXjob
              </Link>
            </div>

            {/* Nav Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-1.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section
          id="hero"
          className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 text-center"
        >
          {/* Main Heading */}
          <h1 className="mx-auto max-w-4xl text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Find Your Next Job <br />
            <span className="text-zinc-400 font-semibold">Faster & Smarter</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 md:text-lg leading-relaxed">
            Automate your application workflow. Discover verified opportunities, optimize your resume, and reach recruiters directly from one unified platform.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/login"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>

          {/* Clean Trust Indicators */}
          {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Free 14-day trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Setup in 2 minutes
            </span>
          </div> */}

          {/* Product Screenshot Showcase Box */}
          {/* Product Screenshot Showcase Box */}
<div className="mt-14 relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-zinc-900/40 p-2 sm:p-3 backdrop-blur-sm shadow-2xl overflow-hidden">
  <div className="relative aspect-[16/9] w-full rounded-xl bg-zinc-950 border border-white/5 overflow-hidden">
    <Image
      src="/dashboard-preview.png"
      alt="oneXjob AI Job Agent Dashboard"
      fill
      className="object-cover object-top"
      priority
    />
  </div>
</div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Land Your Next Role in 5 Steps
            </h2>
            <p className="mt-4 text-zinc-400 text-sm md:text-base">
              Streamline your entire job application process without messy spreadsheets or manual repetitive tasks.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                no: "01",
                icon: FileText,
                title: "Upload Resume",
                desc: "Upload your latest resume to parse key skills and experience details.",
              },
              {
                no: "02",
                icon: Mail,
                title: "Connect Gmail",
                desc: "Connect your email to send recruiter-ready messages effortlessly.",
              },
              {
                no: "03",
                icon: Search,
                title: "Discover Jobs",
                desc: "Find verified listings tailored to your domain and tech stack.",
              },
              {
                no: "04",
                icon: Zap,
                title: "Draft Emails",
                desc: "Instantly draft tailored outreach emails for every hiring manager.",
              },
              {
                no: "05",
                icon: Check,
                title: "Apply & Track",
                desc: "Review and submit applications while keeping status updated.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.no}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-600">
                      {item.no}
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        {/* <section id="features" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Everything You Need to Scale Your Job Hunt
            </h2>
            <p className="mt-4 text-zinc-400 text-sm md:text-base">
              Built for working professionals and job seekers who want structured, efficient results.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Search,
                title: "Smart Job Search",
                desc: "Filter verified positions based on experience level, compensation, and remote preferences.",
              },
              {
                icon: FileText,
                title: "Resume Optimizer",
                desc: "Scan job specs to highlight missing industry keywords and format requirements.",
              },
              {
                icon: Mail,
                title: "Outreach Assistant",
                desc: "Generate concise, professional recruiter outreach emails tailored for every position.",
              },
              {
                icon: LayoutDashboard,
                title: "Application Tracker",
                desc: "Monitor submitted applications, interview dates, and offer letters in one clean board.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section> */}

        {/* ================= CTA ================= */}
        {/* <section id="cta" className="mx-auto max-w-7xl px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-10 text-center md:p-16">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Ready to Start Applying?
              </h2>
              <p className="mt-4 text-sm text-zinc-400 md:text-base leading-relaxed">
                Join hundreds of candidates speeding up their hiring process and landing more interviews with oneXjob.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
                >
                  Get Started Free
                </Link>

                <Link
                  href="/login"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section> */}

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-white/10 bg-black/40">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid gap-10 md:grid-cols-4">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  oneXjob
                </h2>
                <p className="mt-4 max-w-sm text-xs leading-relaxed text-zinc-400">
                  A modern platform helping professionals discover job openings, refine resumes, and manage application pipelines cleanly.
                </p>

                <div className="mt-6 flex gap-3 text-zinc-400">
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:border-white/20 hover:text-white"
                  >
                    <Briefcase className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:border-white/20 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:border-white/20 hover:text-white"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Product
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs">
                  <li>
                    <Link href="/" className="text-zinc-400 transition hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="text-zinc-400 transition hover:text-white">
                      Get Started
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="text-zinc-400 transition hover:text-white">
                      Sign In
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Company
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs">
                  <li>
                    <Link href="/privacy" className="text-zinc-400 transition hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-zinc-400 transition hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-zinc-400 transition hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-zinc-500">
              <p>© 2026 oneXjob. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-white transition">
                  Terms
                </Link>
                <Link href="/contact" className="hover:text-white transition">
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
"use client";

import Link from "next/link";
import {
  FileText,
  Mail,
  Search,
  ArrowRight,
  Globe,
  Briefcase,
  Check,
  Zap,
  MapPin,
  Users,
  Code2,
  Building2,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import SeoSchema from "@/components/SeoSchema";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const walkinLocations = [
    "Delhi",
    "Noida",
    "Gurgaon",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Mumbai",
    "Chennai",
  ];

  const jobCategories = [
    {
      name: "Software Developer Jobs",
      description: "Latest software development opportunities",
      icon: Code2,
    },
    {
      name: "Java Developer Jobs",
      description: "Java and backend development opportunities",
      icon: Briefcase,
    },
    {
      name: "QA & Testing Jobs",
      description: "Quality assurance and testing jobs",
      icon: Check,
    },
    {
      name: "Data Analyst Jobs",
      description: "Data analytics and business intelligence jobs",
      icon: Search,
    },
    {
      name: "Frontend Developer Jobs",
      description: "React, Next.js and frontend opportunities",
      icon: Globe,
    },
    {
      name: "Backend Developer Jobs",
      description: "Backend and API development opportunities",
      icon: Zap,
    },
  ];

  const faqs = [
    {
      question: "What is oneXjob?",
      answer:
        "oneXjob is a job discovery and application platform that helps candidates discover relevant job opportunities based on their resume, skills, experience and preferred location.",
    },
    {
      question: "Can I find walk-in interview jobs on oneXjob?",
      answer:
        "Yes. oneXjob provides a dedicated section for discovering walk-in interview opportunities across different job categories and locations.",
    },
    {
      question: "Can freshers find jobs on oneXjob?",
      answer:
        "Yes. Freshers can discover entry-level and fresher-friendly opportunities and find jobs based on their skills and resume.",
    },
    {
      question: "How does resume-based job matching work?",
      answer:
        "You can upload your resume and oneXjob can use the skills and experience in your profile to help you discover relevant job opportunities.",
    },
    {
      question: "Can I search jobs by location?",
      answer:
        "Yes. You can discover opportunities based on locations such as Delhi, Noida, Gurgaon, Bangalore, Hyderabad, Pune, Mumbai and other cities.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-black dark:text-white dark:selection:bg-white dark:selection:text-black">
      <SeoSchema />

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-zinc-200/50 blur-[140px] dark:bg-white/[0.03]" />

      <div className="relative z-10">

        {/* ================= NAVBAR ================= */}
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-900 dark:bg-black/70">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-zinc-900 transition hover:opacity-80 dark:text-white"
            >
              oneXjob
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/walkins"
                className="text-xs text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                Walk-in Jobs
              </Link>

              <Link
                href="/walkins"
                className="text-xs text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                Jobs
              </Link>

              <Link
                href="/walkins"
                className="text-xs text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                Fresher Jobs
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <Link
                href="/login"
                className="hidden items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-900 transition hover:bg-zinc-100 sm:inline-flex dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-800"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 text-center">

          <h1 className="mx-auto max-w-5xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
            Find Jobs That Match
            <br />
            <span className="font-semibold text-zinc-500 dark:text-zinc-500">
              Your Resume & Skills
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-400">
            Discover the latest job opportunities, walk-in interviews and
            fresher jobs based on your skills, experience and preferred
            location. Upload your resume and find relevant jobs faster with
            oneXjob.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-700 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Upload Resume & Find Jobs
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/walkins"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-6 py-2.5 text-xs font-medium text-zinc-900 transition hover:bg-zinc-100 sm:w-auto dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-800"
            >
              Browse Walk-in Jobs
              <Briefcase className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Dashboard */}
          {/* <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-2 shadow-2xl sm:p-3 dark:border-zinc-800 dark:bg-[#0a0a0a]">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
              <Image
                src="/dashboard-preview-v2.png"
                alt="oneXjob job search and resume matching dashboard"
                width={1200}
                height={675}
                className="h-auto w-full rounded-2xl border border-zinc-200 object-cover dark:border-zinc-800"
                priority
              />
            </div>
          </div> */}
        </section>

        {/* ================= WALK-IN JOBS ================= */}
        <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-[#050505]">
          <div className="mx-auto max-w-7xl px-6 py-20">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">

                <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  <Briefcase className="h-4 w-4" />
                  Job Opportunities
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
                  Latest Walk-in Jobs
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
                  Find the latest walk-in interview opportunities for freshers
                  and experienced professionals. Explore jobs by role,
                  location and skills.
                </p>
              </div>

              <Link
                href="/walkins"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-900 transition hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400"
              >
                View All Walk-in Jobs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">

              {[
                {
                  icon: Briefcase,
                  title: "Software Developer Walk-in Jobs",
                  description:
                    "Explore software developer walk-in interview opportunities and technology jobs.",
                  footer: "Multiple Locations",
                },
                {
                  icon: Users,
                  title: "Fresher Walk-in Jobs",
                  description:
                    "Discover walk-in interviews and entry-level opportunities suitable for fresh graduates.",
                  footer: "Freshers Welcome",
                },
                {
                  icon: Building2,
                  title: "Latest Company Walk-ins",
                  description:
                    "Find companies conducting walk-in interviews for different roles and experience levels.",
                  footer: "Updated Opportunities",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href="/walkins"
                    className="group rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-600"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                        <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                      </div>

                      <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-white" />
                    </div>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.footer}
                    </div>
                  </Link>
                );
              })}

            </div>
          </div>
        </section>

        {/* ================= LOCATIONS ================= */}
        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="max-w-3xl">

            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              <MapPin className="h-4 w-4" />
              Explore By Location
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
              Walk-in Jobs by Location
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
              Find walk-in interview opportunities in major cities across
              India.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {walkinLocations.map((location) => (
              <Link
                key={location}
                href="/walkins"
                className="group flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-4 transition hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-600"
              >
                <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white">
                  Walk-in Jobs in {location}
                </span>

                <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-white" />
              </Link>
            ))}
          </div>
        </section>

        {/* ================= JOB CATEGORIES ================= */}
        <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-[#050505]">
          <div className="mx-auto max-w-7xl px-6 py-20">

            <div className="max-w-3xl">

              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                <Briefcase className="h-4 w-4" />
                Explore Jobs
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
                Find Jobs by Category
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
                Explore job opportunities across popular technology and
                professional roles.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.name}
                    href="/walkins"
                    className="group rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-black dark:hover:border-zinc-600"
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                        <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                      </div>

                      <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-white" />
                    </div>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-white">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                      {category.description}
                    </p>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/walkins"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400"
              >
                Explore All Jobs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* ================= FRESHER JOBS ================= */}
        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid items-center gap-12 md:grid-cols-2">

            <div>

              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                <GraduationCap className="h-4 w-4" />
                Start Your Career
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
                Find Jobs for Freshers
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
                Starting your career can be difficult. oneXjob helps freshers
                discover relevant entry-level jobs, walk-in interviews and
                opportunities based on their skills and resume.
              </p>

              <div className="mt-7">
                <Link
                  href="/walkins"
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Explore Fresher Jobs
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-7 dark:border-zinc-800 dark:bg-[#0a0a0a]">
              <div className="space-y-5">
                {[
                  "Fresher-friendly job opportunities",
                  "Walk-in interview opportunities",
                  "Jobs based on your skills",
                  "Location-based job discovery",
                  "Resume-based job matching",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                      <Check className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                    </div>

                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-[#050505]">
          <div className="mx-auto max-w-7xl px-6 py-20">

            <div className="mx-auto max-w-3xl text-center">

              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
                How oneXjob Works
              </h2>

              <p className="mt-4 text-sm text-zinc-600 md:text-base dark:text-zinc-400">
                Streamline your job search and application process without
                messy spreadsheets or repetitive manual work.
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
                  desc: "Find job listings tailored to your domain, skills and location.",
                },
                {
                  no: "04",
                  icon: Zap,
                  title: "Draft Emails",
                  desc: "Generate tailored outreach emails for recruiters and hiring teams.",
                },
                {
                  no: "05",
                  icon: Check,
                  title: "Apply & Track",
                  desc: "Review applications and keep your job application status organized.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.no}
                    className="relative rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-700"
                  >
                    <div className="flex items-center justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-600">
                        {item.no}
                      </span>

                    </div>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.desc}
                    </p>
                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* ================= SEO CONTENT ================= */}
        <section className="mx-auto max-w-5xl px-6 py-20">

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 md:p-10 dark:border-zinc-800 dark:bg-[#0a0a0a]">

            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl dark:text-white">
              Find the Right Job Faster with oneXjob
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400">

              <p>
                oneXjob helps job seekers discover relevant job opportunities
                based on their resume, skills, experience and preferred
                location. Instead of searching through multiple job sources,
                candidates can use one platform to discover opportunities and
                manage their applications.
              </p>

              <p>
                Looking for a walk-in interview? Explore our{" "}
                <Link
                  href="/walkins"
                  className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400"
                >
                  latest walk-in jobs
                </Link>{" "}
                and discover opportunities across major cities in India.
                Candidates can also explore fresher opportunities and jobs
                across different technology and professional categories.
              </p>

              <p>
                Whether you are looking for software developer jobs, Java
                developer jobs, QA testing jobs, frontend jobs, backend jobs
                or data analyst opportunities, oneXjob helps you discover
                relevant openings and organize your job search.
              </p>

            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-[#050505]">
          <div className="mx-auto max-w-4xl px-6 py-20">

            <div className="text-center">

              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
                Frequently Asked Questions
              </h2>

              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Learn more about finding jobs and walk-in interviews with
                oneXjob.
              </p>

            </div>

            <div className="mt-10 space-y-3">

              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5 text-sm font-medium text-zinc-900 dark:text-white">
                    {faq.question}

                    <ChevronDown className="h-4 w-4 text-zinc-400 transition group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-zinc-200 px-5 py-5 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                    {faq.answer}
                  </div>
                </details>
              ))}

            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-14 text-center md:px-10 dark:border-zinc-800 dark:bg-[#0a0a0a]">

            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
              Ready to Find Your Next Job?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Upload your resume and discover job opportunities that match
              your skills and experience.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-3 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Get Started Free
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/walkins"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-6 py-3 text-xs font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-800"
              >
                Browse Walk-in Jobs
                <Briefcase className="h-3.5 w-3.5" />
              </Link>

            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-zinc-200 bg-white dark:border-zinc-900 dark:bg-black">

          <div className="mx-auto max-w-7xl px-6 py-12">

            <div className="grid gap-10 md:grid-cols-4">

              <div className="md:col-span-2">

                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  oneXjob
                </h2>

                <p className="mt-4 max-w-sm text-xs leading-relaxed text-zinc-500">
                  A modern job search platform helping professionals discover
                  jobs, walk-in interviews, improve resumes and manage
                  applications.
                </p>

                <div className="mt-6 flex gap-3 text-zinc-500">

                  <Link
                    href="/walkins"
                    aria-label="Browse jobs"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-700 dark:hover:text-white"
                  >
                    <Briefcase className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/walkins"
                    aria-label="Browse walk-in jobs"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-700 dark:hover:text-white"
                  >
                    <Search className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/contact"
                    aria-label="Contact oneXjob"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-700 dark:hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                  </Link>

                </div>
              </div>

              <div>

                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Jobs
                </h3>

                <ul className="mt-4 space-y-2.5 text-xs">

                  <li>
                    <Link
                      href="/walkins"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Browse Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/walkins"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Walk-in Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/walkins"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Fresher Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/walkins"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Software Developer Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/walkins"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Java Developer Jobs
                    </Link>
                  </li>

                </ul>
              </div>

              <div>

                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Company
                </h3>

                <ul className="mt-4 space-y-2.5 text-xs">

                  <li>
                    <Link
                      href="/"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/register"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Get Started
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/privacy"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/terms"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Terms of Service
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/contact"
                      className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                    >
                      Contact Us
                    </Link>
                  </li>

                </ul>
              </div>

            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 text-xs text-zinc-500 md:flex-row dark:border-zinc-900 dark:text-zinc-600">

              <p>
                © {new Date().getFullYear()} oneXjob. All rights reserved.
              </p>

              <div className="flex gap-6">

                <Link
                  href="/privacy"
                  className="transition hover:text-zinc-900 dark:hover:text-zinc-400"
                >
                  Privacy
                </Link>

                <Link
                  href="/terms"
                  className="transition hover:text-zinc-900 dark:hover:text-zinc-400"
                >
                  Terms
                </Link>

                <Link
                  href="/contact"
                  className="transition hover:text-zinc-900 dark:hover:text-zinc-400"
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
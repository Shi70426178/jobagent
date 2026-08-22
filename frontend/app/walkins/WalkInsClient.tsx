"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";

import {
  Search,
  RefreshCw,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  BriefcaseBusiness,
  Mail,
  Sparkles,
  BadgeCheck,
  Cpu,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface WalkInJob {
  id: number;
  company: string;
  job_title: string;
  location: string;
  venue: string;
  experience: string;
  walkin_date: string;
  walkin_time: string;
  positions: string[] | string;
  skills: string[] | string;
  contact_email: string;
}

const ITEMS_PER_PAGE = 10;

export default function WalkInsClient() {
  const [jobs, setJobs] = useState<WalkInJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  async function fetchJobs() {
    try {
      setLoading(true);

      const response = await api.get("/walkin/jobs");

      setJobs(response.data || []);
    } catch (err) {
      console.error("Error loading walk-in jobs:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function refreshJobs() {
    setRefreshing(true);
    await fetchJobs();
  }

  const filteredJobs = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return jobs;
    }

    return jobs.filter((job) => {
      return (
        (job.company || "")
          .toLowerCase()
          .includes(keyword) ||
        (job.job_title || "")
          .toLowerCase()
          .includes(keyword) ||
        (job.location || "")
          .toLowerCase()
          .includes(keyword) ||
        (job.venue || "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [jobs, search]);

  const totalPages =
    Math.ceil(
      filteredJobs.length / ITEMS_PER_PAGE
    ) || 1;

  const paginatedJobs = useMemo(() => {
    const start =
      (currentPage - 1) *
      ITEMS_PER_PAGE;

    return filteredJobs.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [
    filteredJobs,
    currentPage,
  ]);

  const totalCompanies = useMemo(() => {
    return new Set(
      jobs.map((job) => job.company)
    ).size;
  }, [jobs]);

  const totalPositions = useMemo(() => {
    let total = 0;

    jobs.forEach((job) => {
      if (Array.isArray(job.positions)) {
        total += job.positions.length;
      } else if (job.positions) {
        total += String(job.positions)
          .split(",")
          .filter(Boolean).length;
      }
    });

    return total;
  }, [jobs]);

  return (
    <div className="min-h-screen bg-white px-4 py-6 font-sans text-zinc-900 transition-colors duration-300 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10 dark:bg-black dark:text-white">

      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 dark:border-zinc-800 dark:bg-zinc-900">

              <Sparkles
                size={14}
                className="text-zinc-500 dark:text-zinc-400"
              />

              <span className="text-xs tracking-wide text-zinc-600 dark:text-zinc-300">
                AI Curated Walk-ins
              </span>

            </div>

            <h1 className="text-2xl font-black leading-none tracking-[-0.05em] text-zinc-900 sm:text-3xl lg:text-4xl xl:text-5xl dark:text-white">
              Walk-In Jobs in India
            </h1>

            <p className="mt-4 max-w-3xl text-sm font-normal leading-7 text-zinc-500 sm:text-base lg:max-w-4xl dark:text-zinc-400">
              Discover verified walk-in interview
              opportunities from companies across
              India. Search jobs by company, role,
              location, experience and skills.
            </p>

          </div>

          <button
            onClick={refreshJobs}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-700 disabled:opacity-60 dark:border-zinc-200 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >

            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh Jobs"}

          </button>

        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="mt-8">

          <div className="relative max-w-md">

            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search company, title or location..."
              className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-zinc-600"
            />

          </div>

        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Walk-ins */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Walk-ins
                </p>

                <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
                  {filteredJobs.length}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

                <BriefcaseBusiness
                  size={20}
                  className="text-zinc-500 dark:text-zinc-300"
                />

              </div>

            </div>

          </div>

          {/* Companies */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Companies
                </p>

                <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
                  {totalCompanies}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

                <Building2
                  size={20}
                  className="text-zinc-500 dark:text-zinc-300"
                />

              </div>

            </div>

          </div>

          {/* Positions */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Positions
                </p>

                <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
                  {totalPositions}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

                <Users
                  size={20}
                  className="text-zinc-500 dark:text-zinc-300"
                />

              </div>

            </div>

          </div>

          {/* Status */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Status
                </p>

                <div className="mt-3 flex items-center gap-2">

                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />

                  <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
                    Live
                  </h2>

                </div>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

                <CheckCircle2
                  size={20}
                  className="text-zinc-500 dark:text-zinc-300"
                />

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            JOB LIST
        ===================================================== */}

        <div className="mt-8 space-y-6">

          {!loading &&
            paginatedJobs.map(
              (job) => (
                <article
                  key={job.id}
                  className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
                >

                  <div className="p-5 lg:p-7">

                    {/* HEADER */}

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                      <div className="flex min-w-0 flex-1 gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

                          <Building2
                            size={24}
                            className="text-zinc-500 dark:text-zinc-300"
                          />

                        </div>

                        <div className="min-w-0 flex-1">

                          <h2 className="text-xl font-bold leading-tight text-zinc-900 sm:text-2xl dark:text-white">
                            {job.job_title ||
                              "Walk-In Drive"}
                          </h2>

                          <div className="mt-2 flex items-center gap-2 text-zinc-500 dark:text-zinc-400">

                            <Building2 size={15} />

                            <span className="truncate">
                              {job.company}
                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="flex shrink-0 items-center gap-2">

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">

                          <CheckCircle2
                            size={14}
                            className="text-emerald-500"
                          />

                          Walk-In

                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">

                          <BadgeCheck
                            size={14}
                            className="text-zinc-500 dark:text-zinc-300"
                          />

                          Verified

                        </span>

                      </div>

                    </div>

                    <div className="my-6 border-t border-zinc-200 dark:border-zinc-800/80" />

                    {/* INFO GRID */}

                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">

                      <InfoCard
                        icon={
                          <CalendarDays size={18} />
                        }
                        title="Date"
                        value={
                          job.walkin_date ||
                          "N/A"
                        }
                      />

                      <InfoCard
                        icon={
                          <Clock3 size={18} />
                        }
                        title="Time"
                        value={
                          job.walkin_time ||
                          "N/A"
                        }
                      />

                      <InfoCard
                        icon={
                          <MapPin size={18} />
                        }
                        title="Location"
                        value={
                          job.location ||
                          "N/A"
                        }
                      />

                      <InfoCard
                        icon={
                          <Building2 size={18} />
                        }
                        title="Venue"
                        value={
                          job.venue ||
                          "N/A"
                        }
                      />

                      <InfoCard
                        icon={
                          <BriefcaseBusiness
                            size={18}
                          />
                        }
                        title="Experience"
                        value={
                          job.experience ||
                          "N/A"
                        }
                      />

                    </div>

                    {/* POSITIONS */}

                    {job.positions &&
                      (Array.isArray(
                        job.positions
                      )
                        ? job.positions.length >
                          0
                        : String(
                            job.positions
                          ).trim() !==
                          "") && (
                        <TagSection
                          icon={
                            <BriefcaseBusiness
                              size={18}
                            />
                          }
                          title="Open Positions"
                          subtitle="Roles Available"
                          values={
                            Array.isArray(
                              job.positions
                            )
                              ? job.positions
                              : String(
                                  job.positions
                                ).split(",")
                          }
                        />
                      )}

                    {/* SKILLS */}

                    {job.skills &&
                      (Array.isArray(
                        job.skills
                      )
                        ? job.skills.length >
                          0
                        : String(
                            job.skills
                          ).trim() !==
                          "") && (
                        <TagSection
                          icon={
                            <Cpu size={18} />
                          }
                          title="Required Skills"
                          subtitle="Key Technologies"
                          values={
                            Array.isArray(
                              job.skills
                            )
                              ? job.skills
                              : String(
                                  job.skills
                                ).split(",")
                          }
                        />
                      )}

                    {/* CONTACT */}

                    {job.contact_email && (
                      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900/30">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-zinc-800">

                            <Mail
                              size={18}
                              className="text-zinc-500 dark:text-zinc-300"
                            />

                          </div>

                          <div>

                            <p className="text-xs font-bold text-zinc-800 dark:text-white">
                              Recruiter Contact
                            </p>

                            <p className="break-all text-xs text-zinc-500 dark:text-zinc-400">
                              {job.contact_email}
                            </p>

                          </div>

                        </div>

                        <a
                          href={`mailto:${job.contact_email}`}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >

                          <Mail size={14} />

                          Send Email

                        </a>

                      </div>
                    )}

                  </div>

                </article>
              )
            )}

          {/* ===================================================
              EMPTY
          =================================================== */}

          {filteredJobs.length ===
            0 &&
            !loading && (
              <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

                  <Search
                    size={28}
                    className="text-zinc-400 dark:text-zinc-500"
                  />

                </div>

                <h2 className="mt-6 text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">
                  No Walk-In Jobs Found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
                  We couldn't find any
                  walk-in opportunities
                  matching your search.
                </p>

                <button
                  onClick={() =>
                    setSearch("")
                  }
                  className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >
                  Clear Search
                </button>

              </div>
            )}

          {/* ===================================================
              LOADING
          =================================================== */}

          {loading && (
            <div className="space-y-4">

              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
                  >

                    <div className="h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />

                    <div className="mt-3 h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />

                    <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">

                      {[1, 2, 3, 4, 5].map(
                        (x) => (
                          <div
                            key={x}
                            className="h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800"
                          />
                        )
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        {!loading &&
          totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row dark:border-zinc-800 dark:bg-zinc-900/40">

              <p className="text-xs text-zinc-500 dark:text-zinc-400">

                Showing{" "}

                <span className="font-semibold text-zinc-900 dark:text-white">
                  {(currentPage - 1) *
                    ITEMS_PER_PAGE +
                    1}
                </span>

                {" "}to{" "}

                <span className="font-semibold text-zinc-900 dark:text-white">
                  {Math.min(
                    currentPage *
                      ITEMS_PER_PAGE,
                    filteredJobs.length
                  )}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-zinc-900 dark:text-white">
                  {filteredJobs.length}
                </span>{" "}
                jobs

              </p>

              <div className="flex items-center gap-2">

                <button
                  onClick={() =>
                    setCurrentPage(
                      (prev) =>
                        Math.max(
                          prev - 1,
                          1
                        )
                    )
                  }
                  disabled={
                    currentPage ===
                    1
                  }
                  className="flex h-9 items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >

                  <ChevronLeft size={14} />

                  Previous

                </button>

                <div className="px-2 text-xs text-zinc-500 dark:text-zinc-400">

                  Page{" "}

                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {currentPage}
                  </span>

                  {" "}of{" "}

                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {totalPages}
                  </span>

                </div>

                <button
                  onClick={() =>
                    setCurrentPage(
                      (prev) =>
                        Math.min(
                          prev + 1,
                          totalPages
                        )
                    )
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  className="flex h-9 items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >

                  Next

                  <ChevronRight size={14} />

                </button>

              </div>

            </div>
          )}

      </div>

    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/40">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm dark:bg-zinc-800 dark:text-zinc-300">

          {icon}

        </div>

        <div className="min-w-0">

          <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {title}
          </p>

          <p className="mt-1 break-words text-sm font-semibold leading-5 text-zinc-900 dark:text-white">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   TAG SECTION
========================================================= */

function TagSection({
  icon,
  title,
  subtitle,
  values,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  values: string[];
}) {
  return (
    <div className="mt-6">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">

        <div className="flex shrink-0 items-center gap-3 lg:w-64">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">

            {icon}

          </div>

          <div>

            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              {title}
            </h3>

            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {subtitle}
            </p>

          </div>

        </div>

        <div className="flex flex-1 flex-wrap gap-2">

          {values
            .filter(
              (value) =>
                value &&
                value.trim()
            )
            .map(
              (
                value,
                index
              ) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"
                >
                  {value.trim()}
                </span>
              )
            )}

        </div>

      </div>

    </div>
  );
}
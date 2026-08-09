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

export default function WalkInsPage() {
  const [jobs, setJobs] = useState<WalkInJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, []);

  // Reset page to 1 whenever search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  async function fetchJobs() {
    try {
      setLoading(true);
      const response = await api.get("/walkin/jobs");
      setJobs(response.data || []);
    } catch (err) {
      console.error(err);
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
    const keyword = search.toLowerCase();

    return jobs.filter((job) => {
      return (
        (job.company || "").toLowerCase().includes(keyword) ||
        (job.job_title || "").toLowerCase().includes(keyword) ||
        (job.location || "").toLowerCase().includes(keyword) ||
        (job.venue || "").toLowerCase().includes(keyword)
      );
    });
  }, [jobs, search]);

  // Pagination Calculations
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const totalCompanies = useMemo(() => {
    return new Set(jobs.map((x) => x.company)).size;
  }, [jobs]);

  const totalPositions = useMemo(() => {
    let total = 0;

    jobs.forEach((job) => {
      if (Array.isArray(job.positions)) total += job.positions.length;
      else if (job.positions)
        total += String(job.positions).split(",").filter(Boolean).length;
    });

    return total;
  }, [jobs]);

  return (
    <div className="min-h-screen bg-black text-white px-5 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 mb-4">
              <Sparkles size={14} className="text-zinc-400" />
              <span className="text-xs tracking-wide text-zinc-300">
                AI Curated Walk-ins
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-[-0.05em] leading-none">
              Walk-In Jobs
            </h1>

            <p className="mt-4 max-w-3xl lg:max-w-4xl text-sm sm:text-base leading-7 font-normal text-zinc-400">
              Discover verified walk-in opportunities collected from multiple
              platforms in one unified dashboard.
            </p>
          </div>

          <button
            onClick={refreshJobs}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin text-black" : "text-black"}
            />
            {refreshing ? "Refreshing..." : "Refresh Jobs"}
          </button>
        </div>

        {/* Search */}
        <div className="mt-8">
          <div className="relative max-w-md">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, title or location..."
              className="h-12 w-full rounded-xl border border-zinc-800 bg-[#0a0a0a] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Jobs */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Walk-ins
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                  {filteredJobs.length}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
                <BriefcaseBusiness size={20} className="text-zinc-300" />
              </div>
            </div>
          </div>

          {/* Companies */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Companies
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                  {totalCompanies}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
                <Building2 size={20} className="text-zinc-300" />
              </div>
            </div>
          </div>

          {/* Positions */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Positions
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                  {totalPositions}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
                <Users size={20} className="text-zinc-300" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Status
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Live
                  </h2>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
                <CheckCircle2 size={20} className="text-zinc-300" />
              </div>
            </div>
          </div>
        </div>

        {/* JOB LIST */}
        <div className="mt-8 space-y-6">
          {!loading &&
            paginatedJobs.map((job) => (
              <div
                key={job.id}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#0a0a0a] transition-all duration-300 hover:border-zinc-700"
              >
                <div className="p-5 lg:p-7">
                  {/* HEADER */}
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-1 gap-4 min-w-0">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                        <Building2 size={24} className="text-zinc-300" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold leading-tight text-white">
                          {job.job_title || "Walk-In Drive"}
                        </h2>
                        <div className="mt-2 flex items-center gap-2 text-zinc-400">
                          <Building2 size={15} />
                          <span className="truncate">{job.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300">
                        <CheckCircle2 size={14} className="text-white" />
                        Walk-In
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300">
                        <BadgeCheck size={14} className="text-white" />
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="my-6 border-t border-zinc-800/80" />

                  {/* INFO GRID */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* Date */}
                    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                          <CalendarDays size={18} className="text-zinc-300" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                            Date
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {job.walkin_date || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                          <Clock3 size={18} className="text-zinc-300" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                            Time
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {job.walkin_time || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                          <MapPin size={18} className="text-zinc-300" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                            Location
                          </p>
                          <p className="mt-1 text-sm font-semibold leading-5 text-white break-words">
                            {job.location || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                          <Building2 size={18} className="text-zinc-300" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                            Venue
                          </p>
                          <p className="mt-1 text-sm font-semibold leading-5 text-white break-words">
                            {job.venue || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                          <BriefcaseBusiness size={18} className="text-zinc-300" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                            Experience
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {job.experience || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OPEN POSITIONS */}
                  {job.positions &&
                    (Array.isArray(job.positions)
                      ? job.positions.length > 0
                      : String(job.positions).trim() !== "") && (
                      <div className="mt-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                          <div className="flex items-center gap-3 shrink-0 lg:w-64">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
                              <BriefcaseBusiness size={18} className="text-zinc-400" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-white">
                                Open Positions
                              </h3>
                              <p className="text-xs text-zinc-500">
                                Roles Available
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 flex-1">
                            {(Array.isArray(job.positions)
                              ? job.positions
                              : String(job.positions).split(",")
                            )
                              .filter((x) => x.trim())
                              .map((position: string, index: number) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300"
                                >
                                  {position.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* REQUIRED SKILLS */}
                  {job.skills &&
                    (Array.isArray(job.skills)
                      ? job.skills.length > 0
                      : String(job.skills).trim() !== "") && (
                      <div className="mt-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                          <div className="flex items-center gap-3 shrink-0 lg:w-64">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
                              <Cpu size={18} className="text-zinc-400" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-white">
                                Required Skills
                              </h3>
                              <p className="text-xs text-zinc-500">
                                Key Technologies
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 flex-1">
                            {(Array.isArray(job.skills)
                              ? job.skills
                              : String(job.skills).split(",")
                            )
                              .filter((x) => x.trim())
                              .map((skill: string, index: number) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300"
                                >
                                  {skill.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* CONTACT */}
                  {job.contact_email && (
                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                          <Mail size={18} className="text-zinc-300" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            Recruiter Contact
                          </p>
                          <p className="text-xs text-zinc-400 break-all">
                            {job.contact_email}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`mailto:${job.contact_email}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200"
                      >
                        <Mail size={14} />
                        Send Email
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

          {/* EMPTY STATE */}
          {filteredJobs.length === 0 && !loading && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800">
                <Search size={28} className="text-zinc-400" />
              </div>
              <h2 className="mt-6 text-xl sm:text-2xl font-bold text-white">
                No Walk-In Jobs Found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
                We couldn't find any walk-in opportunities matching your
                search filter.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setSearch("")}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-800"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-6"
                >
                  <div className="h-6 w-48 rounded bg-zinc-800" />
                  <div className="mt-3 h-4 w-32 rounded bg-zinc-800" />
                  <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((x) => (
                      <div key={x} className="h-16 rounded-xl bg-zinc-900" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        {!loading && totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-4">
            <p className="text-xs text-zinc-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-white">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredJobs.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">
                {filteredJobs.length}
              </span>{" "}
              jobs
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-9 items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:opacity-40"
              >
                <ChevronLeft size={14} />
                Previous
              </button>

              <div className="flex items-center gap-1 px-2 text-xs text-zinc-400">
                <span>Page</span>
                <span className="font-semibold text-white">{currentPage}</span>
                <span>of</span>
                <span className="font-semibold text-white">{totalPages}</span>
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex h-9 items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:opacity-40"
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
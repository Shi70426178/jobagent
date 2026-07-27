"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";
import {
  Search,
  RefreshCw,
  Building2,
} from "lucide-react";

export default function WalkInsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const res = await api.get("/walkin/jobs");

      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const value = search.toLowerCase();

      return (
        (job.company || "").toLowerCase().includes(value) ||
        (job.job_title || "").toLowerCase().includes(value) ||
        (job.location || "").toLowerCase().includes(value)
      );
    });
  }, [jobs, search]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-4xl font-bold tracking-tight">
              Walk-In Jobs
            </h1>

            <p className="mt-2 text-lg text-zinc-400">
              Discover verified walk-in interviews collected automatically from LinkedIn.
            </p>

          </div>

          <button
            onClick={loadJobs}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Jobs
          </button>

        </div>

        {/* Search */}

        <div className="mt-8">

          <div className="relative max-w-xl">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, role or location..."
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-violet-500"
            />

          </div>

        </div>

        {/* Stats */}

        <div className="mt-8">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="text-sm uppercase tracking-wider text-zinc-500">
              Total Walk-In Jobs
            </div>

            <div className="mt-2 text-4xl font-bold text-violet-400">
              {filteredJobs.length}
            </div>

          </div>

        </div>

        {/* Cards */}

        <div className="mt-10 space-y-6">

          {filteredJobs.map((job: any) => (

            <div
              key={job.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition-all duration-300 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-900/20"
            >

              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                <div>

                  <h2 className="text-2xl font-bold leading-tight">
                    {job.job_title || "Walk-In Drive"}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-violet-400 font-semibold">

                    <Building2 size={18} />

                    <span>{job.company}</span>

                  </div>

                </div>

                <span className="h-fit rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                  Walk-In
                </span>

              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

                <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-4">
                  <div className="text-sm text-zinc-500">
                    Walk-In Date
                  </div>

                  <div className="mt-2 text-lg font-semibold">
                    {job.walkin_date || "Not Mentioned"}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-4">
                  <div className="text-sm text-zinc-500">
                    Walk-In Time
                  </div>

                  <div className="mt-2 text-lg font-semibold">
                    {job.walkin_time || "Not Mentioned"}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-4">
                  <div className="text-sm text-zinc-500">
                    Venue
                  </div>

                  <div className="mt-2 text-lg font-semibold">
                    {job.venue || "Not Mentioned"}
                  </div>
                </div>

                                <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-4">
                  <div className="text-sm text-zinc-500">
                    Location
                  </div>

                  <div className="mt-2 text-lg font-semibold">
                    {job.location || "Not Mentioned"}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-4">
                  <div className="text-sm text-zinc-500">
                    Experience
                  </div>

                  <div className="mt-2 text-lg font-semibold">
                    {job.experience || "Not Mentioned"}
                  </div>
                </div>

              </div>

              {job.positions &&
                (Array.isArray(job.positions)
                  ? job.positions.length > 0
                  : String(job.positions).trim() !== "") && (

                <div className="mt-7">

                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Open Positions
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {(Array.isArray(job.positions)
                      ? job.positions
                      : String(job.positions).split(",")
                    ).map((position: string, index: number) => (

                      <span
                        key={index}
                        className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300"
                      >
                        {position.trim()}
                      </span>

                    ))}

                  </div>

                </div>

              )}

              {job.skills &&
                (Array.isArray(job.skills)
                  ? job.skills.length > 0
                  : String(job.skills).trim() !== "") && (

                <div className="mt-7">

                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Required Skills
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {(Array.isArray(job.skills)
                      ? job.skills
                      : String(job.skills).split(",")
                    ).map((skill: string, index: number) => (

                      <span
                        key={index}
                        className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300"
                      >
                        {skill.trim()}
                      </span>

                    ))}

                  </div>

                </div>

              )}

              {job.contact_email && (

                <div className="mt-8 border-t border-zinc-800 pt-6">

                  <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Contact Email
                  </div>

                  <a
                    href={`mailto:${job.contact_email}`}
                    className="inline-flex items-center rounded-xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500"
                  >
                    {job.contact_email}
                  </a>

                </div>

              )}

            </div>

          ))}

        </div>

        {!loading && filteredJobs.length === 0 && (

          <div className="mt-24 rounded-2xl border border-zinc-800 bg-zinc-900 py-20 text-center">

            <h2 className="text-2xl font-bold">
              No Walk-In Jobs Found
            </h2>

            <p className="mt-3 text-zinc-500">
              Try searching with a different company or location.
            </p>

          </div>

        )}

        {loading && (

          <div className="mt-24 flex flex-col items-center justify-center">

            <RefreshCw
              size={36}
              className="animate-spin text-violet-500"
            />

            <p className="mt-4 text-zinc-400">
              Loading latest walk-in jobs...
            </p>

          </div>

        )}

      </div>

    </main>
  );
}
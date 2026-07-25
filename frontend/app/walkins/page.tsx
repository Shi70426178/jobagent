"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";
import {
  Search,
  RefreshCw,
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Eye,
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
        job.company?.toLowerCase().includes(value) ||
        job.job_title?.toLowerCase().includes(value) ||
        job.location?.toLowerCase().includes(value)
      );
    });
  }, [jobs, search]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      <div className="mx-auto max-w-7xl px-6 py-6">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Walk Ins
            </h1>

            <p className="text-zinc-500 mt-1">
              Latest walk-in interviews collected from LinkedIn.
            </p>

          </div>

          <button
            onClick={loadJobs}
            className="bg-violet-600 hover:bg-violet-500 px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

        {/* Search */}

        <div className="mt-6 relative max-w-md">

          <Search
            className="absolute left-3 top-3 text-zinc-500"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, title or city..."
            className="w-full bg-zinc-900 rounded-xl border border-zinc-800 pl-10 pr-4 py-3 outline-none focus:border-violet-500"
          />

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          <div className="bg-zinc-900 rounded-xl p-5">
            <div className="text-zinc-500 text-sm">
              Total Walk Ins
            </div>

            <div className="text-3xl font-bold mt-2">
              {filteredJobs.length}
            </div>
          </div>

        </div>

        {/* Cards */}

        <div className="space-y-5 mt-8">

          {filteredJobs.map((job: any) => (

            <div
              key={job.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >

              <h2 className="text-2xl font-bold">
                {job.job_title}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-violet-400">

                <Building2 size={18} />

                {job.company}

              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">

                <div className="rounded-xl bg-zinc-800 p-4">

                  <div className="text-zinc-500 text-sm">
                    Location
                  </div>

                  <div className="mt-2 text-lg font-semibold flex items-center gap-2">

                    <MapPin size={18} />

                    {job.location || "Not Mentioned"}

                  </div>

                </div>

                <div className="rounded-xl bg-zinc-800 p-4">

                  <div className="text-zinc-500 text-sm">
                    Posted
                  </div>

                  <div className="mt-2 text-lg font-semibold flex items-center gap-2">

                    <Clock size={18} />

                    {job.posted_time || "N/A"}

                  </div>

                </div>

                <div className="rounded-xl bg-zinc-800 p-4">

                  <div className="text-zinc-500 text-sm">
                    Experience
                  </div>

                  <div className="mt-2 text-lg font-semibold flex items-center gap-2">

                    <Briefcase size={18} />

                    {job.experience || "N/A"}

                  </div>

                </div>

              </div>

              {job.skills && (

                <div className="mt-5">

                  <div className="text-zinc-500 mb-2">
                    Skills
                  </div>

                  <div className="flex flex-wrap gap-2">

                    {job.skills
                      .split(",")
                      .map((skill: string, index: number) => (

                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-sm"
                        >
                          {skill.trim()}
                        </span>

                      ))}

                  </div>

                </div>

              )}

              <details className="mt-6">

                <summary className="cursor-pointer flex items-center gap-2 text-violet-400">

                  <Eye size={18} />

                  View Full Post

                </summary>

                <div className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">

                  {job.post_text}

                </div>

              </details>

            </div>

          ))}

        </div>

        {!loading && filteredJobs.length === 0 && (

          <div className="text-center mt-20">

            <h2 className="text-2xl font-semibold">
              No Walk In Jobs Found
            </h2>

          </div>

        )}

      </div>

    </main>
  );
}
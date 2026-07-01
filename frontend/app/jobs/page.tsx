"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  source: string;
  status: string;
}

export default function JobsPage() {
  const router = useRouter();

  const [jobs, setJobs] =
    useState<Job[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response =
        await api.get("/jobs");

      setJobs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyJob = (job: Job) => {
    router.push(`/jobs/${job.id}`);
  };

  const getStatusColor = (
    status: string
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "applied":
        return "bg-green-600";

      case "pending":
        return "bg-yellow-600";

      default:
        return "bg-zinc-700";
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-black/40 backdrop-blur-xl min-h-screen text-white p-10">

          <div className="flex justify-between items-center mb-12">

            <div>

              <h1 className="text-5xl font-semibold tracking-tight">
                Jobs
              </h1>

              <p className="text-zinc-500 mt-3">
                Browse jobs collected by your AI agent.
              </p>

            </div>

            <button
              onClick={loadJobs}
              className="
                bg-white
                text-black
                px-5
                py-3
                rounded-xl
                font-medium
                hover:bg-zinc-200
                transition
              "
            >
              Refresh Jobs
            </button>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

              <p className="text-zinc-500 text-sm">
                Total Jobs
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {jobs.length}
              </h2>

            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

              <p className="text-zinc-500 text-sm">
                Applied
              </p>

              <h2 className="text-3xl font-bold mt-3 text-green-500">
                {
                  jobs.filter(
                    (job) =>
                      job.status?.toLowerCase() ===
                      "applied"
                  ).length
                }
              </h2>

            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

              <p className="text-zinc-500 text-sm">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-3 text-yellow-500">
                {
                  jobs.filter(
                    (job) =>
                      job.status?.toLowerCase() ===
                      "pending"
                  ).length
                }
              </h2>

            </div>

          </div>

          {loading ? (

            <p className="text-zinc-500">
              Loading jobs...
            </p>

          ) : jobs.length === 0 ? (

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-12 text-center">

              <p className="text-zinc-500">
                No jobs found.
              </p>

            </div>

          ) : (

            <div className="grid xl:grid-cols-2 gap-6">

              {jobs.map((job) => (

                <div
                  key={job.id}
                  className="
                    bg-zinc-900/60 backdrop-blur-xl
                    border
                    border-zinc-800
                    rounded-2xl
                    p-6
                    hover:border-zinc-600
                    transition
                  "
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-xl font-semibold">
                        {job.title}
                      </h2>

                      <p className="text-zinc-500 mt-2">
                        {job.company}
                      </p>

                    </div>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        text-white
                        ${getStatusColor(
                          job.status
                        )}
                      `}
                    >
                      {job.status}
                    </span>

                  </div>

                  <div className="mt-6 space-y-3">

                    <div className="text-zinc-300">
                      📍 {job.location}
                    </div>

                    <div className="text-zinc-400">
                      Source: {job.source}
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      applyJob(job)
                    }
                    className="
                      mt-6
                      bg-white
                      text-black
                      px-5
                      py-2.5
                      rounded-xl
                      font-medium
                      hover:bg-zinc-200
                      transition
                    "
                  >
                    View Details
                  </button>

                </div>

              ))}

            </div>

          )}

        </main>

      </div>
    </ProtectedRoute>
  );
}
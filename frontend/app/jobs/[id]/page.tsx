"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import { api } from "@/lib/axios";

export default function JobDetailsPage() {
  const params = useParams();

  const [job, setJob] =
    useState<any>(null);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const response =
        await api.get(
          `/jobs/${params.id}`
        );

      setJob(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!job) {
    return (
      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-black/40 backdrop-blur-xl min-h-screen text-white p-10">
          <div className="text-zinc-500">
            Loading job...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-black/40 backdrop-blur-xl min-h-screen text-white p-10">

        <div className="mb-12">

          <h1 className="text-5xl font-semibold tracking-tight">
            {job.title}
          </h1>

          <p className="text-zinc-500 mt-3">
            Review job details before applying.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Company
            </p>

            <h2 className="text-xl font-semibold mt-3">
              {job.company}
            </h2>

          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Location
            </p>

            <h2 className="text-xl font-semibold mt-3">
              {job.location}
            </h2>

          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Source
            </p>

            <h2 className="text-xl font-semibold mt-3">
              {job.source}
            </h2>

          </div>

        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-8">
            Job Information
          </h2>

          <div className="space-y-6">

            <div>

              <p className="text-zinc-500 text-sm">
                Job Title
              </p>

              <p className="text-lg mt-1">
                {job.title}
              </p>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Company
              </p>

              <p className="text-lg mt-1">
                {job.company}
              </p>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Location
              </p>

              <p className="text-lg mt-1">
                {job.location}
              </p>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Source
              </p>

              <p className="text-lg mt-1">
                {job.source}
              </p>

            </div>

          </div>

        </div>

        <button
          className="
            bg-white
            text-black
            px-8
            py-3
            rounded-xl
            font-medium
            hover:bg-zinc-200
            transition
          "
        >
          Apply Now
        </button>

      </main>
    </div>
  );
}
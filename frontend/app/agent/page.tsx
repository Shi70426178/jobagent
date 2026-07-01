"use client";

import { api } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AgentPage() {
  const router = useRouter();

  const [keywords, setKeywords] = useState("");

  const [location, setLocation] = useState("");

  // const [dailyLimit, setDailyLimit] =
  //   useState(50);
  const [loading, setLoading] = useState(false);

  const [jobsFound, setJobsFound] = useState(0);

  const [applicationsSent, setApplicationsSent] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get("/stats");

      setJobsFound(response.data.jobs_found);

      setApplicationsSent(response.data.applications_sent);
    } catch (error) {
      console.error(error);
    }
  };

  const startAgent = async () => {
    setLoading(true);

    try {
const response = await api.post("/agent/start", {
  keywords,
  location,
});



alert(response.data.message);

router.push("/new-jobs");
    } catch (error) {
      console.error(error);

      alert("Failed to start agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-black/40 backdrop-blur-xl min-h-screen text-white p-10">
        <div className="mb-12">
          <h1 className="text-5xl font-semibold tracking-tight">
            AI Job Agent
          </h1>

          <p className="text-zinc-500 mt-3">
            Configure and run your automated job search assistant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-500 text-sm">Status</p>

            <h2
              className={`text-2xl font-semibold mt-3 ${
                loading ? "text-yellow-500" : "text-green-500"
              }`}
            >
              {loading ? "Running" : "Ready"}
            </h2>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-500 text-sm">Jobs Found</p>

            <h2 className="text-2xl font-semibold mt-3">{jobsFound}</h2>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-500 text-sm">Applications Sent</p>

            <h2 className="text-2xl font-semibold mt-3">{applicationsSent}</h2>
          </div>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-8">Agent Configuration</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Keywords
              </label>

              <input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter Job Title"
                className="
    w-full
    bg-black/40 backdrop-blur-xl
    border
    border-zinc-800
    rounded-xl
    px-4
    py-3
    text-white
    placeholder:text-zinc-500
    outline-none
    focus:border-zinc-600
  "
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Location
              </label>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location"
                className="
    w-full
    bg-black/40 backdrop-blur-xl
    border
    border-zinc-800
    rounded-xl
    px-4
    py-3
    text-white
    placeholder:text-zinc-500
    outline-none
    focus:border-zinc-600
  "
              />
            </div>

            {/* <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Daily Limit
              </label>

              <input
                type="number"
                value={dailyLimit}
                onChange={(e) =>
                  setDailyLimit(
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  bg-black/40 backdrop-blur-xl
                  border
                  border-zinc-800
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-zinc-600
                "
              />

            </div> */}

            <button
              onClick={startAgent}
              disabled={loading}
              className="
    bg-white
    text-black
    px-6
    py-3
    rounded-xl
    font-medium
    hover:bg-zinc-200
    transition
    disabled:opacity-50
  "
            >
              {loading ? "Searching New Jobs..." : "Start Agent"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

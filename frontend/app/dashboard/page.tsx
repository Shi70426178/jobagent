"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

import {
  Bot,
  Mail,
  Sparkles,
  BriefcaseBusiness,
  CircleCheckBig,
  Activity,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Send,
  Play,
  Search,
  FileCheck,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [gmailProfile, setGmailProfile] = useState<any>(null);

  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  const [jobsFound, setJobsFound] = useState(0);
  const [applicationsSent, setApplicationsSent] = useState(0);

  useEffect(() => {
    loadData();
    loadStats();
  }, []);

  const loadData = async () => {
    try {
      const appRes = await api.get("/applications");
      setApplications(appRes.data);

      const gmailRes = await api.get("/gmail/profile");
      setGmailProfile(gmailRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStats = async () => {
    try {
      const response = await api.get("/stats");

      setJobsFound(response.data.jobs_found);
      setApplicationsSent(response.data.applications_sent);
    } catch (err) {
      console.error(err);
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

      loadStats();
    } catch (err) {
      console.error(err);
      alert("Failed to start agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>

              {/* Background */}
          <div className="relative overflow-hidden">
            {/* gradient */}
            <div
              className="fixed top-0 right-0 bottom-0 hidden
lg:block
left-72
right-0 z-10 bg-no-repeat"
              style={{
                backgroundImage: "url('/Login_BG.png')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                filter: "blur(12px)", // Adjust: 8px, 10px, 12px, 16px...
                opacity: 0.3, // 60% opacity (optional)
              }}
            />
            <div className="fixed inset-0 -z-10 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent" />
            {/* Glow */}
            {/* 
            <div className="absolute -top-5
sm:p-60 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[180px]" />

            <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[200px]" /> */}
            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] bg-[size:50px_50px]" />
            <div
className="
relative
z-10
mx-auto
max-w-[1700px]
px-4
sm:px-6
lg:px-8
xl:px-10
py-6
sm:py-8
lg:py-10
"
>
              {/* HERO */}

              <div className="grid
grid-cols-1
xl:grid-cols-[1fr_390px]
gap-5
sm:p-6
xl:gap-8 gap-8 items-start">
                {/* LEFT */}

                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
                    <Sparkles className="h-4 w-4 text-cyan-400" />

                    <span className="text-xs tracking-wide text-cyan-300">
                      AI Powered Job Automation
                    </span>
                  </div>

                  <h5 className="mt-6 text-3xl
sm:text-3xl
lg:text-4xl
lg:text-5xl font-black tracking-[-0.05em] leading-[0.95] text-white">
                    AI Job Dashboard
                  </h5>
                  <p className="mt-6 max-w-4xl text-base
sm:text-lg
leading-7
sm:leading-9 text-zinc-400">
                    Automate your complete job search workflow with AI. Discover
                    jobs, analyse resumes, send personalized Gmail outreach,
                    track replies and manage every application from one
                    intelligent workspace.
                  </p>

                  {/* Quick Buttons */}
                  <div className="mt-10 flex flex-wrap gap-4">
                    {/* Search Jobs */}
                    <button
                      className="
      group flex items-center gap-3
      rounded-2xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      px-5
sm:px-7
py-3
sm:py-4
      font-medium text-white
      transition-all duration-300
      md:hover:-translate-y-1
      hover:border-cyan-400/40
      hover:bg-cyan-500/10
      hover:shadow-lg hover:shadow-cyan-500/10
      active:scale-95
    "
                    >
                      <Search className="h-5 w-5 text-cyan-400 transition-transform group-hover:rotate-12" />
                      <span>Search Jobs</span>
                    </button>

                    {/* Resume Match */}
                    <button
                      className="
      group flex items-center gap-3
      rounded-2xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      px-5
sm:px-7
py-3
sm:py-4
      font-medium text-white
      transition-all duration-300
      md:hover:-translate-y-1
      hover:border-emerald-400/40
      hover:bg-emerald-500/10
      hover:shadow-lg hover:shadow-emerald-500/10
      active:scale-95
    "
                    >
                      <FileCheck className="h-5 w-5 text-emerald-400 transition-transform group-hover:scale-110" />
                      <span>Resume Match</span>
                    </button>

                    {/* Analytics */}
                    <button
                      className="
      group flex items-center gap-3
      rounded-2xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      px-5
sm:px-7
py-3
sm:py-4
      font-medium text-white
      transition-all duration-300
      md:hover:-translate-y-1
      hover:border-violet-400/40
      hover:bg-violet-500/10
      hover:shadow-lg hover:shadow-violet-500/10
      active:scale-95
    "
                    >
                      <BarChart3 className="h-5 w-5 text-violet-400 transition-transform group-hover:scale-110" />
                      <span>Analytics</span>
                    </button>
                  </div>
                </div>

                {/* RIGHT */}

              
              </div>

              {/* HERO ENDS */}
              {/* ================= AI JOB AGENT ================= */}
              {/* ================= AGENT CONFIGURATION ================= */}

              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">
                {/* Header */}

                <div className="border-b border-white/10 px-5
sm:px-6
lg:px-8
py-5
sm:py-6 flex flex-col
xl:flex-row justify-between lg:items-center gap-5
sm:p-6">
                  <div>
                    <h2 className="text-3xl font-black">Agent Configuration</h2>

                    <p className="mt-2 text-zinc-400">
                      Configure how your AI Agent searches and applies for jobs.
                    </p>
                  </div>

                  <div
                    onClick={() => router.push("/agent")}
                    className="
        group
        cursor-pointer
        rounded-2xl
        border border-cyan-400/20
        bg-gradient-to-r
        from-cyan-500/10
        via-sky-500/10
        to-purple-500/10
        px-6
        py-5
        transition-all
        duration-300
        md:hover:-translate-y-1
        hover:border-cyan-400/50
        hover:shadow-xl
        hover:shadow-cyan-500/20
    "
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-cyan-500/20
                    transition-all
                    group-hover:bg-cyan-500/30
                    group-hover:scale-110
                "
                        >
                          <Bot className="h-7 w-7 text-cyan-400" />
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                            AI Automation
                          </p>

                          <h3 className="mt-1 mr-3 text-xl font-bold text-white">
                            Go To AI Agent
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="rounded-full  bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                          Ready
                        </span>

                        <ArrowRight className="h-6 w-6 text-cyan-400 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}

                <div className="p-8">
                  <div className="grid
grid-cols-1
lg:grid-cols-[1fr_1fr_auto] gap-5
sm:p-6 items-end">
                    {/* Keywords */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-zinc-300">
                        Job Keywords
                      </label>

                      <input
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="Backend Developer"
                        className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-5 outline-none transition focus:border-cyan-500"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-zinc-300">
                        Preferred Location
                      </label>

                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Remote / Bangalore"
                        className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-5 outline-none transition focus:border-cyan-500"
                      />
                    </div>

                    <button
                      onClick={startAgent}
                      disabled={loading}
                      className="
        group
        h-14
        px-8
        rounded-2xl
        border
        border-slate-700
        bg-slate-900/70
        text-white
        font-semibold
        backdrop-blur-md
        transform
        transition-all
        duration-300
        md:hover:-translate-y-1
        hover:scale-[1.02]
        hover:border-slate-500
        hover:bg-slate-800
        hover:shadow-[0_12px_30px_rgba(255,255,255,0.08)]
        active:translate-y-0
        active:scale-95
        disabled:opacity-60
        disabled:hover:translate-y-0
        disabled:hover:scale-100
    "
                    >
                      <span className="flex items-center gap-3">
                        {loading ? (
                          "Searching..."
                        ) : (
                          <>
                            <span>🚀 Start AI Agent</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                  {/* Divider */}

                  <div className="my-10 h-px bg-white/10" />

                  {/* Bottom */}

                  <div>
                    <div>
                      <h3 className="text-xl
sm:text-2xl font-bold">
                        AI Automation Features
                      </h3>

                      <div className="mt-6 grid grid-cols-1
sm:grid-cols-2
lg:grid-cols-3 gap-x-8 gap-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <CircleCheckBig className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-zinc-300">Resume Matching</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <CircleCheckBig className="text-green-400" />

                          <span>Personalized Email Generation</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <CircleCheckBig className="text-green-400" />

                          <span>LinkedIn Scanning</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <CircleCheckBig className="text-green-400" />

                          <span>Gmail Reply Tracking</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <CircleCheckBig className="text-green-400" />

                          <span>Application History</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <CircleCheckBig className="text-green-400" />

                          <span>Auto Follow-up</span>
                        </div>
                      </div>
                    </div>

                    {/* Launch */}
                  </div>
                </div>
              </div>
              {/* ================= DASHBOARD STATS ================= */}

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
2xl:grid-cols-6 gap-5
sm:p-6">
                {/* Status */}

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5
sm:p-6 hover:border-cyan-400/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-sm">Agent Status</span>

                    <div className="h-12 w-12 rounded-2xl bg-green-500/15 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-green-400" />
                    </div>
                  </div>

                  <h2
                    className={`mt-5 text-3xl font-black ${loading ? "text-yellow-400" : "text-green-400"}`}
                  >
                    {loading ? "Running" : "Ready"}
                  </h2>

                  <p className="mt-2 text-xs text-zinc-500">
                    AI Automation Engine
                  </p>
                </div>

                {/* Jobs */}

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5
sm:p-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 text-sm">Jobs Found</span>

                    <div className="h-12 w-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
                      <BriefcaseBusiness className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>

                  <h2 className="mt-5 text-3xl
sm:text-3xl
lg:text-4xl
lg:text-5xl font-black">{jobsFound}</h2>

                  <p className="mt-2 text-xs text-green-400">
                    ↑ AI Discovered Jobs
                  </p>
                </div>

                {/* Applications */}

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5
sm:p-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 text-sm">Applications</span>

                    <div className="h-12 w-12 rounded-2xl bg-purple-500/15 flex items-center justify-center">
                      <Send className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>

                  <h2 className="mt-5 text-3xl
sm:text-3xl
lg:text-4xl
lg:text-5xl font-black">
                    {applicationsSent}
                  </h2>

                  <p className="mt-2 text-xs text-purple-300">Emails Sent</p>
                </div>

                {/* Resume */}

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5
sm:p-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 text-sm">Resume Match</span>

                    <div className="h-12 w-12 rounded-2xl bg-blue-500/15 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>

                  <h2 className="mt-5 text-3xl
sm:text-3xl
lg:text-4xl
lg:text-5xl font-black">91%</h2>

                  <p className="mt-2 text-xs text-blue-300">ATS Optimized</p>
                </div>

                {/* YC Jobs */}

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5
sm:p-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 text-sm">YC Jobs</span>

                    <div className="h-12 w-12 rounded-2xl bg-orange-500/15 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>

                  <h2 className="mt-5 text-3xl
sm:text-3xl
lg:text-4xl
lg:text-5xl font-black">5</h2>

                  <p className="mt-2 text-xs text-orange-300">
                    Gmail Responses
                  </p>
                </div>

                {/* Success */}

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-5
sm:p-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-300 text-sm">Success Rate</span>

                    <CheckCircle2 className="h-7 w-7 text-green-400" />
                  </div>

                  <h2 className="mt-5 text-3xl
sm:text-3xl
lg:text-4xl
lg:text-5xl font-black">94%</h2>

                  <p className="mt-2 text-xs text-green-400">
                    Automation Accuracy
                  </p>
                </div>
              </div>

              {/* ================= MAIN DASHBOARD ================= */}

              <div className="mt-10 grid
grid-cols-1
xl:grid-cols-[1.6fr_420px]
gap-6
xl:gap-8 gap-8">
                {/* LEFT */}

                <div>
                  <div className="rounded-3xl overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10">
                    <div className="p-[1px]">
                      <div className="rounded-3xl bg-[#08111f] p-8">
                        <div className="flex flex-col
xl:flex-row justify-between gap-8">
                          <div>
                            <div className="flex items-center gap-3">
                              <div className="h-12
w-12
sm:h-14
sm:w-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
                                <Bot className="h-8 w-8 text-cyan-400" />
                              </div>

                              <div>
                                <h2 className="text-3xl font-black">
                                  AI Job Agent
                                </h2>

                                <p className="text-zinc-500 mt-1">
                                  Intelligent Automation Engine
                                </p>
                              </div>
                            </div>

                            <p className="mt-8 max-w-3xl leading-8 text-zinc-400">
                              Your AI agent continuously scans LinkedIn,
                              HackerNews and other job sources, matches your
                              resume, generates personalized emails, tracks
                              recruiter responses and keeps every application
                              organized automatically.
                            </p>
                          </div>

                          <div className="w-full w-full
xl:w-[280px]">
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-400">
                                Automation Progress
                              </span>

                              <span>82%</span>
                            </div>

                            <div className="mt-3 h-3 rounded-full bg-zinc-800 overflow-hidden">
                              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
                            </div>

                            <div className="mt-8 space-y-3">
                              <div className="flex justify-between">
                                <span className="text-zinc-500">
                                  Job Search
                                </span>

                                <CircleCheckBig className="text-green-400 h-5 w-5" />
                              </div>

                              <div className="flex justify-between">
                                <span className="text-zinc-500">
                                  Resume Match
                                </span>

                                <CircleCheckBig className="text-green-400 h-5 w-5" />
                              </div>

                              <div className="flex justify-between">
                                <span className="text-zinc-500">
                                  Gmail Outreach
                                </span>

                                <CircleCheckBig className="text-green-400 h-5 w-5" />
                              </div>

                              <div className="flex justify-between">
                                <span className="text-zinc-500">
                                  Reply Tracking
                                </span>

                                <CircleCheckBig className="text-green-400 h-5 w-5" />
                              </div>
                            </div>

                            <button
                              onClick={startAgent}
                              disabled={loading}
                              className="
                            mt-8
                            w-full
                            h-14
                            rounded-2xl
                            border
                            border-white/15
                            bg-slate-900/70
                            backdrop-blur-md
                            text-white
                            font-semibold
                            shadow-[0_0_10px_rgba(255,255,255,0.05)]
                            transition-all
                            duration-300
                            md:hover:-translate-y-0.5
                            hover:border-white/35
                            hover:shadow-[0_0_20px_rgba(255,255,255,0.10)]
                            active:scale-[0.98]
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                        "
                            >
                              <span className="flex items-center justify-center gap-2">
                                <span className="text-lg">🚀</span>
                                <span>
                                  {loading
                                    ? "Searching Jobs..."
                                    : "Launch AI Agent"}
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="space-y-6">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5
sm:p-6">
                    <h2 className="text-xl
sm:text-2xl font-bold">Live Activity</h2>

                    <div className="mt-8 space-y-6">
                      <div className="flex gap-4">
                        <div className="h-3 w-3 rounded-full bg-green-400 mt-2 animate-pulse" />

                        <div>
                          <p className="font-semibold">New Backend Job Found</p>

                          <span className="text-xs text-zinc-500">
                            LinkedIn • 2 minutes ago
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="h-3 w-3 rounded-full bg-blue-400 mt-2" />

                        <div>
                          <p className="font-semibold">Resume Matched 91%</p>

                          <span className="text-xs text-zinc-500">
                            AI Matching Engine
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="h-3 w-3 rounded-full bg-purple-400 mt-2" />

                        <div>
                          <p className="font-semibold">
                            Personalized Email Generated
                          </p>

                          <span className="text-xs text-zinc-500">
                            Gmail Outreach
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="mt-16 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
  <a
    href="/privacy"
    className="hover:text-white transition"
  >
    Privacy Policy
  </a>

  <span className="mx-3">•</span>

  <a
    href="/terms"
    className="hover:text-white transition"
  >
    Terms of Service
  </a>

  <span className="mx-3">•</span>

  <span>© 2026 oneXjob</span>
</footer>

            
            </div>{" "}
            {/* AI Job Agent */}
          </div>{" "}
          {/* relative z-10 p-8 */}
  
    </ProtectedRoute>
  );
}

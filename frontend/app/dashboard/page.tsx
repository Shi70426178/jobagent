"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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
  Search,
  FileCheck,
  BarChart3,
} from "lucide-react";



const swalTheme = {
  width: "250px",
  padding: "0.75rem",
  background: "#0f172a",
  color: "#fff",
  customClass: {
    popup: "rounded-xl",
    title: "text-base font-semibold",
    htmlContainer: "text-xs",
    confirmButton: "text-xs px-4 py-2 rounded-lg",
    icon: "swal-small-icon",
  },
};

const showLoading = (title = "Running...") => {
  Swal.fire({
    title,
    html: "Please wait...",
    ...swalTheme,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

const showSuccess = (message: string) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 1800,
    showConfirmButton: false,
    ...swalTheme,
  });
};

const showError = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Please Enter Job Keywords!",
    text: message,
    confirmButtonColor: "#7c3aed",
    ...swalTheme,
  });
};

const showWarning = (message: string) => {
  Swal.fire({
    title: "Warning",
    text: message,
    confirmButtonColor: "#f59e0b",
    ...swalTheme,
  });
};

const showInfo = (message: string) => {
  Swal.fire({
    icon: "info",
    title: "Information",
    text: message,
    confirmButtonColor: "#06b6d4",
    ...swalTheme,
  });
};
// ---------- Component ----------
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
const showLoading = () => {
  Swal.fire({
    title: "Running...",
    html: "Searching Jobs...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    width: "280px",
    padding: "1rem",
    background: "#0f172a",
    color: "#fff",
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
const startAgent = async () => {
  if (!keywords.trim()) {
    showWarning("Please enter job keywords.");
    return;
  }

  setLoading(true);

  showLoading();

  try {
    const response = await api.post("/agent/start", {
      keywords,
      location,
    });

    Swal.close();

    showSuccess(
      response.data.message || "AI Agent started successfully."
    );

    loadStats();
  } catch (err) {
    Swal.close();

    console.error(err);

    showError("Failed to start AI Agent.");
  } finally {
    setLoading(false);
  }
};
  // ---------- Stat cards config ----------
  const stats = [
    {
      label: "Agent Status",
      value: loading ? "Running" : "Ready",
      sub: "AI Automation Engine",
      icon: <Activity className="h-4 w-4 text-green-400" />,
      iconBg: "bg-green-500/15",
      valueClass: loading ? "text-yellow-400" : "text-green-400",
      subClass: "text-zinc-500",
    },
    {
      label: "Jobs Found",
      value: jobsFound,
      sub: "↑ AI Discovered Jobs",
      icon: <BriefcaseBusiness className="h-4 w-4 text-cyan-400" />,
      iconBg: "bg-cyan-500/15",
      subClass: "text-green-400",
    },
    {
      label: "Applications",
      value: applicationsSent,
      sub: "Emails Sent",
      icon: <Send className="h-4 w-4 text-purple-400" />,
      iconBg: "bg-purple-500/15",
      subClass: "text-purple-300",
    },
    {
      label: "Resume Match",
      value: "91%",
      sub: "ATS Optimized",
      icon: <ShieldCheck className="h-4 w-4 text-blue-400" />,
      iconBg: "bg-blue-500/15",
      subClass: "text-blue-300",
    },
    {
      label: "YC Jobs",
      value: 5,
      sub: "Gmail Responses",
      icon: <Mail className="h-4 w-4 text-orange-400" />,
      iconBg: "bg-orange-500/15",
      subClass: "text-orange-300",
    },
    {
      label: "Success Rate",
      value: "94%",
      sub: "Automation Accuracy",
      icon: <CheckCircle2 className="h-4 w-4 text-green-400" />,
      iconBg: "bg-green-500/15",
      subClass: "text-green-400",
      highlight: true,
    },
  ];

  const features = [
    "Resume Matching",
    "Personalized Email Generation",
    "LinkedIn Scanning",
    "Gmail Reply Tracking",
    "Application History",
    "Auto Follow-up",
  ];

  const quickButtons = [
    { icon: Search, label: "Search Jobs", color: "cyan" },
    { icon: FileCheck, label: "Resume Match", color: "emerald" },
    { icon: BarChart3, label: "Analytics", color: "violet" },
  ];

  const agentSteps = [
    "Job Search",
    "Resume Match",
    "Gmail Outreach",
    "Reply Tracking",
  ];

  const liveActivity = [
    {
      dot: "bg-green-400 animate-pulse",
      title: "New Backend Job Found",
      sub: "LinkedIn • 2 minutes ago",
    },
    {
      dot: "bg-blue-400",
      title: "Resume Matched 91%",
      sub: "AI Matching Engine",
    },
    {
      dot: "bg-purple-400",
      title: "Personalized Email Generated",
      sub: "Gmail Outreach",
    },
  ];
const colorClasses = {
  cyan: {
    border: "hover:border-cyan-400/40",
    bg: "hover:bg-cyan-500/10",
    text: "text-cyan-400",
  },
  emerald: {
    border: "hover:border-emerald-400/40",
    bg: "hover:bg-emerald-500/10",
    text: "text-emerald-400",
  },
  violet: {
    border: "hover:border-violet-400/40",
    bg: "hover:bg-violet-500/10",
    text: "text-violet-400",
  },
};
  return (
    <ProtectedRoute>
      <div className="relative overflow-hidden min-h-screen">
        {/* Background blur image */}
        <div
          className="fixed top-0 right-0 bottom-0 hidden lg:block left-72 z-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/Login_BG.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            opacity: 0.3,
          }}
        />
        <div className="fixed inset-0 -z-10 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-5 lg:px-7 py-5 sm:py-6 lg:py-7">
          {/* ================= HERO ================= */}
          <section>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span className="text-[11px] tracking-wide text-cyan-300">
                AI Powered Job Automation
              </span>
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.03em] leading-[1.05] text-white">
              AI Job Dashboard
            </h1>

            <p className="mt-3 max-w-3xl text-sm sm:text-base leading-6 sm:leading-7 text-zinc-400">
              Automate your complete job search workflow with AI. Discover jobs,
              analyse resumes, send personalized Gmail outreach, track replies
              and manage every application from one intelligent workspace.
            </p>

            {/* Quick Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
             {quickButtons.map(({ icon: Icon, label, color }) => {
  const styles = colorClasses[color as keyof typeof colorClasses];

  return (
    <button
      key={label}
      className={`
        group flex items-center gap-2
        rounded-xl border border-white/10 bg-white/5
        backdrop-blur-xl
        px-4 sm:px-5 py-2.5 sm:py-3
        text-sm font-medium text-white
        transition-all duration-300
        md:hover:-translate-y-0.5
        ${styles.border}
        ${styles.bg}
        active:scale-95
      `}
    >
      <Icon className={`h-4 w-4 ${styles.text}`} />
      <span>{label}</span>
    </button>
  );
})}
            </div>
          </section>

          {/* ================= AGENT CONFIGURATION ================= */}
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">
            {/* Header */}
            <div className="border-b border-white/10 px-4 sm:px-6 py-4 sm:py-5 flex flex-col xl:flex-row justify-between xl:items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Agent Configuration
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Configure how your AI Agent searches and applies for jobs.
                </p>
              </div>

              <div
                onClick={() => router.push("/agent")}
                className="
                  group cursor-pointer
                  rounded-xl border border-cyan-400/20
                  bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-purple-500/10
                  px-4 py-3
                  transition-all duration-300
                  md:hover:-translate-y-0.5
                  hover:border-cyan-400/50
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-all">
                      <Bot className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                        AI Automation
                      </p>
                      <h3 className="text-sm font-bold text-white">
                        Go To AI Agent
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold text-green-400">
                      Ready
                    </span>
                    <ArrowRight className="h-4 w-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-300">
                    Job Keywords
                  </label>
                  <input
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Backend Developer"
                    className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-300">
                    Preferred Location
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Remote / Bangalore"
                    className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-500"
                  />
                </div>
                <button
                  onClick={startAgent}
                  disabled={loading}
                  className="
                    group h-11 px-5
                    rounded-xl border border-slate-700
                    bg-slate-900/70 text-white text-sm font-semibold
                    backdrop-blur-md transition-all duration-300
                    md:hover:-translate-y-0.5
                    hover:border-slate-500
                    hover:bg-slate-800
                    active:scale-95
                    disabled:opacity-60
                  "
                >
                  {loading ? "Searching..." : " Start AI Agent"}
                </button>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  AI Automation Features
                </h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                  {features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <CircleCheckBig className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-zinc-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="mt-8 grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`
                  rounded-2xl border border-white/10
                  ${
                    s.highlight
                      ? "bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
                      : "bg-white/[0.03]"
                  }
                  backdrop-blur-2xl p-4
                  hover:border-cyan-400/30 transition-all
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs text-zinc-400">
                    {s.label}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-lg ${s.iconBg} flex items-center justify-center`}
                  >
                    {s.icon}
                  </div>
                </div>
                <h2
                  className={`mt-3 text-xl sm:text-2xl font-black ${
                    s.valueClass ?? "text-white"
                  }`}
                >
                  {s.value}
                </h2>
                <p className={`mt-1 text-[10px] sm:text-[11px] ${s.subClass}`}>
                  {s.sub}
                </p>
              </div>
            ))}
          </section>

          {/* ================= MAIN DASHBOARD ================= */}
          <section className="mt-8 grid grid-cols-1 xl:grid-cols-[1.6fr_360px] gap-5 xl:gap-6">
            {/* LEFT — AI Job Agent */}
            <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10">
              <div className="rounded-2xl bg-[#08111f] p-5 sm:p-6">
                <div className="flex flex-col xl:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-black text-white">
                          AI Job Agent
                        </h2>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Intelligent Automation Engine
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400">
                      Your AI agent continuously scans LinkedIn, HackerNews and
                      other job sources, matches your resume, generates
                      personalized emails, tracks recruiter responses and keeps
                      every application organized automatically.
                    </p>
                  </div>

                  <div className="w-full xl:w-[240px]">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Automation Progress</span>
                      <span className="text-white">82%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
                    </div>

                    <div className="mt-5 space-y-2">
                      {agentSteps.map((t) => (
                        <div
                          key={t}
                          className="flex justify-between items-center text-xs"
                        >
                          <span className="text-zinc-500">{t}</span>
                          <CircleCheckBig className="text-green-400 h-4 w-4" />
                        </div>
                      ))}
                    </div>

                   
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Live Activity */}
            <aside className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Live Activity
              </h2>
              <div className="mt-5 space-y-4">
                {liveActivity.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full mt-1.5 ${a.dot}`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {a.title}
                      </p>
                      <span className="text-[11px] text-zinc-500">{a.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="mt-12 border-t border-zinc-800 pt-5 text-center text-xs text-zinc-500">
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
            <span className="mx-2">•</span>
            <a href="/terms" className="hover:text-white transition">
              Terms of Service
            </a>
            <span className="mx-2">•</span>
            <span>© 2026 oneXjob</span>
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
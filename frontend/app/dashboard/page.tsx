"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Select from "react-select";
import {
  Bot,
  Mail,
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
  MapPin,
  Sparkles,
} from "lucide-react";

const swalTheme = {
  width: "280px",
  padding: "0.75rem",
  background: "#0a0a0a",
  color: "#fff",
  customClass: {
    popup: "rounded-xl border border-zinc-800 shadow-2xl",
    title: "text-base font-semibold",
    htmlContainer: "text-xs text-zinc-400",
    confirmButton:
      "text-xs px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition",
  },
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
    title: "Action Failed",
    text: message,
    confirmButtonColor: "#27272a",
    ...swalTheme,
  });
};

const showWarning = (message: string) => {
  Swal.fire({
    title: "Attention",
    text: message,
    confirmButtonColor: "#27272a",
    ...swalTheme,
  });
};

export default function Dashboard() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [gmailProfile, setGmailProfile] = useState<any>(null);

  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [jobsFound, setJobsFound] = useState(0);
  const [applicationsSent, setApplicationsSent] = useState(0);
  const [keywordOptions, setKeywordOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    loadData();
    loadStats();
    loadKeywords();
  }, []);

  const locationOptions = [
    { value: "", label: "All Locations" },
    { value: "Remote", label: "🌍 Remote" },
    { value: "Anywhere", label: "🌎 Anywhere" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Pune", label: "Pune" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi NCR", label: "Delhi NCR" },
    { value: "Gurugram", label: "Gurugram" },
    { value: "Noida", label: "Noida" },
    { value: "New Delhi", label: "New Delhi" },
    { value: "Chennai", label: "Chennai" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Dubai", label: "Dubai" },
    { value: "Singapore", label: "Singapore" },
    { value: "London", label: "London" },
    { value: "United States", label: "United States" },
  ];

  const loadKeywords = async () => {
    try {
      const response = await api.get("/agent/keywords");
      const data = response.data;
      if (Array.isArray(data)) {
        const formatted = data.map((item: any) => {
          if (typeof item === "string") {
            return { value: item, label: item };
          }
          return { value: item.value || item.name, label: item.label || item.name };
        });
        setKeywordOptions(formatted);
      }
    } catch (err) {
      console.error("Error loading keywords:", err);
    }
  };

  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: "44px",
      backgroundColor: "#0a0a0a",
      border: state.isFocused
        ? "1px solid rgba(255,255,255,0.25)"
        : "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      boxShadow: "none",
      transition: "all 0.2s ease",
      "&:hover": {
        border: "1px solid rgba(255,255,255,0.2)",
      },
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: "0 14px",
    }),
    input: (base: any) => ({
      ...base,
      color: "#fff",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#fff",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#71717a",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#0a0a0a",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      overflow: "hidden",
      zIndex: 9999,
    }),
    menuList: (base: any) => ({
      ...base,
      backgroundColor: "#0a0a0a",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#18181b"
        : state.isFocused
        ? "#27272a"
        : "#0a0a0a",
      color: "#fff",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  const loadData = async () => {
    try {
      const appRes = await api.get("/applications");
      setApplications(appRes.data);

      const gmailRes = await api.get("/gmail/profile");
      setGmailProfile(gmailRes.data);
    } catch (err) {
      console.error("Error loading application profile data:", err);
    }
  };

  const loadStats = async () => {
    try {
      const response = await api.get("/stats");
      setJobsFound(response.data.jobs_found || 0);
      setApplicationsSent(response.data.applications_sent || 0);
    } catch (err) {
      console.error("Error loading statistics:", err);
    }
  };

  const showLoading = (
    title: string = "Running...",
    message: string = "Please wait..."
  ) => {
    Swal.fire({
      title,
      html: message,
      width: "280px",
      padding: "1rem",
      background: "#0a0a0a",
      color: "#fff",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-xl border border-zinc-800",
        title: "text-base font-semibold",
        htmlContainer: "text-xs text-zinc-400",
      },
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const startAgent = async () => {
    if (!keywords.trim()) {
      showWarning("Please select or enter job keywords first.");
      return;
    }

    setLoading(true);
    showLoading("Launching Agent", "Searching for available job positions...");

    try {
      const response = await api.post("/agent/start", {
        keywords,
        location,
      });

      Swal.close();
      showSuccess(response.data?.message || "AI Agent started successfully.");
      loadStats();
      router.push("/new-jobs");
    } catch (err: any) {
      Swal.close();
      console.error("Agent launch error:", err);
      showError(err.response?.data?.message || "Failed to start AI Agent.");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Agent Status",
      value: loading ? "Running" : "Ready",
      sub: "AI Automation Engine",
      icon: <Activity className="h-4 w-4 text-zinc-300" />,
      iconBg: "bg-zinc-800/50",
      valueClass: loading ? "text-emerald-400" : "text-zinc-100",
      subClass: "text-zinc-500",
    },
    {
      label: "Jobs Found",
      value: jobsFound,
      sub: "↑ AI Discovered Jobs",
      icon: <BriefcaseBusiness className="h-4 w-4 text-zinc-300" />,
      iconBg: "bg-zinc-800/50",
      subClass: "text-zinc-400",
    },
    {
      label: "Applications",
      value: applicationsSent,
      sub: "Emails Sent",
      icon: <Send className="h-4 w-4 text-zinc-300" />,
      iconBg: "bg-zinc-800/50",
      subClass: "text-zinc-400",
    },
    {
      label: "Resume Match",
      value: "91%",
      sub: "ATS Optimized",
      icon: <ShieldCheck className="h-4 w-4 text-zinc-300" />,
      iconBg: "bg-zinc-800/50",
      subClass: "text-zinc-400",
    },
    {
      label: "YC Jobs",
      value: 5,
      sub: "Gmail Responses",
      icon: <Mail className="h-4 w-4 text-zinc-300" />,
      iconBg: "bg-zinc-800/50",
      subClass: "text-zinc-400",
    },
    {
      label: "Success Rate",
      value: "94%",
      sub: "Automation Accuracy",
      icon: <CheckCircle2 className="h-4 w-4 text-zinc-300" />,
      iconBg: "bg-zinc-800/50",
      subClass: "text-zinc-400",
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
    { icon: Search, label: "Search Jobs", path: "/new-jobs" },
    { icon: FileCheck, label: "Resume Match", path: "/resume" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
  ];

  const agentSteps = [
    "Job Search",
    "Resume Match",
    "Gmail Outreach",
    "Reply Tracking",
  ];

  const liveActivity = [
    {
      dot: "bg-emerald-400 animate-pulse",
      title: "New Backend Job Found",
      sub: "LinkedIn • 2 minutes ago",
    },
    {
      dot: "bg-zinc-500",
      title: "Resume Matched 91%",
      sub: "AI Matching Engine",
    },
    {
      dot: "bg-zinc-500",
      title: "Personalized Email Generated",
      sub: "Gmail Outreach",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white flex flex-col justify-between">
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col justify-between space-y-6 sm:space-y-8">
          
          <div className="space-y-6 sm:space-y-8">
            {/* Header & Hero */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
                <span>AI-Powered Automation Control</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                AI Job Dashboard
              </h1>

              {/* Quick Action Navigation Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                {quickButtons.map(({ icon: Icon, label, path }) => (
                  <button
                    key={label}
                    onClick={() => router.push(path)}
                    className="group inline-flex items-center gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-white active:scale-95"
                  >
                    <Icon className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Agent Configuration */}
            <section className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] overflow-hidden shadow-xl">
              <div className="border-b border-zinc-800/80 bg-zinc-900/30 px-5 sm:px-6 py-4 sm:py-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Agent Configuration
                  </h2>
                  <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
                    Configure search parameters and launch your AI job searching pipeline.
                  </p>
                </div>

                <div
                  onClick={() => router.push("/agent")}
                  className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-200">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Automation Suite
                        </p>
                        <h3 className="text-sm font-bold text-white">
                          Open AI Agent Hub
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-zinc-800/80 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300 border border-zinc-700/50">
                        Ready
                      </span>
                      <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form & Controls */}
              <div className="p-5 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                  {/* Job Keyword Selector */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-300">
                      <Search className="h-3.5 w-3.5 text-zinc-400" />
                      Job Keywords
                    </label>
                    {mounted ? (
                      <Select
                        options={keywordOptions}
                        isSearchable
                        isClearable
                        placeholder="Select target role..."
                        value={
                          keywordOptions.find((o) => o.value === keywords) || null
                        }
                        onChange={(selected: any) =>
                          setKeywords(selected?.value || "")
                        }
                        styles={selectStyles}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                      />
                    ) : (
                      <div className="h-[44px] bg-zinc-900 border border-zinc-800 rounded-xl" />
                    )}
                  </div>

                  {/* Location Selector */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-300">
                      <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                      Preferred Location
                    </label>
                    {mounted ? (
                      <Select
                        options={locationOptions}
                        isSearchable
                        isClearable
                        placeholder="Select preferred location..."
                        value={
                          locationOptions.find((o) => o.value === location) || null
                        }
                        onChange={(selected: any) => setLocation(selected?.value || "")}
                        styles={selectStyles}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                      />
                    ) : (
                      <div className="h-[44px] bg-zinc-900 border border-zinc-800 rounded-xl" />
                    )}
                  </div>

                  {/* Trigger Action */}
                  <button
                    onClick={startAgent}
                    disabled={loading}
                    className="h-[44px] px-6 rounded-xl bg-white text-black text-xs sm:text-sm font-semibold transition-all hover:bg-zinc-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {loading ? "Searching..." : "Start AI Agent"}
                  </button>
                </div>

                <div className="h-px bg-zinc-800/80" />

                {/* Feature Highlights */}
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Active Capabilities
                  </h3>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/30 p-2.5 rounded-lg border border-zinc-800/60"
                      >
                        <CircleCheckBig className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Metrics Dashboard */}
            <section className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6 gap-3 sm:gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-zinc-800/80 bg-[#0a0a0a] p-4 hover:border-zinc-700 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-zinc-400">
                      {s.label}
                    </span>
                    <div
                      className={`h-7 w-7 rounded-lg ${s.iconBg} flex items-center justify-center`}
                    >
                      {s.icon}
                    </div>
                  </div>
                  <div>
                    <h2
                      className={`mt-2.5 text-xl sm:text-2xl font-black ${
                        s.valueClass ?? "text-white"
                      }`}
                    >
                      {s.value}
                    </h2>
                    <p className={`mt-0.5 text-[10px] ${s.subClass}`}>{s.sub}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Main Workspace Layout */}
            <section className="grid grid-cols-1 xl:grid-cols-[1.6fr_360px] gap-6">
              {/* Pipeline Visualizer */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-300" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-white">
                        AI Job Agent Pipeline
                      </h2>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Autonomous Sourcing Engine
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-400 max-w-2xl">
                    Your AI agent continuously scans top job portals, analyzes job matches using direct resume vector comparisons, generates high-converting outreach cold emails, and tracks candidate interviews seamlessly.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-zinc-400">Automation Progress</span>
                      <span className="text-white font-semibold">82%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                      <div className="h-full w-[82%] rounded-full bg-white transition-all duration-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {agentSteps.map((step) => (
                      <div
                        key={step}
                        className="flex items-center justify-between text-xs bg-zinc-900/40 border border-zinc-800/80 px-2.5 py-1.5 rounded-lg"
                      >
                        <span className="text-zinc-400 text-[11px] truncate">{step}</span>
                        <CircleCheckBig className="text-zinc-300 h-3.5 w-3.5 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Feed Panel */}
              <aside className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 shadow-xl">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Live Activity Stream
                </h2>
                <div className="mt-4 space-y-3.5">
                  {liveActivity.map((act, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-2.5 rounded-xl border border-zinc-800/50 bg-zinc-900/20"
                    >
                      <div
                        className={`h-2.5 w-2.5 rounded-full mt-1 flex-shrink-0 ${act.dot}`}
                      />
                      <div>
                        <p className="text-xs font-bold text-white">
                          {act.title}
                        </p>
                        <span className="text-[10px] text-zinc-500">
                          {act.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </section>
          </div>

          {/* Footer */}
          <footer className="pt-6 border-t border-zinc-900 text-center text-xs text-zinc-500">
            <a href="/privacy" className="hover:text-zinc-300 transition">
              Privacy Policy
            </a>
            <span className="mx-2.5">•</span>
            <a href="/terms" className="hover:text-zinc-300 transition">
              Terms of Service
            </a>
            <span className="mx-2.5">•</span>
            <span>© 2026 oneXjob</span>
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
"use client";

import { api } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Activity,
  BriefcaseBusiness,
  Send,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import Select from "react-select";

const swalTheme = {
  width: "300px",
  padding: "1rem",
  background: "#0a0a0a",
  color: "#fff",
  customClass: {
    popup: "rounded-xl border border-zinc-800",
    title: "text-base font-semibold text-white",
    htmlContainer: "text-xs text-zinc-400",
    confirmButton: "text-xs px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700",
  },
};

export default function AgentPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [keywords, setKeywords] = useState("");
  const [keywordOptions, setKeywordOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobsFound, setJobsFound] = useState(0);
  const [applicationsSent, setApplicationsSent] = useState(0);

  const loadKeywords = async () => {
    try {
      const response = await api.get("/agent/keywords");
      setKeywordOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const locationOptions = [
    // { value: "", label: "All Locations" },
    // { value: "Anywhere", label: "🌎 Anywhere" },
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
    { value: "Kochi", label: "Kochi" },
    { value: "Thiruvananthapuram", label: "Thiruvananthapuram" },
    { value: "Coimbatore", label: "Coimbatore" },
    { value: "Mysore", label: "Mysore" },
    { value: "Visakhapatnam", label: "Visakhapatnam" },
    { value: "Bhubaneswar", label: "Bhubaneswar" },
    { value: "Indore", label: "Indore" },
    { value: "Nagpur", label: "Nagpur" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Lucknow", label: "Lucknow" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Mohali", label: "Mohali" },
    { value: "Surat", label: "Surat" },
    { value: "Vadodara", label: "Vadodara" },
    { value: "Nashik", label: "Nashik" },
    { value: "Patna", label: "Patna" },
    { value: "Raipur", label: "Raipur" },
    { value: "Bhopal", label: "Bhopal" },
    { value: "Kanpur", label: "Kanpur" },
    { value: "Jodhpur", label: "Jodhpur" },
    { value: "Guwahati", label: "Guwahati" },
    { value: "Vijayawada", label: "Vijayawada" },
    { value: "Madurai", label: "Madurai" },
    { value: "Mangalore", label: "Mangalore" },
    { value: "Dubai", label: "Dubai" },
    { value: "Singapore", label: "Singapore" },
    { value: "London", label: "London" },
    { value: "United States", label: "United States" },
    { value: "Remote", label: "🌍 Remote" },

  ];

  useEffect(() => {
    loadStats();
    loadKeywords();
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

  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: "48px",
      backgroundColor: "#0a0a0a",
      border: state.isFocused
        ? "1px solid rgba(255,255,255,0.2)"
        : "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      boxShadow: "none",
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
      fontSize: "14px",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#71717a",
      fontSize: "14px",
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
      padding: "4px",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#18181b"
        : state.isFocused
        ? "#27272a"
        : "#0a0a0a",
      color: "#fff",
      borderRadius: "6px",
      padding: "8px 12px",
      cursor: "pointer",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#71717a",
      "&:hover": { color: "#fff" },
    }),
    clearIndicator: (base: any) => ({
      ...base,
      color: "#71717a",
      "&:hover": { color: "#fff" },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  const startAgent = async () => {
    if (!keywords.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Job Keyword Required",
        text: "Please enter job keywords.",
        confirmButtonColor: "#27272a",
        ...swalTheme,
      });
      return;
    }
  if (!location.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Location Required",
        text: "Please select a preferred location.",
        confirmButtonColor: "#27272a",
        ...swalTheme,
      });
      return;
    }

    setLoading(true);

    Swal.fire({
      title: "Running...",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      ...swalTheme,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await api.post("/agent/start", {
        keywords,
        location,
        page,
        page_size: 5,
      });

      console.log("AGENT RESPONSE:", response.data);
console.log("SEARCH ID RETURNED:", response.data.search_id);
      Swal.close();

      if (response.data.resume_uploaded === false) {
        await Swal.fire({
          icon: "warning",
          title: "Resume Required",
          text: response.data.message,
          confirmButtonColor: "#27272a",
          ...swalTheme,
        });

        router.push("/resume");
        return;
      }

      if (response.data.jobs_found === 0) {
        await Swal.fire({
          icon: "info",
          title: "No Jobs Found",
          text: "No new jobs found for this role in the selected location.",
          confirmButtonColor: "#27272a",
          ...swalTheme,
        });

        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
        confirmButtonColor: "#27272a",
        ...swalTheme,
      });

      router.push(`/new-jobs?search_id=${response.data.search_id}`);
    } catch (error: any) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Unable to start AI Agent.",
        confirmButtonColor: "#27272a",
        ...swalTheme,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-5 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 mb-6">
          <span className="text-sm">🤖</span>
          <span className="text-xs tracking-wide text-zinc-300">
            AI Powered Automation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-[-0.05em] leading-none">
          AI Job Agent
        </h1>

        <p className="mt-4 max-w-3xl lg:max-w-4xl text-sm sm:text-base leading-7 font-normal text-zinc-400">
          Configure and run your automated job search assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {/* Status */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Agent Status
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    loading ? "bg-zinc-400 animate-pulse" : "bg-white"
                  }`}
                />

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {loading ? "Running" : "Ready"}
                </h2>
              </div>

              <p className="mt-2 text-xs text-zinc-400">
                {loading
                  ? "AI agent is processing jobs"
                  : "Ready to launch"}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
              <Activity className="h-5 w-5 text-zinc-300" />
            </div>
          </div>
        </div>

        {/* Jobs Found */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 hover:border-zinc-700 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Jobs Found
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                {jobsFound}
              </h2>

              <p className="mt-2 text-xs text-zinc-400">
                AI Discovered Jobs
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
              <BriefcaseBusiness className="h-5 w-5 text-zinc-300" />
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5 sm:p-6 hover:border-zinc-700 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Applications Sent
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                {applicationsSent}
              </h2>

              <p className="mt-2 text-xs text-zinc-400">
                Emails Sent
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
              <Send className="h-5 w-5 text-zinc-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Card */}
      <div className="w-full rounded-2xl border border-zinc-800 bg-[#0a0a0a] overflow-hidden">
        {/* Header */}
        <div className="border-b border-zinc-800 px-5 sm:px-6 lg:px-8 py-5 sm:py-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Agent Configuration
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Configure how your AI Agent searches and automatically applies for jobs.
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-5 items-end">
            {/* Keywords */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300">
                <Search className="h-4 w-4 text-zinc-400" />
                Job Keywords
              </label>

             <Select
  options={keywordOptions}
  isSearchable
  isClearable
  placeholder="Search job role..."
  menuPortalTarget={
    typeof window !== "undefined" ? document.body : undefined
  }
  menuPosition="fixed"
  value={
    keywordOptions.find((option) => option.value === keywords) || null
  }
  onChange={(selected) => {
    setKeywords(selected?.value || "");
  }}
  styles={selectStyles}
/>
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300">
                <MapPin className="h-4 w-4 text-zinc-400" />
                Preferred Location
              </label>

              <Select
                options={locationOptions}
                placeholder="Search location..."
                isSearchable
                isClearable
                menuPortalTarget={
                  typeof window !== "undefined" ? document.body : undefined
                }
                menuPosition="fixed"
                value={
                  locationOptions.find((option) => option.value === location) ||
                  null
                }
                onChange={(selected) => {
                  setLocation(selected ? selected.value : "");
                }}
                styles={selectStyles}
              />
            </div>

            {/* Launch Button */}
            <button
              onClick={startAgent}
              disabled={loading}
              className="
                h-12 w-full lg:w-auto px-8 rounded-xl
                border border-zinc-700 bg-white text-black font-semibold text-sm
                transition-all duration-300 hover:bg-zinc-200 active:scale-95
                disabled:opacity-60
              "
            >
              <span className="flex items-center justify-center gap-2">
                {loading && <Loader2 className="h-4 w-4 animate-spin text-black" />}
                {loading ? "Searching Jobs..." : "Launch AI Agent"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
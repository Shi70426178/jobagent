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

const getIsDark = () => {
  if (typeof document === "undefined") return false;

  return document.documentElement.classList.contains("dark");
};

const showSwal = async ({
  icon,
  title,
  text,
}: {
  icon: "success" | "warning" | "error" | "info";
  title: string;
  text: string;
}) => {
  const dark = getIsDark();

  return Swal.fire({
    icon,
    title,
    text,

    width: "320px",
    padding: "1rem",

    background: dark ? "#0a0a0a" : "#ffffff",
    color: dark ? "#ffffff" : "#18181b",

    confirmButtonColor: dark ? "#ffffff" : "#18181b",

    customClass: {
      popup: "rounded-xl border",
      title: "text-base font-semibold",
      htmlContainer: "text-xs",
      confirmButton:
        "text-xs px-4 py-2 rounded-lg font-medium",
    },
  });
};

export default function AgentPage() {
  const router = useRouter();

  const [page] = useState(1);

  const [keywords, setKeywords] = useState("");
  const [keywordOptions, setKeywordOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  const [jobsFound, setJobsFound] = useState(0);
  const [applicationsSent, setApplicationsSent] = useState(0);

  /* =========================================================
     LOAD KEYWORDS
  ========================================================= */

  const loadKeywords = async () => {
    try {
      const response = await api.get("/agent/keywords");

      setKeywordOptions(response.data);
    } catch (error) {
      console.error("Error loading keywords:", error);
    }
  };

  /* =========================================================
     LOCATIONS
  ========================================================= */

  const locationOptions = [
    {
      value: "Bangalore",
      label: "Bangalore",
    },
    {
      value: "Hyderabad",
      label: "Hyderabad",
    },
    {
      value: "Pune",
      label: "Pune",
    },
    {
      value: "Mumbai",
      label: "Mumbai",
    },
    {
      value: "Delhi NCR",
      label: "Delhi NCR",
    },
    {
      value: "Gurugram",
      label: "Gurugram",
    },
    {
      value: "Noida",
      label: "Noida",
    },
    {
      value: "New Delhi",
      label: "New Delhi",
    },
    {
      value: "Chennai",
      label: "Chennai",
    },
    {
      value: "Kolkata",
      label: "Kolkata",
    },
    {
      value: "Ahmedabad",
      label: "Ahmedabad",
    },
    {
      value: "Kochi",
      label: "Kochi",
    },
    {
      value: "Thiruvananthapuram",
      label: "Thiruvananthapuram",
    },
    {
      value: "Coimbatore",
      label: "Coimbatore",
    },
    {
      value: "Mysore",
      label: "Mysore",
    },
    {
      value: "Visakhapatnam",
      label: "Visakhapatnam",
    },
    {
      value: "Bhubaneswar",
      label: "Bhubaneswar",
    },
    {
      value: "Indore",
      label: "Indore",
    },
    {
      value: "Nagpur",
      label: "Nagpur",
    },
    {
      value: "Jaipur",
      label: "Jaipur",
    },
    {
      value: "Lucknow",
      label: "Lucknow",
    },
    {
      value: "Chandigarh",
      label: "Chandigarh",
    },
    {
      value: "Mohali",
      label: "Mohali",
    },
    {
      value: "Surat",
      label: "Surat",
    },
    {
      value: "Vadodara",
      label: "Vadodara",
    },
    {
      value: "Nashik",
      label: "Nashik",
    },
    {
      value: "Patna",
      label: "Patna",
    },
    {
      value: "Raipur",
      label: "Raipur",
    },
    {
      value: "Bhopal",
      label: "Bhopal",
    },
    {
      value: "Kanpur",
      label: "Kanpur",
    },
    {
      value: "Jodhpur",
      label: "Jodhpur",
    },
    {
      value: "Guwahati",
      label: "Guwahati",
    },
    {
      value: "Vijayawada",
      label: "Vijayawada",
    },
    {
      value: "Madurai",
      label: "Madurai",
    },
    {
      value: "Mangalore",
      label: "Mangalore",
    },
    {
      value: "Dubai",
      label: "Dubai",
    },
    {
      value: "Singapore",
      label: "Singapore",
    },
    {
      value: "London",
      label: "London",
    },
    {
      value: "United States",
      label: "United States",
    },
    {
      value: "Remote",
      label: "🌍 Remote",
    },
  ];

  /* =========================================================
     LOAD STATS
  ========================================================= */

  useEffect(() => {
    loadStats();
    loadKeywords();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get("/stats");

      setJobsFound(response.data.jobs_found);
      setApplicationsSent(
        response.data.applications_sent
      );
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  /* =========================================================
     REACT SELECT THEME
  ========================================================= */

  const selectStyles = {
    control: (base: any, state: any) => {
      const dark = getIsDark();

      return {
        ...base,

        minHeight: "48px",

        backgroundColor: dark
          ? "#0a0a0a"
          : "#ffffff",

        border: state.isFocused
          ? dark
            ? "1px solid rgba(255,255,255,0.25)"
            : "1px solid rgba(24,24,27,0.35)"
          : dark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(24,24,27,0.15)",

        borderRadius: "12px",

        boxShadow: "none",

        "&:hover": {
          border: dark
            ? "1px solid rgba(255,255,255,0.2)"
            : "1px solid rgba(24,24,27,0.3)",
        },
      };
    },

    valueContainer: (base: any) => ({
      ...base,
      padding: "0 14px",
    }),

    input: (base: any) => ({
      ...base,
      color: getIsDark() ? "#fff" : "#18181b",
    }),

    singleValue: (base: any) => ({
      ...base,
      color: getIsDark() ? "#fff" : "#18181b",
      fontSize: "14px",
    }),

    placeholder: (base: any) => ({
      ...base,
      color: getIsDark() ? "#71717a" : "#a1a1aa",
      fontSize: "14px",
    }),

    menu: (base: any) => {
      const dark = getIsDark();

      return {
        ...base,

        backgroundColor: dark
          ? "#0a0a0a"
          : "#ffffff",

        border: dark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(24,24,27,0.12)",

        borderRadius: "12px",

        overflow: "hidden",

        zIndex: 9999,

        boxShadow: dark
          ? "0 20px 50px rgba(0,0,0,0.5)"
          : "0 20px 50px rgba(0,0,0,0.12)",
      };
    },

    menuList: (base: any) => ({
      ...base,

      backgroundColor: getIsDark()
        ? "#0a0a0a"
        : "#ffffff",

      padding: "4px",
    }),

    option: (base: any, state: any) => {
      const dark = getIsDark();

      return {
        ...base,

        backgroundColor: state.isSelected
          ? dark
            ? "#27272a"
            : "#f4f4f5"
          : state.isFocused
          ? dark
            ? "#18181b"
            : "#f4f4f5"
          : dark
          ? "#0a0a0a"
          : "#ffffff",

        color: dark ? "#fff" : "#18181b",

        borderRadius: "6px",

        padding: "8px 12px",

        cursor: "pointer",
      };
    },

    dropdownIndicator: (base: any) => ({
      ...base,

      color: getIsDark()
        ? "#71717a"
        : "#a1a1aa",

      "&:hover": {
        color: getIsDark()
          ? "#fff"
          : "#18181b",
      },
    }),

    clearIndicator: (base: any) => ({
      ...base,

      color: getIsDark()
        ? "#71717a"
        : "#a1a1aa",

      "&:hover": {
        color: getIsDark()
          ? "#fff"
          : "#18181b",
      },
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  /* =========================================================
     START AGENT
  ========================================================= */

  const startAgent = async () => {
    if (!keywords.trim()) {
      await showSwal({
        icon: "warning",
        title: "Job Keyword Required",
        text: "Please enter job keywords.",
      });

      return;
    }

    if (!location.trim()) {
      await showSwal({
        icon: "warning",
        title: "Location Required",
        text: "Please select a preferred location.",
      });

      return;
    }

    setLoading(true);

    const dark = getIsDark();

    Swal.fire({
      title: "Running...",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,

      width: "300px",
      padding: "1rem",

      background: dark ? "#0a0a0a" : "#ffffff",
      color: dark ? "#ffffff" : "#18181b",

      customClass: {
        popup: "rounded-xl border",
        title: "text-base font-semibold",
      },

      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await api.post(
        "/agent/start",
        {
          keywords,
          location,
          page,
          page_size: 5,
        }
      );

      console.log(
        "AGENT RESPONSE:",
        response.data
      );

      console.log(
        "SEARCH ID RETURNED:",
        response.data.search_id
      );

      Swal.close();

      /* =====================================================
         RESUME REQUIRED
      ===================================================== */

      if (
        response.data.resume_uploaded === false
      ) {
        await showSwal({
          icon: "warning",
          title: "Resume Required",
          text: response.data.message,
        });

        router.push("/resume");

        return;
      }

      /* =====================================================
         NO JOBS
      ===================================================== */

      if (response.data.jobs_found === 0) {
        await showSwal({
          icon: "info",
          title: "No Jobs Found",
          text:
            "No new jobs found for this role in the selected location.",
        });

        return;
      }

      /* =====================================================
         SUCCESS
      ===================================================== */

      await showSwal({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });

      router.push(
        `/new-jobs?search_id=${response.data.search_id}`
      );
    } catch (error: any) {
      Swal.close();

      console.error(
        "Unable to start AI Agent:",
        error
      );

      await showSwal({
        icon: "error",
        title: "Oops!",
        text:
          error?.response?.data?.detail ||
          "Unable to start AI Agent.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="min-h-screen bg-white px-5 py-6 text-zinc-900 transition-colors duration-300 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10 dark:bg-black dark:text-white">

      <div className="mb-8">

        {/* Badge */}

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 dark:border-zinc-800 dark:bg-zinc-900">

          <span className="text-sm">
            🤖
          </span>

          <span className="text-xs tracking-wide text-zinc-600 dark:text-zinc-300">
            AI Powered Automation
          </span>

        </div>

        {/* Heading */}

        <h1 className="text-2xl font-black leading-none tracking-[-0.05em] text-zinc-900 sm:text-3xl lg:text-4xl xl:text-5xl dark:text-white">
          AI Job Agent
        </h1>

        <p className="mt-4 max-w-3xl text-sm font-normal leading-7 text-zinc-600 sm:text-base lg:max-w-4xl dark:text-zinc-400">
          Configure and run your automated job
          search assistant.
        </p>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {/* Agent Status */}

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 sm:p-6 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-700">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Agent Status
              </p>

              <div className="mt-3 flex items-center gap-2">

                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    loading
                      ? "animate-pulse bg-zinc-500 dark:bg-zinc-400"
                      : "bg-zinc-900 dark:bg-white"
                  }`}
                />

                <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
                  {loading ? "Running" : "Ready"}
                </h2>

              </div>

              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                {loading
                  ? "AI agent is processing jobs"
                  : "Ready to launch"}
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

              <Activity className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />

            </div>

          </div>

        </div>

        {/* Jobs Found */}

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 sm:p-6 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-700">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Jobs Found
              </p>

              <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
                {jobsFound}
              </h2>

              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                AI Discovered Jobs
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

              <BriefcaseBusiness className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />

            </div>

          </div>

        </div>

        {/* Applications */}

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 sm:p-6 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-700">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Applications Sent
              </p>

              <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
                {applicationsSent}
              </h2>

              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Emails Sent
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

              <Send className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CONFIGURATION
      ===================================================== */}

      <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#0a0a0a]">

        {/* Header */}

        <div className="border-b border-zinc-200 px-5 py-5 sm:px-6 sm:py-6 lg:px-8 dark:border-zinc-800">

          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">
            Agent Configuration
          </h2>

          <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
            Configure how your AI Agent searches
            and automatically applies for jobs.
          </p>

        </div>

        {/* Body */}

        <div className="p-5 sm:p-6 lg:p-8">

          <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-[1fr_1fr_auto]">

            {/* Keywords */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-700 sm:text-sm dark:text-zinc-300">

                <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />

                Job Keywords

              </label>

              <Select
                options={keywordOptions}
                isSearchable
                isClearable
                placeholder="Search job role..."
                menuPortalTarget={
                  typeof window !== "undefined"
                    ? document.body
                    : undefined
                }
                menuPosition="fixed"
                value={
                  keywordOptions.find(
                    (option) =>
                      option.value === keywords
                  ) || null
                }
                onChange={(selected) => {
                  setKeywords(
                    selected?.value || ""
                  );
                }}
                styles={selectStyles}
              />

            </div>

            {/* Location */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-700 sm:text-sm dark:text-zinc-300">

                <MapPin className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />

                Preferred Location

              </label>

              <Select
                options={locationOptions}
                placeholder="Search location..."
                isSearchable
                isClearable
                menuPortalTarget={
                  typeof window !== "undefined"
                    ? document.body
                    : undefined
                }
                menuPosition="fixed"
                value={
                  locationOptions.find(
                    (option) =>
                      option.value === location
                  ) || null
                }
                onChange={(selected) => {
                  setLocation(
                    selected?.value || ""
                  );
                }}
                styles={selectStyles}
              />

            </div>

            {/* Launch */}

            <button
              onClick={startAgent}
              disabled={loading}
              className="h-12 w-full rounded-xl border border-zinc-900 bg-zinc-900 px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 lg:w-auto"
            >

              <span className="flex items-center justify-center gap-2">

                {loading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {loading
                  ? "Searching Jobs..."
                  : "Launch AI Agent"}

              </span>

            </button>

          </div>

        </div>

      </div>

    </main>
  );
}
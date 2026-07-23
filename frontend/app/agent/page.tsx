"use client";

import { api } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Sidebar from "@/components/Sidebar";
import { Search, MapPin, Rocket,Activity,BriefcaseBusiness,  Send, } from "lucide-react";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import Select from "react-select";
export default function AgentPage() {
  const router = useRouter();

  const [keywords, setKeywords] = useState("");

  const [keywordOptions, setKeywordOptions] = useState<
  { value: string; label: string }[]
>([]);
  const loadKeywords = async () => {
  try {
    const response = await api.get("/agent/keywords");
    setKeywordOptions(response.data);
  } catch (error) {
    console.error(error);
  }
};

  const [location, setLocation] = useState("");

  // const [dailyLimit, setDailyLimit] =
  //   useState(50);
  const [loading, setLoading] = useState(false);

  const [jobsFound, setJobsFound] = useState(0);

  const [applicationsSent, setApplicationsSent] = useState(0);
const locationOptions = [
  { value: "", label: "All Locations" },

  // Remote
  { value: "Remote", label: "🌍 Remote" },
  { value: "Anywhere", label: "🌎 Anywhere" },

  // Metro Cities
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

  // Growing IT Cities
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

  // International
  { value: "Dubai", label: "Dubai" },
  { value: "Singapore", label: "Singapore" },
  { value: "London", label: "London" },
  { value: "United States", label: "United States" },
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

const startAgent = async () => {
  if (!keywords.trim()) {
   Swal.fire({
  icon: "warning",
  title: "Job Keyword Required",
  text: "Please enter job keywords.",
  background: "#0b1220",
  color: "#fff",
  confirmButtonColor: "#06b6d4",
});
    return;
  }

  setLoading(true);

  // Show Loading Popup

Swal.fire({
  title: "Running...",
  background: "#0b1220",
  color: "#fff",
  showConfirmButton: false,
  allowOutsideClick: false,
  allowEscapeKey: false,
  customClass: {
    popup: "rounded-2xl border border-cyan-500/20 shadow-2xl",
    title: "text-white font-semibold",
  },
  didOpen: () => {
    Swal.showLoading();
  },
});
  try {
const response = await api.post("/agent/start", {
  keywords,
  location,
});

Swal.close();

if (response.data.resume_uploaded === false) {
  await Swal.fire({
    icon: "warning",
    title: "Resume Required",
    text: response.data.message,
    background: "#0b1220",
    color: "#fff",
    confirmButtonColor: "#06b6d4",
  });

  router.push("/resume");
  return;
}

await Swal.fire({
  icon: "success",
  title: "Success",
  text: response.data.message,
  background: "#0b1220",
  color: "#fff",
  confirmButtonColor: "#06b6d4",
});

router.push("/new-jobs");
  } catch (error: any) {
    Swal.close();

    Swal.fire({
  icon: "error",
  title: "Oops!",
  text: "Unable to start AI Agent.",
  background: "#0b1220",
  color: "#fff",
  confirmButtonColor: "#ef4444",
});
  } finally {
    setLoading(false);
  }
};

 return (
  <main
    className="
      min-h-screen
      bg-transparent
      text-white
      px-5
      sm:px-6
      lg:px-8
      xl:px-10
      py-6
      sm:py-8
      lg:py-10
    "
  >
        {" "}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 mb-6">
            <span>🤖</span>
            <span className="text-xs tracking-wide text-cyan-300">
              AI Powered Automation
            </span>
          </div>
          <h1 className="text-2xl
sm:text-3xl
sm:text-4xl
xl:text-5xl font-black tracking-[-0.05em] leading-none">
            AI Job Agent
          </h1>

          <p className="mt-6 max-w-3xl
lg:max-w-4xl text-base leading-7 font-medium text-zinc-300">
            Configure and run your automated job search assistant.
          </p>
        </div>

      <div className="grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3 gap-6 mb-10">

  {/* Status */}

  <div
    className="
      group
      rounded-2xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-5
sm:p-6
      transition-all
      duration-300
      md:hover:-translate-y-1
      hover:border-green-500/30
      hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]
    "
  >
   


<div className="flex items-center justify-between">
  <div>
    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
      Agent Status
    </p>

    <div className="mt-3 flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          loading ? "bg-cyan-400" : "bg-emerald-400"
        }`}
      />

      <h2 className="text-3xl font-semibold text-white">
        {loading ? "Running" : "Ready"}
      </h2>
    </div>

    <p className="mt-2 text-sm text-zinc-400">
      {loading
        ? "AI agent is processing jobs"
        : "Ready to launch"}
    </p>
  </div>

  <div
    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
      loading
        ? "border-cyan-500/30 bg-cyan-500/10"
        : "border-white/10 bg-white/[0.04]"
    }`}
  >
    <Activity
      className={`h-6 w-6 ${
        loading ? "text-cyan-400" : "text-zinc-300"
      }`}
    />
  </div>
</div>



  </div>

  {/* Jobs Found */}

  <div
    className="
      group
      rounded-2xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-5
sm:p-6
      transition-all
      duration-300
      md:hover:-translate-y-1
      hover:border-cyan-500/30
      hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]
    "
  >
    <div className="flex items-start justify-between">

      <div>

        <p className="text-xs uppercase tracking-wider text-zinc-400">
          Jobs Found
        </p>

        <h2 className="mt-4 text-2xl
sm:text-3xl font-bold">
          {jobsFound}
        </h2>

        <p className="mt-2 text-xs text-cyan-400">
          AI Discovered Jobs
        </p>

      </div>

      <div className="flex h-12
sm:h-14 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
        <BriefcaseBusiness className="h-6 w-6 text-cyan-400" />
      </div>

    </div>
  </div>

  {/* Applications */}

  <div
    className="
      group
      rounded-2xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-5
sm:p-6
      transition-all
      duration-300
      md:hover:-translate-y-1
      hover:border-purple-500/30
      hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]
    "
  >
    <div className="flex items-start justify-between">

      <div>

        <p className="text-xs uppercase tracking-wider text-zinc-400">
          Applications Sent
        </p>

        <h2 className="mt-4 text-2xl
sm:text-3xl font-bold">
          {applicationsSent}
        </h2>

        <p className="mt-2 text-xs text-purple-400">
          Emails Sent
        </p>

      </div>

      <div className="flex h-12
sm:h-14 w-12 items-center justify-center rounded-xl bg-purple-500/10">
        <Send className="h-6 w-6 text-purple-400" />
      </div>

    </div>
  </div>

</div>
        <div
  className="
    mt-6
sm:mt-8
    w-full
    rounded-3xl
    border
    border-white/10
    bg-white/[0.03]
    backdrop-blur-2xl
    overflow-hidden
  "
>
  {/* Header */}

  <div className="border-b border-white/10 px-5
sm:px-6
lg:px-8
py-5
sm:py-6">
    <h2 className="text-2xl
sm:text-3xl font-bold text-white">
      Agent Configuration
    </h2>

    <p className="mt-2 text-xs
sm:text-sm text-zinc-400">
      Configure how your AI Agent searches and automatically applies for jobs.
    </p>
  </div>

  {/* Body */}

  <div className="p-5
sm:p-6
lg:p-8">

    <div className="grid
grid-cols-1
lg:grid-cols-[1fr_1fr_auto] gap-6 items-end">

      {/* Keywords */}

      <div>

        <label className="mb-2 flex items-center gap-2 text-xs
sm:text-sm font-medium text-zinc-300">

          <Search className="h-4 w-4 text-cyan-400" />

          Job Keywords

        </label>

        <Select
    options={keywordOptions}
  isSearchable
  isClearable
  placeholder="Search job role..."
  value={
    keywordOptions.find(option => option.value === keywords) || null
  }
  onChange={(selected) => {
    setKeywords(selected?.value || "");
  }}
    styles={{
  control: (base, state) => ({
    ...base,
    minHeight: "56px",
    backgroundColor: "rgba(255,255,255,0.03)",
    border: state.isFocused
      ? "1px solid rgba(6,182,212,.45)"
      : "1px solid rgba(255,255,255,.10)",
    borderRadius: "12px",
    boxShadow: state.isFocused
      ? "0 0 0 3px rgba(6,182,212,.15)"
      : "none",
    transition: "all .2s ease",
    "&:hover": {
      border: "1px solid rgba(6,182,212,.35)",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 16px",
  }),

  input: (base) => ({
    ...base,
    color: "#fff",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#fff",
    fontSize: "14px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#71717a",
    fontSize: "14px",
  }),

menu: (base) => ({
  ...base,
  backgroundColor: "#09090b",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,.45)",
  zIndex: 9999,
}),

menuList: (base) => ({
  ...base,
  backgroundColor: "#09090b",
  padding: "6px",
}),

option: (base, state) => ({
  ...base,
  backgroundColor: state.isSelected
    ? "rgba(6,182,212,.18)"
    : state.isFocused
    ? "rgba(255,255,255,.06)"
    : "#09090b",
  color: "#ffffff",
  borderRadius: "8px",
  padding: "10px 14px",
  cursor: "pointer",
}),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#9ca3af",
    "&:hover": {
      color: "#06b6d4",
    },
  }),

  clearIndicator: (base) => ({
    ...base,
    color: "#9ca3af",
    "&:hover": {
      color: "#ef4444",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
}}
/>
      </div>

      {/* Location */}

      <div>

        <label className="mb-2 flex items-center gap-2 text-xs
sm:text-sm font-medium text-zinc-300">

          <MapPin className="h-4 w-4 text-cyan-400" />

          Preferred Location

        </label>

   <Select
  options={locationOptions}
  placeholder="Search location..."
  isSearchable
  isClearable
  menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
  menuPosition="fixed"
  value={
    locationOptions.find((option) => option.value === location) || null
  }
  onChange={(selected) => {
  console.log(selected);
  setLocation(selected ? selected.value : "");
}}
styles={{
  control: (base, state) => ({
    ...base,
    minHeight: "56px",
    backgroundColor: "rgba(255,255,255,0.03)",
    border: state.isFocused
      ? "1px solid rgba(6,182,212,.45)"
      : "1px solid rgba(255,255,255,.10)",
    borderRadius: "12px",
    boxShadow: state.isFocused
      ? "0 0 0 3px rgba(6,182,212,.15)"
      : "none",
    transition: "all .2s ease",
    "&:hover": {
      border: "1px solid rgba(6,182,212,.35)",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 16px",
  }),

  input: (base) => ({
    ...base,
    color: "#fff",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#fff",
    fontSize: "14px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#71717a",
    fontSize: "14px",
  }),

menu: (base) => ({
  ...base,
  backgroundColor: "#09090b",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,.45)",
  zIndex: 9999,
}),

menuList: (base) => ({
  ...base,
  backgroundColor: "#09090b",
  padding: "6px",
}),

option: (base, state) => ({
  ...base,
  backgroundColor: state.isSelected
    ? "rgba(6,182,212,.18)"
    : state.isFocused
    ? "rgba(255,255,255,.06)"
    : "#09090b",
  color: "#ffffff",
  borderRadius: "8px",
  padding: "10px 14px",
  cursor: "pointer",
}),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#9ca3af",
    "&:hover": {
      color: "#06b6d4",
    },
  }),

  clearIndicator: (base) => ({
    ...base,
    color: "#9ca3af",
    "&:hover": {
      color: "#ef4444",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
}}
/>

      </div>

      {/* Launch Button */}

      <button
        onClick={startAgent}
        disabled={loading}
        className="
          h-12
sm:h-14
          w-full
lg:w-auto
px-8
          rounded-xl
          border
          border-white/10
          bg-slate-900/70
          text-white
          font-semibold
          transition-all
          duration-300
          md:hover:-translate-y-1
          hover:border-cyan-500/40
          hover:bg-slate-800
          hover:shadow-[0_0_18px_rgba(6,182,212,.15)]
          active:scale-95
          disabled:opacity-60
        "
      >

      <span className="flex items-center justify-center gap-2">
  {loading && (
    <Loader2 className="h-5 w-5 animate-spin" />
  )}

  {loading ? "Searching Jobs..." : "Launch AI Agent"}
</span>

      </button>

    </div>

    {/* Divider */}

    <div className="my-8 border-t border-white/10" />

   

  </div>

</div>
      </main>
  
  );
}

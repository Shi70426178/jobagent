"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";

import {
  Search,
  RefreshCw,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  BriefcaseBusiness,
  Mail,
  Sparkles,
  BadgeCheck,
  Cpu,
} from "lucide-react";

interface WalkInJob {
  id: number;

  company: string;
  job_title: string;

  location: string;
  venue: string;

  experience: string;

  walkin_date: string;
  walkin_time: string;

  positions: string[] | string;

  skills: string[] | string;

  contact_email: string;
}

export default function WalkInsPage() {
  const [jobs, setJobs] = useState<WalkInJob[]>([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);

      const response = await api.get("/walkin/jobs");

      setJobs(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function refreshJobs() {
    setRefreshing(true);
    await fetchJobs();
  }

  const filteredJobs = useMemo(() => {
    const keyword = search.toLowerCase();

    return jobs.filter((job) => {
      return (
        (job.company || "")
          .toLowerCase()
          .includes(keyword) ||

        (job.job_title || "")
          .toLowerCase()
          .includes(keyword) ||

        (job.location || "")
          .toLowerCase()
          .includes(keyword) ||

        (job.venue || "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [jobs, search]);

  const totalCompanies = useMemo(() => {
    return new Set(
      jobs.map((x) => x.company)
    ).size;
  }, [jobs]);

  const totalPositions = useMemo(() => {
    let total = 0;

    jobs.forEach((job) => {
      if (Array.isArray(job.positions))
        total += job.positions.length;

      else if (job.positions)
        total += String(job.positions)
          .split(",")
          .filter(Boolean).length;
    });

    return total;
  }, [jobs]);

 return (
  <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">

  {/* Background Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050816] to-black" />

  {/* Main Glow */}
  <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/5 blur-[180px]" />

  <div className="relative z-10">

    <div className="mx-auto w-full max-w-[1450px] px-3 py-4 sm:px-5 lg:px-6">

  {/* ================= HEADER ================= */}

  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">

        <Sparkles size={13} className="text-white" />

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
          AI Curated Walk-ins
        </span>

      </div>

      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
        Walk-In Jobs
      </h1>

      <p className="mt-2 max-w-2xl text-xs text-zinc-500 sm:text-sm">
        Discover verified walk-in interviews collected automatically from
        LinkedIn and presented in one clean dashboard.
      </p>

    </div>

    <button
      onClick={refreshJobs}
      disabled={refreshing}
      className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      border
      border-white/15
      bg-gradient-to-b
      from-zinc-900
      via-zinc-950
      to-black
      px-5
      py-3
      text-sm
      font-semibold
      text-white
      shadow-[0_0_25px_rgba(255,255,255,.08)]
      transition-all
      duration-300
      hover:border-white/30
      hover:shadow-[0_0_35px_rgba(255,255,255,.16)]
      disabled:opacity-60
      "
    >

      <RefreshCw
        size={16}
        className={refreshing ? "animate-spin" : ""}
      />

      {refreshing ? "Refreshing..." : "Refresh"}

    </button>

  </div>

  {/* ================= SEARCH ================= */}

  <div className="mt-7">

    <div className="relative max-w-xl">

      <Search
        size={17}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search company, job title or location..."
        className="
        h-12
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
backdrop-blur-2xl
border-white/10
        pl-11
        pr-4
        text-sm
        text-white
        outline-none
        transition-all
        placeholder:text-zinc-600
        focus:border-white/25
        focus:shadow-[0_0_20px_rgba(255,255,255,.08)]
        "
      />

    </div>

  </div>

  {/* ================= STATS ================= */}

  <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">

    {/* Jobs */}

    <div className="rounded-2xl border border-white/10 bg-white/[0.03]
backdrop-blur-2xl
border-white/10 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[11px] uppercase tracking-widest text-zinc-500">
            Jobs
          </p>

          <h2 className="mt-2 text-3xl font-black">
            {filteredJobs.length}
          </h2>

        </div>

        <div className="rounded-xl border border-white/10 bg-black p-3">

          <BriefcaseBusiness size={20} />

        </div>

      </div>

    </div>

    {/* Companies */}

    <div className="rounded-2xl border border-white/10 bg-white/[0.03]
backdrop-blur-2xl
border-white/10 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[11px] uppercase tracking-widest text-zinc-500">
            Companies
          </p>

          <h2 className="mt-2 text-3xl font-black">
            {totalCompanies}
          </h2>

        </div>

        <div className="rounded-xl border border-white/10 bg-black p-3">

          <Building2 size={20} />

        </div>

      </div>

    </div>

    {/* Positions */}

    <div className="rounded-2xl border border-white/10 bg-white/[0.03]
backdrop-blur-2xl
border-white/10 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[11px] uppercase tracking-widest text-zinc-500">
            Positions
          </p>

          <h2 className="mt-2 text-3xl font-black">
            {totalPositions}
          </h2>

        </div>

        <div className="rounded-xl border border-white/10 bg-black p-3">

          <BadgeCheck size={20} />

        </div>

      </div>

    </div>

    {/* Live */}

    <div className="rounded-2xl border border-white/10 bg-white/[0.03]
backdrop-blur-2xl
border-white/10 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[11px] uppercase tracking-widest text-zinc-500">
            Status
          </p>

          <h2 className="mt-2 text-xl font-bold text-emerald-400">
            Live
          </h2>

        </div>

        <div className="rounded-xl border border-white/10 bg-black p-3">

          <Cpu size={20} className="text-emerald-400" />

        </div>

      </div>

    </div>

  </div>

  {/* ================= JOB LIST ================= */}

  <div className="mt-8 space-y-4">
    {filteredJobs.map((job) => (

  <div
    key={job.id}
    className="
    group
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-gradient-to-b
    from-[#111111]
    via-[#0d0d0d]
    to-black
    shadow-[0_0_20px_rgba(255,255,255,.03)]
    transition-all
    duration-300
    hover:border-white/20
    hover:shadow-[0_0_35px_rgba(255,255,255,.08)]
    "
  >

    <div className="p-5">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">

        <div className="flex gap-4 flex-1">

          <div
            className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/5
            "
          >

            <Building2
              size={24}
              className="text-white"
            />

          </div>

          <div className="min-w-0 flex-1">

            <h2
              className="
              truncate
              text-xl
              font-bold
              tracking-tight
              text-white
              "
            >
              {job.job_title || "Walk-In Drive"}
            </h2>

            <div className="mt-2 flex items-center gap-2">

              <Building2
                size={14}
                className="text-zinc-400"
              />

              <span className="truncate text-sm text-zinc-300">

                {job.company}

              </span>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              <span
                className="
                rounded-full
                border
                border-emerald-500/30
                bg-emerald-500/10
                px-3
                py-1
                text-[11px]
                font-semibold
                text-emerald-400
                "
              >
                Walk-In
              </span>

              <span
                className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-3
                py-1
                text-[11px]
                text-zinc-300
                "
              >
                Verified
              </span>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div
          className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-black
          px-5
          py-4
          "
        >

          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/5
            "
          >

            <Sparkles
              size={18}
              className="text-white"
            />

          </div>

          <div>

            <p className="text-[10px] uppercase tracking-widest text-zinc-500">

              AI Status

            </p>

            <h3 className="mt-1 text-sm font-semibold text-white">

              Recommended

            </h3>

          </div>

        </div>

      </div>

      {/* Divider */}

      <div className="my-6 border-t border-white/10"></div>

      {/* ================= INFO GRID START ================= */}

      <div
        className="
        grid
        gap-3
        sm:grid-cols-2
        xl:grid-cols-5
        "
      >
                {/* Walk-In Date */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">

          <div className="flex items-center gap-2">

            <CalendarDays size={16} className="text-white" />

            <span className="text-[11px] uppercase tracking-widest text-zinc-500">
              Date
            </span>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-white">

            {job.walkin_date || "Not Mentioned"}

          </p>

        </div>

        {/* Walk-In Time */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">

          <div className="flex items-center gap-2">

            <Clock3 size={16} className="text-white" />

            <span className="text-[11px] uppercase tracking-widest text-zinc-500">
              Time
            </span>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-white">

            {job.walkin_time || "Not Mentioned"}

          </p>

        </div>

        {/* Location */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">

          <div className="flex items-center gap-2">

            <MapPin size={16} className="text-white" />

            <span className="text-[11px] uppercase tracking-widest text-zinc-500">
              Location
            </span>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-white break-words">

            {job.location || "Not Mentioned"}

          </p>

        </div>

        {/* Venue */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">

          <div className="flex items-center gap-2">

            <Building2 size={16} className="text-white" />

            <span className="text-[11px] uppercase tracking-widest text-zinc-500">
              Venue
            </span>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-white break-words">

            {job.venue || "Not Mentioned"}

          </p>

        </div>

        {/* Experience */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">

          <div className="flex items-center gap-2">

            <BriefcaseBusiness size={16} className="text-white" />

            <span className="text-[11px] uppercase tracking-widest text-zinc-500">
              Experience
            </span>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-white">

            {job.experience || "Not Mentioned"}

          </p>

        </div>

      </div>

      {/* ================= OPEN POSITIONS ================= */}
            {job.positions &&
        (Array.isArray(job.positions)
          ? job.positions.length > 0
          : String(job.positions).trim() !== "") && (

        <div className="mt-6">

          <div className="mb-3 flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">

              <BriefcaseBusiness size={15} className="text-white" />

            </div>

            <div>

              <h3 className="text-sm font-semibold text-white">
                Open Positions
              </h3>

              <p className="text-[11px] text-zinc-500">
                Available hiring roles
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {(Array.isArray(job.positions)
              ? job.positions
              : String(job.positions).split(",")
            ).map((position: string, index: number) => (

              <span
                key={index}
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-1.5
                text-xs
                font-medium
                text-zinc-200
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-white/[0.08]
                "
              >

                <BadgeCheck
                  size={13}
                  className="text-white"
                />

                {position.trim()}

              </span>

            ))}

          </div>

        </div>

      )}

      {/* ================= REQUIRED SKILLS ================= */}

      {job.skills &&
        (Array.isArray(job.skills)
          ? job.skills.length > 0
          : String(job.skills).trim() !== "") && (

        <div className="mt-6">

          <div className="mb-3 flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">

              <Cpu size={15} className="text-white" />

            </div>

            <div>

              <h3 className="text-sm font-semibold text-white">
                Required Skills
              </h3>

              <p className="text-[11px] text-zinc-500">
                Skills mentioned by recruiter
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {(Array.isArray(job.skills)
              ? job.skills
              : String(job.skills).split(",")
            ).map((skill: string, index: number) => (

              <span
                key={index}
                className="
                inline-flex
                items-center
                rounded-full
                border
                border-white/10
                bg-black
                px-3
                py-1.5
                text-xs
                font-medium
                text-white
                shadow-[0_0_10px_rgba(255,255,255,.05)]
                transition-all
                duration-300
                hover:border-white/25
                hover:shadow-[0_0_15px_rgba(255,255,255,.10)]
                "
              >

                {skill.trim()}

              </span>

            ))}

          </div>

        </div>

      )}

      {/* ================= CONTACT EMAIL ================= */}
            {job.contact_email && (

        <div className="mt-6 border-t border-white/10 pt-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}

            <div>

              <div className="flex items-center gap-2">

                <div
                  className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  "
                >

                  <Mail
                    size={16}
                    className="text-white"
                  />

                </div>

                <div>

                  <h3 className="text-sm font-semibold text-white">

                    Recruiter Contact

                  </h3>

                  <p className="text-[11px] text-zinc-500">

                    Contact email provided by recruiter

                  </p>

                </div>

              </div>

            </div>

            {/* Right */}

            <a
              href={`mailto:${job.contact_email}`}
              className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/15
              bg-gradient-to-b
              from-zinc-900
              via-zinc-950
              to-black
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-[0_0_20px_rgba(255,255,255,.06)]
              transition-all
              duration-300
              hover:border-white/30
              hover:shadow-[0_0_30px_rgba(255,255,255,.15)]
            "
            >

              <Mail size={16} />

              <span className="truncate max-w-[250px]">

                {job.contact_email}

              </span>

            </a>

          </div>

        </div>

      )}

    </div>

  </div>

))}

{/* ================= EMPTY STATE STARTS ================= */}
      {filteredJobs.length === 0 && !loading && (

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-b
          from-[#111111]
          via-[#0d0d0d]
          to-black
          px-6
          py-20
          text-center
          shadow-[0_0_30px_rgba(255,255,255,.03)]
          "
        >

          <div
            className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            shadow-[0_0_25px_rgba(255,255,255,.05)]
            "
          >

            <Search
              size={34}
              className="text-white"
            />

          </div>

          <h2 className="mt-7 text-3xl font-black tracking-tight">

            No Walk-In Jobs Found

          </h2>

          <p
            className="
            mx-auto
            mt-4
            max-w-xl
            text-sm
            leading-7
            text-zinc-500
            "
          >

            We couldn't find any walk-in jobs matching your search.
            Try searching using another company name,
            designation or location.

          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <button
              onClick={() => setSearch("")}
              className="
              rounded-xl
              border
              border-white/15
              bg-gradient-to-b
              from-zinc-900
              via-zinc-950
              to-black
              px-6
              py-3
              text-sm
              font-semibold
              shadow-[0_0_20px_rgba(255,255,255,.08)]
              transition-all
              duration-300
              hover:border-white/30
              hover:shadow-[0_0_35px_rgba(255,255,255,.15)]
              "
            >

              Clear Search

            </button>

            <button
              onClick={refreshJobs}
              className="
              rounded-xl
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-[1.03]
              "
            >

              Refresh Jobs

            </button>

          </div>

        </div>

      )}

      {/* ================= LOADING STARTS ================= */}
            {loading && (

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-b
          from-[#111111]
          via-[#0d0d0d]
          to-black
          px-6
          py-24
          "
        >

          <div className="flex flex-col items-center">

            {/* Animated Loader */}

            <div className="relative h-24 w-24">

              <div
                className="
                absolute
                inset-0
                rounded-full
                border-2
                border-white/10
                "
              />

              <div
                className="
                absolute
                inset-0
                rounded-full
                border-t-2
                border-white
                animate-spin
                "
              />

              <div
                className="
                absolute
                inset-4
                rounded-full
                border
                border-white/10
                "
              />

              <div
                className="
                absolute
                inset-4
                rounded-full
                border-t-2
                border-zinc-400
                animate-spin
                "
                style={{
                  animationDuration: "1.8s",
                }}
              />

              <div
                className="
                absolute
                inset-8
                flex
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                "
              >

                <Building2 size={22} />

              </div>

            </div>

            <h2 className="mt-8 text-2xl font-black">

              Fetching Walk-In Jobs

            </h2>

            <p className="mt-3 max-w-md text-center text-sm leading-7 text-zinc-500">

              Please wait while we collect the latest
              walk-in interviews from different companies.

            </p>

            {/* Skeleton Cards */}

            <div className="mt-12 grid w-full gap-4">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="
                  animate-pulse
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  "
                >

                  <div className="h-6 w-2/5 rounded bg-white/10" />

                  <div className="mt-4 h-4 w-1/3 rounded bg-white/10" />

                  <div className="mt-6 grid gap-3 md:grid-cols-5">

                    {[1,2,3,4,5].map((x)=>(

                      <div
                        key={x}
                        className="h-20 rounded-xl bg-white/10"
                      />

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>

  </div>

  {/* ================= FOOTER STARTS ================= */}
    {/* ================= FOOTER STARTS ================= */}

  <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-[#101010] via-[#0c0c0c] to-black px-6 py-5">

    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div className="flex flex-wrap items-center gap-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">

            <Building2 size={20} />

          </div>

          <div>

            <p className="text-[11px] uppercase tracking-widest text-zinc-500">
              Total Jobs
            </p>

            <h3 className="text-lg font-bold">
              {filteredJobs.length}
            </h3>

          </div>

        </div>

        <div className="h-10 w-px bg-white/10 hidden lg:block" />

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">

            <BadgeCheck
              size={20}
              className="text-emerald-400"
            />

          </div>

          <div>

            <p className="text-[11px] uppercase tracking-widest text-zinc-500">
              Status
            </p>

            <h3 className="font-semibold text-emerald-400">
              Live Collection
            </h3>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-3">

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">

          <span className="text-xs font-medium text-zinc-300">

            AI Curated

          </span>

        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">

          <span className="text-xs font-medium text-zinc-300">

            Updated Live

          </span>

        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">

          <span className="text-xs font-medium text-zinc-300">

            Responsive UI

          </span>

        </div>

      </div>

    </div>

</div>
</div>
</div>

);
}

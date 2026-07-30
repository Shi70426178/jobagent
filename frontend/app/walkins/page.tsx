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
  Users,
  Flame,
  CheckCircle2,
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
        (job.company || "").toLowerCase().includes(keyword) ||
        (job.job_title || "").toLowerCase().includes(keyword) ||
        (job.location || "").toLowerCase().includes(keyword) ||
        (job.venue || "").toLowerCase().includes(keyword)
      );
    });
  }, [jobs, search]);

  const totalCompanies = useMemo(() => {
    return new Set(jobs.map((x) => x.company)).size;
  }, [jobs]);

  const totalPositions = useMemo(() => {
    let total = 0;

    jobs.forEach((job) => {
      if (Array.isArray(job.positions))
        total += job.positions.length;
      else if (job.positions)
        total += String(job.positions).split(",").filter(Boolean).length;
    });

    return total;
  }, [jobs]);

  return (
    <div className="min-h-screen bg-[#09090B] text-white">

      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-6 py-5">

        {/* ================================================= */}

        {/* Header */}

        {/* ================================================= */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1">

              <Sparkles
                size={13}
                className="text-violet-400"
              />

              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-300">

                AI Curated Walk-ins

              </span>

            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">

              Walk-In Jobs

            </h1>

            <p className="mt-2 max-w-2xl text-sm text-zinc-500">

              Discover verified walk-in opportunities collected from multiple
              platforms in one premium dashboard.

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
              bg-violet-600
              px-5
              py-3
              text-sm
              font-semibold
              transition
              hover:bg-violet-500
              disabled:opacity-60
            "
          >

            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh Jobs"}

          </button>

        </div>

        {/* ================================================= */}

        {/* Search */}

        {/* ================================================= */}

        <div className="mt-7">

          <div className="relative max-w-md">

            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, title or location..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-white/10
                bg-zinc-900
                pl-11
                pr-4
                text-sm
                outline-none
                transition
                placeholder:text-zinc-500
                focus:border-violet-500
              "
            />

          </div>

        </div>

        {/* ================================================= */}

        {/* Stats */}

        {/* ================================================= */}

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          {/* Jobs */}

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] uppercase tracking-wider text-zinc-500">

                  Walk-ins

                </p>

                <h2 className="mt-1 text-2xl font-bold">

                  {filteredJobs.length}

                </h2>

              </div>

              <div className="rounded-lg bg-violet-500/10 p-3">

                <BriefcaseBusiness
                  size={20}
                  className="text-violet-400"
                />

              </div>

            </div>

          </div>

          {/* Companies */}

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] uppercase tracking-wider text-zinc-500">

                  Companies

                </p>

                <h2 className="mt-1 text-2xl font-bold">

                  {totalCompanies}

                </h2>

              </div>

              <div className="rounded-lg bg-cyan-500/10 p-3">

                <Building2
                  size={20}
                  className="text-cyan-400"
                />

              </div>

            </div>

          </div>

          {/* Positions */}

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] uppercase tracking-wider text-zinc-500">

                  Positions

                </p>

                <h2 className="mt-1 text-2xl font-bold">

                  {totalPositions}

                </h2>

              </div>

              <div className="rounded-lg bg-orange-500/10 p-3">

                <Users
                  size={20}
                  className="text-orange-400"
                />

              </div>

            </div>

          </div>

          {/* Live */}

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] uppercase tracking-wider text-zinc-500">

                  Status

                </p>

                <h2 className="mt-1 text-xl font-bold text-emerald-400">

                  Live

                </h2>

              </div>

              <div className="rounded-lg bg-emerald-500/10 p-3">

                <Flame
                  size={20}
                  className="text-emerald-400"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}

        {/* JOB LIST STARTS HERE */}

        {/* ================================================= */}

        <div className="mt-7 space-y-5">

          {filteredJobs.map((job) => (


            <div
              key={job.id}
 className="
group
overflow-hidden
rounded-3xl

border
border-white/40
md:border-white/20

bg-gradient-to-b
from-[#111111]
via-[#0d0d0d]
to-black

shadow-[0_0_0_1px_rgba(255,255,255,.10),0_0_24px_rgba(255,255,255,.10)]
md:shadow-[0_0_0_1px_rgba(255,255,255,.04),0_0_18px_rgba(255,255,255,.04)]

transition-all
duration-300

hover:border-white/50
hover:shadow-[0_0_40px_rgba(255,255,255,.12)]
"
            >

              <div className="p-5 lg:p-7">

                {/* ================================================= */}

                {/* HEADER */}

                {/* ================================================= */}

               <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

  {/* Left */}
  <div className="flex flex-1 gap-4 min-w-0">

    {/* Company Icon */}
    <div
      className="
        flex
        h-16
        w-16
        shrink-0
        items-center
        justify-center
        rounded-2xl
        border
        border-violet-500/20
        bg-violet-500/10
      "
    >
      <Building2
        size={28}
        className="text-violet-400"
      />
    </div>

    {/* Details */}
    <div className="min-w-0 flex-1">

      <h2 className="text-xl sm:text-2xl font-bold leading-tight text-white">
        {job.job_title || "Walk-In Drive"}
      </h2>

      <div className="mt-2 flex items-center gap-2 text-zinc-400">
        <Building2 size={15} />
        <span className="truncate">
          {job.company}
        </span>
      </div>

      {/* Mobile Badges */}
      <div className="mt-4 flex flex-wrap gap-2 lg:hidden">

        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-emerald-500/30
            bg-emerald-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-emerald-400
          "
        >
          <CheckCircle2 size={14} />
          Walk-In
        </span>

        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-sky-500/30
            bg-sky-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-sky-400
          "
        >
          <BadgeCheck size={14} />
          Verified
        </span>

      </div>

    </div>

  </div>

  {/* Desktop Badges */}
  <div className="hidden lg:flex items-center gap-2 shrink-0">

    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-emerald-500/30
        bg-emerald-500/10
        px-3
        py-1.5
        text-xs
        font-semibold
        text-emerald-400
      "
    >
      <CheckCircle2 size={14} />
      Walk-In
    </span>

    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-sky-500/30
        bg-sky-500/10
        px-3
        py-1.5
        text-xs
        font-semibold
        text-sky-400
      "
    >
      <BadgeCheck size={14} />
      Verified
    </span>

  </div>

</div>

                {/* Divider */}

                <div className="relative my-7">

                  <div className="border-t border-white/10" />

                  <div
                    className="
absolute
top-0
left-0
h-px
w-28
bg-gradient-to-r
from-violet-500
to-transparent
"
                  />

                </div>

                {/* ================================================= */}

                {/* INFO GRID */}

                {/* ================================================= */}

                <div
                  className="
grid
grid-cols-2
lg:grid-cols-5
gap-3
"
                >

                  {/* Date */}

                  <div
                    className="
rounded-2xl
border
border-white/10
bg-zinc-900/60
p-4
hover:border-orange-500/30
transition
"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-orange-500/10
"
                      >

                        <CalendarDays
                          size={18}
                          className="text-orange-400"
                        />

                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">

                          Date

                        </p>

                        <p className="mt-1 text-sm font-semibold">

                          {job.walkin_date || "N/A"}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Time */}

                  <div
                    className="
rounded-2xl
border
border-white/10
bg-zinc-900/60
p-4
hover:border-cyan-500/30
transition
"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-cyan-500/10
"
                      >

                        <Clock3
                          size={18}
                          className="text-cyan-400"
                        />

                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">

                          Time

                        </p>

                        <p className="mt-1 text-sm font-semibold">

                          {job.walkin_time || "N/A"}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Location */}

                  <div
                    className="
rounded-2xl
border
border-white/10
bg-zinc-900/60
p-4
hover:border-red-500/30
transition
"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-red-500/10
"
                      >

                        <MapPin
                          size={18}
                          className="text-red-400"
                        />

                      </div>

                      <div className="min-w-0">

                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">

                          Location

                        </p>

     <p
  className="
    mt-1
    text-sm
    font-semibold
    leading-5
    whitespace-normal
    break-words
  "
>
  {job.location || "N/A"}
</p>
                      </div>

                    </div>

                  </div>

                  {/* Venue */}

                  <div
                    className="
rounded-2xl
border
border-white/10
bg-zinc-900/60
p-4
hover:border-violet-500/30
transition
"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-violet-500/10
"
                      >

                        <Building2
                          size={18}
                          className="text-violet-400"
                        />

                      </div>

                      <div className="min-w-0">

                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">

                          Venue

                        </p>

                      <p
  className="
    mt-1
    text-sm
    font-semibold
    leading-5
    whitespace-normal
    break-words
  "
>
  {job.venue || "N/A"}
</p>

                      </div>

                    </div>

                  </div>

                  {/* Experience */}

                  <div
                    className="
rounded-2xl
border
border-white/10
bg-zinc-900/60
p-4
hover:border-emerald-500/30
transition
"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-emerald-500/10
"
                      >

                        <BriefcaseBusiness
                          size={18}
                          className="text-emerald-400"
                        />

                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">

                          Experience

                        </p>

                        <p className="mt-1 text-sm font-semibold">

                          {job.experience || "N/A"}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>
                {/* ========================================================= */}

                {/* OPEN POSITIONS */}

                {/* ========================================================= */}

                {job.positions &&
                  (Array.isArray(job.positions)
                    ? job.positions.length > 0
                    : String(job.positions).trim() !== "") && (

                    <div className="mt-8">

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

                        {/* Left */}

                        <div className="flex items-center gap-4 shrink-0 lg:w-72">

                          <div
                            className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-violet-500/10
border
border-violet-500/20
"
                          >

                            <BriefcaseBusiness
                              size={22}
                              className="text-violet-400"
                            />

                          </div>

                          <div>

                            <h3 className="text-lg font-bold">

                              Open Positions

                            </h3>

                            <p className="text-sm text-zinc-500">

                              Hiring Roles Available

                            </p>

                          </div>

                        </div>

                        {/* Right */}

                        <div className="flex flex-wrap gap-3 flex-1">

                          {(Array.isArray(job.positions)
                            ? job.positions
                            : String(job.positions).split(","))

                            .filter((x) => x.trim())

                            .map((position: string, index: number) => (

                              <span
                                key={index}
                                className="
inline-flex
items-center
gap-2

rounded-full

border
border-violet-500/20

bg-gradient-to-r
from-violet-500/10
to-cyan-500/10

px-4
py-2

text-sm
font-medium

text-white

transition-all
duration-300

hover:border-violet-400
hover:scale-105
hover:shadow-[0_0_20px_rgba(139,92,246,.18)]
"
                              >

                                <BriefcaseBusiness
                                  size={15}
                                  className="text-violet-300"
                                />

                                {position.trim()}

                              </span>

                            ))}

                        </div>

                      </div>

                    </div>

                  )}

                {/* Divider */}

                <div className="relative my-8">

                  <div className="border-t border-white/10" />

                  <div
                    className="
absolute
top-0
left-0
h-px
w-24
bg-gradient-to-r
from-cyan-500
to-transparent
"
                  />

                </div>

                {/* ========================================================= */}

                {/* REQUIRED SKILLS */}

                {/* ========================================================= */}

                {job.skills &&
                  (Array.isArray(job.skills)
                    ? job.skills.length > 0
                    : String(job.skills).trim() !== "") && (

                    <div>

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

                        {/* Left */}

                        <div className="flex items-center gap-4 shrink-0 lg:w-72">

                          <div
                            className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl

bg-yellow-500/10

border
border-yellow-500/20
"
                          >

                            <Cpu
                              size={22}
                              className="text-yellow-400"
                            />

                          </div>

                          <div>

                            <h3 className="text-lg font-bold">

                              Required Skills

                            </h3>

                            <p className="text-sm text-zinc-500">

                              Technologies & Expertise

                            </p>

                          </div>

                        </div>

                        {/* Right */}

                        <div className="flex flex-wrap gap-3 flex-1">

                          {(Array.isArray(job.skills)
                            ? job.skills
                            : String(job.skills).split(","))

                            .filter((x) => x.trim())

                            .map((skill: string, index: number) => (

                              <span
                                key={index}
                                className="
inline-flex
items-center
gap-2

rounded-full

border
border-yellow-500/20

bg-gradient-to-r
from-yellow-500/10
to-orange-500/10

px-4
py-2

text-sm

font-medium

transition-all
duration-300

hover:border-yellow-400
hover:scale-105
hover:shadow-[0_0_20px_rgba(234,179,8,.18)]
"
                              >

                                <Sparkles
                                  size={13}
                                  className="text-yellow-400"
                                />

                                {skill.trim()}

                              </span>

                            ))}

                        </div>

                      </div>

                    </div>

                  )}

                {/* Divider */}

                <div className="relative my-8">

                  <div className="border-t border-white/10" />

                  <div
                    className="
absolute
top-0
left-0
h-px
w-24
bg-gradient-to-r
from-emerald-500
to-transparent
"
                  />

                </div>

                {/* ========================================================= */}

                {/* CONTACT */}

                {/* ========================================================= */}

                {job.contact_email && (

                  <div
                    className="
flex
flex-col

gap-5

lg:flex-row
lg:items-center
lg:justify-between

rounded-2xl

border
border-white/10

bg-zinc-900/40

p-5
"
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className="
flex

h-12
w-12

items-center
justify-center

rounded-2xl

bg-cyan-500/10

border
border-cyan-500/20
"
                      >

                        <Mail
                          size={22}
                          className="text-cyan-400"
                        />

                      </div>

                      <div>

                        <h3 className="text-lg font-bold">

                          Recruiter Contact

                        </h3>

                        <p className="text-sm text-zinc-500">

                          Direct recruiter email

                        </p>

                        <div className="mt-2 text-sm text-white break-all">

                          {job.contact_email}

                        </div>

                      </div>

                    </div>

                    <a
                      href={`mailto:${job.contact_email}`}
                      className="
inline-flex

items-center

justify-center

gap-2

rounded-xl

bg-white

px-6
py-3

font-semibold

text-black

transition-all

hover:scale-[1.03]

hover:bg-zinc-200
"
                    >

                      <Mail size={17} />

                      Send Email

                    </a>

                  </div>

                )}

              </div>

            </div>

          ))}
          {/* ================================================= */}

          {/* EMPTY STATE */}

          {/* ================================================= */}

          {filteredJobs.length === 0 && !loading && (

            <div
              className="
rounded-3xl
border
border-white/10

bg-gradient-to-b
from-[#121212]
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
h-24
w-24

items-center
justify-center

rounded-3xl

bg-violet-500/10

border
border-violet-500/20
"
              >

                <Search
                  size={38}
                  className="text-violet-400"
                />

              </div>

              <h2
                className="
mt-8
text-3xl
font-black
tracking-tight
"
              >

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

                We couldn't find any walk-in opportunities matching your search.
                Try another company name, designation or location.

              </p>

              <div
                className="
mt-8

flex
flex-wrap

justify-center

gap-3
"
              >

                <button
                  onClick={() => setSearch("")}
                  className="
rounded-xl

border
border-white/10

bg-zinc-900

px-6
py-3

font-medium

transition

hover:border-violet-500
hover:bg-zinc-800
"
                >

                  Clear Search

                </button>

                <button
                  onClick={refreshJobs}
                  className="
rounded-xl

bg-violet-600

px-6
py-3

font-semibold

transition

hover:bg-violet-500
"
                >

                  Refresh Jobs

                </button>

              </div>

            </div>

          )}

          {/* ================================================= */}

          {/* LOADING */}

          {/* ================================================= */}

          {loading && (

            <div
              className="
rounded-3xl

border
border-white/10

bg-zinc-900/40

p-10
"
            >

              <div className="flex flex-col items-center">

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
border-violet-500

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
border-cyan-500

animate-spin
"
                    style={{
                      animationDuration: "2s",
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

                <h2 className="mt-8 text-2xl font-bold">

                  Fetching Walk-In Jobs

                </h2>

                <p
                  className="
mt-3

max-w-md

text-center

text-sm

leading-7

text-zinc-500
"
                >

                  Please wait while we collect the latest walk-in opportunities.

                </p>

                <div
                  className="
mt-12

grid

w-full

gap-4
"
                >

                  {[1, 2, 3].map((item) => (

                    <div
                      key={item}
                      className="
animate-pulse

rounded-3xl

border
border-white/10

bg-zinc-900

p-6
"
                    >

                      <div className="h-7 w-56 rounded bg-white/10" />

                      <div className="mt-5 h-5 w-40 rounded bg-white/10" />

                      <div
                        className="
mt-8

grid

gap-3

md:grid-cols-5
"
                      >

                        {[1, 2, 3, 4, 5].map((x) => (

                          <div
                            key={x}
                            className="
h-24

rounded-2xl

bg-white/10
"
                          />

                        ))}

                      </div>

                      <div className="mt-8 flex gap-3 flex-wrap">

                        {[1, 2, 3, 4].map((x) => (

                          <div
                            key={x}
                            className="
h-10
w-40

rounded-full

bg-white/10
"
                          />

                        ))}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          )}

          {/* ================================================= */}

          {/* FOOTER */}

          {/* ================================================= */}

          <div
            className="
mt-10

rounded-3xl

border
border-white/10

bg-gradient-to-b
from-[#101010]
via-[#0c0c0c]
to-black

p-6
"
          >

            <div
              className="
flex

flex-col

gap-8

lg:flex-row
lg:justify-between
lg:items-center
"
            >

              <div className="flex flex-wrap gap-6">

                <div className="flex items-center gap-3">

                  <div
                    className="
flex

h-12
w-12

items-center
justify-center

rounded-xl

bg-violet-500/10
"
                  >

                    <BriefcaseBusiness
                      size={22}
                      className="text-violet-400"
                    />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-widest text-zinc-500">

                      Walk-In Jobs

                    </p>

                    <h3 className="text-lg font-bold">

                      {filteredJobs.length}

                    </h3>

                  </div>

                </div>

                <div className="hidden h-10 w-px bg-white/10 lg:block" />

                <div className="flex items-center gap-3">

                  <div
                    className="
flex

h-12
w-12

items-center
justify-center

rounded-xl

bg-emerald-500/10
"
                  >

                    <CheckCircle2
                      size={22}
                      className="text-emerald-400"
                    />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-widest text-zinc-500">

                      Status

                    </p>

                    <h3 className="font-semibold text-emerald-400">

                      Live Collection

                    </h3>

                  </div>

                </div>

              </div>

              <div className="flex flex-wrap gap-3">

                <span
                  className="
rounded-full

bg-violet-500/10

border
border-violet-500/20

px-4
py-2

text-xs

font-medium

text-violet-300
"
                >

                  AI Curated

                </span>

                <span
                  className="
rounded-full

bg-cyan-500/10

border
border-cyan-500/20

px-4
py-2

text-xs

font-medium

text-cyan-300
"
                >

                  Updated Live

                </span>

                <span
                  className="
rounded-full

bg-emerald-500/10

border
border-emerald-500/20

px-4
py-2

text-xs

font-medium

text-emerald-300
"
                >

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
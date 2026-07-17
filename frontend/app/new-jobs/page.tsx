"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Sparkles,
  Search,
  RefreshCw,
  Building2,
  Users,
  Mail,
  CheckCircle2,
} from "lucide-react";

export default function LinkedinPage() {
  const router = useRouter();
const [generatingId, setGeneratingId] = useState<number | null>(null);
const [applyingId, setApplyingId] = useState<number | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedEmail, setEditedEmail] = useState("");

  const [showSkills, setShowSkills] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await api.get("/linkedin/posts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

const generateMail = async (id: number) => {
  try {
    setGeneratingId(id);

    await api.post(`/linkedin/generate-email/${id}`);

    await loadPosts();

   Swal.fire({
  icon: "success",
  title: "Email Generated",
  text: "AI-generated email has been created successfully.",
  background: "#111827",
  color: "#F8FAFC",
  confirmButtonColor: "#06B6D4",
  timer: 1800,
  showConfirmButton: false,
});

  } catch (error: any) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Generation Failed",
      text:
        error?.response?.data?.message ||
        "Unable to generate the email.",
    });
  } finally {
    setGeneratingId(null);
  }
};

const applyLead = async (id: number) => {
  try {
    setApplyingId(id);

    const response = await api.post(`/linkedin/apply/${id}`);

    if (!response.data.gmail_connected) {
      await Swal.fire({
  icon: "warning",
  title: "Gmail Not Connected",
  text: response.data.message,
  background: "#111827",
  color: "#F8FAFC",
  confirmButtonText: "Connect Gmail",
  confirmButtonColor: "#06B6D4",
});

router.push("/gmail");

      router.push("/gmail");
      return;
    }

    await loadPosts();

    await Swal.fire({
  icon: "success",
  title: "Application Sent",
  html: `
    <div style="font-size:15px;line-height:1.7">
      Mail has been sent successfully to the recruiter.
      <br><br>
      <span style="color:#22C55E;font-weight:600">
        Please check your <b>Gmail Sent</b> folder.
      </span>
    </div>
  `,
  background: "#111827",
  color: "#F8FAFC",
  confirmButtonText: "OK",
  confirmButtonColor: "#06B6D4",
});

  } catch (error: any) {
    console.error(error);

    Swal.fire({
  icon: "error",
  title: "Application Failed",
  text:
    error?.response?.data?.message ||
    "Something went wrong while sending the application.",
  background: "#111827",
  color: "#F8FAFC",
  confirmButtonColor: "#EF4444",
});
  } finally {
    setApplyingId(null);
  }
};

  const getScoreColor = (score: number) => {
  if (score <= 20) return "border-red-500";
  if (score <= 60) return "border-yellow-500";
  return "border-emerald-500";
};
const highestMatch = useMemo(() => {
  return posts.length
    ? Math.max(...posts.map((p) => p.match_score || 0))
    : 0;
}, [posts]);
const filteredPosts = useMemo(() => {
  return posts.filter((post) => {
    const matches =
      post.company?.toLowerCase().includes(search.toLowerCase()) ||
      post.job_title?.toLowerCase().includes(search.toLowerCase()) ||
      post.recruiter_name?.toLowerCase().includes(search.toLowerCase());

    if (filter === "applied")
      return matches && post.status === "applied";

    if (filter === "high")
      return matches && (post.match_score || 0) === highestMatch;

    return matches;
  });
}, [posts, search, filter, highestMatch]);



  return (
    <main className="min-h-screen bg-[#09090B] text-white">

<div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-6 py-4 sm:py-5">
        {/* Header */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

<h1 className="text-lg sm:text-xl lg:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">           
     Recruiter Leads
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-zinc-500">
              AI ranked recruiter opportunities.
            </p>

          </div>

          <button
            onClick={loadPosts}
            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-2.5
           text-xs sm:text-sm
            font-medium
            transition
            hover:bg-violet-500
            "
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

        {/* Search */}

        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full max-w-sm">

            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-zinc-900
              py-2.5
              pl-10
              pr-3
             text-xs sm:text-sm
              outline-none
              transition
              focus:border-violet-500
              "
            />

          </div>

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-smtransition ${
                filter === "all"
                  ? "bg-violet-600"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("high")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-smtransition ${
                filter === "high"
                  ? "bg-violet-600"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              High Match
            </button>

            <button
              onClick={() => setFilter("applied")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-smtransition ${
                filter === "applied"
                  ? "bg-violet-600"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              Applied
            </button>

          </div>

        </div>
                {/* ===================== */}
        {/* Statistics */}
        {/* ===================== */}

        <div className="mt-5 grid grid grid-cols-2 md:grid-cols-4 gap-3">

          {/* Total */}

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Total Leads
                </p>

                <h2 className="mt-1 text-xl sm:text-2xl font-bold">
                  {filteredPosts.length}
                </h2>

              </div>

              <div className="rounded-lg bg-violet-500/10 p-2">

                <Building2
                  size={20}
                  className="text-violet-400"
                />

              </div>

            </div>

          </div>

          {/* Emails */}

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Emails
                </p>

                <h2 className="mt-1 text-xl sm:text-2xl font-bold">
                  {
                    filteredPosts.filter(
                      (p) => p.email
                    ).length
                  }
                </h2>

              </div>

              <div className="rounded-lg bg-cyan-500/10 p-2">

                <Mail
                  size={20}
                  className="text-cyan-400"
                />

              </div>

            </div>

          </div>

          {/* Applied */}

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Applied
                </p>

                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-emerald-400">
                  {
                    filteredPosts.filter(
                      (p) =>
                        p.status === "applied"
                    ).length
                  }
                </h2>

              </div>

              <div className="rounded-lg bg-emerald-500/10 p-2">

                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />

              </div>

            </div>

          </div>

          {/* Match */}

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                  High Match
                </p>

              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-violet-400">
  {highestMatch}%
</h2>

              </div>

              <div className="rounded-lg bg-violet-500/10 p-2">

                <Users
                  size={20}
                  className="text-violet-400"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ===================== */}
        {/* Leads */}
        {/* ===================== */}

        <div className="mt-6 space-y-4">

          {filteredPosts.map((post) => (

            <div
              key={post.id}
              className="
              rounded-2xl
              border
              border-white/10
              bg-zinc-900/40
              backdrop-blur-xl
              transition
              hover:border-violet-500/40
              hover:bg-zinc-900/60
              "
            >

              <div className="p-5">

                {/* Header */}

                <div className="flex flex-col lg:flex-row gap-5">

                  {/* Left */}

                  <div className="flex gap-3 flex-1">

                    {/* Company Icon */}

                    <div className="
                    flex
                    h-12 w-12 sm:h-14 sm:w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-500/10
                    border
                    border-violet-500/20
                    ">

                      <Building2
                        size={22}
                        className="text-violet-400"
                      />

                    </div>

                    {/* Job */}

                    <div className="flex-1 min-w-0">

                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">

                        {post.job_title}

                      </h2>

                      <div className="mt-1 flex items-center gap-2 text-violet-300">

                        <Building2 size={15} />

                        <span className="truncate">

                          {post.company}

                        </span>

                      </div>

                      {/* Small Info */}


<div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-smtext-zinc-400">

    <span className="flex items-center gap-1">
        👤
        <span>{post.recruiter_name || "Unknown"}</span>
    </span>

    <span className="text-zinc-600">•</span>

    <span className="flex items-center gap-1">
        📍
        <span>{post.location || "N/A"}</span>
    </span>

    <span className="text-zinc-600">•</span>

    <span className="flex items-center gap-1">
        💼
        <span>{post.experience || "N/A"}</span>
    </span>

    <span className="text-zinc-600">•</span>

    <span className="flex items-center gap-1">
        🕒
        <span>{post.posted_time || "N/A"}</span>
    </span>

</div>

                      {/* Email */}

                      <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs sm:text-sm">

                        <Mail
                          size={15}
                          className="text-cyan-400"
                        />

                        <span className="truncate text-xs sm:text-smtext-zinc-300">

                          {post.email || "Email not found"}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Match Score */}

                  <div className="flex flex-row lg:flex-col items-center gap-3 lg:gap-2 self-start lg:self-auto">

                    <div
                      className={`
                      h-16 w-16 sm:h-20 sm:w-20
                      rounded-full
                      border-[6px]
                      flex
                      items-center
                      justify-center
                      ${getScoreColor(post.match_score || 0)}
                      `}
                    >

                      <div className="text-center">

<div className="text-lg sm:text-xl lg:text-2xl font-bold">

                          {post.match_score || 0}

                        </div>

                        <div className="text-[10px] text-zinc-400">

                          Match

                        </div>

                      </div>

                    </div>

                    <span className="
                    mt-2
                    rounded-full
                    bg-violet-500/10
                    px-3
                    py-1
                    text-[11px]
                    text-violet-300
                    ">

                      AI Match

                    </span>

                  </div>

                </div>

                {/* Divider */}

                <div className="my-4 border-t border-white/10"></div>
                                {/* ========================= */}
                {/* AI Analysis */}
                {/* ========================= */}

                <div className="rounded-xl border border-violet-500/20 bg-violet-500/5">

                  <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">

                      <Sparkles
                        size={18}
                        className="text-violet-300"
                      />

                    </div>

                    <div>

                      <h3 className="text-base font-semibold">

                        AI Insights

                      </h3>

                      <p className="text-xs text-zinc-500">

                        Match analysis

                      </p>

                    </div>

                  </div>

                  <div className="p-3 sm:p-4">

                    <p
                      className="
                     text-xs sm:text-sm
                      leading-6
                      text-zinc-300
                      line-clamp-4
                      "
                    >
                      {post.match_reason ||
                        "No AI analysis available."}
                    </p>

                  </div>

                </div>

                {/* ========================= */}
                {/* Generated Email */}
                {/* ========================= */}

                {post.generated_email && (

                  <div className="mt-4 rounded-xl border border-white/10">

                    <details>

                      <summary
                        className="
                        flex
                        cursor-pointer
                        items-center
                        justify-between
                        px-4
                        py-3
                        hover:bg-white/[0.03]
                        "
                      >

                        <div className="flex items-center gap-3">

                          <div className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-cyan-500/10
                          ">

                            <Mail
                              size={18}
                              className="text-cyan-400"
                            />

                          </div>

                          <div>

                            <h3 className="text-xs sm:text-smfont-semibold">

                              Generated Email

                            </h3>

                            <p className="text-xs text-zinc-500">

                              Click to preview

                            </p>

                          </div>

                        </div>

                        <span className="text-xs text-zinc-500">

                          Expand

                        </span>

                      </summary>

                      {editingId !== post.id ? (

                        <div className="border-t border-white/10 p-3 sm:p-4">

                          <pre
                            className="
                            whitespace-pre-wrap
                            break-words
                           text-xs sm:text-sm
                            leading-7
                            text-zinc-300
                            font-sans
                            "
                          >
                            {post.generated_email}
                          </pre>

                        </div>

                      ) : (

                        <div className="border-t border-white/10 p-4">

                          <textarea
                            value={editedEmail}
                            onChange={(e) =>
                              setEditedEmail(e.target.value)
                            }
                            className="
                            h-44 sm:h-56
                            w-full
                            rounded-lg
                            border
                            border-white/10
                            bg-zinc-900
                            p-3
                           text-xs sm:text-sm
                            outline-none
                            focus:border-violet-500
                            resize-none
                            "
                          />

                        </div>

                      )}

                    </details>

                  </div>

                )}
                                {/* ========================= */}
                {/* Footer */}
                {/* ========================= */}

<div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Status */}

                  <div className="flex items-center gap-3">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        post.status === "applied"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-yellow-500/15 text-yellow-400"
                      }`}
                    >
                      {post.status === "applied"
                        ? "Applied"
                        : "Pending"}
                    </span>

                    <span className="text-xs text-zinc-500">
                      Recruiter Status
                    </span>

                  </div>

                  {/* Buttons */}

                  <div className="flex flex-wrap justify-start lg:justify-end gap-2">

                    {/* Skills */}

                    <button
                      onClick={() => {
                        setSelectedSkills(post.skills || "");
                        setShowSkills(true);
                      }}
                      className="
                      rounded-lg
                      border
                      border-white/10
                      bg-zinc-800
                      px-3
                      py-2
                     text-xs sm:text-sm
                      transition
                      hover:bg-zinc-700
                      "
                    >
                      Skills
                    </button>

                    {/* Generate */}

                    {!post.generated_email && (

                      <button
    onClick={() => generateMail(post.id)}
    disabled={generatingId === post.id}
    className="
        rounded-lg
        bg-violet-600
        px-3
        py-2
       text-xs sm:text-sm
        transition
        hover:bg-violet-500
        disabled:opacity-60
        disabled:cursor-not-allowed
    "
>
    {generatingId === post.id ? (
        <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generating...
        </div>
    ) : (
        "Generate"
    )}
</button>

                    )}

                    {/* Save */}

                    {editingId === post.id && (

                      <button
                        onClick={async () => {

                          await api.put(
                            `/linkedin/email/${post.id}`,
                            {
                              generated_email: editedEmail,
                            }
                          );

                          setEditingId(null);

                          await loadPosts();

                        }}
                        className="
                        rounded-lg
                        bg-emerald-600
                        px-3
                        py-2
                       text-xs sm:text-sm
                        transition
                        hover:bg-emerald-500
                        "
                      >
                        Save
                      </button>

                    )}

                    {/* Cancel */}

                    {editingId === post.id && (

                      <button
                        onClick={() =>
                          setEditingId(null)
                        }
                        className="
                        rounded-lg
                        bg-zinc-700
                        px-3
                        py-2
                       text-xs sm:text-sm
                        transition
                        hover:bg-zinc-600
                        "
                      >
                        Cancel
                      </button>

                    )}

                    {/* Edit */}

                    {editingId !== post.id &&
                      post.generated_email && (

                        <button
                          onClick={() => {

                            setEditingId(post.id);

                            setEditedEmail(
                              post.generated_email
                            );

                          }}
                          className="
                          rounded-lg
                          bg-blue-600
                          px-3
                          py-2
                         text-xs sm:text-sm
                          transition
                          hover:bg-blue-500
                          "
                        >
                          Edit
                        </button>

                      )}

                    {/* Apply */}

                   <button
    disabled={!post.generated_email || applyingId === post.id}
    onClick={() => applyLead(post.id)}
    className={`rounded-lg px-4 py-2 text-xs sm:text-smfont-medium transition ${
        post.generated_email
            ? "bg-white text-black hover:bg-zinc-200"
            : "cursor-not-allowed bg-zinc-800 text-zinc-500"
    } disabled:opacity-60`}
>
    {applyingId === post.id ? (
        <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Applying...
        </div>
    ) : post.status === "applied" ? (
        "Applied"
    ) : (
        "Apply"
    )}
</button>

                  </div>

                </div>

              </div>

            </div>

          ))}
                  {/* ========================= */}
        {/* Empty State */}
        {/* ========================= */}

        {filteredPosts.length === 0 && (

          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-zinc-900/40 py-14 text-center">

            <Search
              size={40}
              className="mx-auto text-zinc-600"
            />

            <h2 className="mt-4 text-xl sm:text-2xl font-semibold">

              No recruiter leads found

            </h2>

            <p className="mt-2 text-xs sm:text-smtext-zinc-500">

              Try another search or refresh the recruiter list.

            </p>

            <button
              onClick={loadPosts}
              className="
              mt-6
              rounded-lg
              bg-violet-600
              px-5
              py-2
             text-xs sm:text-sm
              font-medium
              transition
              hover:bg-violet-500
              "
            >
              Refresh
            </button>

          </div>

        )}

      </div>
 </div>
      {/* ========================= */}
      {/* Skills Modal */}
      {/* ========================= */}

      {showSkills && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">

          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-zinc-900 shadow-xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

              <div>

                <h2 className="text-lg font-semibold">

                  Required Skills

                </h2>

                <p className="text-xs text-zinc-500">

                  Skills extracted from this job.

                </p>

              </div>

              <button
                onClick={() => setShowSkills(false)}
                className="
                rounded-lg
                bg-zinc-800
                px-3
                py-2
               text-xs sm:text-sm
                transition
                hover:bg-red-600
                "
              >
                ✕

              </button>

            </div>

            {/* Body */}

            <div className="max-h-[320px] overflow-y-auto p-5">

              {selectedSkills.trim() ? (

                <div className="flex flex-wrap gap-2">

                  {selectedSkills
                    .split(",")
                    .map((skill: string, index: number) => (

                      <span
                        key={index}
                        className="
                        rounded-full
                        border
                        border-violet-500/20
                        bg-violet-500/10
                        px-3
                        py-1.5
                        text-xs
                        text-violet-200
                        "
                      >
                        {skill.trim()}
                      </span>

                    ))}

                </div>

              ) : (

                <div className="py-10 text-center">

                  <Users
                    size={36}
                    className="mx-auto text-zinc-600"
                  />

                  <p className="mt-3 text-xs sm:text-smtext-zinc-500">

                    No skills available.

                  </p>

                </div>

              )}

            </div>

            {/* Footer */}

            <div className="flex justify-end border-t border-white/10 px-5 py-4">

              <button
                onClick={() => setShowSkills(false)}
                className="
                rounded-lg
                bg-violet-600
                px-5
                py-2
               text-xs sm:text-sm
                font-medium
                transition
                hover:bg-violet-500
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );
}

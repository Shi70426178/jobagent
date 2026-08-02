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

  const [searches, setSearches] = useState([]);
  const [searchId, setSearchId] = useState<string | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("search_id");
    setSearchId(id);
  }, []);

  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedEmail, setEditedEmail] = useState("");

  const [loadingNext, setLoadingNext] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSkills, setShowSkills] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadPosts();
  }, [searchId, page]);

  useEffect(() => {
    loadSearches();
  }, []);

  const loadSearches = async () => {
    const res = await api.get("/agent/searches");
    console.log("Searches API:", res.data);
    setSearches(res.data);
  };

  const loadPosts = async () => {
    try {
      const url = searchId
        ? `/linkedin/posts?search_id=${searchId}&page=${page}&page_size=5`
        : `/linkedin/posts?page=${page}&page_size=5`;

      const response = await api.get(url);

      setPosts(response.data.posts);
      setTotalPages(response.data.total_pages);
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
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#27272a",
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
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#27272a",
      });
    } finally {
      setGeneratingId(null);
    }
  };

  const applyLead = async (id: number) => {
    try {
      setApplyingId(id);

      const response = await api.post(`/linkedin/apply/${id}`);

      if (response.data.gmail_connected === false) {
        await Swal.fire({
          icon: "warning",
          title: "Gmail Not Connected",
          text: response.data.message,
          background: "#18181b",
          color: "#f4f4f5",
          confirmButtonText: "Connect Gmail",
          confirmButtonColor: "#27272a",
        });

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
            <span style="color:#a1a1aa;font-weight:600">
              Please check your <b>Gmail Sent</b> folder.
            </span>
          </div>
        `,
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonText: "OK",
        confirmButtonColor: "#27272a",
      });
    } catch (error: any) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong while sending the application.",
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#27272a",
      });
    } finally {
      setApplyingId(null);
    }
  };

// NEW CODE (Red, Yellow, Green color scheme)
const getScoreColor = (score: number) => {
  if (score <= 40) return "border-red-500 text-red-500";
  if (score <= 70) return "border-yellow-500 text-yellow-500";
  return "border-emerald-500 text-emerald-500";
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

  const nextPage = async () => {
    try {
      setLoadingNext(true);

      const next = page + 1;

      await api.post("/agent/start", {
        search_id: Number(searchId),
        page: next,
        page_size: 5,
      });

      setPage(next);
      await loadPosts();
    } finally {
      setLoadingNext(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-6 py-4 sm:py-6">
        
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-zinc-800/80 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100">
              Recruiter Leads
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              AI ranked recruiter opportunities.
            </p>
          </div>

          <button
            onClick={loadPosts}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-100 text-zinc-900 px-4 py-2 text-xs sm:text-sm font-medium transition hover:bg-zinc-300"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        {/* My Searches */}
        <div className="mt-6 mb-6">
          <h2 className="text-sm font-medium text-zinc-400 mb-3">
            My Searches
          </h2>

          <div className="flex flex-wrap gap-2">
            {searches.map((item: any) => (
              <button
                key={item.id}
                onClick={() => {
                  window.location.href = `/new-jobs?search_id=${item.id}`;
                }}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${
                  Number(searchId) === item.id
                    ? "bg-zinc-100 text-zinc-900"
                    : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                {item.keywords} <span className="opacity-60">({item.total_jobs})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter Bar */}
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
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-zinc-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition ${
                filter === "all"
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("high")}
              className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition ${
                filter === "high"
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              High Match
            </button>

            <button
              onClick={() => setFilter("applied")}
              className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition ${
                filter === "applied"
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              Applied
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Total */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">
                  Total Leads
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-100">
                  {filteredPosts.length}
                </h2>
              </div>
              <div className="rounded-lg bg-zinc-800 p-2 text-zinc-300">
                <Building2 size={18} />
              </div>
            </div>
          </div>

          {/* Emails */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">
                  Emails Found
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-100">
                  {filteredPosts.filter((p) => p.email).length}
                </h2>
              </div>
              <div className="rounded-lg bg-zinc-800 p-2 text-zinc-300">
                <Mail size={18} />
              </div>
            </div>
          </div>

          {/* Applied */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">
                  Applied
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-100">
                  {filteredPosts.filter((p) => p.status === "applied").length}
                </h2>
              </div>
              <div className="rounded-lg bg-zinc-800 p-2 text-zinc-300">
                <CheckCircle2 size={18} />
              </div>
            </div>
          </div>

          {/* Match */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">
                  High Match
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-100">
                  {highestMatch}%
                </h2>
              </div>
              <div className="rounded-lg bg-zinc-800 p-2 text-zinc-300">
                <Users size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Lead List */}
        <div className="mt-6 space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex gap-3.5 flex-1">
                  {/* Company Icon */}
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700/50 text-zinc-300">
                    <Building2 size={22} />
                  </div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold leading-tight text-zinc-100">
                      {post.job_title}
                    </h2>

                    <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
                      <Building2 size={14} />
                      <span className="truncate">{post.company}</span>
                    </div>

                    {/* Small Meta Info */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>👤 {post.recruiter_name || "Unknown"}</span>
                      <span className="text-zinc-700">•</span>
                      <span>📍 {post.location || "N/A"}</span>
                      <span className="text-zinc-700">•</span>
                      <span>💼 {post.experience || "N/A"}</span>
                      <span className="text-zinc-700">•</span>
                      <span>🕒 {post.posted_time || "N/A"}</span>
                    </div>

                    {/* Email Tag */}
                    <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300">
                      <Mail size={14} className="text-zinc-400" />
                      <span className="truncate">
                        {post.email || "Email not found"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Match Score Display */}
                <div className="flex flex-row lg:flex-col items-center gap-3 lg:gap-2 self-start lg:self-auto">
                  <div
                    className={`h-16 w-16 sm:h-18 sm:w-18 rounded-full border-[4px] flex items-center justify-center ${getScoreColor(
                      post.match_score || 0
                    )}`}
                  >
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-bold">
                        {post.match_score || 0}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-zinc-500">
                        Match
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider text-zinc-400 border border-zinc-700/50">
                    AI Match
                  </span>
                </div>
              </div>

              <div className="my-4 border-t border-zinc-800/80"></div>

              {/* AI Insights Section */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/50">
                <div className="flex items-center gap-2.5 border-b border-zinc-800/80 px-4 py-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-zinc-300">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-200">
                      AI Insights
                    </h3>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
                    {post.match_reason || "No AI analysis available."}
                  </p>
                </div>
              </div>

              {/* Generated Email Accordion / Edit Mode */}
              {post.generated_email && (
                <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/30 overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-zinc-900/50 transition">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-zinc-300">
                          <Mail size={15} />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-medium text-zinc-200">
                            Generated Email
                          </h3>
                          <p className="text-[11px] text-zinc-500">
                            Click to preview email body
                          </p>
                        </div>
                      </div>

                      <span className="text-xs text-zinc-500 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>

                    {editingId !== post.id ? (
                      <div className="border-t border-zinc-800 p-4 bg-zinc-900/20">
                        <pre className="whitespace-pre-wrap break-words text-xs sm:text-sm leading-relaxed text-zinc-300 font-sans">
                          {post.generated_email}
                        </pre>
                      </div>
                    ) : (
                      <div className="border-t border-zinc-800 p-4">
                        <textarea
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          className="h-44 sm:h-56 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-xs sm:text-sm text-zinc-100 outline-none focus:border-zinc-400 resize-none"
                        />
                      </div>
                    )}
                  </details>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="mt-4 flex flex-col gap-3 border-t border-zinc-800/80 pt-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Status Indicator */}
                <div className="flex items-center gap-2.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      post.status === "applied"
                        ? "border-zinc-700 bg-zinc-800 text-zinc-200"
                        : "border-zinc-800 bg-zinc-900 text-zinc-500"
                    }`}
                  >
                    {post.status === "applied" ? "Applied" : "Pending"}
                  </span>
                  <span className="text-xs text-zinc-500">Status</span>
                </div>

                {/* Button Controls */}
                <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedSkills(post.skills || "");
                      setShowSkills(true);
                    }}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
                  >
                    Skills
                  </button>

                  {!post.generated_email && (
                    <button
                      onClick={() => generateMail(post.id)}
                      disabled={generatingId === post.id}
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-900 transition hover:bg-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {generatingId === post.id ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          Generating...
                        </div>
                      ) : (
                        "Generate"
                      )}
                    </button>
                  )}

                  {editingId === post.id && (
                    <button
                      onClick={async () => {
                        await api.put(`/linkedin/email/${post.id}`, {
                          generated_email: editedEmail,
                        });
                        setEditingId(null);
                        await loadPosts();
                      }}
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-900 transition hover:bg-zinc-300"
                    >
                      Save
                    </button>
                  )}

                  {editingId === post.id && (
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200"
                    >
                      Cancel
                    </button>
                  )}

                  {editingId !== post.id && post.generated_email && (
                    <button
                      onClick={() => {
                        setEditingId(post.id);
                        setEditedEmail(post.generated_email);
                      }}
                      className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    disabled={!post.generated_email || applyingId === post.id}
                    onClick={() => applyLead(post.id)}
                    className={`rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
                      post.generated_email
                        ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-300"
                        : "cursor-not-allowed border border-zinc-800 bg-zinc-900 text-zinc-600"
                    } disabled:opacity-50`}
                  >
                    {applyingId === post.id ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
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
          ))}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 py-14 text-center">
              <Search size={36} className="mx-auto text-zinc-600" />
              <h2 className="mt-4 text-lg font-semibold text-zinc-200">
                No recruiter leads found
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500">
                Try another search or refresh the recruiter list.
              </p>
              <button
                onClick={loadPosts}
                className="mt-5 rounded-lg bg-zinc-100 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-900 transition hover:bg-zinc-300"
              >
                Refresh
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-zinc-800/60">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="text-xs sm:text-sm text-zinc-400">
              Page <span className="font-semibold text-zinc-200">{page}</span> of{" "}
              <span className="font-semibold text-zinc-200">{totalPages}</span>
            </span>

            <button
              disabled={page === totalPages || loadingNext}
              onClick={nextPage}
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loadingNext ? "Loading..." : "Next"}
            </button>
          </div>
        </div>
      </div>

      {/* Skills Modal */}
      {showSkills && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-zinc-100">
                  Required Skills
                </h2>
                <p className="text-xs text-zinc-500">
                  Skills extracted from this opportunity.
                </p>
              </div>

              <button
                onClick={() => setShowSkills(false)}
                className="rounded-lg bg-zinc-800 p-1.5 text-xs text-zinc-400 transition hover:bg-zinc-700 hover:text-zinc-100"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-5">
              {selectedSkills.trim() ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSkills
                    .split(",")
                    .map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-md border border-zinc-700/80 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-200"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Users size={32} className="mx-auto text-zinc-600" />
                  <p className="mt-2 text-xs text-zinc-500">
                    No skills extracted for this position.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-zinc-800 px-5 py-3.5 bg-zinc-900/50">
              <button
                onClick={() => setShowSkills(false)}
                className="rounded-lg bg-zinc-100 px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-900 transition hover:bg-zinc-300"
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
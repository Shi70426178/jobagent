"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { api } from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import Sidebar from "@/components/Sidebar";
// import Sidebar from "@/components/Sidebar";
import {
  Sparkles,
  Search,
  RefreshCw,
  Building2,
  Users,
  Mail,
  CheckCircle2,
} from "lucide-react";

// 1. Move your main component logic into an inner component
function LinkedinPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchId = searchParams.get("search_id");

  const [searches, setSearches] = useState([]);
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
    try {
      const res = await api.get("/agent/searches");
      setSearches(res.data.searches || res.data || []);
    } catch (error) {
      console.error("Error loading searches:", error);
    }
  };

  const loadPosts = async () => {
    try {
      const url = searchId
        ? `/linkedin/posts?search_id=${searchId}&page=${page}&page_size=5`
        : `/linkedin/posts?page=${page}&page_size=5`;

      const response = await api.get(url);
      const postsData =
        response.data.posts ||
        response.data.data ||
        (Array.isArray(response.data) ? response.data : []);

      setPosts(postsData);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error("Error loading posts:", error);
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
        background: "#09090b",
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
        text: error?.response?.data?.message || "Unable to generate the email.",
        background: "#09090b",
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
          background: "#09090b",
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
        background: "#09090b",
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
        background: "#09090b",
        color: "#f4f4f5",
        confirmButtonColor: "#27272a",
      });
    } finally {
      setApplyingId(null);
    }
  };

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

      if (filter === "applied") return matches && post.status === "applied";
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
    <div className="flex min-h-screen bg-black text-zinc-100 font-sans">
      <Sidebar />

      <main className="flex-1 p-8 w-full bg-black">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-zinc-800/80 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Recruiter Leads
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              AI ranked recruiter opportunities.
            </p>
          </div>

          <button
            onClick={loadPosts}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition shadow-sm"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* My Searches Pills */}
        {searches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-medium text-zinc-500 mb-2">
              My Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {searches.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(1);
                    router.push(`/new-jobs?search_id=${item.id}`);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                    Number(searchId) === item.id
                      ? "bg-zinc-100 text-black font-semibold"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {item.keywords}{" "}
                  <span className="opacity-50">({item.total_jobs})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-1.5 pl-8 pr-3 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-zinc-700"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === "all"
                  ? "bg-zinc-100 text-black font-semibold"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("high")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === "high"
                  ? "bg-zinc-100 text-black font-semibold"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              High Match
            </button>

            <button
              onClick={() => setFilter("applied")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === "applied"
                  ? "bg-zinc-100 text-black font-semibold"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Applied
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-zinc-400">
                  TOTAL LEADS
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {filteredPosts.length}
                </h2>
              </div>
              <div className="text-zinc-500">
                <Building2 size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-zinc-400">
                  EMAILS FOUND
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {filteredPosts.filter((p) => p.email).length}
                </h2>
              </div>
              <div className="text-zinc-500">
                <Mail size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-zinc-400">
                  APPLIED
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {filteredPosts.filter((p) => p.status === "applied").length}
                </h2>
              </div>
              <div className="text-zinc-500">
                <CheckCircle2 size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-zinc-400">
                  HIGH MATCH
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {highestMatch}%
                </h2>
              </div>
              <div className="text-zinc-500">
                <Users size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Lead List / Card Stream */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition hover:border-zinc-700"
            >
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex gap-3.5 flex-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-zinc-300">
                    <Building2 size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold leading-tight text-white">
                      {post.job_title}
                    </h2>

                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                      <Building2 size={13} />
                      <span className="truncate">{post.company}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>👤 {post.recruiter_name || "Unknown"}</span>
                      <span className="text-zinc-800">•</span>
                      <span>📍 {post.location || "N/A"}</span>
                      <span className="text-zinc-800">•</span>
                      <span>💼 {post.experience || "N/A"}</span>
                      <span className="text-zinc-800">•</span>
                      <span>🕒 {post.posted_time || "N/A"}</span>
                    </div>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-zinc-800/80 bg-zinc-900/50 px-2.5 py-1 text-xs text-zinc-300">
                      <Mail size={13} className="text-zinc-500" />
                      <span className="truncate">
                        {post.email || "Email not found"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center gap-2 self-start lg:self-auto">
                  <div
                    className={`h-14 w-14 rounded-full border-[3px] flex items-center justify-center ${getScoreColor(
                      post.match_score || 0
                    )}`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-bold">
                        {post.match_score || 0}
                      </div>
                      <div className="text-[8px] uppercase tracking-wider text-zinc-500">
                        Match
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-[10px] uppercase font-semibold text-zinc-400 border border-zinc-700/50">
                    AI Match
                  </span>
                </div>
              </div>

              <div className="my-4 border-t border-zinc-800/60"></div>

              {/* AI Insights Section */}
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/30">
                <div className="flex items-center gap-2 border-b border-zinc-800/60 px-3.5 py-2">
                  <Sparkles size={13} className="text-zinc-400" />
                  <h3 className="text-xs font-semibold text-zinc-300">
                    AI Insights
                  </h3>
                </div>

                <div className="p-3">
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {post.match_reason || "No AI analysis available."}
                  </p>
                </div>
              </div>

              {/* Generated Email Accordion / Edit Mode */}
              {post.generated_email && (
                <div className="mt-3 rounded-lg border border-zinc-800/80 bg-zinc-900/20 overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between px-3.5 py-2.5 hover:bg-zinc-900/50 transition">
                      <div className="flex items-center gap-2.5">
                        <Mail size={14} className="text-zinc-400" />
                        <div>
                          <h3 className="text-xs font-medium text-zinc-200">
                            Generated Email
                          </h3>
                        </div>
                      </div>

                      <span className="text-xs text-zinc-500 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>

                    {editingId !== post.id ? (
                      <div className="border-t border-zinc-800/60 p-3.5 bg-black">
                        <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-zinc-300 font-sans">
                          {post.generated_email}
                        </pre>
                      </div>
                    ) : (
                      <div className="border-t border-zinc-800/60 p-3.5 bg-black">
                        <textarea
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          className="h-40 w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-xs text-zinc-100 outline-none focus:border-zinc-700 resize-none"
                        />
                      </div>
                    )}
                  </details>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="mt-4 flex flex-col gap-3 border-t border-zinc-800/60 pt-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium border ${
                      post.status === "applied"
                        ? "border-zinc-700 bg-zinc-900 text-zinc-200"
                        : "border-zinc-800 bg-black text-zinc-500"
                    }`}
                  >
                    {post.status === "applied" ? "Applied" : "Pending"}
                  </span>
                  <span className="text-xs text-zinc-500">Status</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedSkills(post.skills || "");
                      setShowSkills(true);
                    }}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                  >
                    Skills
                  </button>

                  {!post.generated_email && (
                    <button
                      onClick={() => generateMail(post.id)}
                      disabled={generatingId === post.id}
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-zinc-300 disabled:opacity-50"
                    >
                      {generatingId === post.id ? "Generating..." : "Generate"}
                    </button>
                  )}

                  {editingId === post.id && (
                    <>
                      <button
                        onClick={async () => {
                          await api.put(`/linkedin/email/${post.id}`, {
                            generated_email: editedEmail,
                          });
                          setEditingId(null);
                          await loadPosts();
                        }}
                        className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-zinc-300"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {editingId !== post.id && post.generated_email && (
                    <button
                      onClick={() => {
                        setEditingId(post.id);
                        setEditedEmail(post.generated_email);
                      }}
                      className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    disabled={!post.generated_email || applyingId === post.id}
                    onClick={() => applyLead(post.id)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                      post.generated_email
                        ? "bg-zinc-100 text-black hover:bg-zinc-300 font-medium"
                        : "cursor-not-allowed border border-zinc-800/80 bg-zinc-900 text-zinc-600"
                    } disabled:opacity-50`}
                  >
                    {applyingId === post.id
                      ? "Applying..."
                      : post.status === "applied"
                      ? "Applied"
                      : "Apply"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 py-16 text-center">
              <Search size={32} className="mx-auto text-zinc-600" />
              <h2 className="mt-3 text-sm font-medium text-zinc-300">
                No recruiter leads found
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                Try another search or refresh the recruiter list.
              </p>
              <button
                onClick={loadPosts}
                className="mt-4 rounded-lg bg-zinc-100 px-3.5 py-1.5 text-xs font-medium text-black transition hover:bg-zinc-300"
              >
                Refresh
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-zinc-800/60">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="text-xs text-zinc-400">
              Page <span className="font-medium text-white">{page}</span> of{" "}
              <span className="font-medium text-white">{totalPages}</span>
            </span>

            <button
              disabled={page === totalPages || loadingNext}
              onClick={nextPage}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loadingNext ? "Loading..." : "Next"}
            </button>
          </div>
        </div>
      </main>

      {/* Skills Modal */}
      {showSkills && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <div>
                <h2 className="text-xs font-semibold text-white">
                  Required Skills
                </h2>
                <p className="text-[11px] text-zinc-500">
                  Skills extracted from this opportunity.
                </p>
              </div>

              <button
                onClick={() => setShowSkills(false)}
                className="rounded-lg bg-zinc-900 p-1 text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[250px] overflow-y-auto p-4">
              {selectedSkills.trim() ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkills
                    .split(",")
                    .map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <Users size={28} className="mx-auto text-zinc-600" />
                  <p className="mt-2 text-xs text-zinc-500">
                    No skills extracted for this position.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-zinc-800 px-4 py-3 bg-zinc-950">
              <button
                onClick={() => setShowSkills(false)}
                className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-zinc-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Export default wrapper wrapped in Suspense boundary
export default function LinkedinPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-xs text-zinc-400">
          Loading page...
        </div>
      }
    >
      <LinkedinPageContent />
    </Suspense>
  );
}
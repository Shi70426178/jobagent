"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { api } from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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

/* =========================================================
   SWEETALERT THEME
========================================================= */

const getSwalTheme = () => {
  const dark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return {
    background: dark ? "#09090b" : "#ffffff",
    color: dark ? "#f4f4f5" : "#18181b",
    confirmButtonColor: dark ? "#27272a" : "#18181b",
  };
};

/* =========================================================
   MAIN CONTENT
========================================================= */

function LinkedinPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchId = searchParams.get("search_id");

  const [searches, setSearches] = useState<any[]>([]);

  const [generatingId, setGeneratingId] =
    useState<number | null>(null);

  const [applyingId, setApplyingId] =
    useState<number | null>(null);

  const [posts, setPosts] = useState<any[]>([]);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editedEmail, setEditedEmail] =
    useState("");

  const [loadingNext, setLoadingNext] =
    useState(false);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [showSkills, setShowSkills] =
    useState(false);

  const [selectedSkills, setSelectedSkills] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  /* =========================================================
     LOAD POSTS
  ========================================================= */

  useEffect(() => {
    if (!searchId) return;

    loadPosts();
  }, [searchId, page]);

  /* =========================================================
     LOAD SEARCHES
  ========================================================= */

  useEffect(() => {
    loadSearches();
  }, []);

  const loadSearches = async () => {
    try {
      const res = await api.get("/agent/searches");

      setSearches(
        res.data.searches ||
          res.data ||
          []
      );
    } catch (error) {
      console.error(
        "Error loading searches:",
        error
      );
    }
  };

  /* =========================================================
     LOAD POSTS
  ========================================================= */

  const loadPosts = async () => {
    try {
      const url = searchId
        ? `/linkedin/posts?search_id=${searchId}&page=${page}&page_size=5`
        : `/linkedin/posts?page=${page}&page_size=5`;

      const response = await api.get(url);

      const postsData =
        response.data.posts ||
        response.data.data ||
        (Array.isArray(response.data)
          ? response.data
          : []);

      setPosts(postsData);

      setTotalPages(
        response.data.total_pages || 1
      );
    } catch (error) {
      console.error(
        "Error loading posts:",
        error
      );
    }
  };

  /* =========================================================
     GENERATE EMAIL
  ========================================================= */

  const generateMail = async (id: number) => {
    try {
      setGeneratingId(id);

      await api.post(
        `/linkedin/generate-email/${id}`
      );

      await loadPosts();

      Swal.fire({
        icon: "success",
        title: "Email Generated",
        text:
          "AI-generated email has been created successfully.",
        ...getSwalTheme(),
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
        ...getSwalTheme(),
      });
    } finally {
      setGeneratingId(null);
    }
  };

  /* =========================================================
     APPLY
  ========================================================= */

  const applyLead = async (id: number) => {
    try {
      setApplyingId(id);

      const response = await api.post(
        `/linkedin/apply/${id}`
      );

      if (
        response.data.gmail_connected === false
      ) {
        await Swal.fire({
          icon: "warning",
          title: "Gmail Not Connected",
          text: response.data.message,
          ...getSwalTheme(),
          confirmButtonText:
            "Connect Gmail",
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
            <span style="font-weight:600">
              Please check your <b>Gmail Sent</b> folder.
            </span>
          </div>
        `,
        ...getSwalTheme(),
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong while sending the application.",
        ...getSwalTheme(),
      });
    } finally {
      setApplyingId(null);
    }
  };

  /* =========================================================
     MATCH SCORE COLOR
  ========================================================= */

  const getScoreColor = (
    score: number
  ) => {
    if (score <= 40) {
      return "border-red-500 text-red-500";
    }

    if (score <= 70) {
      return "border-yellow-500 text-yellow-500";
    }

    return "border-emerald-500 text-emerald-500";
  };

  /* =========================================================
     HIGHEST MATCH
  ========================================================= */

  const highestMatch = useMemo(() => {
    return posts.length
      ? Math.max(
          ...posts.map(
            (p) => p.match_score || 0
          )
        )
      : 0;
  }, [posts]);

  /* =========================================================
     FILTER POSTS
  ========================================================= */

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const query =
        search.toLowerCase();

      const matches =
        post.company
          ?.toLowerCase()
          .includes(query) ||
        post.job_title
          ?.toLowerCase()
          .includes(query) ||
        post.recruiter_name
          ?.toLowerCase()
          .includes(query);

      if (
        filter === "applied"
      ) {
        return (
          matches &&
          post.status === "applied"
        );
      }

      if (filter === "high") {
        return (
          matches &&
          (post.match_score || 0) ===
            highestMatch
        );
      }

      return matches;
    });
  }, [
    posts,
    search,
    filter,
    highestMatch,
  ]);

  /* =========================================================
     NEXT PAGE
  ========================================================= */

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
    } catch (error) {
      console.error(
        "Error loading next page:",
        error
      );

      Swal.fire({
        icon: "error",
        title:
          "Unable to load next page",
        text:
          "Something went wrong while loading more jobs.",
        ...getSwalTheme(),
      });
    } finally {
      setLoadingNext(false);
    }
  };

  /* =========================================================
     SEARCH CHANGE
  ========================================================= */

  const handleSearchChange = (
    id: number
  ) => {
    setPosts([]);
    setPage(1);
    setTotalPages(1);

    router.push(
      `/new-jobs?search_id=${id}`
    );
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen w-full bg-white font-sans text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-zinc-100">

      {/* =====================================================
          NEXT PAGE LOADER
      ===================================================== */}

      {loadingNext && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 p-4 backdrop-blur-sm dark:bg-black/80">

          <div className="flex w-full max-w-[320px] flex-col items-center rounded-2xl border border-zinc-200 bg-white px-8 py-8 text-center shadow-2xl dark:border-zinc-800 dark:bg-[#0a0a0a]">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">

              <RefreshCw
                size={24}
                className="animate-spin text-zinc-700 dark:text-zinc-300"
              />

            </div>

            <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
              Please wait a while
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Processing the next jobs for you.
            </p>

            <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
              This may take a few moments...
            </p>

          </div>

        </div>
      )}

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="w-full bg-white p-5 transition-colors duration-300 sm:p-6 lg:p-8 dark:bg-black">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center dark:border-zinc-800/80">

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Recruiter Leads
            </h1>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              AI ranked recruiter opportunities.
            </p>

          </div>

          <button
            onClick={loadPosts}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <RefreshCw size={14} />

            Refresh
          </button>

        </div>

        {/* ===================================================
            MY SEARCHES
        =================================================== */}

        {searches.length > 0 && (
          <div className="mb-6">

            <h2 className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              Your Jobs
            </h2>

            <div className="flex flex-wrap gap-2">

              {searches.map(
                (item: any) => {

                  const isActive =
                    Number(searchId) ===
                    Number(item.id);

                  return (
                    <Link
                      key={item.id}
                      href={`/new-jobs?search_id=${item.id}`}
                      onClick={() =>
                        handleSearchChange(
                          item.id
                        )
                      }
                      className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? "border-zinc-900 bg-zinc-900 font-semibold text-white shadow-sm dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
                          : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
                      }`}
                    >

                      {item.keywords}

                      <span
                        className={`ml-1 ${
                          isActive
                            ? "text-zinc-300 dark:text-zinc-600"
                            : "text-zinc-400"
                        }`}
                      >
                        ({item.total_jobs})
                      </span>

                    </Link>
                  );
                }
              )}

            </div>

          </div>
        )}

        {/* ===================================================
            SEARCH & FILTER
        =================================================== */}

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full max-w-xs">

            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search jobs..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-1.5 pl-8 pr-3 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-700"
            />

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setFilter("all")
              }
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === "all"
                  ? "bg-zinc-900 font-semibold text-white dark:bg-zinc-100 dark:text-black"
                  : "border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              }`}
            >
              All
            </button>

            <button
              onClick={() =>
                setFilter("high")
              }
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === "high"
                  ? "bg-zinc-900 font-semibold text-white dark:bg-zinc-100 dark:text-black"
                  : "border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              }`}
            >
              High Match
            </button>

            <button
              onClick={() =>
                setFilter("applied")
              }
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === "applied"
                  ? "bg-zinc-900 font-semibold text-white dark:bg-zinc-100 dark:text-black"
                  : "border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              }`}
            >
              Applied
            </button>

          </div>

        </div>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">

          {/* Total */}

          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] font-medium text-zinc-500">
                  TOTAL LEADS
                </p>

                <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                  {filteredPosts.length}
                </h2>

              </div>

              <Building2
                size={18}
                className="text-zinc-400 dark:text-zinc-500"
              />

            </div>

          </div>

          {/* Emails */}

          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] font-medium text-zinc-500">
                  EMAILS FOUND
                </p>

                <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                  {
                    filteredPosts.filter(
                      (p) => p.email
                    ).length
                  }
                </h2>

              </div>

              <Mail
                size={18}
                className="text-zinc-400 dark:text-zinc-500"
              />

            </div>

          </div>

          {/* Applied */}

          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] font-medium text-zinc-500">
                  APPLIED
                </p>

                <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                  {
                    filteredPosts.filter(
                      (p) =>
                        p.status ===
                        "applied"
                    ).length
                  }
                </h2>

              </div>

              <CheckCircle2
                size={18}
                className="text-zinc-400 dark:text-zinc-500"
              />

            </div>

          </div>

          {/* Highest Match */}

          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] font-medium text-zinc-500">
                  HIGH MATCH
                </p>

                <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                  {highestMatch}%
                </h2>

              </div>

              <Users
                size={18}
                className="text-zinc-400 dark:text-zinc-500"
              />

            </div>

          </div>

        </div>

        {/* ===================================================
            JOB LIST
        =================================================== */}

        <div className="space-y-4">

          {filteredPosts.map(
            (post) => (
              <div
                key={post.id}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
              >

                {/* TOP */}

                <div className="flex flex-col gap-5 lg:flex-row">

                  <div className="flex min-w-0 flex-1 gap-3.5">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:text-zinc-300">

                      <Building2 size={20} />

                    </div>

                    <div className="min-w-0 flex-1">

                      <h2 className="text-base font-bold leading-tight text-zinc-900 dark:text-white">
                        {post.job_title}
                      </h2>

                      <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">

                        <Building2 size={13} />

                        <span className="truncate">
                          {post.company}
                        </span>

                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">

                        <span>
                          👤{" "}
                          {post.recruiter_name ||
                            "Unknown"}
                        </span>

                        <span className="text-zinc-300 dark:text-zinc-800">
                          •
                        </span>

                        <span>
                          📍{" "}
                          {post.location ||
                            "N/A"}
                        </span>

                        <span className="text-zinc-300 dark:text-zinc-800">
                          •
                        </span>

                        <span>
                          💼{" "}
                          {post.experience ||
                            "N/A"}
                        </span>

                        <span className="text-zinc-300 dark:text-zinc-800">
                          •
                        </span>

                        <span>
                          🕒{" "}
                          {post.posted_time ||
                            "N/A"}
                        </span>

                      </div>

                      {/* EMAIL */}

                      <div className="mt-3 flex w-full max-w-full items-center gap-2 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300">

                        <Mail
                          size={13}
                          className="shrink-0 text-zinc-400 dark:text-zinc-500"
                        />

                        <span className="min-w-0 flex-1 truncate">
                          {post.email ||
                            "Email not found"}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* MATCH */}

                  <div className="flex flex-row items-center gap-2 self-start lg:flex-col lg:self-auto">

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] ${getScoreColor(
                        post.match_score ||
                          0
                      )}`}
                    >

                      <div className="text-center">

                        <div className="text-sm font-bold">
                          {post.match_score ||
                            0}
                        </div>

                        <div className="text-[8px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Match
                        </div>

                      </div>

                    </div>

                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-zinc-500 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:text-zinc-400">
                      AI Match
                    </span>

                  </div>

                </div>

                <div className="my-4 border-t border-zinc-200 dark:border-zinc-800/60" />

                {/* =================================================
                    AI INSIGHTS
                ================================================= */}

                <div className="rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800/80 dark:bg-zinc-900/30">

                  <div className="flex items-center gap-2 border-b border-zinc-200 px-3.5 py-2 dark:border-zinc-800/60">

                    <Sparkles
                      size={13}
                      className="text-zinc-500 dark:text-zinc-400"
                    />

                    <h3 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      AI Insights
                    </h3>

                  </div>

                  <div className="p-3">

                    <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {post.match_reason ||
                        "No AI analysis available."}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    GENERATED EMAIL
                ================================================= */}

                {post.generated_email && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800/80 dark:bg-zinc-900/20">

                    <details className="group">

                      <summary className="flex cursor-pointer items-center justify-between px-3.5 py-2.5 transition hover:bg-zinc-100 dark:hover:bg-zinc-900/50">

                        <div className="flex items-center gap-2.5">

                          <Mail
                            size={14}
                            className="text-zinc-500 dark:text-zinc-400"
                          />

                          <h3 className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
                            Generated Email
                          </h3>

                        </div>

                        <span className="text-xs text-zinc-400 transition-transform group-open:rotate-180">
                          ▼
                        </span>

                      </summary>

                      {editingId !==
                      post.id ? (
                        <div className="border-t border-zinc-200 bg-white p-3.5 dark:border-zinc-800/60 dark:bg-black">

                          <pre className="whitespace-pre-wrap break-words font-sans text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                            {post.generated_email}
                          </pre>

                        </div>
                      ) : (
                        <div className="border-t border-zinc-200 bg-white p-3.5 dark:border-zinc-800/60 dark:bg-black">

                          <textarea
                            value={
                              editedEmail
                            }
                            onChange={(e) =>
                              setEditedEmail(
                                e.target.value
                              )
                            }
                            className="h-40 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-700"
                          />

                        </div>
                      )}

                    </details>

                  </div>
                )}

                {/* =================================================
                    FOOTER ACTIONS
                ================================================= */}

                <div className="mt-4 flex flex-col gap-3 border-t border-zinc-200 pt-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800/60">

                  <div className="flex items-center gap-2">

                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                        post.status ===
                        "applied"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                          : "border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-black dark:text-zinc-500"
                      }`}
                    >
                      {post.status ===
                      "applied"
                        ? "Applied"
                        : "Pending"}
                    </span>

                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      Status
                    </span>

                  </div>

                  <div className="flex flex-wrap items-center gap-2">

                    {/* Skills */}

                    <button
                      onClick={() => {
                        setSelectedSkills(
                          post.skills || ""
                        );

                        setShowSkills(
                          true
                        );
                      }}
                      className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                    >
                      Skills
                    </button>

                    {/* Generate */}

                    {!post.generated_email && (
                      <button
                        onClick={() =>
                          generateMail(
                            post.id
                          )
                        }
                        disabled={
                          generatingId ===
                          post.id
                        }
                        className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
                      >
                        {generatingId ===
                        post.id
                          ? "Generating..."
                          : "Generate"}
                      </button>
                    )}

                    {/* SAVE / CANCEL */}

                    {editingId ===
                      post.id && (
                      <>
                        <button
                          onClick={async () => {
                            await api.put(
                              `/linkedin/email/${post.id}`,
                              {
                                generated_email:
                                  editedEmail,
                              }
                            );

                            setEditingId(
                              null
                            );

                            await loadPosts();
                          }}
                          className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
                        >
                          Save
                        </button>

                        <button
                          onClick={() =>
                            setEditingId(
                              null
                            )
                          }
                          className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* EDIT */}

                    {editingId !==
                      post.id &&
                      post.generated_email && (
                        <button
                          onClick={() => {
                            setEditingId(
                              post.id
                            );

                            setEditedEmail(
                              post.generated_email
                            );
                          }}
                          className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                        >
                          Edit
                        </button>
                      )}

                    {/* APPLY */}

                    <button
                      disabled={
                        !post.generated_email ||
                        applyingId ===
                          post.id
                      }
                      onClick={() =>
                        applyLead(
                          post.id
                        )
                      }
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                        post.generated_email
                          ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
                          : "cursor-not-allowed border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-800/80 dark:bg-zinc-900 dark:text-zinc-600"
                      } disabled:opacity-50`}
                    >
                      {applyingId ===
                      post.id
                        ? "Applying..."
                        : post.status ===
                          "applied"
                        ? "Applied"
                        : "Apply"}
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filteredPosts.length ===
            0 && (
            <div className="rounded-xl border border-zinc-200 bg-white py-16 text-center shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">

              <Search
                size={32}
                className="mx-auto text-zinc-300 dark:text-zinc-600"
              />

              <h2 className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                No recruiter leads found
              </h2>

              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                Try another search or refresh the recruiter list.
              </p>

              <button
                onClick={
                  loadPosts
                }
                className="mt-4 rounded-lg bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
              >
                Refresh
              </button>

            </div>
          )}

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="mt-6 flex items-center justify-center gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800/60">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage(
                  page - 1
                )
              }
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              Previous
            </button>

            <span className="text-xs text-zinc-500 dark:text-zinc-400">

              Page{" "}

              <span className="font-medium text-zinc-900 dark:text-white">
                {page}
              </span>

              {" "}of{" "}

              <span className="font-medium text-zinc-900 dark:text-white">
                {totalPages}
              </span>

            </span>

            <button
              disabled={
                page ===
                  totalPages ||
                loadingNext
              }
              onClick={
                nextPage
              }
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {loadingNext
                ? "Loading..."
                : "Next"}
            </button>

          </div>

        </div>

      </main>

      {/* =====================================================
          SKILLS MODAL
      ===================================================== */}

      {showSkills && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm dark:bg-black/80">

          <div className="w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">

              <div>

                <h2 className="text-xs font-semibold text-zinc-900 dark:text-white">
                  Required Skills
                </h2>

                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  Skills extracted from this opportunity.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowSkills(
                    false
                  )
                }
                className="rounded-lg bg-zinc-100 p-1 text-xs text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                ✕
              </button>

            </div>

            {/* Skills */}

            <div className="max-h-[250px] overflow-y-auto p-4">

              {selectedSkills.trim() ? (
                <div className="flex flex-wrap gap-1.5">

                  {selectedSkills
                    .split(",")
                    .map(
                      (
                        skill: string,
                        index: number
                      ) => (
                        <span
                          key={index}
                          className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                          {skill.trim()}
                        </span>
                      )
                    )}

                </div>
              ) : (
                <div className="py-6 text-center">

                  <Users
                    size={28}
                    className="mx-auto text-zinc-300 dark:text-zinc-600"
                  />

                  <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                    No skills extracted for this position.
                  </p>

                </div>
              )}

            </div>

            {/* Footer */}

            <div className="flex justify-end border-t border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">

              <button
                onClick={() =>
                  setShowSkills(
                    false
                  )
                }
                className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
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

/* =========================================================
   SUSPENSE WRAPPER
========================================================= */

export default function LinkedinPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-xs text-zinc-500 dark:bg-black dark:text-zinc-400">
          Loading page...
        </div>
      }
    >
      <LinkedinPageContent />
    </Suspense>
  );
}
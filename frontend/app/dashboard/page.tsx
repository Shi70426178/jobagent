"use client";

import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/axios";
import Swal from "sweetalert2";
import {
  Upload,
  FileText,
  BriefcaseBusiness,
  MapPin,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Mail,
  Send,
  Pencil,
} from "lucide-react";

interface Job {
  id: number;
  linkedin_job_id: number;

  job_title: string;
  company: string;
  location: string;
  experience: string;
  skills: string;
  linkedin_url: string;
  source: string;
  posted_time: string;
  employment_type: string | null;
  salary: string | null;

  match_score: number;
  match_reason: string;
  matched_skills: string[];

  generated_email: string;
  status: string;
  email: string;
}

interface RecommendationResponse {
  resume_found: boolean;
  message?: string;

  candidate?: {
    experience_years: number;
    skills: string[];
  };

  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface Resume {
  id: number;
  file_path?: string;
  skills?: string;
  experience?: string;
  education?: string;
  name?: string;
  email?: string;
  phone?: string;
}

/* =========================================================
   THEME HELPERS
========================================================= */

const isDarkMode = () => {
  if (typeof document === "undefined") {
    return false;
  }

  return document.documentElement.classList.contains("dark");
};

const showError = (message: string) => {
  const dark = isDarkMode();

  Swal.fire({
    icon: "error",
    title: "Action Failed",
    text: message,
    width: "320px",
    padding: "1rem",

    background: dark ? "#0a0a0a" : "#ffffff",
    color: dark ? "#ffffff" : "#18181b",

    confirmButtonColor: dark ? "#ffffff" : "#18181b",

    customClass: {
      popup: "rounded-xl border shadow-2xl",
      title: "text-base font-semibold",
      htmlContainer: "text-xs",
      confirmButton: "text-xs px-4 py-2 rounded-lg font-medium",
    },
  });
};

const showSuccess = (message: string) => {
  const dark = isDarkMode();

  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 1800,
    showConfirmButton: false,
    width: "320px",
    padding: "1rem",

    background: dark ? "#0a0a0a" : "#ffffff",
    color: dark ? "#ffffff" : "#18181b",

    customClass: {
      popup: "rounded-xl border shadow-2xl",
      title: "text-base font-semibold",
      htmlContainer: "text-xs",
    },
  });
};

export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [resume, setResume] = useState<Resume | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [candidateSkills, setCandidateSkills] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState<number>(0);

  const [loadingResume, setLoadingResume] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const [generatingMail, setGeneratingMail] = useState<number | null>(null);
  const [applying, setApplying] = useState<number | null>(null);
  const [editingMail, setEditingMail] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);

  const limit = 20;

  useEffect(() => {
    loadResume();
  }, []);

  useEffect(() => {
    if (resume) {
      loadRecommendedJobs(page);
    }
  }, [resume, page]);

  /* =========================================================
     RESUME
  ========================================================= */

  const loadResume = async () => {
    setLoadingResume(true);

    try {
      const response = await api.get("/resume/latest");

      if (response.data) {
        setResume(response.data);
      } else {
        setResume(null);
      }
    } catch (err) {
      console.error("Error loading resume:", err);
      setResume(null);
    } finally {
      setLoadingResume(false);
    }
  };

  /* =========================================================
     RECOMMENDATIONS
  ========================================================= */

  const loadRecommendedJobs = async (currentPage: number = 1) => {
    setLoadingJobs(true);

    try {
      const response =
        await api.get<RecommendationResponse>(
          `/recommendations/jobs?page=${currentPage}&limit=${limit}`
        );

      const data = response.data;

      if (!data.resume_found) {
        setJobs([]);
        setTotalJobs(0);
        setTotalPages(0);
        return;
      }

      setJobs(data.jobs || []);
      setTotalJobs(data.total || 0);
      setTotalPages(data.total_pages || 0);

      if (data.candidate) {
        setCandidateSkills(data.candidate.skills || []);
        setExperienceYears(data.candidate.experience_years || 0);
      }
    } catch (err: any) {
      console.error("Error loading recommended jobs:", err);

      if (err.response?.status !== 404) {
        showError(
          err.response?.data?.detail ||
            "Unable to load recommended jobs."
        );
      }
    } finally {
      setLoadingJobs(false);
    }
  };

  /* =========================================================
     UPLOAD RESUME
  ========================================================= */

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !["pdf", "doc", "docx"].includes(extension || "")
    ) {
      showError("Please upload a PDF, DOC, or DOCX resume.");
      event.target.value = "";
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      showError("Resume file must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    await uploadResume(file);

    event.target.value = "";
  };

  const uploadResume = async (file: File) => {
    setUploading(true);

    const dark = isDarkMode();

    Swal.fire({
      title: "Analyzing Resume",
      html: "Extracting your skills and experience...",
      width: "320px",
      padding: "1rem",

      background: dark ? "#0a0a0a" : "#ffffff",
      color: dark ? "#ffffff" : "#18181b",

      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,

      customClass: {
        popup: "rounded-xl border",
        title: "text-base font-semibold",
        htmlContainer: "text-xs",
      },

      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.close();

      showSuccess(
        "Resume analyzed successfully. Finding matching jobs..."
      );

      await loadResume();

      setPage(1);

      await loadRecommendedJobs(1);
    } catch (err: any) {
      Swal.close();

      console.error("Resume upload error:", err);

      showError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to upload and analyze your resume."
      );
    } finally {
      setUploading(false);
    }
  };

  /* =========================================================
     GENERATE EMAIL
  ========================================================= */

  const handleGenerateMail = async (postId: number) => {
    setGeneratingMail(postId);

    try {
      const response = await api.post(
        `/linkedin/generate-email/${postId}`
      );

      if (!response.data?.success) {
        showError(
          response.data?.message ||
            "Unable to generate email."
        );
        return;
      }

      const generatedEmail =
        response.data.generated_email || "";

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === postId
            ? {
                ...job,
                generated_email: generatedEmail,
              }
            : job
        )
      );

      showSuccess("Application email generated.");
    } catch (err: any) {
      console.error("Generate email error:", err);

      showError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to generate application email."
      );
    } finally {
      setGeneratingMail(null);
    }
  };

  /* =========================================================
     EDIT EMAIL
  ========================================================= */

  const handleEditMail = async (job: Job) => {
    if (!job.generated_email) {
      return;
    }

    setEditingMail(job.id);

    const dark = isDarkMode();

    try {
      const result = await Swal.fire({
        title: "Edit Application Email",
        input: "textarea",
        inputValue: job.generated_email,

        inputAttributes: {
          "aria-label": "Application email",
        },

        inputAutoFocus: true,
        width: "700px",

        background: dark ? "#0a0a0a" : "#ffffff",
        color: dark ? "#ffffff" : "#18181b",

        showCancelButton: true,
        confirmButtonText: "Save Email",
        cancelButtonText: "Cancel",

        confirmButtonColor: dark ? "#ffffff" : "#18181b",
        cancelButtonColor: dark ? "#27272a" : "#e4e4e7",

        customClass: {
          popup: "rounded-2xl border",
          title: "text-base font-semibold",
          input:
            "text-sm rounded-lg border px-3 py-2",
          confirmButton:
            "text-xs px-4 py-2 rounded-lg font-semibold",
          cancelButton:
            "text-xs px-4 py-2 rounded-lg font-semibold",
        },

        inputValidator: (value) => {
          if (!value || !value.trim()) {
            return "Email cannot be empty.";
          }

          return null;
        },
      });

      if (!result.isConfirmed || !result.value) {
        return;
      }

      const updatedEmail = result.value.trim();

      const response = await api.put(
        `/linkedin/email/${job.id}`,
        {
          generated_email: updatedEmail,
        }
      );

      if (!response.data?.success) {
        showError("Failed to save the email.");
        return;
      }

      setJobs((currentJobs) =>
        currentJobs.map((item) =>
          item.id === job.id
            ? {
                ...item,
                generated_email: updatedEmail,
              }
            : item
        )
      );

      showSuccess("Email updated successfully.");
    } catch (err: any) {
      console.error("Edit email error:", err);

      showError(
        err.response?.data?.detail ||
          "Failed to update email."
      );
    } finally {
      setEditingMail(null);
    }
  };

  /* =========================================================
     APPLY
  ========================================================= */

  const handleApply = async (job: Job) => {
    if (!job.generated_email) {
      showError(
        "Please generate the application email first."
      );
      return;
    }

    if (!job.email) {
      showError(
        "No recruiter email found for this job."
      );
      return;
    }

    const dark = isDarkMode();

    const confirmation = await Swal.fire({
      title: "Apply for this job?",

      html: `
        <div style="font-size:12px;color:${
          dark ? "#a1a1aa" : "#71717a"
        };">
          Your generated email and resume will be
          sent to the recruiter.
          <br/><br/>
          <strong style="color:${
            dark ? "#fff" : "#18181b"
          };">
            ${job.company || "Company"}
          </strong>
          <br/>
          ${job.job_title || "Job"}
        </div>
      `,

      width: "360px",

      background: dark ? "#0a0a0a" : "#ffffff",
      color: dark ? "#ffffff" : "#18181b",

      showCancelButton: true,

      confirmButtonText: "Send Application",
      cancelButtonText: "Cancel",

      confirmButtonColor: dark ? "#ffffff" : "#18181b",
      cancelButtonColor: dark ? "#27272a" : "#e4e4e7",

      customClass: {
        popup: "rounded-2xl border",
        title: "text-base font-semibold",
        confirmButton:
          "text-xs px-4 py-2 rounded-lg font-semibold",
        cancelButton:
          "text-xs px-4 py-2 rounded-lg font-semibold",
      },
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    setApplying(job.id);

    try {
      const response = await api.post(
        `/linkedin/apply/${job.id}`
      );

      if (!response.data?.success) {
        if (response.data?.gmail_connected === false) {
          const gmailResult = await Swal.fire({
            icon: "warning",
            title: "Gmail Not Connected",
            text:
              "Please connect your Gmail account before applying.",
            showCancelButton: true,
            confirmButtonText: "Go to Gmail",
            cancelButtonText: "Cancel",

            confirmButtonColor: dark
              ? "#ffffff"
              : "#18181b",

            cancelButtonColor: dark
              ? "#27272a"
              : "#e4e4e7",

            background: dark ? "#0a0a0a" : "#ffffff",
            color: dark ? "#ffffff" : "#18181b",

            width: "360px",
          });

          if (gmailResult.isConfirmed) {
            window.location.href = "/gmail";
          }

          return;
        }

        showError(
          response.data?.message ||
            "Failed to send application."
        );

        return;
      }

      setJobs((currentJobs) =>
        currentJobs.map((item) =>
          item.id === job.id
            ? {
                ...item,
                status: "applied",
              }
            : item
        )
      );

      showSuccess(
        "Application sent successfully to the recruiter."
      );
    } catch (err: any) {
      console.error("Apply error:", err);

      if (
        err.response?.data?.gmail_connected === false
      ) {
        const gmailResult = await Swal.fire({
          icon: "warning",
          title: "Gmail Not Connected",
          text:
            "Please connect your Gmail account before applying.",
          showCancelButton: true,
          confirmButtonText: "Go to Gmail",
          cancelButtonText: "Cancel",

          confirmButtonColor: dark
            ? "#ffffff"
            : "#18181b",

          cancelButtonColor: dark
            ? "#27272a"
            : "#e4e4e7",

          background: dark ? "#0a0a0a" : "#ffffff",
          color: dark ? "#ffffff" : "#18181b",

          width: "360px",
        });

        if (gmailResult.isConfirmed) {
          window.location.href = "/gmail";
        }

        return;
      }

      showError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to send application."
      );
    } finally {
      setApplying(null);
    }
  };

  /* =========================================================
     HELPERS
  ========================================================= */

  const refreshRecommendations = async () => {
    await loadRecommendedJobs(page);
  };

  const formatScore = (score: number) => {
    return `${Math.round(score || 0)}%`;
  };

  const getScoreClass = (score: number) => {
    if (score >= 80) {
      return "text-emerald-600 dark:text-emerald-400";
    }

    if (score >= 60) {
      return "text-blue-600 dark:text-blue-400";
    }

    if (score >= 40) {
      return "text-amber-600 dark:text-amber-400";
    }

    return "text-zinc-500 dark:text-zinc-400";
  };

  const formatSkills = (skills: string) => {
    if (!skills) {
      return [];
    }

    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  };

  const formatPostedTime = (value: string) => {
    if (!value) {
      return "";
    }

    return value;
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loadingResume) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center bg-white text-zinc-900 dark:bg-black dark:text-white">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="h-6 w-6 animate-spin text-zinc-500" />

            <p className="text-sm text-zinc-500">
              Loading your recommendations...
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  /* =========================================================
     DASHBOARD
  ========================================================= */

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">

        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-7xl space-y-8">

            {/* =================================================
                HEADER
            ================================================= */}

            <section>

              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">

                <Sparkles className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-300" />

                <span>
                  Personalized Job Recommendations
                </span>

              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
                Find Jobs Made For You
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-500">
                Upload your resume and we&apos;ll find jobs
                from our database that match your skills
                and experience.
              </p>

            </section>

            {/* =================================================
                NO RESUME
            ================================================= */}

            {!resume ? (
              <section className="rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-[#0a0a0a]">

                <div className="p-8 text-center sm:p-12">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">

                    <Upload className="h-7 w-7 text-zinc-600 dark:text-zinc-300" />

                  </div>

                  <h2 className="mt-6 text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">
                    Upload Your Resume
                  </h2>

                  <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-600 dark:text-zinc-500">
                    Upload your latest resume to get
                    personalized job recommendations
                    based on your skills and experience.
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <button
                    onClick={handleUploadClick}
                    disabled={uploading}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    {uploading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload Resume
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-600">
                    PDF, DOC or DOCX • Maximum 10 MB
                  </p>

                </div>

              </section>
            ) : (
              <>
                {/* =================================================
                    RESUME PROFILE
                ================================================= */}

                <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#0a0a0a]">

                  <div className="flex flex-col gap-5 border-b border-zinc-200 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between dark:border-zinc-800">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">

                        <FileText className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />

                      </div>

                      <div>

                        <div className="flex items-center gap-2">

                          <h2 className="text-base font-bold text-zinc-900 sm:text-lg dark:text-white">
                            Resume Analyzed
                          </h2>

                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />

                        </div>

                        <p className="mt-1 text-xs text-zinc-500">
                          {resume.name || "Your resume"}
                        </p>

                      </div>

                    </div>

                    <div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      <button
                        onClick={handleUploadClick}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                      >
                        {uploading ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}

                        {uploading
                          ? "Analyzing..."
                          : "Update Resume"}
                      </button>

                    </div>

                  </div>

                  <div className="p-5 sm:p-6">

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                      {/* EXPERIENCE */}

                      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                          Experience
                        </p>

                        <p className="mt-2 text-2xl font-black text-zinc-900 dark:text-white">

                          {experienceYears}

                          <span className="ml-1 text-sm font-medium text-zinc-500">
                            {experienceYears === 1
                              ? "year"
                              : "years"}
                          </span>

                        </p>

                      </div>

                      {/* SKILLS */}

                      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 md:col-span-2 dark:border-zinc-800 dark:bg-zinc-900/30">

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                          Your Skills
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">

                          {candidateSkills.length > 0 ? (
                            candidateSkills.map(
                              (skill, index) => (
                                <span
                                  key={`${skill}-${index}`}
                                  className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                                >
                                  {skill}
                                </span>
                              )
                            )
                          ) : (
                            <span className="text-xs text-zinc-500">
                              No skills detected
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                </section>

                {/* =================================================
                    RECOMMENDED JOBS HEADER
                ================================================= */}

                <section>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                      <h2 className="text-xl font-black text-zinc-900 sm:text-2xl dark:text-white">
                        Recommended Jobs
                      </h2>

                      <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                        {totalJobs > 0
                          ? `${totalJobs} jobs match your profile`
                          : "Jobs matched from your resume"}
                      </p>

                    </div>

                    <button
                      onClick={refreshRecommendations}
                      disabled={loadingJobs}
                      className="inline-flex items-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 sm:self-auto dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >

                      <RefreshCw
                        className={`h-3.5 w-3.5 ${
                          loadingJobs
                            ? "animate-spin"
                            : ""
                        }`}
                      />

                      Refresh

                    </button>

                  </div>

                </section>

                {/* =================================================
                    LOADING JOBS
                ================================================= */}

                {loadingJobs ? (

                  <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10 dark:border-zinc-800 dark:bg-[#0a0a0a]">

                    <div className="flex flex-col items-center justify-center">

                      <RefreshCw className="h-6 w-6 animate-spin text-zinc-500" />

                      <p className="mt-4 text-sm text-zinc-500">
                        Finding jobs matching your resume...
                      </p>

                    </div>

                  </section>

                ) : jobs.length === 0 ? (

                  /* =================================================
                     NO JOBS
                  ================================================= */

                  <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center sm:p-14 dark:border-zinc-800 dark:bg-[#0a0a0a]">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">

                      <BriefcaseBusiness className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />

                    </div>

                    <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white">
                      No matching jobs found
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-500">
                      We couldn&apos;t find jobs matching
                      your current skills and experience.
                      Try updating your resume with your
                      latest skills.
                    </p>

                    <button
                      onClick={handleUploadClick}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Update Resume
                    </button>

                  </section>

                ) : (

                  /* =================================================
                     JOBS
                  ================================================= */

                  <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                    {jobs.map((job) => {

                      const jobSkills = formatSkills(job.skills);

                      const isApplied =
                        job.status === "applied";

                      const isGenerating =
                        generatingMail === job.id;

                      const isApplying =
                        applying === job.id;

                      const isEditing =
                        editingMail === job.id;

                      return (
                        <article
                          key={job.id}
                          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 sm:p-6 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:hover:border-zinc-700"
                        >

                          {/* JOB HEADER */}

                          <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0">

                              <h3 className="text-base font-bold leading-snug text-zinc-900 sm:text-lg dark:text-white">
                                {job.job_title || "Job Position"}
                              </h3>

                              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                                {job.company || "Company"}
                              </p>

                            </div>

                            <div
                              className={`flex-shrink-0 text-xl font-black ${getScoreClass(
                                job.match_score
                              )}`}
                            >
                              {formatScore(job.match_score)}
                            </div>

                          </div>

                          {/* JOB METADATA */}

                          <div className="mt-4 flex flex-wrap gap-2">

                            {job.location && (
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                            )}

                            {job.experience && (
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                                <BriefcaseBusiness className="h-3 w-3" />
                                {job.experience}
                              </span>
                            )}

                            {job.posted_time && (
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                                <Clock className="h-3 w-3" />
                                {formatPostedTime(job.posted_time)}
                              </span>
                            )}

                          </div>

                          {/* MATCH DETAILS */}

                          <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">

                            <div className="flex items-center justify-between gap-3">

                              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                Match Details
                              </p>

                              <span className="text-[10px] font-semibold text-zinc-500">
                                {formatScore(job.match_score)} match
                              </span>

                            </div>

                            {job.match_reason && (
                              <p className="mt-2 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-500">
                                {job.match_reason}
                              </p>
                            )}

                            <div className="mt-3 flex flex-wrap gap-2">

                              {job.matched_skills &&
                              job.matched_skills.length > 0 ? (

                                job.matched_skills.map(
                                  (skill, index) => (
                                    <span
                                      key={`${skill}-${index}`}
                                      className="rounded-md bg-zinc-200 px-2 py-1 text-[10px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                                    >
                                      {skill}
                                    </span>
                                  )
                                )

                              ) : (

                                <span className="text-[10px] text-zinc-500">
                                  Match calculated from your resume
                                </span>

                              )}

                            </div>

                          </div>

                          {/* JOB SKILLS */}

                          {jobSkills.length > 0 && (

                            <div className="mt-4">

                              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                Job Skills
                              </p>

                              <div className="mt-2 flex flex-wrap gap-1.5">

                                {jobSkills
                                  .slice(0, 8)
                                  .map((skill, index) => (
                                    <span
                                      key={`${skill}-${index}`}
                                      className="text-[10px] text-zinc-500"
                                    >
                                      {skill}
                                      {index <
                                      Math.min(
                                        jobSkills.length,
                                        8
                                      ) -
                                        1
                                        ? " •"
                                        : ""}
                                    </span>
                                  ))}

                              </div>

                            </div>

                          )}

                          {/* GENERATED EMAIL */}

                          {job.generated_email && (

                            <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30">

                              <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">

                                <div className="flex items-center gap-2">

                                  <Mail className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />

                                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                    Generated Email
                                  </p>

                                </div>

                                <button
                                  onClick={() =>
                                    handleEditMail(job)
                                  }
                                  disabled={
                                    isEditing ||
                                    isApplying ||
                                    isApplied
                                  }
                                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 transition hover:text-zinc-900 disabled:opacity-40 dark:hover:text-white"
                                >

                                  {isEditing ? (
                                    <RefreshCw className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <Pencil className="h-3 w-3" />
                                  )}

                                  Edit

                                </button>

                              </div>

                              <div className="p-4">

                                <p className="max-h-52 overflow-y-auto whitespace-pre-wrap text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                  {job.generated_email}
                                </p>

                              </div>

                            </div>

                          )}

                          {/* FOOTER */}

                          <div className="mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-900">

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                              <div className="flex items-center gap-2">

                                {job.employment_type && (
                                  <span className="text-[10px] text-zinc-500">
                                    {job.employment_type}
                                  </span>
                                )}

                                {isApplied && (
                                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Applied
                                  </span>
                                )}

                              </div>

                              <div className="flex flex-wrap items-center gap-2">

                                {/* VIEW JOB */}

                                {job.linkedin_url && (
                                  <a
                                    href={job.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-[11px] font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                  >
                                    View Job
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}

                                {/* GENERATE MAIL */}

                                {!job.generated_email &&
                                  !isApplied && (

                                    <button
                                      onClick={() =>
                                        handleGenerateMail(job.id)
                                      }
                                      disabled={
                                        isGenerating ||
                                        isApplying
                                      }
                                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-[11px] font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                    >

                                      {isGenerating ? (
                                        <>
                                          <RefreshCw className="h-3 w-3 animate-spin" />
                                          Generating...
                                        </>
                                      ) : (
                                        <>
                                          <Mail className="h-3 w-3" />
                                          Generate Mail
                                        </>
                                      )}

                                    </button>

                                  )}

                                {/* APPLY */}

                                {!isApplied && (
                                  <button
                                    onClick={() =>
                                      handleApply(job)
                                    }
                                    disabled={
                                      isApplying ||
                                      isGenerating ||
                                      !job.generated_email
                                    }
                                    title={
                                      !job.generated_email
                                        ? "Generate the email first"
                                        : "Send application"
                                    }
                                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3.5 py-2 text-[11px] font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                                  >

                                    {isApplying ? (
                                      <>
                                        <RefreshCw className="h-3 w-3 animate-spin" />
                                        Applying...
                                      </>
                                    ) : (
                                      <>
                                        <Send className="h-3 w-3" />
                                        Apply
                                      </>
                                    )}

                                  </button>
                                )}

                              </div>

                            </div>

                          </div>

                        </article>
                      );
                    })}

                  </section>
                )}

                {/* =================================================
                    PAGINATION
                ================================================= */}

                {!loadingJobs && totalPages > 1 && (

                  <div className="flex items-center justify-center gap-3 pt-2">

                    <button
                      onClick={() =>
                        setPage((current) =>
                          Math.max(1, current - 1)
                        )
                      }
                      disabled={page <= 1}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Previous
                    </button>

                    <span className="text-xs text-zinc-500">
                      Page {page} of {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setPage((current) =>
                          Math.min(
                            totalPages,
                            current + 1
                          )
                        )
                      }
                      disabled={page >= totalPages}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Next
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                  </div>

                )}

              </>
            )}

            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500 dark:border-zinc-900 dark:text-zinc-600">

              <a
                href="/privacy"
                className="transition hover:text-zinc-900 dark:hover:text-zinc-300"
              >
                Privacy Policy
              </a>

              <span className="mx-2.5">•</span>

              <a
                href="/terms"
                className="transition hover:text-zinc-900 dark:hover:text-zinc-300"
              >
                Terms of Service
              </a>

              <span className="mx-2.5">•</span>

              <span>© 2026 oneXjob</span>

            </footer>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
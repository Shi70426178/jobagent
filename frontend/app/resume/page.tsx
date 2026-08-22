"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import Swal from "sweetalert2";

import {
  UploadCloud,
  FileText,
  GraduationCap,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function ResumePage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [resume, setResume] =
    useState<any>(null);

  const [uploading, setUploading] =
    useState(false);

  /* =====================================================
     LOAD RESUME
  ===================================================== */

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const response =
        await api.get("/resume/latest");

      setResume(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* =====================================================
     UPLOAD RESUME
  ===================================================== */

  const uploadResume = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Resume Uploaded",
        text: "Your resume has been uploaded and parsed successfully.",
        confirmButtonText: "Continue",

        width: "420px",

        background:
          "var(--background)",

        color:
          "var(--foreground)",

        backdrop: `
          rgba(0, 0, 0, 0.45)
        `,

        customClass: {
          popup:
            "resume-success-popup",
          title:
            "resume-success-title",
          htmlContainer:
            "resume-success-text",
          confirmButton:
            "resume-success-button",
          icon:
            "resume-success-icon",
        },

        buttonsStyling: false,
      });

      setFile(null);

      await loadResume();

    } catch (error) {
      console.error(error);

      alert(
        "Failed to upload resume"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">

      <main className="mx-auto w-full max-w-[1400px] bg-white p-5 sm:p-8 lg:p-10 dark:bg-black">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 sm:mb-10">

          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 dark:border-zinc-800 dark:bg-zinc-900">

            <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />

            <span className="text-xs text-zinc-600 dark:text-zinc-300">
              AI Resume Parser
            </span>

          </div>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
            Resume Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
            Upload your resume and let AI analyze your experience, education, and extracted skills.
          </p>

        </div>

        {/* =================================================
            UPLOAD SECTION
        ================================================= */}

        <section className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">

          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
            Upload Resume
          </h2>

          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
            Upload your latest resume in PDF format. AI will automatically extract your skills, experience, and education.
          </p>

          {/* =================================================
              UPLOAD AREA
          ================================================= */}

          <label
            htmlFor="resume-upload"
            className="
              group
              flex
              h-48
              w-full
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-xl
              border-2
              border-dashed
              border-zinc-300
              bg-zinc-50
              px-4
              text-center
              transition-all
              duration-200
              hover:border-zinc-400
              hover:bg-zinc-100
              sm:h-56
              dark:border-zinc-700
              dark:bg-zinc-900/50
              dark:hover:border-zinc-500
              dark:hover:bg-zinc-900
            "
          >

            {resume ? (
              <>
                <CheckCircle2 className="mb-3 h-10 w-10 text-emerald-500 dark:text-emerald-400" />

                <p className="text-base font-bold text-emerald-600 sm:text-lg dark:text-emerald-400">
                  Resume Uploaded
                </p>

                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Your resume has been uploaded and parsed successfully.
                </p>
              </>
            ) : (
              <>
                <UploadCloud className="mb-3 h-10 w-10 text-zinc-400 transition-all duration-200 group-hover:scale-110 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-white" />

                <p className="text-base font-bold text-zinc-700 group-hover:text-zinc-900 sm:text-lg dark:text-zinc-200 dark:group-hover:text-white">
                  Click to upload your resume
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  PDF only • Max 5 MB
                </p>
              </>
            )}

            {/* Selected file */}

            {file && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">

                <FileText className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />

                <span className="max-w-[250px] truncate">
                  {file.name}
                </span>

              </div>
            )}

          </label>

          {/* =================================================
              FILE INPUT
          ================================================= */}

          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ||
                  null
              )
            }
          />

          {/* =================================================
              UPLOAD BUTTON
          ================================================= */}

          <button
            onClick={uploadResume}
            disabled={!file || uploading}
            className="
              mt-5
              h-11
              w-full
              rounded-xl
              bg-zinc-900
              font-bold
              text-sm
              text-white
              shadow-md
              transition-all
              duration-200
              hover:bg-zinc-700
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:bg-zinc-200
              disabled:text-zinc-400
              disabled:shadow-none
              dark:bg-white
              dark:text-black
              dark:hover:bg-zinc-200
              dark:disabled:bg-zinc-800
              dark:disabled:text-zinc-500
            "
          >
            {uploading
              ? "Uploading & Parsing Resume..."
              : resume
              ? "Replace Resume"
              : "Upload Resume"}
          </button>

        </section>

        {/* =================================================
            RESUME EXTRACTED DETAILS
        ================================================= */}

        {resume && (
          <div className="space-y-8">

            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Education */}

              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">

                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">

                  <GraduationCap className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />

                  Education

                </div>

                <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-white">
                  {resume.education ||
                    "Not Available"}
                </p>

              </div>

              {/* Experience */}

              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">

                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">

                  <Briefcase className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />

                  Experience

                </div>

                <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-white">
                  {resume.experience ||
                    "Not Available"}
                </p>

              </div>

              {/* Skills Count */}

              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">

                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">

                  <CheckCircle2 className="h-4 w-4 text-purple-500 dark:text-purple-400" />

                  Skills Count

                </div>

                <h2 className="mt-1 text-2xl font-black text-zinc-900 dark:text-white">
                  {resume.skills
                    ? resume.skills.split(",")
                        .length
                    : 0}
                </h2>

              </div>

            </div>

            {/* =================================================
                EXTRACTED SKILLS
            ================================================= */}

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">

              <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
                Extracted Skills
              </h2>

              <div className="flex flex-wrap gap-2">

                {resume.skills
                  ?.split(",")
                  .map(
                    (
                      skill: string,
                      index: number
                    ) => (
                      <span
                        key={index}
                        className="
                          rounded-xl
                          border
                          border-zinc-200
                          bg-zinc-50
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-zinc-600
                          transition
                          hover:border-zinc-300
                          hover:bg-zinc-100
                          dark:border-zinc-800
                          dark:bg-zinc-900
                          dark:text-zinc-300
                          dark:hover:border-zinc-700
                          dark:hover:bg-zinc-800
                        "
                      >
                        {skill.trim()}
                      </span>
                    )
                  )}

              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}
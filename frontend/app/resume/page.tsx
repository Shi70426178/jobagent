"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import { api } from "@/lib/axios";

export default function ResumePage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [resume, setResume] =
    useState<any>(null);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const response =
        await api.get(
          "/resume/latest"
        );

      setResume(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadResume = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

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

      alert(
        "Resume uploaded successfully"
      );

      loadResume();
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
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-black/40 backdrop-blur-xl min-h-screen text-white p-10">

        <div className="mb-12">

          <h1 className="text-5xl font-semibold tracking-tight">
            Resume Profile
          </h1>

          <p className="text-zinc-500 mt-3">
            Upload your resume and let AI
            analyze your experience,
            education, and skills.
          </p>

        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-6">
            Upload Resume
          </h2>

         <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-10">

  {/* <h2 className="text-xl sm:text-2xl font-semibold mb-2">
    Upload Resume
  </h2> */}

  <p className="text-zinc-400 text-sm mb-6">
    Upload your latest resume in PDF format. AI will automatically extract your
    skills, experience and education.
  </p>

  <label
    htmlFor="resume-upload"
    className="
  flex flex-col items-center justify-center
  h-40 sm:h-56
  w-full
  rounded-2xl
  border-2 border-dashed border-zinc-700
  bg-zinc-950/40
  cursor-pointer
  transition-all
  hover:border-cyan-500
  hover:bg-zinc-900
  px-4
  text-center
"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9 sm:w-12 sm:h-12 text-cyan-400 mb-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 0116.9 6.1A4.5 4.5 0 0117.5 15H15m-3-3v9m0-9l-3 3m3-3l3 3"
      />
    </svg>

    <p className="text-sm sm:text-lg font-medium text-white">
      Click to upload your resume
    </p>

    <p className="text-sm text-zinc-500 mt-2">
      PDF only • Max 5 MB
    </p>

    {file && (
      <div className="mt-5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-cyan-300 text-sm">
        📄 {file.name}
      </div>
    )}
  </label>

  <input
    id="resume-upload"
    type="file"
    accept=".pdf"
    className="hidden"
    onChange={(e) =>
      setFile(e.target.files?.[0] || null)
    }
  />

  <button
    onClick={uploadResume}
    disabled={!file || uploading}
    className="
      mt-6
      w-full
      h-12
      rounded-xl
      bg-cyan-500
      text-black
      font-semibold
      transition
      hover:bg-cyan-400
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
  >
    {uploading ? "Uploading Resume..." : "Upload Resume"}
  </button>

</div>

        </div>

        {resume && (

          <>
            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

                <p className="text-zinc-500 text-sm">
                  Education
                </p>

                <p className="mt-3">
                  {resume.education ||
                    "Not Available"}
                </p>

              </div>

              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

                <p className="text-zinc-500 text-sm">
                  Experience
                </p>

                <p className="mt-3">
                  {resume.experience ||
                    "Not Available"}
                </p>

              </div>

              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

                <p className="text-zinc-500 text-sm">
                  Skills Count
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {resume.skills
                    ? resume.skills.split(
                        ","
                      ).length
                    : 0}
                </h2>

              </div>

            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-6">
                Extracted Skills
              </h2>

              <div className="flex flex-wrap gap-3">

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
                          bg-zinc-900/60 backdrop-blur-xl
                          border
                          border-zinc-700
                          px-4
                          py-2
                          rounded-full
                          text-sm
                        "
                      >
                        {skill.trim()}
                      </span>
                    )
                  )}

              </div>

            </div>

          </>

        )}

      </main>

    </div>
  );
}
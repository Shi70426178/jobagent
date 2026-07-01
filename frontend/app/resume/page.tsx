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

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ||
                  null
              )
            }
            className="
              block
              w-full
              text-zinc-400
              mb-6
            "
          />

          <button
            onClick={uploadResume}
            disabled={
              uploading || !file
            }
            className="
              bg-white
              text-black
              px-6
              py-3
              rounded-xl
              font-medium
              hover:bg-zinc-200
              transition
              disabled:opacity-50
            "
          >
            {uploading
              ? "Uploading..."
              : "Upload Resume"}
          </button>

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
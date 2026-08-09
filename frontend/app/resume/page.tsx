"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { api } from "@/lib/axios";
import Swal from "sweetalert2";
import { 
  UploadCloud, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [resume, setResume] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const response = await api.get("/resume/latest");
      setResume(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 const uploadResume = async () => {
  if (!file) return;

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    await api.post("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await Swal.fire({
      icon: "success",
      title: "Resume Uploaded",
      text: "Your resume has been uploaded and parsed successfully.",
      confirmButtonText: "OK",
    });

    setFile(null);
    await loadResume();

  } catch (error) {
    console.error(error);
    alert("Failed to upload resume");
  } finally {
    setUploading(false);
  }
};
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs text-zinc-300">AI Resume Parser</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Resume Profile
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-2xl">
            Upload your resume and let AI analyze your experience, education, and extracted skills.
          </p>
        </div>

        {/* Outer Dark Card Container */}
        <section className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Upload Resume</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Upload your latest resume in PDF format. AI will automatically extract your skills, experience, and education.
          </p>

          {/* Dark Inner Upload Area */}
          <label
            htmlFor="resume-upload"
            className="
              flex flex-col items-center justify-center
              h-48 sm:h-56 w-full rounded-xl
              border-2 border-dashed border-zinc-700 bg-zinc-900/50
              cursor-pointer transition-all duration-200
              hover:border-zinc-500 hover:bg-zinc-900
              px-4 text-center group
            "
          >
           {resume ? (
  <>
    <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-3" />

    <p className="text-base sm:text-lg font-bold text-emerald-400">
      Resume Uploaded
    </p>

    <p className="text-xs text-zinc-400 mt-1">
      Your resume has been uploaded and parsed successfully.
    </p>
  </>
) : (
  <>
    <UploadCloud className="w-10 h-10 text-zinc-400 mb-3 group-hover:scale-110 group-hover:text-white transition-all duration-200" />

    <p className="text-base sm:text-lg font-bold text-zinc-200 group-hover:text-white">
      Click to upload your resume
    </p>

    <p className="text-xs text-zinc-500 mt-1">
      PDF only • Max 5 MB
    </p>
  </>
)}

            {file && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-zinc-200 text-xs font-semibold">
                <FileText className="h-4 w-4 text-zinc-400" />
                <span>{file.name}</span>
              </div>
            )}
          </label>

          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {/* White Button with High Contrast */}
          <button
            onClick={uploadResume}
            disabled={!file || uploading}
            className="
              mt-5 w-full h-11 rounded-xl
              bg-white text-black font-bold text-sm shadow-md
              transition-all duration-200 hover:bg-zinc-200 active:scale-[0.99]
              disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none disabled:cursor-not-allowed
            "
          >
            {uploading
  ? "Uploading & Parsing Resume..."
  : resume
    ? "Replace Resume"
    : "Upload Resume"}
          </button>
        </section>

        {/* Resume Extracted Details */}
        {resume && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium mb-2">
                  <GraduationCap className="h-4 w-4 text-cyan-400" />
                  Education
                </div>
                <p className="text-sm font-medium text-white leading-relaxed">
                  {resume.education || "Not Available"}
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium mb-2">
                  <Briefcase className="h-4 w-4 text-emerald-400" />
                  Experience
                </div>
                <p className="text-sm font-medium text-white leading-relaxed">
                  {resume.experience || "Not Available"}
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium mb-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  Skills Count
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  {resume.skills ? resume.skills.split(",").length : 0}
                </h2>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-4">
                Extracted Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {resume.skills
                  ?.split(",")
                  .map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="
                        bg-zinc-900 border border-zinc-800
                        px-3 py-1.5 rounded-xl
                        text-xs text-zinc-300 font-medium
                      "
                    >
                      {skill.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
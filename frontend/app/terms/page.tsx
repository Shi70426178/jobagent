"use client";

import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen overflow-y-auto bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Login_BG.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/45" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-3 sm:px-5 lg:px-8 py-6">
        <div className="w-[96%] sm:w-[95%] md:w-[92%] lg:w-[90%] xl:w-[85%] 2xl:w-[80%]">
          {/* Back Button */}
          <button
            onClick={() => router.push("/register")}
            className="mb-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-violet-500/40 hover:bg-white/10"
          >
            ← Back to Register
          </button>

          {/* Card */}
          <div className="rounded-xl border border-white/10 bg-black/45 p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,.55)] backdrop-blur-2xl">
            <h1 className="text-3xl font-bold text-white">
              Terms of Service
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Last Updated: July 2026
            </p>

            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-lg font-semibold text-white">
                  Acceptance of Terms
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  By accessing or using oneXjob, you agree to be bound by these
                  Terms of Service. If you do not agree, please do not use the
                  platform.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white">
                  Services
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  oneXjob provides AI-powered tools to help users search for
                  jobs, optimize resumes, generate job application emails, and
                  manage applications.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white">
                  User Responsibilities
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300">
                  <li>Provide accurate information.</li>
                  <li>Use the platform legally and ethically.</li>
                  <li>Do not misuse AI-generated content.</li>
                  <li>Respect recruiters and employers.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white">
                  Gmail Integration
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  Gmail access is optional and only used after you explicitly
                  grant permission. oneXjob sends emails on your behalf only
                  when you initiate an application.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white">
                  Limitation of Liability
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  oneXjob does not guarantee interviews, job offers, or
                  employment. Users are responsible for reviewing AI-generated
                  content before sending it.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white">
                  Contact
                </h2>

                <p className="mt-3 text-sm text-violet-400">
                  shivamsingh221537@gmail.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
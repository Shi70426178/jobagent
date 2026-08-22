"use client";

import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">

      <div className="flex min-h-screen items-center justify-center px-3 py-6 sm:px-5 lg:px-8">

        <div className="w-[96%] sm:w-[95%] md:w-[92%] lg:w-[90%] xl:w-[85%] 2xl:w-[80%]">

          {/* Back Button */}

          <button
            onClick={() => router.push("/register")}
            className="mb-4 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            ← Back to Register
          </button>

          {/* Card */}

          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 md:p-8 lg:p-10 dark:border-zinc-800 dark:bg-zinc-900/40">

            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Terms of Service
            </h1>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Last Updated: July 2026
            </p>

            <div className="mt-8 space-y-8">

              {/* Acceptance */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Acceptance of Terms
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  By accessing or using oneXjob, you agree to be bound by these
                  Terms of Service. If you do not agree, please do not use the
                  platform.
                </p>
              </section>

              {/* Services */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Services
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  oneXjob provides AI-powered tools to help users search for
                  jobs, optimize resumes, generate job application emails, and
                  manage applications.
                </p>
              </section>

              {/* Responsibilities */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  User Responsibilities
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  <li>Provide accurate information.</li>
                  <li>Use the platform legally and ethically.</li>
                  <li>Do not misuse AI-generated content.</li>
                  <li>Respect recruiters and employers.</li>
                </ul>
              </section>

              {/* Gmail */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Gmail Integration
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Gmail access is optional and only used after you explicitly
                  grant permission. oneXjob sends emails on your behalf only
                  when you initiate an application.
                </p>
              </section>

              {/* Liability */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Limitation of Liability
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  oneXjob does not guarantee interviews, job offers, or
                  employment. Users are responsible for reviewing AI-generated
                  content before sending it.
                </p>
              </section>

              {/* Contact */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Contact
                </h2>

                <p className="mt-3 text-sm text-violet-600 dark:text-violet-400">
                  support@onexjob.com
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
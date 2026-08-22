"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Last Updated: July 2026
            </p>

            <div className="mt-8 space-y-8">

              {/* Introduction */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Introduction
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Welcome to oneXjob. We value your privacy and are committed to
                  protecting your personal information. This Privacy Policy
                  explains how we collect, use, store, and safeguard your
                  information when you use our platform.
                </p>
              </section>

              {/* Information We Collect */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Information We Collect
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  <li>Name and email address</li>
                  <li>Account credentials</li>
                  <li>Resume and profile information</li>
                  <li>Job application history</li>
                  <li>
                    Connected Gmail account email address and OAuth
                    authorization tokens (only after you explicitly grant
                    permission)
                  </li>
                </ul>
              </section>

              {/* Gmail Access */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Gmail Access
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  oneXjob requests access to your Gmail account only after you
                  explicitly authorize the application using Google OAuth.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  We currently request only the minimum permission required to
                  send job application emails on your behalf using your own
                  Gmail account.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  We do not read your inbox, access your email history, monitor
                  your emails, modify your emails, or delete any Gmail content.
                </p>
              </section>

              {/* Google API */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Google API Services User Data
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  oneXjob accesses Google user data only to provide the features
                  requested by the user. We request only the minimum Google
                  OAuth permissions necessary for our application to function.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  The use of information received from Google APIs adheres to
                  the Google API Services User Data Policy, including the
                  Limited Use requirements.
                </p>
              </section>

              {/* How We Use */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  How We Use Your Information
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  <li>Provide AI-powered job search services.</li>
                  <li>Generate personalized job application emails.</li>
                  <li>
                    Send emails using your connected Gmail account only after
                    your authorization.
                  </li>
                  <li>Improve resume-to-job matching.</li>
                  <li>Track job applications.</li>
                  <li>Maintain account security.</li>
                </ul>
              </section>

              {/* AI Services */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  AI Services
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  oneXjob uses artificial intelligence to generate personalized
                  job application emails and improve resume-to-job matching.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  AI-generated emails are created using only the user's resume,
                  job title, company name, and job description. Google
                  Workspace (Gmail) user data, including email messages, inbox
                  contents, attachments, contacts, and email history, is not
                  transmitted to AI providers for processing.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Google user data obtained through Gmail APIs is not used to
                  develop, improve, or train generalized artificial intelligence
                  or machine learning models.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  We do not permit Google user data to be used by third-party AI
                  providers for training their artificial intelligence or
                  machine learning models.
                </p>
              </section>

              {/* Data Sharing */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Data Sharing
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  We do not sell, rent, trade, or transfer your Google user data
                  to advertisers, data brokers, or unrelated third parties.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Resume information and job-related information may be
                  processed by our AI provider solely to generate the
                  user-requested job application email. Google Workspace user
                  data is not shared with AI providers for processing or model
                  training.
                </p>
              </section>

              {/* Data Security */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Data Security
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  We use industry-standard security measures to protect your
                  information. OAuth tokens are stored securely and are used
                  only for authorized actions requested by you.
                </p>
              </section>

              {/* Retention */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Data Retention & Deletion
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  We retain your account information only for as long as
                  necessary to provide our services or comply with legal
                  obligations.
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  You may disconnect your Gmail account at any time from within
                  oneXjob or revoke access from your Google Account settings.
                  Once disconnected, we will no longer use your Gmail account to
                  send emails on your behalf.
                </p>
              </section>

              {/* Rights */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Your Rights
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  You may update or delete your account at any time. You may
                  also revoke Gmail access directly from your Google Account
                  settings.
                </p>
              </section>

              {/* Contact */}

              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Contact
                </h2>

                <p className="mt-3 text-sm text-violet-600 dark:text-violet-400">
                  Email: support@onexjob.com
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">

      <div className="mx-auto max-w-5xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/40">

        {/* Header */}

        <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
          Contact Us
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-500 dark:text-zinc-400">
          We'd love to hear from you. Whether you have a question, found a bug,
          or need assistance, we're here to help.
        </p>

        {/* Contact Cards */}

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {/* Support */}

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Support
            </h2>

            <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
              Need help using oneXjob or have technical issues?
            </p>

            <p className="mt-6 font-semibold text-cyan-600 dark:text-cyan-400">
              support@onexjob.com
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Response time: Within 24–48 hours
            </p>

          </div>

          {/* Business */}

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Business Enquiries
            </h2>

            <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
              Partnership opportunities, enterprise plans, or collaboration.
            </p>

            <p className="mt-6 font-semibold text-violet-600 dark:text-violet-400">
              support@onexjob.com
            </p>

          </div>

          {/* Bug */}

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Report a Bug
            </h2>

            <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
              Found an issue? Let us know and we'll fix it as soon as possible.
            </p>

            <p className="mt-6 font-semibold text-cyan-600 dark:text-cyan-400">
              support@onexjob.com
            </p>

          </div>

          {/* Office */}

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Office
            </h2>

            <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
              oneXjob is an AI-powered career platform helping professionals
              discover jobs and apply smarter.
            </p>

            <p className="mt-6 text-zinc-500 dark:text-zinc-400">
              Remote • Worldwide
            </p>

          </div>

        </div>

        {/* Back Home */}

        <div className="mt-16 text-center">

          <Link
            href="/"
            className="inline-block rounded-xl bg-zinc-900 px-8 py-3 font-semibold text-white transition hover:bg-zinc-700 hover:scale-105 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}
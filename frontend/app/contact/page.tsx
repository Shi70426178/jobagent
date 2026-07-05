import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-xl">

        <h1 className="text-5xl font-black text-white">
          Contact Us
        </h1>

        <p className="mt-4 text-zinc-400">
          We'd love to hear from you. Whether you have a question, found a bug,
          or need assistance, we're here to help.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-2xl font-bold text-white">
              Support
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">
              Need help using oneXjob or have technical issues?
            </p>

            <p className="mt-6 font-semibold text-cyan-400">
              shivamsingh221537@gmail.com
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Response time: Within 24–48 hours
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-2xl font-bold text-white">
              Business Enquiries
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">
              Partnership opportunities, enterprise plans, or collaboration.
            </p>

            <p className="mt-6 font-semibold text-violet-400">
              shivamsingh221537@gmail.com
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-2xl font-bold text-white">
              Report a Bug
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">
              Found an issue? Let us know and we'll fix it as soon as possible.
            </p>

            <p className="mt-6 font-semibold text-cyan-400">
              shivamsingh221537@gmail.com
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-2xl font-bold text-white">
              Office
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">
              oneXjob is an AI-powered career platform helping professionals
              discover jobs and apply smarter.
            </p>

            <p className="mt-6 text-zinc-400">
              Remote • Worldwide
            </p>

          </div>

        </div>

        <div className="mt-16 text-center">

          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-3 font-semibold text-white transition hover:scale-105"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}
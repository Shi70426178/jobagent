export default function TermsPage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-xl">

        <h1 className="text-5xl font-black text-white">
          Terms of Service
        </h1>

        <p className="mt-4 text-zinc-400">
          Last Updated: July 2026
        </p>

        <div className="mt-12 space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-white">
              Acceptance of Terms
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              By accessing or using oneXjob, you agree to be bound by these
              Terms of Service. If you do not agree, please do not use the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Services
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              oneXjob provides AI-powered tools to help users search for jobs,
              optimize resumes, generate job application emails, and manage
              applications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              User Responsibilities
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-zinc-300">
              <li>Provide accurate information.</li>
              <li>Use the platform legally and ethically.</li>
              <li>Do not misuse AI-generated content.</li>
              <li>Respect recruiters and employers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Gmail Integration
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              Gmail access is optional and only used after you explicitly grant
              permission. oneXjob sends emails on your behalf only when you
              initiate an application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Limitation of Liability
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              oneXjob does not guarantee interviews, job offers, or employment.
              Users are responsible for reviewing AI-generated content before
              sending it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact
            </h2>

            <p className="mt-4 text-zinc-300">
              support@onexjob.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
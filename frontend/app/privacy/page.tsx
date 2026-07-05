export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-xl">

        <h1 className="text-5xl font-black text-white">
          Privacy Policy
        </h1>

        <p className="mt-4 text-zinc-400">
          Last Updated: July 2026
        </p>

        <div className="mt-12 space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-white">
              Introduction
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              Welcome to oneXjob. We value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, and safeguard your information when you use
              our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Information We Collect
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-zinc-300">
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Resume and profile information</li>
              <li>Job application history</li>
              <li>Connected Gmail account (only with your permission)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Gmail Access
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              oneXjob only requests permission to send job application emails on
              your behalf after you explicitly authorize your Gmail account.
            </p>

            <p className="mt-4 leading-8 text-zinc-300">
              We do not read your inbox, monitor your emails, or access any
              personal email content unless you explicitly grant additional
              permissions in the future.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              How We Use Your Information
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-zinc-300">
              <li>Provide AI-powered job search services</li>
              <li>Generate personalized job application emails</li>
              <li>Improve resume matching</li>
              <li>Track job applications</li>
              <li>Maintain account security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Data Security
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              We use industry-standard security practices to protect your
              information. OAuth tokens are stored securely and are used only
              for authorized actions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Your Rights
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              You may update or delete your account at any time. You may also
              revoke Gmail access directly from your Google Account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact
            </h2>

            <p className="mt-4 text-zinc-300">
              Email: support@onexjob.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
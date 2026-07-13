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
              how we collect, use, store, and safeguard your information when
              you use our platform.
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
              <li>
                Connected Gmail account email address and OAuth authorization
                tokens (only after you explicitly grant permission)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Gmail Access
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              oneXjob requests access to your Gmail account only after you
              explicitly authorize the application using Google OAuth.
            </p>

            <p className="mt-4 leading-8 text-zinc-300">
              We currently request only the minimum permission required to send
              job application emails on your behalf using your own Gmail
              account.
            </p>

            <p className="mt-4 leading-8 text-zinc-300">
              We do not read your inbox, access your email history, monitor your
              emails, modify your emails, or delete any Gmail content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Google API Services User Data
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              oneXjob accesses Google user data only to provide the features
              requested by the user. We request only the minimum Google OAuth
              permissions necessary for our application to function.
            </p>

            <p className="mt-4 leading-8 text-zinc-300">
              The use of information received from Google APIs adheres to the
              Google API Services User Data Policy, including the Limited Use
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              How We Use Your Information
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-zinc-300">
              <li>Provide AI-powered job search services.</li>
              <li>Generate personalized job application emails.</li>
              <li>Send emails using your connected Gmail account only after your authorization.</li>
              <li>Improve resume-to-job matching.</li>
              <li>Track job applications.</li>
              <li>Maintain account security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              AI Services
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              oneXjob uses artificial intelligence to help users generate
              personalized job application emails and improve resume matching.
            </p>

            <p className="mt-4 leading-8 text-zinc-300">
              Google user data obtained through Gmail APIs is not used to
              develop, improve, or train generalized artificial intelligence or
              machine learning models.
            </p>

            <p className="mt-4 leading-8 text-zinc-300">
              We do not permit Google user data to be used by third-party AI
              providers for training their artificial intelligence or machine
              learning models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Data Sharing
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              We do not sell, rent, trade, or transfer your Google user data to
              advertisers, data brokers, or unrelated third parties.
            </p>

            <p className="mt-4 leading-8 text-zinc-300">
              Information is shared only when necessary to provide the services
              you request or when required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Data Security
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              We use industry-standard security measures to protect your
              information. OAuth tokens are stored securely and are used only
              for authorized actions requested by you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Data Retention & Deletion
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              We retain your account information only for as long as necessary
              to provide our services or comply with legal obligations.
            </p>

            <p className="mt-4 leading-8 text-zinc-300">
              You may disconnect your Gmail account at any time from within
              oneXjob or revoke access from your Google Account settings. Once
              disconnected, we will no longer use your Gmail account to send
              emails on your behalf.
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
              Email: shivamsingh221537@gmail.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
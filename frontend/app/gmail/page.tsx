"use client";

import { api } from "@/lib/axios";
import Sidebar from "@/components/Sidebar";

export default function GmailPage() {
  const connectGmail = async () => {
    try {
      const response = await api.get(
        "/gmail/connect"
      );

      window.location.href =
        response.data.auth_url;
    } catch (error) {
      console.error(error);

      alert("Failed to connect Gmail");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-zinc-950 min-h-screen text-white p-10">

        <div className="mb-12">

          <h1 className="text-5xl font-semibold tracking-tight">
            Gmail Integration
          </h1>

          <p className="text-zinc-500 mt-3">
            Connect Gmail so your AI agent can
            send personalized job applications.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Gmail Status
            </p>

            <h2 className="text-2xl font-semibold mt-3 text-yellow-500">
              Not Connected
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Emails Sent
            </p>

            <h2 className="text-2xl font-semibold mt-3">
              0
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Replies Received
            </p>

            <h2 className="text-2xl font-semibold mt-3">
              0
            </h2>

          </div>

        </div>

        <div className="max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold mb-4">
            Connect Gmail
          </h2>

          <p className="text-zinc-500 leading-relaxed mb-8">
            Securely connect your Gmail account
            using Google OAuth. Project22 will
            use this account to send job
            applications, recruiter follow-ups,
            and track responses automatically.
          </p>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 mb-8">

            <h3 className="font-medium mb-3">
              Permissions Required
            </h3>

            <ul className="space-y-2 text-zinc-400 text-sm">

              <li>
                • Send job application emails
              </li>

              <li>
                • Read recruiter replies
              </li>

              <li>
                • Track application status
              </li>

            </ul>

          </div>

          <button
            onClick={connectGmail}
            className="
              bg-white
              text-black
              px-6
              py-3
              rounded-xl
              font-medium
              hover:bg-zinc-200
              transition
            "
          >
            Connect Gmail
          </button>

        </div>

      </main>
    </div>
  );
}
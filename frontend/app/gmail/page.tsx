"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import Sidebar from "@/components/Sidebar";

export default function GmailPage() {
  const [connected, setConnected] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [emailsSent] =
    useState(0);

  const [replies] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response =
        await api.get("/gmail/profile");

      if (response.data.connected) {
        setConnected(true);
        setEmail(
          response.data.emailAddress
        );
      } else {
        setConnected(false);
        setEmail("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const connectGmail = async () => {
    try {
      const response =
        await api.get("/gmail/connect");

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

      <main className="flex-1 min-h-screen bg-black/40 backdrop-blur-xl text-white p-10">

        <div className="mb-12">

          <h1 className="text-5xl font-semibold tracking-tight">
            Gmail Integration
          </h1>

          <p className="text-zinc-500 mt-3">
            Connect Gmail so your AI Agent can
send personalized job application
emails from your mail account.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Gmail Status
            </p>

            <h2
              className={`text-2xl font-semibold mt-3 ${
                connected
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {loading
                ? "Loading..."
                : connected
                ? "Connected"
                : "Not Connected"}
            </h2>

            {connected && (
              <p className="text-zinc-400 mt-2 break-all">
                {email}
              </p>
            )}

          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Emails Sent
            </p>

            <h2 className="text-2xl font-semibold mt-3">
              {emailsSent}
            </h2>

          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Generated Mail
            </p>

            <h2 className="text-2xl font-semibold mt-3">
              {replies}
            </h2>

          </div>

        </div>

        <div className="max-w-5xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold mb-4">
            Gmail Account
          </h2>

          <p className="text-zinc-500 leading-relaxed mb-8">
            Securely connect your Gmail account
using Google OAuth. oneXjob only
uses your Gmail account to send
personalized job application emails
on your behalf. We do not read,
modify, or delete your emails.
          </p>

          <div className="bg-black/40 border border-zinc-800 rounded-xl p-5 mb-8">

            <h3 className="font-medium mb-4">
              Permissions Required
            </h3>

          <ul className="space-y-3 text-zinc-400 text-sm">
  <li>✅ Send job application emails</li>
  <li>✅ Secure Google OAuth authentication</li>
  {/* <li>✅ We do not read, modify, or delete your emails</li> */}
</ul>

          </div>

          {connected ? (

            <div>

              <div className="bg-green-900/20 border border-green-700 rounded-xl p-5 mb-6">

                <h3 className="text-green-400 font-semibold">
                  Gmail Connected Successfully
                </h3>

                <p className="text-zinc-300 mt-2">
                  Connected account:
                </p>

                <p className="text-white font-medium mt-1 break-all">
                  {email}
                </p>

              </div>

              <button
                disabled
                className="
                  bg-green-600
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  cursor-not-allowed
                "
              >
                Gmail Connected
              </button>

            </div>

          ) : (

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

          )}

        </div>

      </main>

    </div>
  );
}
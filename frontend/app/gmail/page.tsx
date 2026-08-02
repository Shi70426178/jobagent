"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import Sidebar from "@/components/Sidebar";
import { 
  Mail, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Trash2,
  ExternalLink 
} from "lucide-react";

export default function GmailPage() {
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [emailsSent] = useState(0);
  const [replies] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.get("/gmail/profile");

      if (response.data.connected) {
        setConnected(true);
        setEmail(response.data.emailAddress);
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
      const response = await api.get("/gmail/connect");
      window.location.href = response.data.auth_url;
    } catch (error) {
      console.error(error);
      alert("Failed to connect Gmail");
    }
  };

  const disconnectGmail = async () => {
    if (
      !confirm(
        "Are you sure you want to disconnect your Gmail account?"
      )
    ) {
      return;
    }

    try {
      await api.delete("/gmail/disconnect");
      setConnected(false);
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Failed to disconnect Gmail");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      {/* Main container fixed - no redundant pl-64 or mx-auto offsets */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 w-full pt-20 lg:pt-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs text-zinc-300 font-medium">Email Automation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Gmail Integration
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-2xl">
            Connect Gmail so your AI Agent can send personalized job application emails directly from your mail account.
          </p>
        </div>

        {/* Top 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-2xl p-6 transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                Gmail Status
              </p>
              <Mail className="h-4 w-4 text-cyan-400" />
            </div>

            <h2
              className={`text-2xl font-bold mt-3 flex items-center gap-2 ${
                loading
                  ? "text-zinc-400"
                  : connected
                  ? "text-emerald-400"
                  : "text-amber-400"
              }`}
            >
              {loading ? (
                "Loading..."
              ) : connected ? (
                <>
                  <CheckCircle2 className="h-5 w-5" /> Connected
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5" /> Not Connected
                </>
              )}
            </h2>

            {connected && (
              <p className="text-zinc-400 text-xs mt-2 truncate font-mono">
                {email}
              </p>
            )}
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-2xl p-6 transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                Emails Sent
              </p>
              <Send className="h-4 w-4 text-cyan-400" />
            </div>

            <h2 className="text-3xl font-black text-white mt-3">
              {emailsSent}
            </h2>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-2xl p-6 transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                Generated Mail
              </p>
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>

            <h2 className="text-3xl font-black text-white mt-3">
              {replies}
            </h2>
          </div>
        </div>

        {/* Main Section */}
        <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Gmail Account Configuration
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-3xl">
            Securely connect your Gmail account using Google OAuth. <span className="text-cyan-400 font-medium">oneXjob</span> only uses your Gmail account to send personalized job application emails on your behalf. We do not read, modify, or delete your emails.
          </p>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <h3 className="font-semibold text-white text-sm">
                Permissions Required
              </h3>
            </div>

            <ul className="space-y-2.5 text-zinc-400 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Send job application emails</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Secure Google OAuth authentication</span>
              </li>
            </ul>
          </div>

          {connected ? (
            <div>
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-5 mb-6">
                <h3 className="text-emerald-400 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Gmail Connected Successfully
                </h3>

                <p className="text-zinc-400 text-xs mt-2">
                  Connected account:
                </p>

                <p className="text-white font-mono text-sm font-semibold mt-0.5 break-all">
                  {email}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  disabled
                  className="
                    bg-emerald-500/20 text-emerald-300 border border-emerald-500/30
                    px-5 py-2.5 rounded-xl font-semibold text-sm
                    cursor-not-allowed flex items-center gap-2
                  "
                >
                  <CheckCircle2 className="h-4 w-4" /> Gmail Connected
                </button>

                <button
                  onClick={disconnectGmail}
                  className="
                    bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30
                    px-5 py-2.5 rounded-xl font-semibold text-sm
                    transition-all duration-200 flex items-center gap-2 active:scale-[0.98]
                  "
                >
                  <Trash2 className="h-4 w-4" /> Remove Gmail Account
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={connectGmail}
              className="
                bg-white text-black font-bold text-sm
                px-6 py-3 rounded-xl shadow-md
                hover:bg-zinc-200 transition-all duration-200 active:scale-[0.98]
                flex items-center gap-2
              "
            >
              <ExternalLink className="h-4 w-4" /> Connect Gmail
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
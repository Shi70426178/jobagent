"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Trash2,
  ExternalLink,
} from "lucide-react";

export default function GmailPage() {
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [emailsSent] = useState(0);
  const [replies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] =
    useState("");

  /* =====================================================
     CHECK GMAIL CONNECTION
  ===================================================== */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const gmailError =
      params.get("gmail_error");

    if (gmailError === "cancelled") {
      setConnectionError(
        "Gmail connection was cancelled. Please try again or use a different Gmail account."
      );
    } else if (
      gmailError === "connection_failed"
    ) {
      setConnectionError(
        "Unable to connect this Gmail account. Please try again or use a different Gmail account."
      );
    }

    loadProfile();
  }, []);

  /* =====================================================
     LOAD GMAIL PROFILE
  ===================================================== */

  const loadProfile = async () => {
    try {
      const response = await api.get(
        "/gmail/profile"
      );

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

  /* =====================================================
     CONNECT GMAIL
  ===================================================== */

  const connectGmail = async () => {
    try {
      setConnectionError("");

      const response = await api.get(
        "/gmail/connect"
      );

      if (!response.data?.auth_url) {
        setConnectionError(
          "Unable to connect Gmail. Please try again or use a different Gmail account."
        );

        return;
      }

      window.location.href =
        response.data.auth_url;
    } catch (error: any) {
      console.error(
        "Gmail connection error:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message;

      setConnectionError(
        message ||
          "Unable to connect this Gmail account. Please try again or use a different Gmail account."
      );
    }
  };

  /* =====================================================
     DISCONNECT GMAIL
  ===================================================== */

  const disconnectGmail = async () => {
    if (
      !confirm(
        "Are you sure you want to disconnect your Gmail account?"
      )
    ) {
      return;
    }

    try {
      await api.delete(
        "/gmail/disconnect"
      );

      setConnected(false);
      setEmail("");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to disconnect Gmail"
      );
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen w-full bg-white font-sans text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">

      <main className="w-full px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 sm:mb-10">

          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 dark:border-zinc-800 dark:bg-zinc-900">

            <Sparkles className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-300" />

            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              Email Automation
            </span>

          </div>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
            Gmail Integration
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
            Connect Gmail so your AI Agent can send
            personalized job application emails directly
            from your mail account.
          </p>

        </div>

        {/* =================================================
            METRIC CARDS
        ================================================= */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Gmail Status */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700">

            <div className="flex items-center justify-between">

              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Gmail Status
              </p>

              <Mail className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />

            </div>

            <h2
              className={`mt-3 flex items-center gap-2 text-2xl font-bold ${
                loading
                  ? "text-zinc-400"
                  : connected
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }`}
            >

              {loading ? (
                "Loading..."
              ) : connected ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Connected
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5" />
                  Not Connected
                </>
              )}

            </h2>

            {connected && (
              <p className="mt-2 truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {email}
              </p>
            )}

          </div>

          {/* Emails Sent */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700">

            <div className="flex items-center justify-between">

              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Emails Sent
              </p>

              <Send className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />

            </div>

            <h2 className="mt-3 text-3xl font-black text-zinc-900 dark:text-white">
              {emailsSent}
            </h2>

          </div>

          {/* Generated Mail */}

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700">

            <div className="flex items-center justify-between">

              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Generated Mail
              </p>

              <Sparkles className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />

            </div>

            <h2 className="mt-3 text-3xl font-black text-zinc-900 dark:text-white">
              {replies}
            </h2>

          </div>

        </div>

        {/* =================================================
            MAIN CONFIGURATION CARD
        ================================================= */}

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/40">

          {/* CONNECTION ERROR */}

          {connectionError && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">

              <div className="flex items-start gap-3">

                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />

                <div>

                  <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                    Gmail connection failed
                  </h3>

                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {connectionError}
                  </p>

                </div>

              </div>

            </div>
          )}

          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
            Gmail Account Configuration
          </h2>

          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">

            Securely connect your Gmail account using
            Google OAuth.{" "}

            <span className="font-medium text-zinc-800 dark:text-white">
              oneXjob
            </span>{" "}

            only uses your Gmail account to send
            personalized job application emails on your
            behalf. We do not read, modify, or delete
            your emails.

          </p>

          {/* =================================================
              PERMISSIONS
          ================================================= */}

          <div className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">

            <div className="mb-3 flex items-center gap-2">

              <ShieldCheck className="h-4 w-4 text-zinc-500 dark:text-zinc-300" />

              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                Permissions Required
              </h3>

            </div>

            <ul className="space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">

              <li className="flex items-center gap-2">

                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

                <span>
                  Send job application emails
                </span>

              </li>

              <li className="flex items-center gap-2">

                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

                <span>
                  Secure Google OAuth authentication
                </span>

              </li>

            </ul>

          </div>

          {/* =================================================
              CONNECTED STATE
          ================================================= */}

          {connected ? (
            <div>

              <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-950/30">

                <h3 className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">

                  <CheckCircle2 className="h-4 w-4" />

                  Gmail Connected Successfully

                </h3>

                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Connected account:
                </p>

                <p className="mt-0.5 break-all font-mono text-sm font-semibold text-zinc-900 dark:text-white">
                  {email}
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                {/* Connected Button */}

                <button
                  disabled
                  className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-300"
                >

                  <CheckCircle2 className="h-4 w-4" />

                  Gmail Connected

                </button>

                {/* Disconnect */}

                <button
                  onClick={disconnectGmail}
                  className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-[0.98] dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >

                  <Trash2 className="h-4 w-4" />

                  Remove Gmail Account

                </button>

              </div>

            </div>
          ) : (

            /* =================================================
               DISCONNECTED STATE
            ================================================= */

            <button
              onClick={connectGmail}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-zinc-700 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >

              <ExternalLink className="h-4 w-4" />

              Connect Gmail

            </button>

          )}

        </div>

      </main>

    </div>
  );
}
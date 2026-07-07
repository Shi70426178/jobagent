"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  BadgeCheck,
  Calendar,
  BriefcaseBusiness,
  MailCheck,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { api } from "@/lib/axios";

interface UserProfile {
  id: number;
  email: string;
  full_name: string | null;

  account_type?: string;
  created_at?: string;
  last_login?: string;
  location?: string;

  applications_sent?: number;
  resumes_uploaded?: number;

  gmail_connected?: boolean;
  gmail_email?: string;

}

export default function Page() {
  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailEmail, setGmailEmail] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [jobsFound, setJobsFound] = useState(0);
  const [applicationsSent, setApplicationsSent] = useState(0);
  const [loading, setLoading] = useState(true);
  const loadProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfile(res.data);
    } finally {
      setLoading(false);
    }
  };
  const completionFields = [
    profile?.full_name,
    profile?.email,
    gmailConnected,
    profile?.location,
  ];

  const completion =
    Math.round(
      (completionFields.filter(Boolean).length /
        completionFields.length) *
      100
    );
  const loadStats = async () => {
    try {
      const res = await api.get("/stats");

      setJobsFound(res.data.jobs_found);
      setApplicationsSent(res.data.applications_sent);
    } catch (err) {
      console.error(err);
    }
  };

  const loadGmail = async () => {
    try {
      const res = await api.get("/gmail/profile");

      if (res.data.connected) {
        setGmailConnected(true);
        setGmailEmail(res.data.emailAddress);
      } else {
        setGmailConnected(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadProfile();
    loadStats();
    loadGmail();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-transparent text-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-zinc-400 text-lg">Loading profile...</p>
        </main>
      </div>
    );
  }

  const initial = (profile?.full_name ?? profile?.email ?? "U").charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-transparent text-white">
      <Sidebar />

      <main className="flex-1 px-6 lg:px-10 py-8">

        {/* Header */}

        <div className="flex justify-between items-start mb-8">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 mb-5">

              <User className="h-4 w-4 text-cyan-400" />

              <span className="text-xs tracking-wide text-cyan-300">
                Account Information
              </span>

            </div>

            <h1 className="text-5xl font-black tracking-tight">
              My Profile
            </h1>

            <p className="mt-4 text-zinc-400 text-lg">
              Manage your personal information and connected accounts.
            </p>

          </div>

          {/* Floating Profile */}

          <div
            className="
      hidden
      lg:flex
      items-center
      gap-4
      rounded-2xl
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      px-6
      py-4
      shadow-[0_0_30px_rgba(6,182,212,.12)]
      hover:border-cyan-500/30
      transition-all
      duration-300
      "
          >

            <div
              className="
        w-14
        h-14
        rounded-full
        bg-gradient-to-br
        from-cyan-400
        to-blue-600
        flex
        items-center
        justify-center
        text-xl
        font-bold
        "
            >
              {initial}
            </div>

            <div>

              <h2 className="text-xl font-bold">
                {profile?.full_name || "User"}
              </h2>

              <p className="text-zinc-400 text-sm">
                {profile?.email}
              </p>

            </div>

          </div>

        </div>

        {/* Main Card */}

        <div
          className="
    rounded-3xl
    overflow-hidden
    border
    border-white/10
    bg-white/[0.03]
    backdrop-blur-2xl
    shadow-[0_0_40px_rgba(0,0,0,.35)]
    "
        ></div>

        {/* Gradient */}

        <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"></div>

        <div className="p-6">

          {/* Top Info */}

          <div className="flex items-center gap-5">

            <div
              className="
          w-20
          h-20
          rounded-full
          bg-gradient-to-br
          from-cyan-400
          to-blue-600
          flex
          items-center
          justify-center
          text-3xl
          font-bold
          shadow-[0_0_35px_rgba(6,182,212,.35)]
          "
            >
              {initial}
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {profile?.full_name || "User"}
              </h2>

              <p className="text-cyan-400">
                Software Developer
              </p>

              <p className="text-zinc-400">
                {profile?.email}
              </p>

            </div>

          </div>

          {/* Three Cards */}


          {/* ===================== TOP 3 CARDS ===================== */}

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            {/* User ID */}

            <div
              className="
    relative
    overflow-hidden
    rounded-2xl
    border
    border-cyan-500/30
    bg-gradient-to-br
    from-cyan-500/10
    to-slate-900
    p-6
    cursor-pointer
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-cyan-400
    hover:shadow-[0_0_30px_rgba(6,182,212,.25)]
    "
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center">

                  <User className="h-7 w-7 text-cyan-400" />

                </div>

                <div>

                  <p className="text-zinc-400 text-sm">
                    User ID
                  </p>

                  <h2 className="text-4xl font-black mt-1">
                    #{profile?.id}
                  </h2>

                </div>

              </div>

              <div className="absolute right-5 bottom-5 text-cyan-500/20 text-4xl">
                •••
              </div>

            </div>



            {/* Email */}

            <div
              className="
    relative
    overflow-hidden
    rounded-2xl
    border
    border-purple-500/30
    bg-gradient-to-br
    from-purple-500/10
    to-slate-900
    p-6
    cursor-pointer
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-purple-400
    hover:shadow-[0_0_30px_rgba(168,85,247,.25)]
    "
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">

                  <Mail className="h-7 w-7 text-purple-400" />

                </div>

                <div>

                  <p className="text-zinc-400 text-sm">
                    Email
                  </p>

                  <h2 className="text-lg font-bold mt-1 break-all">
                    {profile?.email}
                  </h2>

                </div>

              </div>

              <div className="absolute right-5 bottom-5 text-purple-500/20 text-4xl">
                •••
              </div>

            </div>



            {/* Full Name */}

            <div
              className="
    relative
    overflow-hidden
    rounded-2xl
    border
    border-orange-500/30
    bg-gradient-to-br
    from-orange-500/10
    to-slate-900
    p-6
    cursor-pointer
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-orange-400
    hover:shadow-[0_0_30px_rgba(249,115,22,.25)]
    "
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center">

                  <BadgeCheck className="h-7 w-7 text-orange-400" />

                </div>

                <div>

                  <p className="text-zinc-400 text-sm">
                    Full Name
                  </p>

                  <h2 className="text-3xl font-bold mt-1">
                    {profile?.full_name || "User"}
                  </h2>

                </div>

              </div>

              <div className="absolute right-5 bottom-5 text-orange-500/20 text-4xl">
                •••
              </div>

            </div>

          </div>
          {/* ===================== DETAILS CARD ===================== */}

          <div
            className="
  mt-8
  rounded-3xl
  border
  border-white/10
  bg-white/[0.03]
  backdrop-blur-xl
  p-8
  "
          >

            <div className="grid lg:grid-cols-2 gap-10">

              {/* LEFT */}

              <div className="space-y-8">

                {/* Registered */}

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center">

                    <Calendar className="w-6 h-6 text-cyan-400" />

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Registered On
                    </p>

                    <h3 className="text-xl font-semibold">
                      -
                    </h3>

                  </div>

                </div>

                <div className="border-t border-white/10"></div>

                {/* Account */}

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center">

                    <BriefcaseBusiness className="w-6 h-6 text-indigo-400" />

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Account Type
                    </p>

                    <h3 className="text-xl font-semibold">
                      {profile?.account_type ?? "User"}
                    </h3>

                  </div>

                </div>

                <div className="border-t border-white/10"></div>

                {/* Email */}

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">

                    <MailCheck className="w-6 h-6 text-green-400" />

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Email Verified
                    </p>

                    <h3 className="text-xl font-semibold text-green-400">
                      {gmailConnected ? "Yes" : "No"}
                    </h3>

                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div className="space-y-8">

                {/* Last Login */}

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center">

                    🕒

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Last Login
                    </p>

                    <h3 className="text-xl font-semibold">
                      {profile?.last_login
                        ? new Date(profile.last_login).toLocaleString()
                        : "Never"}                      </h3>

                  </div>

                </div>

                <div className="border-t border-white/10"></div>

                {/* Preferred */}

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">

                    🌍

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Preferred Location
                    </p>

                    <h3 className="text-xl font-semibold">
                      {profile?.location ?? "Not Set"}
                    </h3>

                  </div>

                </div>

                <div className="border-t border-white/10"></div>

                {/* Member */}

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center">

                    📅

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Member Since
                    </p>

                    <h3 className="text-xl font-semibold">
                      {profile?.created_at
                        ? new Date(profile.created_at).toLocaleDateString()
                        : "-"}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>
          {/* ===================== STATISTICS ===================== */}

          <div className="mt-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Dashboard Statistics
                </h2>

                <p className="text-zinc-400">
                  Overview of your account activity
                </p>

              </div>

            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">

              {/* Applications */}

              <div
                className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/20
      bg-gradient-to-br
      from-cyan-500/10
      via-slate-900
      to-slate-950
      p-6
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-cyan-400
      hover:shadow-[0_0_30px_rgba(6,182,212,.25)]
      "
              >

                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-cyan-500/10 blur-3xl"></div>

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                  📄

                </div>

                <h2 className="mt-6 text-4xl font-black text-cyan-400">
                  {applicationsSent}
                </h2>

                <p className="mt-2 text-zinc-300">
                  Applications
                </p>

              </div>

              {/* Resume */}

              <div
                className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-green-500/20
      bg-gradient-to-br
      from-green-500/10
      via-slate-900
      to-slate-950
      p-6
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-green-400
      hover:shadow-[0_0_30px_rgba(34,197,94,.25)]
      "
              >

                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-green-500/10 blur-3xl"></div>

                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">

                  📁

                </div>

                <h2 className="mt-6 text-4xl font-black text-green-400">
                  {profile?.resumes_uploaded ?? 0}
                </h2>

                <p className="mt-2 text-zinc-300">
                  Resumes
                </p>

              </div>

              {/* Gmail */}

              <div
                className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-purple-500/20
      bg-gradient-to-br
      from-purple-500/10
      via-slate-900
      to-slate-950
      p-6
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-purple-400
      hover:shadow-[0_0_30px_rgba(168,85,247,.25)]
      "
              >

                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-purple-500/10 blur-3xl"></div>

                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">

                  <Mail className="h-7 w-7 text-purple-400" />

                </div>

                <h3 className="mt-6 text-xl font-bold text-purple-300">
                  {gmailConnected ? "Connected" : "Not Connected"}
                </h3>

                <p className="mt-2 text-zinc-400">
                  {gmailConnected ? gmailEmail : "Gmail"}
                </p>

              </div>

            

            </div>

          </div>
          {/* ===================== BOTTOM SECTION ===================== */}

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            {/* ================= QUICK ACTIONS ================= */}
            <div
              className="
  rounded-3xl
  border
  border-white/10
  bg-white/[0.03]
  backdrop-blur-xl
  p-8
  "
            >

              <h2 className="text-2xl font-bold mb-2">
                Quick Actions
              </h2>

              <p className="text-zinc-400 mb-8">
                Manage your account.
              </p>

              <div className="space-y-4">

                {/* Edit */}

                <button
                  className="
      w-full
      flex
      justify-between
      items-center
      rounded-2xl
      bg-cyan-500/10
      border
      border-cyan-500/20
      px-6
      py-5
      hover:bg-cyan-500/20
      hover:border-cyan-400
      transition-all
      "
                >

                  <span className="flex items-center gap-3">

                    ✏️

                    Edit Profile

                  </span>

                  →

                </button>

                {/* Gmail */}

                <button
                  onClick={() => window.location.href = "/gmail"}
                  className="
      w-full
      flex
      justify-between
      items-center
      rounded-2xl
      border
      px-6
      py-5
      transition-all
      hover:-translate-y-1
      hover:shadow-lg

      bg-purple-500/10
      border-purple-500/20
      hover:border-purple-400
      "
                >

                  <span className="flex items-center gap-3">

                    <Mail className="h-5 w-5" />

                    {gmailConnected
                      ? "Manage Gmail"
                      : "Connect Gmail"}

                  </span>

                  {gmailConnected ? "✓" : "→"}

                </button>

              

                {/* Password */}

                <button
                  className="
      w-full
      flex
      justify-between
      items-center
      rounded-2xl
      bg-indigo-500/10
      border
      border-indigo-500/20
      px-6
      py-5
      hover:border-indigo-400
      transition-all
      hover:-translate-y-1
      "
                >

                  <span className="flex items-center gap-3">

                    🔒

                    Change Password

                  </span>

                  →

                </button>

              </div>

            </div>




            {/* ================= PROFILE COMPLETION ================= */}

            <div
              className="
  rounded-3xl
  border
  border-white/10
  bg-white/[0.03]
  backdrop-blur-xl
  p-8
  "
            >
              <h2 className="text-2xl font-bold">
                Profile Completion
              </h2>

              <p className="text-zinc-400 mt-2">
                Complete your profile to unlock all AI features.
              </p>

              {/* Progress */}

              <div className="mt-8">

                <div className="flex justify-between mb-3">

                  <span className="text-zinc-300">
                    Completion
                  </span>

                  <span className="text-cyan-400 font-bold">
                    {completion}%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${completion}%` }}
                  />

                </div>

              </div>

              {/* Connected Accounts */}

              <div className="grid grid-cols-2 gap-4 mt-10">

                {/* Gmail */}

                <div
                  className="
      rounded-2xl
      border
      border-purple-500/20
      bg-purple-500/10
      p-5
      text-center
      transition-all
      hover:-translate-y-1
      hover:border-purple-400
      "
                >

                  <Mail className="mx-auto mb-3 h-7 w-7 text-purple-400" />

                  <p className="font-semibold">
                    Gmail
                  </p>

                  <span
                    className={`text-sm ${gmailConnected
                        ? "text-green-400"
                        : "text-zinc-400"
                      }`}
                  >
                    {gmailConnected
                      ? "Connected"
                      : "Not Connected"}
                  </span>

                </div>

              </div>

              {/* Status */}

              <div
                className={`
      mt-8
      rounded-2xl
      p-5
      border
      ${completion === 100
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-cyan-500/20 bg-cyan-500/10"
                  }
    `}
              >

                <p
                  className={`font-semibold ${completion === 100
                      ? "text-green-400"
                      : "text-cyan-400"
                    }`}
                >
                  {completion === 100
                    ? "🎉 Profile Completed!"
                    : "Complete your profile"}
                </p>

                <p className="text-zinc-400 text-sm mt-2">
                  {completion === 100
                    ? "Your account is ready to use all AI features."
                    : "Complete the remaining profile details to unlock everything."}
                </p>

              </div>

            </div>
            {/* Bottom Section */}

          </div> {/* p-6 */}

        </div> {/* Glass Card */}

      </main>

    </div>

  );
}
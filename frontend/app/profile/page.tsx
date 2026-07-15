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
function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">

      <div className="text-cyan-400 mt-1">
        {icon}
      </div>

      <div>

        <p className="text-sm text-zinc-500">
          {label}
        </p>

        <p className="text-white mt-1">
          {value || (
            <span className="text-zinc-500">
              Not Available
            </span>
          )}
        </p>

      </div>

    </div>
  );
}
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

     {/* Main Profile Card */}

<div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,.35)]">

  {/* Top Gradient */}
  <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />

  <div className="p-8">

    {/* Profile Completion */}

    <div className="mb-10">

      <div className="flex justify-between items-center mb-3">

        <div>

          <h3 className="text-xl font-semibold">
            Profile Completion
          </h3>

          <p className="text-sm text-zinc-400">
            Complete your profile for better AI job matches.
          </p>

        </div>

        <span className="text-cyan-400 font-bold text-xl">
          {completion}%
        </span>

      </div>

      <div className="w-full bg-zinc-800 rounded-full h-2">

        <div
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
          style={{ width: `${completion}%` }}
        />

      </div>

    </div>

    {/* Information */}

    <div className="grid md:grid-cols-2 gap-8">

      {/* Personal */}

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

        <h3 className="text-lg font-semibold mb-6">
          Personal Information
        </h3>

        <div className="space-y-5">


          <ProfileItem
            icon={<Mail size={18} />}
            label="Email"
            value={profile?.email}
          />

          <ProfileItem
            icon={<Calendar size={18} />}
            label="Location"
            value={profile?.location}
          />

        </div>

      </div>

      {/* Connected */}

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

        <h3 className="text-lg font-semibold mb-6">
          Account Overview
        </h3>

        <div className="space-y-5">

        

          <ProfileItem
            icon={<BriefcaseBusiness size={18} />}
            label="Applications Sent"
            value={applicationsSent}
          />

          <ProfileItem
            icon={<BadgeCheck size={18} />}
            label="Jobs Found"
            value={jobsFound}
          />

        
        </div>

      </div>

    </div>

    {/* About */}

    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">

      <h3 className="text-lg font-semibold mb-4">
        About
      </h3>

      <p className="text-zinc-400 leading-7">
        Complete your professional profile to improve AI-powered job
        recommendations. Keeping your location, skills and account
        information updated helps us match you with the most relevant
        opportunities.
      </p>

    </div>

  </div>

</div>

      </main>

    </div>

  );
}
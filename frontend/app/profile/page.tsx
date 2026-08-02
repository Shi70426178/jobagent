"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  BadgeCheck,
  MapPin,
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { api } from "@/lib/axios";

interface UserProfile {
  id: number;
  email: string;
  full_name: string | null;
  account_type?: string;
  location?: string;
}

function ProfileItem({
  icon,
  label,
  value,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/60 transition">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-xs text-zinc-400 font-medium">{label}</p>
          <div className="text-sm font-semibold text-zinc-100 mt-0.5">
            {value || <span className="text-zinc-500 font-normal">Not Provided</span>}
          </div>
        </div>
      </div>
      {badge && <div>{badge}</div>}
    </div>
  );
}

export default function Page() {
  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailEmail, setGmailEmail] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [jobsFound, setJobsFound] = useState(0);
  const [applicationsSent, setApplicationsSent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await api.get("/stats");
      setJobsFound(res.data.jobs_found || 0);
      setApplicationsSent(res.data.applications_sent || 0);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const loadGmail = async () => {
    try {
      const res = await api.get("/gmail/profile");
      if (res.data?.connected) {
        setGmailConnected(true);
        setGmailEmail(res.data.emailAddress || "");
      } else {
        setGmailConnected(false);
      }
    } catch (err) {
      console.error("Failed to load Gmail status:", err);
    }
  };

  const refreshAll = async () => {
    setRefreshing(true);
    await Promise.all([loadProfile(), loadStats(), loadGmail()]);
    setRefreshing(false);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const completionFields = [
    profile?.full_name,
    profile?.email,
    gmailConnected,
    profile?.location,
  ];

  const completion = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100
  );

  const initial = (profile?.full_name ?? profile?.email ?? "U")
    .charAt(0)
    .toUpperCase();

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black text-zinc-100">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-3 text-zinc-400">
            <RefreshCw className="animate-spin" size={20} />
            <span className="text-sm font-medium">Loading profile...</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-zinc-100 font-sans">
      <Sidebar />

      <main className="flex-1 p-8 w-full bg-black">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-zinc-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Account Settings
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                <ShieldCheck size={12} />
                Verified
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              Manage your personal overview, sync integrations, and track activity stats.
            </p>
          </div>

          <button
            onClick={refreshAll}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition shadow-sm"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Sync Data"}
          </button>
        </div>

        {/* User Identity Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 mb-6">
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-2xl font-bold text-white">
                  {initial}
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-zinc-400 border-2 border-black" title="Active" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  {profile?.full_name || "Welcome User"}
                </h2>
                <p className="text-sm text-zinc-400 flex items-center gap-1.5 mt-0.5">
                  <Mail size={14} className="text-zinc-500" />
                  {profile?.email}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-medium border border-zinc-700/50">
                    {profile?.account_type || "Pro Tier"}
                  </span>
                  {profile?.location && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-medium border border-zinc-700/50 flex items-center gap-1">
                      <MapPin size={10} />
                      {profile.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Block */}
            <div className="w-full md:w-auto flex items-center gap-4 bg-black border border-zinc-800/80 rounded-xl p-3.5 px-6">
              <div className="text-center px-2">
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Jobs Found</p>
                <p className="text-xl font-bold text-white">{jobsFound}</p>
              </div>
              <div className="h-7 w-[1px] bg-zinc-800" />
              <div className="text-center px-2">
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Applications</p>
                <p className="text-xl font-bold text-zinc-200">{applicationsSent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-zinc-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Profile Completeness
              </h3>
            </div>
            <span className="text-xs font-bold text-zinc-300">{completion}%</span>
          </div>

          <div className="w-full bg-black rounded-full h-2 p-0.5 border border-zinc-800">
            <div
              className="bg-zinc-300 h-1 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <User size={16} className="text-zinc-400" />
              Personal Information
            </h3>
            <div className="space-y-2.5">
              <ProfileItem icon={<User size={15} />} label="Full Name" value={profile?.full_name} />
              <ProfileItem icon={<Mail size={15} />} label="Primary Email" value={profile?.email} />
              <ProfileItem icon={<MapPin size={15} />} label="Location" value={profile?.location} />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <BadgeCheck size={16} className="text-zinc-400" />
              Integrations & Activity
            </h3>
            <div className="space-y-2.5">
              <ProfileItem
                icon={<Mail size={15} />}
                label="Gmail Integration"
                value={gmailConnected ? (gmailEmail || "Connected") : "Disconnected"}
                badge={
                  gmailConnected ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-700">
                      <CheckCircle2 size={12} /> Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
                      <XCircle size={12} /> Not Linked
                    </span>
                  )
                }
              />
              <ProfileItem icon={<BriefcaseBusiness size={15} />} label="Applications Submitted" value={`${applicationsSent} Applications`} />
              <ProfileItem icon={<BadgeCheck size={15} />} label="Opportunities Identified" value={`${jobsFound} Positions`} />
            </div>
          </div>
        </div>

        {/* AI Tip Banner */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700/50 shrink-0 hidden sm:block">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white mb-0.5">
                AI Match Optimization Tip
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Your profile information directly feeds into our AI recruiter agent. Keeping your locations, skills, and target positions precise directly leads to higher email response rates and tailored recommendations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
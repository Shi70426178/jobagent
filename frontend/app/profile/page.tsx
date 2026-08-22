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
    <div className="flex items-start justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700/60">
      <div className="flex items-start gap-3.5">
        <div className="shrink-0 rounded-lg border border-zinc-200 bg-white p-2 text-zinc-500 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:text-zinc-300">
          {icon}
        </div>

        <div>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {label}
          </p>

          <div className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {value || (
              <span className="font-normal text-zinc-400 dark:text-zinc-500">
                Not Provided
              </span>
            )}
          </div>
        </div>
      </div>

      {badge && <div>{badge}</div>}
    </div>
  );
}

export default function Page() {
  const [gmailConnected, setGmailConnected] =
    useState(false);

  const [gmailEmail, setGmailEmail] =
    useState("");

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [jobsFound, setJobsFound] =
    useState(0);

  const [applicationsSent, setApplicationsSent] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  /* =====================================================
     LOAD PROFILE
  ===================================================== */

  const loadProfile = async () => {
    try {
      const res = await api.get("/auth/me");

      setProfile(res.data);
    } catch (err) {
      console.error(
        "Failed to load profile:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOAD STATS
  ===================================================== */

  const loadStats = async () => {
    try {
      const res = await api.get("/stats");

      setJobsFound(
        res.data.jobs_found || 0
      );

      setApplicationsSent(
        res.data.applications_sent || 0
      );
    } catch (err) {
      console.error(
        "Failed to load stats:",
        err
      );
    }
  };

  /* =====================================================
     LOAD GMAIL
  ===================================================== */

  const loadGmail = async () => {
    try {
      const res = await api.get(
        "/gmail/profile"
      );

      if (res.data?.connected) {
        setGmailConnected(true);

        setGmailEmail(
          res.data.emailAddress || ""
        );
      } else {
        setGmailConnected(false);
      }
    } catch (err) {
      console.error(
        "Failed to load Gmail status:",
        err
      );
    }
  };

  /* =====================================================
     REFRESH EVERYTHING
  ===================================================== */

  const refreshAll = async () => {
    setRefreshing(true);

    await Promise.all([
      loadProfile(),
      loadStats(),
      loadGmail(),
    ]);

    setRefreshing(false);
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    refreshAll();
  }, []);

  /* =====================================================
     PROFILE COMPLETION
  ===================================================== */

  const completionFields = [
    profile?.full_name,
    profile?.email,
    gmailConnected,
    profile?.location,
  ];

  const completion = Math.round(
    (completionFields.filter(Boolean)
      .length /
      completionFields.length) *
      100
  );

  /* =====================================================
     INITIAL
  ===================================================== */

  const initial = (
    profile?.full_name ??
    profile?.email ??
    "U"
  )
    .charAt(0)
    .toUpperCase();

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
        <main className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <RefreshCw
              className="animate-spin"
              size={20}
            />

            <span className="text-sm font-medium">
              Loading profile...
            </span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white font-sans text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-zinc-100">

      <main className="w-full bg-white p-5 sm:p-6 lg:p-8 dark:bg-black">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center dark:border-zinc-800/80">

          <div>

            <div className="flex items-center gap-2">

              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                Account Settings
              </h1>

              <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-300">

                <ShieldCheck size={12} />

                Verified

              </span>

            </div>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage your personal overview, sync integrations, and track activity stats.
            </p>

          </div>

          <button
            onClick={refreshAll}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
          >

            <RefreshCw
              size={14}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Sync Data"}

          </button>

        </div>

        {/* =================================================
            USER IDENTITY
        ================================================= */}

        <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">

          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

            <div className="flex items-center gap-4">

              <div className="relative">

                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-2xl font-bold text-zinc-900 dark:border-zinc-700/80 dark:bg-zinc-800 dark:text-white">
                  {initial}
                </div>

                <div
                  className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-black"
                  title="Active"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {profile?.full_name ||
                    "Welcome User"}
                </h2>

                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">

                  <Mail
                    size={14}
                    className="text-zinc-400 dark:text-zinc-500"
                  />

                  {profile?.email}

                </p>

                <div className="mt-2 flex flex-wrap gap-2">

                  <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-300">
                    {profile?.account_type ||
                      "Pro Tier"}
                  </span>

                  {profile?.location && (
                    <span className="flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-300">

                      <MapPin size={10} />

                      {profile.location}

                    </span>
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div className="flex w-full items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 px-6 dark:border-zinc-800/80 dark:bg-black">

              <div className="px-2 text-center">

                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Jobs Found
                </p>

                <p className="text-xl font-bold text-zinc-900 dark:text-white">
                  {jobsFound}
                </p>

              </div>

              <div className="h-7 w-px bg-zinc-200 dark:bg-zinc-800" />

              <div className="px-2 text-center">

                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Applications
                </p>

                <p className="text-xl font-bold text-zinc-700 dark:text-zinc-200">
                  {applicationsSent}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            PROFILE COMPLETION
        ================================================= */}

        <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">

          <div className="mb-2 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Sparkles
                size={15}
                className="text-zinc-500 dark:text-zinc-400"
              />

              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                Profile Completeness
              </h3>

            </div>

            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
              {completion}%
            </span>

          </div>

          <div className="h-2 w-full rounded-full border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-black">

            <div
              className="h-1 rounded-full bg-zinc-800 transition-all duration-500 dark:bg-zinc-300"
              style={{
                width: `${completion}%`,
              }}
            />

          </div>

        </div>

        {/* =================================================
            INFO GRID
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Personal Information */}

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/30">

            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">

              <User
                size={16}
                className="text-zinc-500 dark:text-zinc-400"
              />

              Personal Information

            </h3>

            <div className="space-y-2.5">

              <ProfileItem
                icon={
                  <User size={15} />
                }
                label="Full Name"
                value={
                  profile?.full_name
                }
              />

              <ProfileItem
                icon={
                  <Mail size={15} />
                }
                label="Primary Email"
                value={
                  profile?.email
                }
              />

              <ProfileItem
                icon={
                  <MapPin size={15} />
                }
                label="Location"
                value={
                  profile?.location
                }
              />

            </div>

          </div>

          {/* Integrations */}

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/30">

            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">

              <BadgeCheck
                size={16}
                className="text-zinc-500 dark:text-zinc-400"
              />

              Integrations & Activity

            </h3>

            <div className="space-y-2.5">

              <ProfileItem
                icon={
                  <Mail size={15} />
                }
                label="Gmail Integration"
                value={
                  gmailConnected
                    ? gmailEmail ||
                      "Connected"
                    : "Disconnected"
                }
                badge={
                  gmailConnected ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">

                      <CheckCircle2
                        size={12}
                      />

                      Connected

                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">

                      <XCircle
                        size={12}
                      />

                      Not Linked

                    </span>
                  )
                }
              />

              <ProfileItem
                icon={
                  <BriefcaseBusiness
                    size={15}
                  />
                }
                label="Applications Submitted"
                value={`${applicationsSent} Applications`}
              />

              <ProfileItem
                icon={
                  <BadgeCheck size={15} />
                }
                label="Opportunities Identified"
                value={`${jobsFound} Positions`}
              />

            </div>

          </div>

        </div>

        {/* =================================================
            AI TIP
        ================================================= */}

        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/30">

          <div className="flex items-start gap-3">

            <div className="hidden shrink-0 rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-zinc-500 sm:block dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-400">

              <Sparkles size={16} />

            </div>

            <div>

              <h3 className="mb-0.5 text-xs font-bold text-zinc-900 dark:text-white">
                AI Match Optimization Tip
              </h3>

              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Your profile information directly feeds into our AI recruiter agent. Keeping your locations, skills, and target positions precise directly leads to higher email response rates and tailored recommendations.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
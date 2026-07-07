"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { api } from "@/lib/axios";

interface UserProfile {
  id: number;
  email: string;
  full_name: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [gmailConnected, setGmailConnected] =
  useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

const fetchProfile = async () => {
  try {

    const [profileRes, gmailRes] =
      await Promise.all([
        api.get("/auth/me"),
        api.get("/gmail/profile"),
      ]);

    setProfile(profileRes.data);

    setGmailConnected(
      gmailRes.data.connected
    );

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }
};

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen bg-black/40 backdrop-blur-xl text-white p-10">

          <div className="animate-pulse">

            <div className="h-12 w-64 rounded-xl bg-zinc-800 mb-8" />

            <div className="h-64 rounded-2xl bg-zinc-900/60 border border-zinc-800" />

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="flex">

      <Sidebar />

      <main className="flex-1 min-h-screen bg-black/40 backdrop-blur-xl text-white p-10">

        {/* Header */}

        <div className="mb-12">

          <h1 className="text-5xl font-semibold tracking-tight">
            My Profile
          </h1>

          <p className="text-zinc-500 mt-3">
            Manage your account information,
            connected services and security
            settings.
          </p>

        </div>

        {/* Profile Card */}

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center gap-8">

            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-5xl font-bold">

              {(profile?.full_name ??
                profile?.email ??
                "U")
                .charAt(0)
                .toUpperCase()}

            </div>

            <div className="flex-1">

              <h2 className="text-3xl font-semibold">

                {profile?.full_name ||
                  "User"}

              </h2>

              <p className="text-zinc-400 mt-2">

                {profile?.email}

              </p>

              <div className="flex gap-3 mt-6">

                <button className="bg-cyan-500 hover:bg-cyan-400 transition text-black font-medium px-6 py-3 rounded-xl">

                  Edit Profile

                </button>

                <button className="border border-zinc-700 hover:border-zinc-600 px-6 py-3 rounded-xl transition">

                  Change Password

                </button>

              </div>

            </div>

          </div>

        </div>

                {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Applications
            </p>

            <h2 className="text-3xl font-semibold mt-3">
              0
            </h2>

          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Gmail
            </p>

          <h2
  className={`text-2xl font-semibold mt-3 ${
    gmailConnected
      ? "text-green-500"
      : "text-yellow-400"
  }`}
>
  {gmailConnected
    ? "Connected"
    : "Not Connected"}
</h2>

          </div>

          {/* <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              LinkedIn
            </p>

            <h2 className="text-2xl font-semibold mt-3 text-yellow-400">
              Not Connected
            </h2>

          </div> */}

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Account Type
            </p>

            <h2 className="text-2xl font-semibold mt-3">
              User
            </h2>

          </div>

        </div>

        {/* Account Information */}

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-8">

            Account Information

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-black/40 border border-zinc-800 rounded-xl p-5">

              <p className="text-zinc-500 text-sm">

                User ID

              </p>

              <h3 className="text-xl font-semibold mt-2">

                #{profile?.id}

              </h3>

            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-xl p-5">

              <p className="text-zinc-500 text-sm">

                Full Name

              </p>

              <h3 className="text-xl font-semibold mt-2">

                {profile?.full_name ||
                  "Not Provided"}

              </h3>

            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-xl p-5">

              <p className="text-zinc-500 text-sm">

                Email Address

              </p>

              <h3 className="text-xl font-semibold mt-2 break-all">

                {profile?.email}

              </h3>

            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-xl p-5">

              <p className="text-zinc-500 text-sm">

                Email Status

              </p>

              <h3 className="text-xl font-semibold mt-2 text-green-500">

                Verified

              </h3>

            </div>

          </div>

        </div>

                {/* Connected Services */}

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-8">
            Connected Services
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-black/40 border border-zinc-800 rounded-xl p-6 flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Gmail
                </p>

              <h3
  className={`text-xl font-semibold mt-2 ${
    gmailConnected
      ? "text-green-500"
      : ""
  }`}
>
  {gmailConnected
    ? "Connected"
    : "Not Connected"}
</h3>

                <p className="text-zinc-500 mt-2">
                  Connect your Gmail account to
                  send AI generated job
                  applications.
                </p>

              </div>

              <span
  className={`px-4 py-2 rounded-full text-sm ${
    gmailConnected
      ? "bg-green-500/20 text-green-400"
      : "bg-yellow-500/20 text-yellow-400"
  }`}
>
  {gmailConnected
    ? "Active"
    : "Inactive"}
</span>

            </div>

            {/* <div className="bg-black/40 border border-zinc-800 rounded-xl p-6 flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  LinkedIn
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  Not Connected
                </h3>

                <p className="text-zinc-500 mt-2">
                  Connect LinkedIn for AI
                  powered job applications.
                </p>

              </div>

              <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                Inactive
              </span>

            </div> */}

          </div>

        </div>

        {/* Security */}

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-8">
            Security
          </h2>

          <div className="space-y-5">

            <div className="bg-black/40 border border-zinc-800 rounded-xl p-5 flex justify-between items-center">

              <div>

                <h3 className="font-semibold">
                  Change Password
                </h3>

                <p className="text-zinc-500 mt-1">
                  Update your account password.
                </p>

              </div>

              <button className="border border-zinc-700 hover:border-zinc-600 px-5 py-2 rounded-xl transition">

                Change

              </button>

            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-xl p-5 flex justify-between items-center">

              <div>

                <h3 className="font-semibold">
                  Email Verification
                </h3>

                <p className="text-zinc-500 mt-1">
                  Your email has been verified.
                </p>

              </div>

              <span className="text-green-500 font-medium">
                Verified
              </span>

            </div>

          </div>

        </div>
                {/* Danger Zone */}

        

      </main>

    </div>
  );
}
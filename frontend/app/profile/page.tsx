"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { api } from "@/lib/axios";

interface UserProfile {
  id: number;
  email: string;
  full_name: string | null;
}

export default function Page() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 min-h-screen p-8">
          <div className="text-gray-600 text-lg">Loading profile...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-36"></div>

          <div className="px-8 pb-8">
            <div className="-mt-16 flex items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600">
                {(profile?.full_name ?? profile?.email ?? "U")
  .charAt(0)
  .toUpperCase()}
              </div>

              <div className="mt-10">
                <h2 className="text-3xl font-bold">
                  {profile?.full_name || "User"}
                </h2>

                <p className="text-gray-500">
                  {profile?.email}
                </p>
              </div>
            </div>

            {/* Information */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div className="border rounded-xl p-5">
                <p className="text-gray-500 text-sm">User ID</p>
                <p className="font-semibold text-lg">
                  #{profile?.id}
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-semibold text-lg">
                  {profile?.email}
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-semibold text-lg">
                  {profile?.full_name || "Not Provided"}
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500 text-sm">Account Type</p>
                <p className="font-semibold text-lg">
                  User
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500 text-sm">Registered On</p>
                <p className="font-semibold text-lg">
                  -
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500 text-sm">Email Verified</p>
                <p className="font-semibold text-lg text-green-600">
                  Yes
                </p>
              </div>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-blue-700">
                  0
                </p>
                <p className="text-gray-600 mt-2">
                  Applications
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-green-700">
                  0
                </p>
                <p className="text-gray-600 mt-2">
                  Resumes
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-purple-700">
                  Not Connected
                </p>
                <p className="text-gray-600 mt-2">
                  Gmail
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-orange-700">
                  Not Connected
                </p>
                <p className="text-gray-600 mt-2">
                  LinkedIn
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                Edit Profile
              </button>

              <button className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg transition">
                Change Password
              </button>

              <button className="border border-red-500 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg transition">
                Logout
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
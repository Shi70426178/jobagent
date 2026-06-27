"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/axios";

export default function Dashboard() {
  const [applications, setApplications] =
    useState<any[]>([]);

  const [gmailProfile, setGmailProfile] =
    useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const appRes =
        await api.get("/applications");

      setApplications(appRes.data);

      const gmailRes =
        await api.get("/gmail/profile");

      setGmailProfile(gmailRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(
      "gmailProfile changed:",
      gmailProfile
    );
  }, [gmailProfile]);

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-zinc-950 min-h-screen text-white p-10">

          <div className="mb-12">
            <h1 className="text-5xl font-semibold tracking-tight">
              Dashboard
            </h1>

            <p className="text-zinc-500 mt-3">
              Welcome back. Monitor your AI job search activity.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 text-sm">
                Applications
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {applications.length}
              </h2>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 text-sm">
                Gmail Connected
              </p>

              <h2 className="text-lg font-semibold mt-3 break-all">
                {gmailProfile?.connected
                  ? gmailProfile.emailAddress
                  : "Not Connected"}
              </h2>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 text-sm">
                Emails Sent
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {applications.length}
              </h2>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-500 text-sm">
                Replies
              </p>

              <h2 className="text-3xl font-bold mt-3">
                0
              </h2>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <h2 className="text-xl font-semibold mb-5">
                Gmail Status
              </h2>

              {gmailProfile?.emailAddress ? (
                <>
                  <p className="text-green-500">
                    ● Connected
                  </p>

                  <p className="text-zinc-300 mt-3">
                    {gmailProfile.emailAddress}
                  </p>
                </>
              ) : (
                <p className="text-red-500">
                  ● Not Connected
                </p>
              )}

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <h2 className="text-xl font-semibold mb-5">
                Agent Status
              </h2>

              <p className="text-green-500">
                ● Ready
              </p>

              <p className="text-zinc-500 mt-3">
                Agent is ready to scan LinkedIn and process jobs.
              </p>

            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h2 className="text-2xl font-semibold mb-6">
              Recent Applications
            </h2>

            {applications.length === 0 ? (
              <p className="text-zinc-500">
                No applications found.
              </p>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400">
                      <th className="text-left p-3">
                        Company
                      </th>

                      <th className="text-left p-3">
                        Role
                      </th>

                      <th className="text-left p-3">
                        Status
                      </th>

                      <th className="text-left p-3">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {applications
                      .slice(0, 5)
                      .map((application) => (
                        <tr
                          key={application.id}
                          className="
                            border-b
                            border-zinc-800
                            hover:bg-zinc-800/40
                            transition
                          "
                        >
                          <td className="p-3">
                            {application.company}
                          </td>

                          <td className="p-3">
                            {application.role}
                          </td>

                          <td className="p-3">
                            {application.status}
                          </td>

                          <td className="p-3">
                            {application.created_at
                              ? new Date(
                                  application.created_at
                                ).toLocaleDateString()
                              : "-"}
                          </td>
                        </tr>
                      ))}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </main>
      </div>
    </ProtectedRoute>
  );
}
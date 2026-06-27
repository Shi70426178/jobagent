"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/axios";

interface Application {
  id: number;
  company: string;
  role: string;
  status: string;
  created_at?: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response =
        await api.get("/applications");

      setApplications(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (
    status: string
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "interview":
        return "bg-green-600";

      case "rejected":
        return "bg-red-600";

      case "applied":
        return "bg-zinc-700";

      default:
        return "bg-yellow-600";
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-zinc-950 min-h-screen text-white p-10">

          <div className="mb-12">

            <h1 className="text-5xl font-semibold tracking-tight">
              Applications
            </h1>

            <p className="text-zinc-500 mt-3">
              Track all job applications sent by your AI agent.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <p className="text-zinc-500 text-sm">
                Total Applications
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {applications.length}
              </h2>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <p className="text-zinc-500 text-sm">
                Interviews
              </p>

              <h2 className="text-3xl font-bold mt-3 text-green-500">
                {
                  applications.filter(
                    (a) =>
                      a.status?.toLowerCase() ===
                      "interview"
                  ).length
                }
              </h2>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <p className="text-zinc-500 text-sm">
                Applied
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {
                  applications.filter(
                    (a) =>
                      a.status?.toLowerCase() ===
                      "applied"
                  ).length
                }
              </h2>

            </div>

          </div>

          {loading ? (

            <div className="text-zinc-500">
              Loading applications...
            </div>

          ) : (

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-zinc-800 text-zinc-400">

                    <th className="p-4 text-left">
                      ID
                    </th>

                    <th className="p-4 text-left">
                      Company
                    </th>

                    <th className="p-4 text-left">
                      Role
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {applications.map(
                    (application) => (
                      <tr
                        key={application.id}
                        className="
                          border-b
                          border-zinc-800
                          hover:bg-zinc-800/40
                          transition
                        "
                      >
                        <td className="p-4">
                          {application.id}
                        </td>

                        <td className="p-4">
                          {application.company}
                        </td>

                        <td className="p-4">
                          {application.role}
                        </td>

                        <td className="p-4">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              text-white
                              ${getStatusColor(
                                application.status
                              )}
                            `}
                          >
                            {application.status}
                          </span>

                        </td>

                        <td className="p-4">
                          {application.created_at
                            ? new Date(
                                application.created_at
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                      </tr>
                    )
                  )}

                  {applications.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="
                          p-10
                          text-center
                          text-zinc-500
                        "
                      >
                        No applications found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          )}

        </main>
      </div>
    </ProtectedRoute>
  );
}
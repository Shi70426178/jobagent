"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  RefreshCw,
  XCircle,
} from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/axios";

interface Application {
  id: number;
  company: string;
  job_title: string;
  recruiter_name: string;
  email: string;
  status: string;
  generated_email: string;
  match_score: number;
  created_at?: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/linkedin/applications"
      );

      setApplications(response.data || []);
    } catch (error) {
      console.error(
        "Error loading applications:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (
    status: string
  ) => {
    const normalized =
      status?.toLowerCase();

    switch (normalized) {
      case "interview":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle2 size={12} />
            Interview
          </span>
        );

      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
            <XCircle size={12} />
            Rejected
          </span>
        );

      case "applied":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400">
            <Clock size={12} />
            Applied
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            {status || "Pending"}
          </span>
        );
    }
  };

  const totalApplications =
    applications.length;

  const totalInterviews =
    applications.filter(
      (application) =>
        application.status?.toLowerCase() ===
        "interview"
    ).length;

  const totalApplied =
    applications.filter(
      (application) =>
        application.status?.toLowerCase() ===
        "applied"
    ).length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-white font-sans text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-zinc-100">

        <main className="w-full bg-white px-4 py-6 transition-colors duration-300 sm:px-6 dark:bg-black">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center dark:border-zinc-800/80">

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Applications
              </h1>

              <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                Track all job applications sent by your AI agent.
              </p>
            </div>

            <button
              onClick={loadApplications}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <RefreshCw
                size={14}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

          </div>

          {/* =====================================================
              STATS
          ===================================================== */}

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Total */}

            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors dark:border-zinc-800/80 dark:bg-zinc-900/40">

              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Total Applications
              </p>

              <h2 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white">
                {totalApplications}
              </h2>

            </div>

            {/* Interviews */}

            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors dark:border-zinc-800/80 dark:bg-zinc-900/40">

              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Interviews
              </p>

              <h2 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white">
                {totalInterviews}
              </h2>

            </div>

            {/* Applied */}

            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors dark:border-zinc-800/80 dark:bg-zinc-900/40">

              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Applied
              </p>

              <h2 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white">
                {totalApplied}
              </h2>

            </div>

          </div>

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (
            <div className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-12 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/30">

              <div className="flex items-center gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">

                <RefreshCw
                  className="animate-spin"
                  size={16}
                />

                Loading applications...

              </div>

            </div>
          ) : (

            /* ===================================================
               APPLICATION TABLE
            =================================================== */

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/30">

              <div className="overflow-x-auto">

                <table className="w-full border-collapse text-left">

                  {/* HEADER */}

                  <thead>

                    <tr className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400">

                      <th className="p-3.5 pl-4">
                        ID
                      </th>

                      <th className="p-3.5">
                        Company
                      </th>

                      <th className="p-3.5">
                        Role
                      </th>

                      <th className="p-3.5">
                        Status
                      </th>

                      <th className="p-3.5 pr-4">
                        Date
                      </th>

                    </tr>

                  </thead>

                  {/* BODY */}

                  <tbody className="divide-y divide-zinc-200 text-xs text-zinc-600 dark:divide-zinc-800/60 dark:text-zinc-300">

                    {applications.map(
                      (application) => (
                        <tr
                          key={
                            application.id
                          }
                          className="transition hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                        >

                          {/* ID */}

                          <td className="p-3.5 pl-4 font-mono text-zinc-400 dark:text-zinc-500">
                            #
                            {
                              application.id
                            }
                          </td>

                          {/* COMPANY */}

                          <td className="p-3.5 font-medium text-zinc-900 dark:text-zinc-100">

                            <div className="flex items-center gap-2">

                              <Briefcase
                                size={14}
                                className="text-zinc-400 dark:text-zinc-500"
                              />

                              <span>
                                {
                                  application.company
                                }
                              </span>

                            </div>

                          </td>

                          {/* ROLE */}

                          <td className="p-3.5 text-zinc-600 dark:text-zinc-300">
                            {
                              application.job_title
                            }
                          </td>

                          {/* STATUS */}

                          <td className="p-3.5">
                            {getStatusBadge(
                              application.status
                            )}
                          </td>

                          {/* DATE */}

                          <td className="p-3.5 pr-4 text-zinc-500 dark:text-zinc-400">

                            <div className="flex items-center gap-1.5">

                              <Calendar
                                size={13}
                                className="text-zinc-400 dark:text-zinc-500"
                              />

                              {application.created_at
                                ? new Date(
                                    application.created_at
                                  ).toLocaleDateString()
                                : "-"}

                            </div>

                          </td>

                        </tr>
                      )
                    )}

                    {/* EMPTY */}

                    {applications.length ===
                      0 && (
                      <tr>

                        <td
                          colSpan={5}
                          className="p-12 text-center text-xs text-zinc-400 dark:text-zinc-500"
                        >
                          No applications found
                        </td>

                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

        </main>

      </div>
    </ProtectedRoute>
  );
}
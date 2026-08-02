"use client";

import { useEffect, useState } from "react";
import { Briefcase, Calendar, CheckCircle2, Clock, RefreshCw, XCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
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
      const response = await api.get("/linkedin/applications");
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const normalized = status?.toLowerCase();

    switch (normalized) {
      case "interview":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800 text-zinc-100 border border-zinc-700/80">
            <CheckCircle2 size={12} className="text-zinc-300" />
            Interview
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900/80 text-zinc-400 border border-zinc-800">
            <XCircle size={12} className="text-zinc-500" />
            Rejected
          </span>
        );
      case "applied":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800">
            <Clock size={12} className="text-zinc-400" />
            Applied
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800">
            {status || "Pending"}
          </span>
        );
    }
  };

  return (
    <ProtectedRoute>
      {/* Changed bg-zinc-950 -> bg-black for pure dark consistency */}
      <div className="flex min-h-screen bg-black text-zinc-100 font-sans">
        <Sidebar />

        <main className="flex-1 px-4 sm:px-6 py-6 w-full bg-black">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-zinc-800/80 pb-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Applications
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Track all job applications sent by your AI agent.
              </p>
            </div>

            <button
              onClick={loadApplications}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition shadow-sm"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
              <p className="text-xs font-medium text-zinc-400">
                Total Applications
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">
                {applications.length}
              </h2>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
              <p className="text-xs font-medium text-zinc-400">
                Interviews
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">
                {
                  applications.filter(
                    (a) => a.status?.toLowerCase() === "interview"
                  ).length
                }
              </h2>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
              <p className="text-xs font-medium text-zinc-400">
                Applied
              </p>
              <h2 className="text-2xl font-bold text-zinc-200 mt-1">
                {
                  applications.filter(
                    (a) => a.status?.toLowerCase() === "applied"
                  ).length
                }
              </h2>
            </div>
          </div>

          {/* Table / Content Section */}
          {loading ? (
            <div className="flex items-center justify-center p-12 bg-zinc-900/30 border border-zinc-800/80 rounded-xl">
              <div className="flex items-center gap-3 text-zinc-400 text-xs font-medium">
                <RefreshCw className="animate-spin" size={16} />
                Loading applications...
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-900/50">
                      <th className="p-3.5 pl-4">ID</th>
                      <th className="p-3.5">Company</th>
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 pr-4">Date</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-zinc-800/60 text-xs text-zinc-300">
                    {applications.map((application) => (
                      <tr
                        key={application.id}
                        className="hover:bg-zinc-900/60 transition"
                      >
                        <td className="p-3.5 pl-4 font-mono text-zinc-500">
                          #{application.id}
                        </td>

                        <td className="p-3.5 font-medium text-zinc-100">
                          <div className="flex items-center gap-2">
                            <Briefcase size={14} className="text-zinc-500" />
                            {application.company}
                          </div>
                        </td>

                        <td className="p-3.5 text-zinc-300">
                          {application.job_title}
                        </td>

                        <td className="p-3.5">
                          {getStatusBadge(application.status)}
                        </td>

                        <td className="p-3.5 pr-4 text-zinc-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-zinc-500" />
                            {application.created_at
                              ? new Date(
                                  application.created_at
                                ).toLocaleDateString()
                              : "-"}
                          </div>
                        </td>
                      </tr>
                    ))}

                    {applications.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-12 text-center text-xs text-zinc-500"
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
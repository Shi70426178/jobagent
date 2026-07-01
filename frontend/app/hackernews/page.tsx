"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import Sidebar from "@/components/Sidebar";

export default function HackerNewsPage() {
  const [posts, setPosts] =
    useState<any[]>([]);

  useEffect(() => {
  loadPosts();
}, []);
const [loading, setLoading] = useState(false);
const syncJobs = async () => {
  try {
    setLoading(true);

const response = await api.post("/hackernews/sync");

if (response.data.count === 0) {
  alert("No new Hacker News jobs available.");
} else {
  alert(`${response.data.count} new jobs synced.`);
}

await loadPosts();
  } catch (err) {
    console.error(err);
    alert("Sync failed");
  } finally {
    setLoading(false);
  }
};
const loadPosts = async () => {
  try {
    const response = await api.get("/hackernews/posts");

    console.log("Response:", response.data);

    setPosts(response.data);
  } catch (error) {
    console.error(error);
    setPosts([]);
  }
};

const applyLead = async (
  id: number
) => {

  try {

    await api.post(
      `/hackernews/apply/${id}`
    );

    loadPosts();

  } catch (error) {

    console.error(error);

  }

};

  const getScoreColor = (
    score: number
  ) => {
    if (score >= 80)
      return "bg-green-600";

    if (score >= 60)
      return "bg-yellow-600";

    return "bg-red-600";
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-black/40 backdrop-blur-xl min-h-screen text-white p-10">

        <div className="flex justify-between items-center mb-12">

  <div>
    <h1 className="text-5xl font-semibold tracking-tight">
      Hacker News Leads
    </h1>

    <p className="text-zinc-500 mt-3">
      AI analyzed Hacker News hiring threads and discovered recruiter leads.
    </p>
  </div>

  <button
    onClick={syncJobs}
    disabled={loading}
    className="
      bg-blue-600
      hover:bg-blue-700
      px-5
      py-3
      rounded-xl
      text-white
      font-medium
    "
  >
    {loading ? "Syncing..." : "Sync"}
  </button>

</div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Total Leads
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {posts.length}
            </h2>

          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Emails Found
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {
                posts.filter(
                  (p) => p.email
                ).length
              }
            </h2>

          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">

          <p className="text-zinc-500 text-sm">
  High Match
</p>

          <h2 className="text-3xl font-bold mt-3 text-green-500">
  {
    posts.filter(
      (p) =>
        (p.match_score || 0) >= 80
    ).length
  }
</h2>

          </div>

        </div>

        <div className="space-y-6">

          {posts.length === 0 && (
  <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-10 text-center">
    <h2 className="text-2xl font-semibold">
      No Jobs Yet
    </h2>

    <p className="text-zinc-500 mt-3">
      Click Sync to fetch your first 10 jobs.
    </p>
  </div>
)}

          {posts.map((post) => (

            <div
              key={post.comment_id}
              className="
                bg-zinc-900/60 backdrop-blur-xl
                border
                border-zinc-800
                rounded-2xl
                p-6
              "
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-semibold">
                    {post.job_title}
                  </h2>

                  <div className="mt-4 space-y-2 text-zinc-400">

                    <p>
                      🏢 {post.company}
                    </p>

                  <p>
  🌐 Hacker News
</p>

                    <p>
                      ✉{" "}
                      {post.email ||
                        "Email not found"}
                    </p>

                  </div>

                </div>

                <div
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-white
                    font-medium
                    ${getScoreColor(
                      post.match_score || 0
                    )}
                  `}
                >
                  {post.match_score || 0}%
                </div>

              </div>

              <div className="mt-6">

                <h3 className="font-semibold mb-2">
                  AI Analysis
                </h3>

                <p className="text-zinc-400">
                  {post.match_reason ||
                    "No analysis available"}
                </p>

              </div>

              {post.generated_email && (

                <details className="mt-6">

                  <summary className="cursor-pointer text-white font-medium">
                    View Generated Email
                  </summary>

                  <div className="mt-3 bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-xl p-4 whitespace-pre-wrap text-zinc-300">
                    {post.generated_email}
                  </div>

                </details>

              )}

              <div className="flex items-center justify-between mt-6">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    ${
                      post.status ===
                      "applied"
                        ? "bg-green-600"
                        : "bg-zinc-700"
                    }
                  `}
                >
                  {post.status}
                </span>

                <div className="flex gap-3">

                  <button
                   onClick={() =>
  window.open(
    post.source_url,
    "_blank"
  )
}
                    className="
                      bg-zinc-900/60 backdrop-blur-xl
                      hover:bg-zinc-700
                      px-4
                      py-2
                      rounded-xl
                      transition
                    "
                  >
                    View Post
                  </button>
<button
  onClick={() => applyLead(post.id)}
  className="
    bg-white
    text-black
    hover:bg-zinc-200
    px-4
    py-2
    rounded-xl
    font-medium
  "
>
  Apply
</button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </main>
    </div>
  );
}
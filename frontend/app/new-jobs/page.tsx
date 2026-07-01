"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
export default function LinkedinPage() {
  const router = useRouter();
  const [posts, setPosts] =
    useState<any[]>([]);

  const [editingId, setEditingId] =
  useState<number | null>(null);

const [editedEmail, setEditedEmail] =
  useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response =
        await api.get(
          "/linkedin/posts"
        );

      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

const generateMail = async (
  id: number
) => {
  try {

    await api.post(
      `/linkedin/generate-email/${id}`
    );

    await loadPosts();

  } catch (error) {
    console.error(error);
  }
};

const applyLead = async (
  id: number
) => {
  try {

    const response = await api.post(
      `/linkedin/apply/${id}`
    );

    if (response.data.gmail_connected === false) {

      alert(response.data.message);

      router.push("/gmail");

      return;
    }

    await loadPosts();

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

        <div className="mb-12">

          <h1 className="text-5xl font-semibold tracking-tight">
            New Leads
          </h1>

          <p className="text-zinc-500 mt-3">
            AI analyzed hiring posts and
            discovered recruiter leads.
          </p>

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
              Applied
            </p>

            <h2 className="text-3xl font-bold mt-3 text-green-500">
              {
                posts.filter(
                  (p) =>
                    p.status ===
                    "applied"
                ).length
              }
            </h2>

          </div>

        </div>

        <div className="space-y-6">

          {posts.map((post) => (

            <div
              key={post.id}
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
                      👤 {post.recruiter_name}
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

  <div className="mt-6">

    {editingId !== post.id ? (

      <details>

        <summary className="cursor-pointer text-white font-medium">
          View Generated Email
        </summary>

        <div className="mt-3 bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-xl p-4 whitespace-pre-wrap text-zinc-300">
          {post.generated_email}
        </div>

      </details>

    ) : (

      <textarea
        value={editedEmail}
        onChange={(e) =>
          setEditedEmail(e.target.value)
        }
        className="
          w-full
          h-64
          bg-black/40 backdrop-blur-xl
          border
          border-zinc-800
          rounded-xl
          p-4
          text-zinc-300
          resize-none
        "
      />

    )}

  </div>

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
      alert(post.post_text)
    }
    className="
      bg-zinc-900/60 backdrop-blur-xl
      hover:bg-zinc-700
      px-4
      py-2
      rounded-xl
    "
  >
    View Post
  </button>

  {!post.generated_email && (

  <button
    onClick={() =>
      generateMail(post.id)
    }
    className="
      bg-purple-600
      hover:bg-purple-700
      px-4
      py-2
      rounded-xl
      text-white
    "
  >
    Generate Mail
  </button>

)}

  {editingId === post.id ? (

    <>
      <button
        onClick={async () => {

        await api.put(
  `/linkedin/email/${post.id}`,
  {
    generated_email: editedEmail
  }
);

setEditingId(null);

await loadPosts();

        }}
        className="
          bg-blue-600
          hover:bg-blue-700
          px-4
          py-2
          rounded-xl
        "
      >
        Save
      </button>

      <button
        onClick={() =>
          setEditingId(null)
        }
        className="
          bg-zinc-700
          hover:bg-zinc-600
          px-4
          py-2
          rounded-xl
        "
      >
        Cancel
      </button>
    </>

  ) : (

  post.generated_email && (

    <button
      onClick={() => {

        setEditingId(post.id);

        setEditedEmail(
          post.generated_email
        );

      }}
      className="
        bg-blue-600
        hover:bg-blue-700
        px-4
        py-2
        rounded-xl
      "
    >
      Edit
    </button>

  )

)}

<button
  disabled={!post.generated_email}
  onClick={() =>
    applyLead(post.id)
  }
   className={`
  px-4
  py-2
  rounded-xl
  font-medium
  ${
    post.generated_email
      ? "bg-white text-black hover:bg-zinc-200"
      : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
  }
`}
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
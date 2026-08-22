import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-sm text-zinc-500 dark:bg-black dark:text-zinc-400">
          Loading...
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
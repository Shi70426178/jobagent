"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebar = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/privacy",
    "/contact",
    "/terms",
  ].includes(pathname);

  return (
    <div className="relative z-10 min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">

      {!hideSidebar && <Sidebar />}

      <main
        className={`
          min-h-screen
          bg-white
          text-zinc-900
          transition-all
          duration-300
          dark:bg-black
          dark:text-white
          ${hideSidebar ? "" : "pt-16 lg:pt-0 lg:ml-64"}
        `}
      >
        {children}
      </main>

    </div>
  );
}
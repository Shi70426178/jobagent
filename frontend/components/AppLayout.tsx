"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebar =
    pathname === "/login" ||
    pathname === "/register";

  return (
    <div className="relative z-10 min-h-screen">
      {!hideSidebar && (
  <>
    <Sidebar />
    <MobileSidebar />
  </>
)}

      <main
        className={`
          min-h-screen
pt-16
lg:pt-0
transition-all
duration-300
lg:ml-72
        `}
      >
        {children}
      </main>
    </div>
  );
}
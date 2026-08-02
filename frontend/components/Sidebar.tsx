"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  LayoutDashboard,
  Bot,
  Globe,
  Newspaper,
  FileText,
  Mail,
  User,
  FileBadge,
  Sparkles,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Job Agent", href: "/agent", icon: Bot },
  { name: "View Jobs", href: "/new-jobs", icon: Globe },
  { name: "Walkin Jobs", href: "/walkins", icon: Newspaper },
  { name: "Applications", href: "/applications", icon: FileText },
  { name: "Gmail", href: "/gmail", icon: Mail },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Resume", href: "/resume", icon: FileBadge },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push("/login");
  };

  const isLinkActive = (href: string) => {
    if (pathname === href) return true;
    if (href !== "/" && pathname.startsWith(`${href}/`)) return true;
    return false;
  };

  // Fixed Branding Header to match active Cyan menu theme
  const BrandHeader = ({ isLarge = false }: { isLarge?: boolean }) => (
    <div className="flex items-center gap-3">
      {/* Cyan Translucent Icon Box */}
      <div
        className={`flex items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 ${
          isLarge
            ? "h-11 w-11 shadow-sm shadow-cyan-500/20"
            : "h-9 w-9"
        }`}
      >
        <Sparkles className={`text-cyan-400 ${isLarge ? "h-5 w-5" : "h-4 w-4"}`} />
      </div>

      {/* Brand Text without out-of-place gradients */}
      <div>
        <div className="flex items-center gap-0.5">
          <span className={`font-black tracking-tight text-cyan-400 ${isLarge ? "text-xl" : "text-lg"}`}>
            oneX
          </span>
          <span className={`font-black tracking-tight text-white ${isLarge ? "text-xl" : "text-lg"}`}>
            job
          </span>
        </div>
        <p className="text-[10px] font-medium text-zinc-400 tracking-wider uppercase">
          AI Career Assistant
        </p>
      </div>
    </div>
  );

  const NavigationLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-1.5">
      {MENU_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isLinkActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => isMobile && setMobileOpen(false)}
            className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-200 ${
              active
                ? "border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-blue-950/30 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-zinc-900 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-cyan-400"
                }`}
              >
                <Icon size={18} />
              </div>
              <span className={`text-sm font-medium ${active ? "text-white font-semibold" : "text-zinc-300"}`}>
                {item.name}
              </span>
            </div>

            <ChevronRight
              size={16}
              className={`transition-all duration-200 ${
                active
                  ? "translate-x-0 opacity-100 text-cyan-400"
                  : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            />

            {active && !isMobile && (
              <div className="absolute left-0 top-2.5 h-7 w-1 rounded-r-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            )}
          </Link>
        );
      })}

      <button
        onClick={handleLogout}
        className="group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-zinc-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-all duration-200 group-hover:bg-red-500/20 group-hover:text-red-400">
            <LogOut size={18} />
          </div>
          <span className="text-sm font-medium">Logout</span>
        </div>
        <ChevronRight
          size={16}
          className="-translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-red-400"
        />
      </button>
    </div>
  );

  return (
    <>
      {/* MOBILE BAR & DRAWER */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex h-16 items-center justify-between border-b border-zinc-800/80 bg-black px-4 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-white"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <BrandHeader />
        <div className="w-8" />
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[65] bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-[70] flex h-screen w-64 flex-col border-r border-zinc-800/80 bg-black transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 p-4">
          <BrandHeader />
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <NavigationLinks isMobile />
        </div>
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside className="fixed top-0 left-0 z-50 hidden h-screen w-64 flex-col border-r border-zinc-800/80 bg-black lg:flex">
        <div className="flex h-full flex-col">
          <div className="border-b border-zinc-800/80 p-5">
            <BrandHeader isLarge />
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <NavigationLinks />
          </div>
        </div>
      </aside>
    </>
  );
}
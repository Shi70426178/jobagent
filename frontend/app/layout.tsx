import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "oneXjob",
  description: "AI Career Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html
  lang="en"
  className={`dark ${inter.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
>
      <body
        className="
          relative
          min-h-screen
          overflow-x-hidden
          font-sans
          text-white
        "
      >
        {/* Background */}
        <div
          className="
            fixed
            inset-0
            -z-20
            bg-[url('/Login_BG.png')]
            bg-cover
            bg-center
            bg-no-repeat
            scale-110
            blur-md
            brightness-50
            saturate-75
            will-change-transform
          "
        />

        {/* Dark Overlay */}
        <div className="fixed inset-0 -z-10 bg-black/40" />

        {/* Application */}
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
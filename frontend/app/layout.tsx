import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Project22",
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-screen overflow-x-hidden font-sans text-white">

        {/* Background Image */}
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
            blur-[1px]
          "
        />

        {/* Dark Overlay */}
        <div className="fixed inset-0 -z-10 bg-black/40" />

        {/* Page Content */}
        <div className="relative z-10 min-h-screen overflow-x-hidden">
          {children}
        </div>

      </body>
    </html>
  );
}
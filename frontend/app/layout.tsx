import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";
import GoogleProvider from "@/components/GoogleProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onexjob.com"),

  title: {
    default: "oneXjob - AI Job Search & One-Click Job Applications",
    template: "%s | oneXjob",
  },

  description:
    "Find software jobs faster with AI. Upload your resume, discover matching jobs, generate personalized emails, and apply in one click.",

  keywords: [
    "AI Job Search",
    "AI Job Agent",
    "Software Developer Jobs",
    "Remote Jobs",
    "Resume Matcher",
    "AI Cover Letter",
    "Job Search India",
    "oneXjob",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "oneXjob - AI Job Search & One-Click Job Applications",
    description:
      "Find software jobs faster with AI. Upload your resume, discover matching jobs, generate personalized emails, and apply in one click.",
    url: "https://onexjob.com",
    siteName: "oneXjob",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "oneXjob - AI Job Search",
    description:
      "Find software jobs faster with AI and apply in one click.",
  },
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
<GoogleProvider>
  <AppLayout>{children}</AppLayout>
</GoogleProvider>

<GoogleAnalytics gaId="G-XG3ZY58ZFH" />
</body>
    </html>
  );
}
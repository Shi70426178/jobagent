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

  alternates: {
    canonical: "https://onexjob.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "oneXjob - AI Job Search & One-Click Job Applications",
    description:
      "Find software jobs faster with AI. Upload your resume, discover matching jobs, generate personalized emails, and apply in one click.",
    url: "https://onexjob.com",
    siteName: "oneXjob",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "oneXjob - AI Job Search",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "oneXjob - AI Job Search",
    description:
      "Find software jobs faster with AI and apply in one click.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable}`}>
        {/* Dark Overlay */}
        <div className="fixed inset-0 -z-10 bg-black/40" />

        {/* Application */}
        <GoogleProvider>
          <AppLayout>{children}</AppLayout>
        </GoogleProvider>

        {/* Google Analytics - only rendered if GA ID exists */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
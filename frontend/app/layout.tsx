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
    default: "oneXjob - AI Job Search & Job Matching",
    template: "%s | oneXjob",
  },

  description:
    "Find relevant software and tech jobs faster with AI-powered job matching. Upload your resume, discover matching jobs, generate personalized emails, and apply faster.",

  keywords: [
    "AI job search",
    "AI job matching",
    "software developer jobs",
    "software jobs",
    "developer jobs",
    "tech jobs",
    "job search India",
    "remote developer jobs",
    "resume job matching",
    "AI job agent",
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
    type: "website",
    locale: "en_US",
    url: "https://onexjob.com",
    siteName: "oneXjob",
    title: "oneXjob - AI Job Search & Job Matching",
    description:
      "Find relevant software and tech jobs faster with AI-powered job matching.",
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
    title: "oneXjob - AI Job Search & Job Matching",
    description:
      "Find relevant software and tech jobs faster with AI-powered job matching.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};
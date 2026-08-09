import type { Metadata } from "next";
import WalkInsClient from "./WalkInsClient";

export const metadata: Metadata = {
  title: "Walk-In Jobs in India | oneXjob",
  description:
    "Find verified walk-in interview jobs in India. Discover walk-in opportunities by company, job role, location, experience, skills, date and venue on oneXjob.",
  alternates: {
    canonical: "https://onexjob.com/walkins",
  },
  openGraph: {
    title: "Walk-In Jobs in India | oneXjob",
    description:
      "Find verified walk-in interview jobs in India by role, location, experience and skills.",
    url: "https://onexjob.com/walkins",
    siteName: "oneXjob",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "oneXjob Walk-In Jobs",
      },
    ],
  },
};

export default function WalkInsPage() {
  return <WalkInsClient />;
}
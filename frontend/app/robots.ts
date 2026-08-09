import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/profile/",
        "/resume/",
        "/gmail/",
        "/agent/",
      ],
    },
    sitemap: "https://onexjob.com/sitemap.xml",
  };
}
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
  "/api/",
  "/agent/",
  "/dashboard/",
  "/profile/",
  "/resume/",
  "/gmail/",
  "/applications/",
  "/settings/",
  "/login/",
  "/forgot-password/",
  "/reset-password/",
],
    },
    sitemap: "https" + "://" + "onexjob.com/sitemap.xml",
  };
}


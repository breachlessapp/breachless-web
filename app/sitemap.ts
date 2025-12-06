// app/sitemap.ts

import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://breachless.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = ["/", "/pricing", "/reports"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  // High-value sample domains
  const sampleDomains = [
    "reddit.com",
    "github.com",
    "notion.so",
    "openai.com",
    "ycombinator.com",
    "producthunt.com",
    "news.ycombinator.com",
    "stripe.com",
    "vercel.com",
    "cloudflare.com",
  ];

  const reportRoutes: MetadataRoute.Sitemap = sampleDomains.map((domain) => ({
    url: `${BASE_URL}/report/${encodeURIComponent(domain)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...reportRoutes];
}

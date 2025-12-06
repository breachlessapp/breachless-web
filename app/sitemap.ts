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

  // Sample high-value domains (same as /reports page)
  const sampleDomains = [
    "reddit.com",
    "hellosarah.ai",
    "browser-use.com",
    "joinergo.com",
    "artifact.engineer",
  ];

  const reportRoutes: MetadataRoute.Sitemap = sampleDomains.map((domain) => ({
    url: `${BASE_URL}/report/${encodeURIComponent(domain)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...reportRoutes];
}

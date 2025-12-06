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

  // High-value sample domain reports
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

  // Benchmark pages
  const benchmarkRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/benchmarks/ai-startups`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/benchmarks/saas`,
      lastModified: new Date(),
    },
  ];

  // FINAL RETURN
  return [...staticRoutes, ...reportRoutes, ...benchmarkRoutes];
}

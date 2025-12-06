// app/robots.ts

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [
      "https://breachless.app/sitemap.xml",
      "https://www.breachless.app/sitemap.xml",
    ],
  };
}

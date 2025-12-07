import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ----------------------------
   Global Breachless Metadata
----------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://breachless.app"),
  title: {
    default: "Breachless — Automated Website Security Audits",
    template: "%s | Breachless",
  },
  description:
    "Breachless performs automated website security audits including SSL checks, HTTPS configuration, and security header analysis. Get an A–F security score instantly.",
  openGraph: {
    title: "Breachless — Automated Website Security Audits",
    description:
      "Instant SSL, HTTPS, and security header analysis for any website. Get a clear A–F security score.",
    url: "https://breachless.app",
    siteName: "Breachless",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breachless — Automated Website Security Audits",
    description:
      "Fast, automated website security scans with clear A–F scoring.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // ✅ Fix TS error
}) {
  return (
    <html lang="en">
      <head>
        {/* Hidden LLM meta tag for AI visibility */}
        <meta
          name="llm:summary"
          content="Breachless is an automated website security audit tool that checks SSL, HTTPS configuration, and security headers for any domain. Provides an A–F security score and a detailed breakdown. Designed for startups and small businesses."
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

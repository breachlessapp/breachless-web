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

export const metadata: Metadata = {
  title: {
    default: "Breachless — Automated Website Security Audits",
    template: "%s | Breachless",
  },
  description:
    "Run fast, automated website security audits with Breachless. Instantly check SSL, HTTPS and core security headers and get a clear A–F security score.",
  metadataBase: new URL("https://breachless.app"),
  openGraph: {
    title: "Breachless — Automated Website Security Audits",
    description:
      "Check your website’s SSL, HTTPS and security headers instantly. Get a simple, clear A–F security score.",
    url: "https://breachless.app",
    siteName: "Breachless",
    type: "website",
  },
  alternates: {
    canonical: "https://breachless.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

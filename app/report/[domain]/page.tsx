// app/report/[domain]/page.tsx

import React from "react";
import type { Metadata } from "next";

type Summary = {
  total_headers_checked: number;
  headers_missing: number;
  ssl_valid: boolean;
};

type AuditResponse = {
  domain: string;
  summary: Summary;
  headers: Record<string, string>;
  ssl: Record<string, any>;
};

function computeScoreAndLetter(summary: Summary): {
  score: number;
  letter: string;
} {
  let score = 100;

  if (!summary.ssl_valid) {
    score -= 40;
  }

  if (summary.total_headers_checked > 0) {
    const missingRatio =
      summary.headers_missing / summary.total_headers_checked;
    score -= Math.round(missingRatio * 40);
  } else {
    score -= 20;
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  let letter = "F";
  if (score >= 90) letter = "A";
  else if (score >= 75) letter = "B";
  else if (score >= 60) letter = "C";
  else if (score >= 40) letter = "D";
  else letter = "F";

  return { score, letter };
}

async function getAudit(domain: string): Promise<AuditResponse | null> {
  if (!domain || domain === "undefined") return null;

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://breachless-api.onrender.com";

  try {
    const res = await fetch(
      `${API_BASE}/audit/${encodeURIComponent(domain)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Audit API returned", res.status);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error("Error calling audit API", err);
    return null;
  }
}

// 🔹 SEO metadata per domain
export async function generateMetadata(
  props: { params: Promise<{ domain: string }> }
): Promise<Metadata> {
  const { domain: rawDomain } = await props.params;
  const domain = decodeURIComponent(rawDomain || "");

  if (!domain || domain === "undefined") {
    return {
      title: "Breachless Security Report",
      description:
        "Automated website security audit: SSL, HTTPS, and core security headers.",
    };
  }

  return {
    title: `${domain} Security Report – Breachless`,
    description: `Live security snapshot for ${domain}: SSL validity, expiry, and key security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy and more).`,
  };
}

// ✅ Next 16: params is a Promise
export default async function ReportPage(props: {
  params: Promise<{ domain: string }>;
}) {
  const { domain: rawDomain } = await props.params;
  const domain = decodeURIComponent(rawDomain || "");

  if (!domain || domain === "undefined") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-3">
          <h1 className="text-2xl font-semibold">No report available</h1>
          <p className="text-sm text-slate-400">
            This report URL is missing a valid domain. Try running a fresh
            audit from the homepage first.
          </p>
        </div>
      </div>
    );
  }

  const data = await getAudit(domain);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-3">
          <h1 className="text-2xl font-semibold">
            No report available for {domain}
          </h1>
          <p className="text-sm text-slate-400">
            Try running a fresh audit from the homepage first, then come back to
            this URL.
          </p>
        </div>
      </div>
    );
  }

  const { summary, ssl, headers } = data;
  const { score, letter } = computeScoreAndLetter(summary);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-950/90 p-6 md:p-8">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Breachless security report
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mt-1">
            Security report for{" "}
            <span className="text-blue-400">{domain}</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            This report summarises SSL, HTTPS and core security headers for your
            public website.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-[120px,1fr] items-start mb-6">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-6">
            <span className="text-xs text-slate-400 mb-1">Overall score</span>
            <span className="text-5xl font-bold text-slate-50">{letter}</span>
            <span className="mt-1 text-[11px] text-slate-400">
              {score}/100
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <span className="font-medium text-slate-50">
                Headers checked:
              </span>{" "}
              {summary.total_headers_checked} total,{" "}
              {summary.headers_missing} missing.
            </p>
            <p>
              <span className="font-medium text-slate-50">SSL status:</span>{" "}
              {summary.ssl_valid ? "Valid" : "Invalid"}
            </p>
            <p className="text-slate-400 text-xs">
              This score is meant as a quick signal, not a full penetration
              test. It highlights basic misconfigurations that are usually easy
              to fix.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="text-sm font-semibold text-slate-50 mb-2">
              HTTPS and SSL
            </h2>
            <dl className="space-y-1 text-sm text-slate-300">
              <div className="flex justify-between">
                <dt>Valid</dt>
                <dd>{ssl.valid ? "Yes" : "No"}</dd>
              </div>
              {"issuer" in ssl && (
                <div className="flex justify-between">
                  <dt>Issuer</dt>
                  <dd className="text-right text-slate-400">
                    {String(ssl.issuer)}
                  </dd>
                </div>
              )}
              {"not_after" in ssl && (
                <div className="flex justify-between">
                  <dt>Expires</dt>
                  <dd>{String(ssl.not_after)}</dd>
                </div>
              )}
              {"days_remaining" in ssl && (
                <div className="flex justify-between">
                  <dt>Days remaining</dt>
                  <dd>{String(ssl.days_remaining)}</dd>
                </div>
              )}
              {"error" in ssl && (
                <div className="flex justify-between">
                  <dt>Error</dt>
                  <dd className="text-right text-rose-300 text-xs">
                    {String(ssl.error)}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="text-sm font-semibold text-slate-50 mb-2">
              Security headers
            </h2>
            <ul className="space-y-1 text-sm text-slate-300">
              {Object.entries(headers).map(([header, status]) => (
                <li key={header} className="flex justify-between gap-2">
                  <span className="text-slate-200">{header}</span>
                  <span className="text-xs">
                    {status === "✅ Present" ? (
                      <span className="text-emerald-400">Present</span>
                    ) : status === "❌ Missing" ? (
                      <span className="text-rose-400">Missing</span>
                    ) : (
                      <span className="text-slate-400">
                        {String(status)}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="border-t border-slate-800 pt-4 mt-4 text-xs text-slate-500 flex justify-between flex-wrap gap-2">
          <span>
            Generated by Breachless. For deeper security needs, use this as a
            starting point, not a full audit.
          </span>
          <a
            href="/"
            className="text-slate-300 hover:text-slate-50 underline underline-offset-2"
          >
            Run another audit
          </a>
        </footer>
      </div>
    </div>
  );
}

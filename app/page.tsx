// Breachless frontend UI
"use client";

import Link from "next/link";
import { useState } from "react";

type AuditSummary = {
  total_headers_checked: number;
  headers_missing: number;
  ssl_valid: boolean;
  score?: number;
  letter_grade?: string;
};

type AuditResponse = {
  domain: string;
  summary: AuditSummary;
};

function normalizeDomain(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  try {
    const withProtocol = trimmed.startsWith("http")
      ? trimmed
      : `https://${trimmed}`;
    const url = new URL(withProtocol);
    return url.hostname;
  } catch {
    return trimmed;
  }
}

// Shared scoring logic: compute numeric score and letter grade
function computeScoreAndLetter(summary: AuditSummary): {
  score: number;
  letter: string;
} {
  let score = 100;

  // Penalise invalid SSL heavily
  if (!summary.ssl_valid) {
    score -= 40;
  }

  if (summary.total_headers_checked > 0) {
    const missingRatio =
      summary.headers_missing / summary.total_headers_checked;
    // Up to 40 points off for headers
    score -= Math.round(missingRatio * 40);
  } else {
    // No headers checked at all → suspicious
    score -= 20;
  }

  // Clamp
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

export default function HomePage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResponse | null>(null);

  // 🔗 Your live backend API on Render
  const API_BASE = "https://breachless-api.onrender.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const cleaned = normalizeDomain(domain);
    if (!cleaned) {
      setError("Please enter a domain, e.g. example.com");
      return;
    }

    setDomain(cleaned);
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/audit/${encodeURIComponent(cleaned)}`
      );
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong while running the audit."
      );
    } finally {
      setLoading(false);
    }
  };

  const computed =
    result && result.summary ? computeScoreAndLetter(result.summary) : null;
  const derivedScore = computed?.score ?? null;
  const derivedLetter = computed?.letter ?? undefined;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950/95 to-slate-950/80 shadow-2xl shadow-slate-900/90 p-6 md:p-10 relative overflow-hidden">
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-40 -left-32 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-8">
          {/* Top bar / logo */}
          <header className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-emerald-400 p-[2px] shadow-lg shadow-blue-500/60">
                <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full border border-blue-300/70 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs uppercase tracking-[0.22em] text-slate-300">
                  Breachless
                </span>
                <span className="text-[11px] text-slate-500">
                  Automated website security audit
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-300 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                <span>Instant, self-serve security insights</span>
              </div>

              <nav className="flex items-center gap-3 text-[11px] text-slate-300">
                <Link href="/" className="hover:text-slate-50 transition">
                  Home
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 hover:border-slate-500 hover:text-slate-50 transition"
                >
                  Pricing
                </Link>
              </nav>
            </div>
          </header>

          {/* Main content grid */}
          <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2.5fr)] items-start">
            {/* Left: hero + form */}
            <section className="space-y-5">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
                  Your website’s security{" "}
                  <span className="text-blue-400">in minutes.</span>
                </h1>
                <p className="mt-3 text-sm md:text-[15px] text-slate-400 max-w-xl">
                  Breachless runs an automated security audit on your website,
                  checking SSL, security headers and basic misconfigurations,
                  and turns it into a clear, human-readable report.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-slate-300">
                  <strong className="font-medium text-slate-100">
                    No meetings
                  </strong>{" "}
                  or sales calls
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-slate-300">
                  <strong className="font-medium text-slate-100">
                    Built for startups
                  </strong>{" "}
                  &amp; small teams
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-slate-300">
                  Letter-grade security score (A–F)
                </span>
              </div>

              {/* Form card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-4 shadow-xl shadow-slate-950/80">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3"
                  autoComplete="off"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                        className="w-full rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2.5 pr-10 text-sm text-slate-100 outline-none ring-blue-500/0 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-500">
                        domain
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/60 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? "Running audit…" : "Run free audit"}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                    <span>⏱ Typically completes in under 10 seconds.</span>
                    <span>
                      <span className="mr-1 text-amber-300 drop-shadow-[0_0_6px_rgba(252,211,77,0.9)]">
                        ★★★★★
                      </span>
                      Early users report feeling “confident” shipping new
                      releases.
                    </span>
                  </div>

                  {error && (
                    <p className="text-xs text-rose-400 bg-rose-950/50 border border-rose-800 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}
                </form>
              </div>
            </section>

            {/* Right: result / sample card */}
            <aside className="space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/95 px-4 py-3.5 shadow-xl shadow-slate-950/80">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-400">
                    {result ? (
                      <>
                        <p className="uppercase tracking-[0.22em] text-slate-400">
                          Breachless security snapshot
                        </p>
                        <p className="text-[12px] text-slate-300">
                          for{" "}
                          <span className="font-medium text-slate-100">
                            {result.domain || domain}
                          </span>
                        </p>
                      </>
                    ) : (
                      <>Sample Breachless security snapshot</>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200 border border-emerald-400/60">
                      <span className="font-semibold text-base leading-none">
                        {result ? derivedLetter ?? "C" : "A"}
                      </span>
                      <span>Overall score</span>
                    </div>
                    {result && (
                      <Link
                        href={`/report/${encodeURIComponent(
                          result.domain || domain
                        )}`}
                        className="inline-flex items-center rounded-full border border-blue-500/60 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-100 hover:bg-blue-500/20 hover:border-blue-400 transition"
                      >
                        View full report
                      </Link>
                    )}
                  </div>
                </div>

                {/* Summary rows */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
                    <div>
                      <div className="font-medium text-slate-100">
                        HTTPS &amp; SSL
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Checks certificate, expiry and basic HTTPS redirects.
                      </div>
                    </div>
                    <div className="text-right text-[11px]">
                      {result ? (
                        <div
                          className={
                            result.summary.ssl_valid
                              ? "text-emerald-300"
                              : "text-rose-300"
                          }
                        >
                          {result.summary.ssl_valid ? "Valid" : "Not valid"}
                        </div>
                      ) : (
                        <span className="text-emerald-300">Valid</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
                    <div>
                      <div className="font-medium text-slate-100">
                        Security headers
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Looks for CSP, HSTS and other key protections.
                      </div>
                    </div>
                    <div className="text-right text-[11px]">
                      {result ? (
                        <>
                          <div className="text-slate-200">
                            {result.summary.total_headers_checked -
                              result.summary.headers_missing}
                            /{result.summary.total_headers_checked} present
                          </div>
                          <div className="text-amber-300">
                            {result.summary.headers_missing} missing
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-slate-200">5/6 present</div>
                          <div className="text-amber-300">1 missing</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status text */}
                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-xs text-slate-300">
                  {result ? (
                    <>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                        <span className="font-medium text-slate-100">
                          Breachless summary
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Your current setup scored{" "}
                        <span className="font-semibold text-slate-50">
                          {derivedLetter ?? "C"}
                          {derivedScore !== null
                            ? ` (${derivedScore}/100)`
                            : ""}
                        </span>
                        . We have prioritised a short checklist of fixes your
                        team can handle in a single sprint.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                        <span className="font-medium text-slate-100">
                          Breachless summary
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        You will see a high-level summary of SSL, HTTPS and
                        security headers here, plus a focused list of changes
                        to make your site safer without overloading your team.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                Breachless helps startups and small businesses launch and grow{" "}
                <span className="italic text-slate-200">breachless</span>, with
                automated audits instead of expensive consultants.
              </p>
            </aside>
          </div>

          {/* What is Breachless? */}
          <section className="mt-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 md:p-8 shadow-[0_0_40px_rgba(15,23,42,0.85)]">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-3">
              What is Breachless?
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Breachless is an automated website security audit tool built for
              startups, small teams, and solo founders. It performs a fast,
              lightweight scan of your public website and generates a clear,
              human-readable security score from A–F.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
                <h3 className="text-sm font-semibold text-blue-300 mb-2">
                  🛡️ What Breachless checks
                </h3>
                <ul className="text-sm text-slate-300 space-y-1.5">
                  <li>• SSL validity, issuer, expiry date & days remaining</li>
                  <li>• HTTPS configuration & redirect behaviour</li>
                  <li>
                    • Six core security headers (CSP, HSTS, X-Frame-Options,
                    etc.)
                  </li>
                  <li>• Basic misconfigurations that put users at risk</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
                <h3 className="text-sm font-semibold text-emerald-300 mb-2">
                  🚫 What Breachless does NOT do
                </h3>
                <ul className="text-sm text-slate-300 space-y-1.5">
                  <li>• No deep penetration testing</li>
                  <li>• No invasive scanning or crawling</li>
                  <li>• No access to private servers or internal code</li>
                  <li>• Does not store sensitive data</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              It’s a simple, fast way to understand your website’s security
              posture and catch easy-to-fix issues before they become real
              risks.
            </p>

            <div className="mt-6">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:brightness-110 transition"
              >
                See pricing &amp; Pro features →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

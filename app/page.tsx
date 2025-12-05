// Breachless frontend UI
"use client";

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

    const trimmed = domain.trim();
    if (!trimmed) {
      setError("Please enter a domain, e.g. example.com");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/audit/${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong while running the audit.");
    } finally {
      setLoading(false);
    }
  };

  const derivedScore = result?.summary.score ?? null;
  const derivedLetter = result?.summary.letter_grade ?? null;

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
          <header className="flex items-center justify-between gap-3">
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

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              <span>Instant, self-serve security insights</span>
            </div>
          </header>

          {/* Main content grid */}
          <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2.5fr)] items-start">
            {/* Left: hero + form */}
            <section className="space-y-5">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
                  Your website’s security,{" "}
                  <span className="text-blue-400">in minutes.</span>
                </h1>
                <p className="mt-3 text-sm md:text-[15px] text-slate-400 max-w-xl">
                  Breachless runs an automated security audit on your website —
                  checking SSL, security headers and basic misconfigurations —
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
                      Early users report feeling “confident” shipping new releases.
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
                        Breachless security snapshot for{" "}
                        <span className="font-medium text-slate-100">
                          {result.domain}
                        </span>
                      </>
                    ) : (
                      <>Sample Breachless security snapshot</>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200 border border-emerald-400/60">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-200 bg-emerald-500 text-xs font-semibold text-emerald-950 shadow-[0_0_10px_rgba(16,185,129,0.8)]">
                      {derivedLetter || "A"}
                    </span>
                    <span>Overall score</span>
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
                          {derivedLetter || "A"}
                          {derivedScore !== null ? ` (${derivedScore}/100)` : ""}
                        </span>
                        . We’ve prioritised a short checklist of fixes your
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
                        You’ll see a high-level summary of SSL, HTTPS and
                        security headers here, plus a focused list of changes
                        to make your site safer without overloading your team.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                Breachless helps startups and small businesses launch and grow{" "}
                <span className="italic text-slate-200">breachless</span> — with
                automated audits instead of expensive consultants.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

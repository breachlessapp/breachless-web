import Link from "next/link";

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

type StartupConfig = {
  name: string;
  domain: string;
  note?: string;
};

type StartupRow = {
  name: string;
  domain: string;
  note?: string;
  score: number | null;
  letter: string | null;
  sslValid: boolean | null;
  headersPresent: number | null;
  headersTotal: number | null;
};

const AI_STARTUPS: StartupConfig[] = [
  { name: "Perplexity", domain: "perplexity.ai", note: "AI search engine" },
  { name: "Anthropic / Claude", domain: "claude.ai", note: "AI assistant" },
  { name: "OpenAI", domain: "openai.com", note: "Models & API" },
  { name: "Character AI", domain: "character.ai", note: "AI characters" },
  { name: "Midjourney", domain: "midjourney.com", note: "AI image generation" },
  { name: "Runway", domain: "runwayml.com", note: "AI video & editing" },
  { name: "ElevenLabs", domain: "elevenlabs.io", note: "AI voice" },
  { name: "Synthesia", domain: "synthesia.io", note: "AI video avatars" },
  { name: "Cohere", domain: "cohere.ai", note: "Enterprise LLMs" },
  { name: "Stability AI", domain: "stability.ai", note: "Stable Diffusion" },
  { name: "Hugging Face", domain: "huggingface.co", note: "Models & hub" },
  { name: "Luma", domain: "luma.ai", note: "3D & video AI" },
  { name: "Mistral AI", domain: "mistral.ai", note: "Open LLMs" },
  { name: "Replit", domain: "replit.com", note: "AI coding environment" },
  { name: "Cursor", domain: "cursor.sh", note: "AI code editor" },
  { name: "Adept", domain: "adept.ai", note: "Action-taking AI" },
  { name: "Inflection AI", domain: "inflection.ai", note: "Pi assistant" },
  { name: "Sierra", domain: "sierra.ai", note: "AI customer agents" },
  { name: "Glean", domain: "glean.com", note: "AI workplace search" },
  { name: "Runpod", domain: "runpod.io", note: "AI infra / GPUs" },
];

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://breachless-api.onrender.com";

function computeScoreAndLetter(summary: AuditSummary): {
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

async function getStartupSecurityData(): Promise<StartupRow[]> {
  const results = await Promise.all(
    AI_STARTUPS.map(async (startup) => {
      try {
        const res = await fetch(
          `${API_BASE}/audit/${encodeURIComponent(startup.domain)}`,
          {
            // cache this for 1 hour per domain
            next: { revalidate: 3600 },
          }
        );

        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }

        const data = (await res.json()) as AuditResponse;
        const summary = data.summary;

        const computed = computeScoreAndLetter(summary);

        const headersTotal = summary.total_headers_checked ?? null;
        const headersMissing = summary.headers_missing ?? null;
        const headersPresent =
          headersTotal !== null && headersMissing !== null
            ? headersTotal - headersMissing
            : null;

        return {
          name: startup.name,
          domain: startup.domain,
          note: startup.note,
          score: computed.score,
          letter: computed.letter,
          sslValid: summary.ssl_valid,
          headersPresent,
          headersTotal,
        };
      } catch {
        // If the API fails, still return the basic data so the row shows
        return {
          name: startup.name,
          domain: startup.domain,
          note: startup.note,
          score: null,
          letter: null,
          sslValid: null,
          headersPresent: null,
          headersTotal: null,
        };
      }
    })
  );

  // Sort by score desc, putting null scores last
  return results.sort((a, b) => {
    if (a.score === null && b.score === null) return 0;
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score;
  });
}

export const metadata = {
  title: "AI Startup Security Benchmarks (2025) – Breachless",
  description:
    "We scanned 20 leading AI startup websites for SSL, HTTPS and security headers. See how they score and benchmark your own startup.",
};

export default async function AiBenchmarksPage() {
  const rows = await getStartupSecurityData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/90 p-6 md:p-10 shadow-2xl shadow-slate-900/90">
        {/* Top glow */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-40 -left-32 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-8">
          {/* Header / Nav */}
          <header className="mb-4 flex items-center justify-between gap-3">
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

  <Link
    href="/reports"
    className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 hover:border-slate-500 hover:text-slate-50 transition"
  >
    Reports
  </Link>

  <Link
    href="/benchmarks/ai-startups"
    className="rounded-full border border-blue-700 bg-slate-950/70 px-3 py-1 hover:border-blue-500 hover:text-slate-50 transition"
  >
    AI Benchmarks
  </Link>
</nav>
          </header>

          {/* Intro */}
          <section className="space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              AI startup security benchmarks · 2025
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              How secure are leading AI startup websites?
            </h1>
            <p className="text-sm md:text-[15px] text-slate-400 max-w-3xl">
              We scanned 20 well-known AI startups using Breachless, checking
              SSL validity, HTTPS behaviour and six core security headers. Use
              this as a benchmark for your own AI startup&apos;s security
              posture.
            </p>
          </section>

          {/* Table */}
          <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/95 overflow-hidden">
            <div className="max-h-[480px] overflow-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-3 w-10">#</th>
                    <th className="px-4 py-3">Startup</th>
                    <th className="px-4 py-3">Domain</th>
                    <th className="px-4 py-3 text-center">Score</th>
                    <th className="px-4 py-3 text-center">SSL</th>
                    <th className="px-4 py-3 text-center">Headers</th>
                    <th className="px-4 py-3 text-right">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs md:text-sm">
                  {rows.map((row, index) => {
                    const scoreDisplay =
                      row.score !== null ? `${row.score}/100` : "N/A";
                    const headersDisplay =
                      row.headersPresent !== null && row.headersTotal !== null
                        ? `${row.headersPresent}/${row.headersTotal}`
                        : "N/A";

                    const letterBadgeClass =
                      row.letter === "A"
                        ? "bg-emerald-500/15 border-emerald-400/70 text-emerald-200"
                        : row.letter === "B"
                        ? "bg-blue-500/15 border-blue-400/70 text-blue-100"
                        : row.letter === "C"
                        ? "bg-amber-500/15 border-amber-400/70 text-amber-100"
                        : row.letter === "D"
                        ? "bg-rose-500/15 border-rose-400/70 text-rose-100"
                        : "bg-slate-700/30 border-slate-500/60 text-slate-200";

                    return (
                      <tr key={row.domain} className="hover:bg-slate-900/60">
                        <td className="px-4 py-2 text-slate-500 align-top">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 align-top">
                          <div className="font-medium text-slate-50">
                            {row.name}
                          </div>
                          {row.note && (
                            <div className="text-[11px] text-slate-400">
                              {row.note}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2 text-slate-300 align-top">
                          {row.domain}
                        </td>
                        <td className="px-4 py-2 align-top text-center">
                          <div
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] ${letterBadgeClass}`}
                          >
                            <span className="font-semibold">
                              {row.letter ?? "?"}
                            </span>
                            <span className="text-slate-200">
                              {scoreDisplay}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-2 align-top text-center">
                          {row.sslValid === null ? (
                            <span className="text-slate-500">Unknown</span>
                          ) : row.sslValid ? (
                            <span className="text-emerald-300">Valid</span>
                          ) : (
                            <span className="text-rose-300">Not valid</span>
                          )}
                        </td>
                        <td className="px-4 py-2 align-top text-center text-slate-200">
                          {headersDisplay}
                        </td>
                        <td className="px-4 py-2 align-top text-right">
                          <Link
                            href={`/report/${encodeURIComponent(row.domain)}`}
                            className="inline-flex items-center rounded-full border border-blue-500/60 bg-blue-500/10 px-3 py-1.5 text-[11px] font-medium text-blue-100 hover:bg-blue-500/20 hover:border-blue-400 transition"
                          >
                            View report
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-4 text-sm text-slate-400 space-y-3">
            <p>
              These scores are generated automatically using Breachless and are
              intended as a quick signal, not a full penetration test. They
              highlight basic misconfigurations that are usually easy to fix.
            </p>
            <p>
              Want to see where your own AI startup stands? Run a free audit in
              under 10 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:brightness-110 transition"
            >
              Run a free security audit for your site →
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

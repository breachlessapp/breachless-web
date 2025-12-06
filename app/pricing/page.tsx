"use client";

import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950/95 to-slate-950/80 shadow-2xl shadow-slate-900/90 p-6 md:p-10 relative overflow-hidden">
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-40 -left-32 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-8">
          {/* Header */}
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

          {/* Heading */}
          <section className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
              Simple pricing for{" "}
              <span className="text-blue-400">startup-friendly</span> security.
            </h1>
            <p className="text-sm md:text-[15px] text-slate-400 max-w-2xl">
              Start free, run instant security checks on your website, and only
              upgrade when you&apos;re ready for automated weekly audits and
              alerts. No sales calls, no demos, no noise.
            </p>
          </section>

          {/* Pricing grid */}
          <section className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* Free plan */}
            <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/90 p-5 shadow-lg shadow-slate-950/70">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-50">
                    Free
                  </h2>
                  <p className="text-xs text-slate-400">
                    For trying Breachless on your own site.
                  </p>
                </div>
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[10px] uppercase tracking-wide text-slate-300">
                  No card required
                </span>
              </div>

              <div className="mb-4">
                <span className="text-2xl font-semibold text-slate-50">
                  £0
                </span>
                <span className="text-xs text-slate-400 ml-1">/ forever</span>
              </div>

              <ul className="mb-5 space-y-2 text-xs text-slate-300">
                <li>• Up to 3 manual audits per day</li>
                <li>• SSL &amp; core security headers checked</li>
                <li>• Simple letter-grade score (A–F)</li>
                <li>• Clean, human-readable report</li>
                <li className="text-slate-500">
                  • No login, no history, no scheduling
                </li>
              </ul>

              <div className="mt-auto">
                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2.5 text-xs font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 transition"
                >
                  Use free audit
                </Link>
              </div>
            </div>

            {/* Pro plan */}
            <div className="flex flex-col rounded-2xl border border-blue-500/60 bg-slate-950/95 p-5 shadow-[0_0_40px_rgba(59,130,246,0.35)] relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -top-32 -right-24 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl" />
              </div>

              <div className="relative z-10 mb-3 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-50">
                    Pro
                  </h2>
                  <p className="text-xs text-slate-300">
                    For teams that want ongoing, automated checks.
                  </p>
                </div>
                <span className="rounded-full border border-blue-400/70 bg-blue-500/15 px-2.5 py-1 text-[10px] uppercase tracking-wide text-blue-100">
                  Coming soon
                </span>
              </div>

              <div className="relative z-10 mb-4">
                <span className="text-2xl font-semibold text-slate-50">
                  £19
                </span>
                <span className="text-xs text-slate-300 ml-1">/ month</span>
              </div>

              <ul className="relative z-10 mb-5 space-y-2 text-xs text-slate-100">
                <li>• Up to 50 audits per month</li>
                <li>• Weekly scheduled audit for 1 primary domain</li>
                <li>• Email alerts for SSL expiry and missing headers</li>
                <li>• Priority email support</li>
                <li>• Better &quot;why&quot; explanations for scores</li>
              </ul>

              <div className="relative z-10 mt-auto space-y-2 text-xs text-slate-300">
                <a
                  href="mailto:hello@breachless.app?subject=Breachless%20Pro%20waitlist"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-blue-500/60 hover:brightness-110 transition"
                >
                  Join Pro waitlist
                </a>
                <p className="text-[11px] text-slate-400">
                  No pressure, no demo calls — just an email when Pro is ready,
                  with early adopter pricing.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ-ish blurb */}
          <section className="text-[11px] text-slate-400">
            <p>
              Breachless is designed for founders and small teams who need{" "}
              <span className="text-slate-200">
                a quick signal on website security
              </span>{" "}
              without hiring a security consultant. Use the free audit to get a
              feel for your current risk level, and upgrade to Pro when you&apos;re
              ready for ongoing monitoring.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

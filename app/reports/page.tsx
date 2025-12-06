import Link from "next/link";

const SAMPLE_DOMAINS = [
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

export default function ReportsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-950/90 p-6 md:p-8 shadow-2xl shadow-slate-900/90">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Breachless security reports
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mt-1">
            Example website security reports
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Each report is a live snapshot of SSL, HTTPS and core security
            headers for a public website. These pages are meant to give teams a
            quick signal on basic web security posture.
          </p>
        </header>

        <section className="space-y-4">
          <ul className="space-y-2">
            {SAMPLE_DOMAINS.map((domain) => (
              <li
                key={domain}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-slate-50">
                    {domain}
                  </div>
                  <div className="text-xs text-slate-400">
                    View SSL, expiry and security header checks.
                  </div>
                </div>
                <Link
                  href={`/report/${encodeURIComponent(domain)}`}
                  className="text-[11px] rounded-full border border-blue-500/60 bg-blue-500/10 px-3 py-1.5 text-blue-100 hover:bg-blue-500/20 hover:border-blue-400 transition"
                >
                  View security report
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-[11px] text-slate-500">
            Want to see your own site? Run a free audit from the{" "}
            <Link
              href="/"
              className="text-slate-200 underline underline-offset-2 hover:text-slate-50"
            >
              Breachless homepage
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

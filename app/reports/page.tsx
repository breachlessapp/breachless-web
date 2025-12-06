import Link from "next/link";
import { curatedDomains } from "@/data/curated-domains";

const categoryLabels: Record<string, string> = {
  saas: "SaaS",
  ai: "AI & LLM startups",
  ecommerce: "E-commerce",
  local: "Local & small businesses",
  media: "Media & news",
  finance: "Finance",
  sports: "Sports",
  education: "Education",
  general: "General / misc",
  portal: "Portals",
  weather: "Weather & info",
  entertainment: "Entertainment",
};

export const metadata = {
  title: "Breachless Security Reports – Live Website Security Snapshots",
  description:
    "Live SSL, HTTPS and security header reports for well-known websites. Use these Breachless reports as benchmarks when reviewing your own site.",
};

export default function ReportsIndexPage() {
  // group domains by category for nicer layout
  const categories = Array.from(
    new Set(
      curatedDomains.map((d: any) => (d.category ? d.category : "general"))
    )
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-950/90 p-6 md:p-8 shadow-2xl shadow-slate-900/90">
        {/* Header */}
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
            quick signal on basic web security posture. Click any site below to
            view its full Breachless report.
          </p>
        </header>

        {/* Category sections */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const items = curatedDomains.filter(
              (d: any) => (d.category ?? "general") === cat
            );
            if (!items.length) return null;

            const label = categoryLabels[cat] ?? cat;

            return (
              <section key={cat} className="space-y-2">
                <h2 className="text-sm font-semibold text-slate-200">
                  {label}
                  <span className="ml-2 text-[11px] text-slate-500">
                    ({items.length} site{items.length > 1 ? "s" : ""})
                  </span>
                </h2>

                <ul className="space-y-2">
                  {items.map((item: any) => (
                    <li
                      key={item.domain}
                      className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3"
                    >
                      <div>
                        <div className="text-sm font-medium text-slate-50">
                          {item.label ?? item.domain}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.domain}
                        </div>
                        {item.notes && (
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {item.notes}
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/report/${encodeURIComponent(item.domain)}`}
                        className="text-[11px] rounded-full border border-blue-500/60 bg-blue-500/10 px-3 py-1.5 text-blue-100 hover:bg-blue-500/20 hover:border-blue-400 transition"
                      >
                        View security report
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <p className="mt-6 text-[11px] text-slate-500">
          Want to see your own site? Run a free audit from the{" "}
          <Link
            href="/"
            className="text-slate-200 underline underline-offset-2 hover:text-slate-50"
          >
            Breachless homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

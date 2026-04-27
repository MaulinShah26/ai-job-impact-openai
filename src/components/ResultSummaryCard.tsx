import { AnalysisResponse } from "@/lib/types";

export function ResultSummaryCard({ result }: { result: AnalysisResponse }) {
  return (
    <section className="rounded-2xl border border-violet-500/30 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold text-white">{result.job_title}</h2>
      <div className="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-3">
        <p>
          AI Replaceability: <span className="font-semibold text-white">{result.replaceability_score}%</span>
        </p>
        <p>
          Risk Band: <span className="font-semibold text-white">{result.risk_band}</span>
        </p>
        <p>
          Impact Type: <span className="font-semibold text-white">{result.impact_type}</span>
        </p>
      </div>
      <p className="mt-4 text-violet-200">{result.hard_or_easy_part} of this role.</p>
      <p className="mt-3 text-slate-300">{result.summary}</p>
    </section>
  );
}

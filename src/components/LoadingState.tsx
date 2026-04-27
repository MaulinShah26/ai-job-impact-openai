const loadingSteps = [
  "Breaking your role into core tasks...",
  "Scoring AI exposure across each task...",
  "Identifying what becomes less and more valuable...",
  "Generating your role impact summary..."
];

export function LoadingState() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Analyzing your role</h3>
      <ul className="space-y-3">
        {loadingSteps.map((step) => (
          <li key={step} className="text-sm text-slate-300">
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

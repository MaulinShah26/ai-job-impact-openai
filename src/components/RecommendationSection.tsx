export function RecommendationSection({ recommendations }: { recommendations: string[] }) {
  return (
    <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
      <h3 className="text-xl font-semibold text-white">What you should do next</h3>
      <ul className="mt-4 list-decimal space-y-2 pl-5 text-slate-100">
        {recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

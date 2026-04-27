export function InsightSection({
  title,
  description,
  bullets
}: {
  title: string;
  description?: string;
  bullets: string[];
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      {description ? <p className="mt-3 text-slate-300">{description}</p> : null}
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-200">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

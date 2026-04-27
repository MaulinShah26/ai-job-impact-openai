import Link from "next/link";

export function LandingHero() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="mb-6 inline-flex rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-violet-200">
        AI Job Impact Assessor
      </p>
      <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
        Will AI replace your job — or make you more valuable?
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
        Find out which parts of your role AI can automate, which parts become more valuable, and what you should do next.
      </p>
      <div className="mt-10">
        <Link
          href="/analyze"
          className="rounded-xl bg-violet-500 px-8 py-3 font-semibold text-white transition hover:bg-violet-400"
        >
          Analyze My Job
        </Link>
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-sm text-slate-400">
        We do not just predict job risk. We break your role into tasks and explain how AI changes the value of your work.
      </p>
    </section>
  );
}

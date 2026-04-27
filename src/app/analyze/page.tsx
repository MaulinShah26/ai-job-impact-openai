import Link from "next/link";
import { JobInputForm } from "@/components/JobInputForm";

export default function AnalyzePage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-6 pt-10">
        <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">
          ← Back
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-white">Analyze your role</h1>
        <p className="mt-2 text-slate-300">We score your tasks and explain what AI is changing in your work.</p>
      </div>
      <JobInputForm />
    </main>
  );
}

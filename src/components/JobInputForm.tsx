"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/LoadingState";

export function JobInputForm() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("3–5 years");
  const [dailyWorkDescription, setDailyWorkDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!jobTitle.trim()) {
      setError("Please enter a job title to analyze.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_title: jobTitle,
          industry,
          experience_level: experienceLevel,
          daily_work_description: dailyWorkDescription
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result?.error ?? "Unable to analyze this role right now. Please try again.");
        return;
      }

      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      router.push("/results");
    } catch {
      setError("Unable to analyze this role right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <form className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Job Title</label>
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            placeholder="e.g., Accountant"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Industry</label>
          <input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            placeholder="e.g., Finance"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          >
            <option>0–2 years</option>
            <option>3–5 years</option>
            <option>6–10 years</option>
            <option>10+ years</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Daily Work Description (Optional)</label>
          <textarea
            value={dailyWorkDescription}
            onChange={(e) => setDailyWorkDescription(e.target.value)}
            className="h-28 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            placeholder="Describe your day-to-day tasks"
          />
        </div>
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <button className="w-full rounded-lg bg-violet-500 p-3 font-semibold text-white hover:bg-violet-400">
          Analyze My Role
        </button>
      </form>
      {loading ? <div className="mt-6"><LoadingState /></div> : null}
    </div>
  );
}

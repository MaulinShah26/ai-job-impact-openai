"use client";

import { useEffect, useState } from "react";
import { InsightSection } from "@/components/InsightSection";
import { RecommendationSection } from "@/components/RecommendationSection";
import { ResultSummaryCard } from "@/components/ResultSummaryCard";
import { TaskBreakdownTable } from "@/components/TaskBreakdownTable";
import { sampleResult } from "@/lib/sampleData";
import { AnalysisResponse } from "@/lib/types";

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResponse>(sampleResult);

  useEffect(() => {
    const rawResult = sessionStorage.getItem("analysisResult");
    if (!rawResult) return;

    try {
      const parsed = JSON.parse(rawResult) as AnalysisResponse;
      setResult(parsed);
    } catch {
      sessionStorage.removeItem("analysisResult");
    }
  }, []);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <ResultSummaryCard result={result} />
      <TaskBreakdownTable tasks={result.tasks} />
      <InsightSection
        title="What AI is changing"
        description={result.what_ai_is_changing ?? result.summary}
        bullets={[]}
      />
      <InsightSection title="What becomes less valuable" bullets={result.less_valuable} />
      <InsightSection title="What becomes more valuable" bullets={result.more_valuable} />
      <RecommendationSection recommendations={result.recommendations} />
    </main>
  );
}

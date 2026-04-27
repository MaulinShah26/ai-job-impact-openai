import { InsightSection } from "@/components/InsightSection";
import { RecommendationSection } from "@/components/RecommendationSection";
import { ResultSummaryCard } from "@/components/ResultSummaryCard";
import { TaskBreakdownTable } from "@/components/TaskBreakdownTable";
import { sampleResult } from "@/lib/sampleData";
import { AnalysisResponse } from "@/lib/types";

export default async function ResultsPage({ searchParams }: { searchParams: Promise<{ data?: string }> }) {
  const params = await searchParams;
  const result: AnalysisResponse = params.data ? JSON.parse(decodeURIComponent(params.data)) : sampleResult;

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

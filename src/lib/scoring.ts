import { TaskScores, TaskRiskLevel } from "@/lib/types";

const WEIGHTS = {
  pattern_repeatability: 0.2,
  data_availability: 0.15,
  output_standardization: 0.15,
  context_dependency: 0.15,
  accountability: 0.1,
  human_trust: 0.1,
  physical_complexity: 0.15
} as const;

const PROTECTIVE_DIMENSIONS: Array<keyof TaskScores> = [
  "context_dependency",
  "accountability",
  "human_trust"
];

export function getRiskBand(score: number): TaskRiskLevel {
  if (score <= 25) return "Low";
  if (score <= 50) return "Moderate";
  if (score <= 75) return "High";
  return "Very High";
}

export function calculateTaskRisk(scores: TaskScores) {
  const weightedScore = Object.entries(WEIGHTS).reduce((sum, [key, weight]) => {
    const dimension = key as keyof TaskScores;
    const rawScore = scores[dimension];
    const adjustedScore = PROTECTIVE_DIMENSIONS.includes(dimension) ? 6 - rawScore : rawScore;
    return sum + adjustedScore * weight;
  }, 0);

  const riskPercentage = Math.round((((weightedScore - 1) / 4) * 100 + Number.EPSILON) * 100) / 100;

  return {
    weightedScore,
    riskPercentage,
    riskLevel: getRiskBand(riskPercentage)
  };
}

export function calculateJobRisk(tasks: Array<{ risk_percentage: number }>) {
  if (tasks.length === 0) {
    return {
      replaceabilityScore: 0,
      riskBand: "Low" as TaskRiskLevel
    };
  }

  const average = tasks.reduce((sum, task) => sum + task.risk_percentage, 0) / tasks.length;
  const replaceabilityScore = Math.round(average);

  return {
    replaceabilityScore,
    riskBand: getRiskBand(replaceabilityScore)
  };
}

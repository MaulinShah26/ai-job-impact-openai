export type ExperienceLevel = "0–2 years" | "3–5 years" | "6–10 years" | "10+ years";

export type TaskScores = {
  pattern_repeatability: number;
  data_availability: number;
  output_standardization: number;
  context_dependency: number;
  accountability: number;
  human_trust: number;
  physical_complexity: number;
};

export type TaskRiskLevel = "Low" | "Moderate" | "High" | "Very High";

export type AnalyzedTask = {
  task: string;
  risk_percentage: number;
  risk_level: TaskRiskLevel;
  scores: TaskScores;
  reason: string;
};

export type ImpactType = "Replace" | "Commoditize" | "Assist" | "Amplify" | "Transform";

export type AnalysisResponse = {
  job_title: string;
  industry?: string;
  experience_level: ExperienceLevel;
  replaceability_score: number;
  risk_band: TaskRiskLevel;
  impact_type: ImpactType;
  hard_or_easy_part:
    | "AI is taking the hard part"
    | "AI is taking the easy part"
    | "AI is changing the shape of the role";
  summary: string;
  what_ai_is_changing?: string;
  tasks: AnalyzedTask[];
  less_valuable: string[];
  more_valuable: string[];
  recommendations: string[];
};

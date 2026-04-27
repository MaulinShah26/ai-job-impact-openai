import { AnalysisResponse } from "@/lib/types";

export const sampleResult: AnalysisResponse = {
  job_title: "Accountant",
  industry: "Finance",
  experience_level: "3–5 years",
  replaceability_score: 42,
  risk_band: "Moderate",
  impact_type: "Amplify",
  hard_or_easy_part: "AI is taking the easy part",
  summary:
    "AI is automating bookkeeping, reconciliations, and routine reporting, while the highest-value accounting work still depends on judgment, compliance interpretation, and decision support.",
  what_ai_is_changing:
    "The center of gravity is moving from producing reports to interpreting financial signals and advising stakeholders on action.",
  tasks: [
    {
      task: "Bookkeeping and ledger maintenance",
      risk_percentage: 82,
      risk_level: "Very High",
      scores: {
        pattern_repeatability: 5,
        data_availability: 5,
        output_standardization: 5,
        context_dependency: 4,
        accountability: 3,
        human_trust: 3,
        physical_complexity: 5
      },
      reason: "Highly structured and repetitive with rich historical transaction data."
    },
    {
      task: "Client financial advisory",
      risk_percentage: 28,
      risk_level: "Moderate",
      scores: {
        pattern_repeatability: 2,
        data_availability: 3,
        output_standardization: 2,
        context_dependency: 1,
        accountability: 1,
        human_trust: 1,
        physical_complexity: 5
      },
      reason: "Relies on trust, business context, and human accountability for recommendations."
    }
  ],
  less_valuable: ["Manual bookkeeping", "Routine reconciliation", "Template-based monthly reporting"],
  more_valuable: ["Scenario planning", "Regulatory interpretation", "Financial storytelling for business decisions"],
  recommendations: [
    "Shift your portfolio toward advisory deliverables tied to specific business decisions.",
    "Adopt AI-assisted close and reconciliation workflows to free up analysis capacity.",
    "Build deeper expertise in interpreting changing compliance rules for clients."
  ]
};

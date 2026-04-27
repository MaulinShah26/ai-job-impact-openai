import { ImpactType } from "@/lib/types";

type ClassifyContext = {
  jobTitle: string;
  experienceLevel: string;
};

export function classifyImpact(
  jobScore: number,
  tasks: Array<{ risk_percentage: number; scores: { accountability: number; human_trust: number; context_dependency: number } }>,
  jobContext: ClassifyContext
): {
  impactType: ImpactType;
  hardOrEasyPart: "AI is taking the hard part" | "AI is taking the easy part" | "AI is changing the shape of the role";
} {
  const highRiskTasks = tasks.filter((t) => t.risk_percentage >= 70).length;
  const lowRiskTasks = tasks.filter((t) => t.risk_percentage <= 40).length;
  const mixedTaskProfile = highRiskTasks > 0 && lowRiskTasks > 0;

  const avgTrust = tasks.reduce((s, t) => s + t.scores.human_trust, 0) / tasks.length;
  const avgAccountability = tasks.reduce((s, t) => s + t.scores.accountability, 0) / tasks.length;
  const avgContext = tasks.reduce((s, t) => s + t.scores.context_dependency, 0) / tasks.length;

  const title = jobContext.jobTitle.toLowerCase();

  if (jobScore >= 76 && highRiskTasks >= Math.ceil(tasks.length * 0.6)) {
    return { impactType: "Replace", hardOrEasyPart: "AI is taking the hard part" };
  }

  if (jobScore >= 60 && (title.includes("support") || title.includes("driver") || avgTrust >= 3.2)) {
    return { impactType: "Commoditize", hardOrEasyPart: "AI is taking the hard part" };
  }

  if (mixedTaskProfile && (title.includes("manager") || title.includes("designer") || title.includes("marketer"))) {
    return { impactType: "Transform", hardOrEasyPart: "AI is changing the shape of the role" };
  }

  if (jobScore <= 50 && (avgAccountability <= 3 || avgTrust <= 3 || avgContext <= 3)) {
    return { impactType: "Amplify", hardOrEasyPart: "AI is taking the easy part" };
  }

  if (jobScore >= 40 && jobScore <= 65) {
    return { impactType: "Assist", hardOrEasyPart: "AI is taking the easy part" };
  }

  return { impactType: "Transform", hardOrEasyPart: "AI is changing the shape of the role" };
}

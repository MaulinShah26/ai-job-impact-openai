import OpenAI from "openai";
import { NextResponse } from "next/server";
import { classifyImpact } from "@/lib/classifyImpact";
import { insightPrompt, taskDecompositionPrompt, taskScoringPrompt } from "@/lib/prompts";
import { sampleResult } from "@/lib/sampleData";
import { calculateJobRisk, calculateTaskRisk } from "@/lib/scoring";
import { TaskScores } from "@/lib/types";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

async function createJsonCompletion(systemPrompt: string, userPrompt: string) {
  if (!client) return null;
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    input: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    text: { format: { type: "json_object" } }
  });

  return JSON.parse(response.output_text);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { job_title, industry, experience_level, daily_work_description } = body;

    if (!job_title?.trim()) {
      return NextResponse.json({ error: "Please enter a job title to analyze." }, { status: 400 });
    }

    if (!client) {
      return NextResponse.json({ ...sampleResult, job_title, industry, experience_level });
    }

    const decomposition = await createJsonCompletion(
      taskDecompositionPrompt,
      `Job Title: ${job_title}\nIndustry: ${industry || "N/A"}\nExperience Level: ${experience_level}\nDaily Work Description: ${daily_work_description || "N/A"}`
    );

    const scoring = await createJsonCompletion(
      taskScoringPrompt,
      `Job Title: ${job_title}\nIndustry: ${industry || "N/A"}\nExperience Level: ${experience_level}\nTasks: ${JSON.stringify(decomposition.tasks)}`
    );

    const tasks = scoring.scored_tasks.map((task: { task: string; scores: TaskScores; reason: string }) => {
      const risk = calculateTaskRisk(task.scores);
      return {
        task: task.task,
        risk_percentage: Math.round(risk.riskPercentage),
        risk_level: risk.riskLevel,
        scores: task.scores,
        reason: task.reason
      };
    });

    const { replaceabilityScore, riskBand } = calculateJobRisk(tasks);
    const { impactType, hardOrEasyPart } = classifyImpact(replaceabilityScore, tasks, {
      jobTitle: job_title,
      experienceLevel: experience_level
    });

    const insights = await createJsonCompletion(
      insightPrompt,
      JSON.stringify({
        job_title,
        industry,
        experience_level,
        tasks,
        replaceability_score: replaceabilityScore,
        risk_band: riskBand,
        impact_type: impactType
      })
    );

    return NextResponse.json({
      job_title,
      industry,
      experience_level,
      replaceability_score: replaceabilityScore,
      risk_band: riskBand,
      impact_type: impactType,
      hard_or_easy_part: hardOrEasyPart,
      summary: insights.summary,
      what_ai_is_changing: insights.what_ai_is_changing,
      tasks,
      less_valuable: insights.less_valuable,
      more_valuable: insights.more_valuable,
      recommendations: insights.recommendations
    });
  } catch {
    return NextResponse.json(sampleResult);
  }
}

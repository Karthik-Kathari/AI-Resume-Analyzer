import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';
import type { AnalysisResult } from './analyzer.service';

/**
 * Gemini AI Analyzer:
 * Analyzes resume text against the job description using Gemini models.
 * If the key is missing or an API error occurs, returns null so the system falls back seamlessly.
 */
export const analyzeWithGemini = async (
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult | null> => {
  if (!env.GEMINI_API_KEY || !env.GEMINI_API_KEY.trim()) {
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    // Use gemini-1.5-flash or gemini-2.0-flash for high speed & generous free quota
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert technical recruiter and resume ATS analyzer.
Analyze the following resume against the job description.

Job Description:
${jobDescription}

Resume:
${resumeText}

Respond ONLY with valid, raw JSON (no markdown formatting, no code fences like \`\`\`json) with this exact schema:
{
  "matchScore": <number between 0 and 100>,
  "matchedKeywords": [<array of string skills/keywords found in both>],
  "missingKeywords": [<array of important string skills/keywords from the job description missing from the resume>],
  "suggestions": [<array of 3-5 concrete, actionable bullet points to improve the resume for this role>]
}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // Remove any markdown code block fences if returned by the model
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(responseText);

    return {
      matchScore: Math.min(100, Math.max(0, Math.round(Number(parsed.matchScore) || 0))),
      matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords : [],
      missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
    };
  } catch (error) {
    console.warn('⚠️ Gemini analysis failed, falling back to rule-based engine:', (error as Error).message);
    return null;
  }
};

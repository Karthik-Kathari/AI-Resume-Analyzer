import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';
import type { AnalysisResult } from './analyzer.service';

/**
 * Optional Gemini AI Analyzer:
 * Only used if ENABLE_AI_ENHANCEMENT is explicitly set to true AND a valid Gemini API key is provided.
 * If disabled, missing, rate-limited, or failed, returns null to fall back seamlessly to rule-based engine.
 */
export const analyzeWithGemini = async (
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult | null> => {
  // 1. Guard check: Must be explicitly enabled
  if (!env.ENABLE_AI_ENHANCEMENT) {
    return null;
  }

  // 2. Guard check: Key must exist and match Google AI Studio format
  const apiKey = env.GEMINI_API_KEY?.trim();
  if (!apiKey || !apiKey.startsWith('AIza')) {
    console.warn('⚠️ Gemini AI is enabled in config, but GEMINI_API_KEY is not a valid Google AI Studio key.');
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert technical recruiter and resume ATS analyzer.
Analyze the following resume against the job description.

Job Description:
${jobDescription}

Resume:
${resumeText}

Respond ONLY with valid raw JSON (no markdown formatting, no code fences like \`\`\`json) with this exact schema:
{
  "matchScore": <integer between 0 and 100>,
  "matchedKeywords": [<array of string technical skills/tools present in both>],
  "missingKeywords": [<array of string technical skills/tools from the job description missing in the resume>],
  "suggestions": [<array of 3-5 concrete actionable recommendations to improve resume impact for this role>]
}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(responseText);

    const matched = Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords.map((k: any) => String(k).toLowerCase()) : [];
    const missing = Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords.map((k: any) => String(k).toLowerCase()) : [];
    const total = matched.length + missing.length;
    const score = Math.min(100, Math.max(0, Math.round(Number(parsed.matchScore) || (total > 0 ? (matched.length / total) * 100 : 0))));

    return {
      matchScore: score,
      matchedKeywords: matched,
      missingKeywords: missing,
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      analysisMode: 'ai-enhanced',
      breakdown: {
        totalKeywords: total,
        matchedCount: matched.length,
        missingCount: missing.length,
      },
      disclaimer:
        'This score reflects AI-assisted semantic and keyword analysis. It is an algorithmic estimation and does not guarantee or predict actual employer ATS screening or hiring outcomes.',
    };
  } catch (error) {
    console.warn('⚠️ Gemini analysis call failed or rate-limited. Falling back to rule-based engine:', (error as Error).message);
    return null;
  }
};

import { env } from '../config/env';
import type { AnalysisResult } from './analyzer.service';

/**
 * Gemini API stub — plug in your free Gemini API key to activate.
 * Returns null when GEMINI_API_KEY is not set (falls back to rule-based).
 */
export const analyzeWithGemini = async (
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult | null> => {
  if (!env.GEMINI_API_KEY) return null;

  // TODO: Replace stub with real Gemini API call when key is set
  // Example implementation:
  // const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  // const prompt = `Analyze this resume against the job description...`
  // const result = await model.generateContent(prompt);
  // return parseGeminiResponse(result.response.text());

  return null;
};

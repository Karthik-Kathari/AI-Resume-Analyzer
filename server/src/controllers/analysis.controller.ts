import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Analysis } from '../models/Analysis.model';
import { extractTextFromPDF } from '../utils/pdfParser';
import { analyzeResume } from '../services/analyzer.service';
import { analyzeWithGemini } from '../services/gemini.service';

// ─── Analyze ─────────────────────────────────────────────────────────────────
export const analyze = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'Resume PDF is required' });
    return;
  }

  const { jobDescription } = req.body;
  if (!jobDescription || jobDescription.trim().length < 50) {
    res.status(400).json({ success: false, message: 'Job description must be at least 50 characters' });
    return;
  }

  // Extract text from PDF
  const resumeText = await extractTextFromPDF(req.file.buffer);
  if (resumeText.length < 100) {
    res.status(422).json({ success: false, message: 'Could not extract enough text from the PDF. Try a text-based PDF.' });
    return;
  }

  // Try Gemini first → fall back to rule-based
  const geminiResult = await analyzeWithGemini(resumeText, jobDescription);
  const result = geminiResult ?? analyzeResume(resumeText, jobDescription);

  // Persist to DB
  const analysis = await Analysis.create({
    userId: req.userId,
    resumeText,
    jobDescription,
    ...result,
  });

  res.status(201).json({ success: true, analysis });
};

// ─── Get History ─────────────────────────────────────────────────────────────
export const getHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  const analyses = await Analysis.find({ userId: req.userId })
    .sort({ createdAt: -1 })
    .select('-resumeText') // don't send full resume text in list view
    .lean();

  res.json({ success: true, count: analyses.length, analyses });
};

// ─── Get Single ──────────────────────────────────────────────────────────────
export const getAnalysis = async (req: AuthRequest, res: Response): Promise<void> => {
  const analysis = await Analysis.findOne({ _id: req.params.id, userId: req.userId }).lean();

  if (!analysis) {
    res.status(404).json({ success: false, message: 'Analysis not found' });
    return;
  }

  res.json({ success: true, analysis });
};

// ─── Delete ──────────────────────────────────────────────────────────────────
export const deleteAnalysis = async (req: AuthRequest, res: Response): Promise<void> => {
  const analysis = await Analysis.findOneAndDelete({ _id: req.params.id, userId: req.userId });

  if (!analysis) {
    res.status(404).json({ success: false, message: 'Analysis not found' });
    return;
  }

  res.json({ success: true, message: 'Analysis deleted' });
};

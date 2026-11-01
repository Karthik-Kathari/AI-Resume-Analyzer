import mongoose, { Document, Schema } from 'mongoose';

export interface IScoreBreakdown {
  totalKeywords: number;
  matchedCount: number;
  missingCount: number;
}

export interface IAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  resumeText: string;
  jobDescription: string;
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  analysisMode: 'rule-based' | 'ai-enhanced';
  breakdown: IScoreBreakdown;
  disclaimer: string;
  createdAt: Date;
}

const AnalysisSchema = new Schema<IAnalysis>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    resumeText: { type: String, required: true },
    jobDescription: { type: String, required: true },
    matchScore: { type: Number, required: true, min: 0, max: 100 },
    matchedKeywords: [{ type: String }],
    missingKeywords: [{ type: String }],
    suggestions: [{ type: String }],
    analysisMode: {
      type: String,
      enum: ['rule-based', 'ai-enhanced'],
      default: 'rule-based',
      required: true,
    },
    breakdown: {
      totalKeywords: { type: Number, default: 0 },
      matchedCount: { type: Number, default: 0 },
      missingCount: { type: Number, default: 0 },
    },
    disclaimer: {
      type: String,
      default:
        'This score reflects keyword relevance analysis between the submitted resume and job description. It does not predict or guarantee actual employer ATS screening or hiring outcomes.',
    },
  },
  { timestamps: true }
);

export const Analysis = mongoose.model<IAnalysis>('Analysis', AnalysisSchema);

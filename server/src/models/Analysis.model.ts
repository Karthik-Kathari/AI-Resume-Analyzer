import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  resumeText: string;
  jobDescription: string;
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
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
  },
  { timestamps: true }
);

export const Analysis = mongoose.model<IAnalysis>('Analysis', AnalysisSchema);

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { analysisAPI } from '../api';
import ScoreCard from '../components/Results/ScoreCard';
import KeywordChips from '../components/Results/KeywordChips';
import Suggestions from '../components/Results/Suggestions';
import logoImg from '../assets/logo.png';
import iconImg from '../assets/icon.png';

const AnalysisDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analysisAPI
      .getOne(id)
      .then(({ data }) => setAnalysis(data.analysis))
      .catch(() => navigate('/history'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 text-sm">
        Loading analysis record...
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/history')}
              className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to History
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/95 rounded-xl px-2.5 py-1 shadow-sm border border-white/20 hidden sm:flex items-center">
              <img src={logoImg} alt="ResumeIQ Logo" className="h-5 w-auto object-contain" />
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
            >
              New Scan
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
            Archived Audit
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Analysis Details
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Recorded on {new Date(analysis.createdAt).toLocaleDateString()} at{' '}
            {new Date(analysis.createdAt).toLocaleTimeString()}
          </p>
        </div>

        <ScoreCard
          score={analysis.matchScore}
          analysisMode={analysis.analysisMode}
          breakdown={analysis.breakdown}
          disclaimer={analysis.disclaimer}
        />
        <KeywordChips matched={analysis.matchedKeywords} missing={analysis.missingKeywords} />
        <Suggestions suggestions={analysis.suggestions} />

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
            Target Job Description Analyzed
          </h4>
          <div className="text-xs text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto pr-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {analysis.jobDescription}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisDetailPage;

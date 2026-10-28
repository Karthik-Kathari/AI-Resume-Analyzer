import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { analysisAPI } from '../api';
import ScoreCard from '../components/Results/ScoreCard';
import KeywordChips from '../components/Results/KeywordChips';
import Suggestions from '../components/Results/Suggestions';

const AnalysisDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analysisAPI.getOne(id)
      .then(({ data }) => setAnalysis(data.analysis))
      .catch(() => navigate('/history'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="font-bold text-gray-800 text-lg">AI Resume Analyzer</span>
        </div>
        <button onClick={() => navigate('/history')} className="text-sm text-indigo-600 hover:underline font-medium">
          ← Back to History
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Analysis Details</h2>
        <p className="text-sm text-gray-400">
          Analyzed on {new Date(analysis.createdAt).toLocaleString()}
        </p>
        <ScoreCard score={analysis.matchScore} />
        <KeywordChips matched={analysis.matchedKeywords} missing={analysis.missingKeywords} />
        <Suggestions suggestions={analysis.suggestions} />

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Job Description</h3>
          <p className="text-sm text-gray-500 whitespace-pre-wrap">{analysis.jobDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetailPage;

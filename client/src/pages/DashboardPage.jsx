import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analysisAPI } from '../api';
import ScoreCard from '../components/Results/ScoreCard';
import KeywordChips from '../components/Results/KeywordChips';
import Suggestions from '../components/Results/Suggestions';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === 'application/pdf') setFile(dropped);
    else setError('Please drop a valid PDF file.');
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) { setError('Please upload your resume PDF.'); return; }
    if (jobDescription.trim().length < 50) { setError('Job description must be at least 50 characters.'); return; }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);
      const { data } = await analysisAPI.analyze(formData);
      setResult(data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="font-bold text-gray-800 text-lg">AI Resume Analyzer</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Hi, <span className="font-medium text-gray-800">{user?.name}</span></span>
          <button onClick={() => navigate('/history')} className="text-sm text-indigo-600 hover:underline font-medium">History</button>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline font-medium">Logout</button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Analyze Your Resume</h2>
          <p className="text-gray-500 mt-2">Upload your PDF resume and paste the job description to get your match score.</p>
        </div>

        <form onSubmit={handleAnalyze} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Resume (PDF)</label>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'}`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file ? (
                <div className="text-indigo-700 font-medium">
                  📄 {file.name} <span className="text-gray-400 font-normal text-sm">({(file.size / 1024).toFixed(0)} KB)</span>
                  <p className="text-xs text-gray-400 mt-1">Click to change</p>
                </div>
              ) : (
                <div className="text-gray-400">
                  <p className="text-4xl mb-2">📁</p>
                  <p className="font-medium text-gray-600">Drag & drop your PDF here</p>
                  <p className="text-sm mt-1">or click to browse — Max 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              placeholder="Paste the full job description here..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{jobDescription.length} characters (min 50)</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Analyzing...
              </span>
            ) : '🔍 Analyze Resume'}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            <ScoreCard score={result.matchScore} />
            <KeywordChips matched={result.matchedKeywords} missing={result.missingKeywords} />
            <Suggestions suggestions={result.suggestions} />
            <div className="text-center">
              <button onClick={() => navigate('/history')} className="text-indigo-600 hover:underline text-sm font-medium">
                View full history →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

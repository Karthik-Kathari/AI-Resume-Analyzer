import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analysisAPI } from '../api';
import ScoreCard from '../components/Results/ScoreCard';
import KeywordChips from '../components/Results/KeywordChips';
import Suggestions from '../components/Results/Suggestions';
import logoImg from '../assets/logo.png';

const SAMPLE_JD = `Full Stack Engineer (Node.js & React)
We are seeking an experienced Full Stack Engineer to scale our SaaS platform.
Requirements:
- Deep expertise in JavaScript, TypeScript, Node.js, and Express.
- Strong proficiency in modern React.js, Tailwind CSS, and state management.
- Hands-on experience with MongoDB, Redis, and RESTful API architecture.
- Solid understanding of Docker, CI/CD pipelines, AWS (S3, EC2), and microservices.
- Experience with Unit Testing (Jest), Git, and WebSockets is a big plus.`;

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
    if (dropped?.type === 'application/pdf' || dropped?.name?.toLowerCase().endsWith('.pdf')) {
      setFile(dropped);
      setError('');
    } else {
      setError('Please provide a valid PDF document.');
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select or upload your resume PDF.');
      return;
    }
    if (jobDescription.trim().length < 50) {
      setError('Please provide a job description of at least 50 characters.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);
      const { data } = await analysisAPI.analyze(formData);
      setResult(data.analysis);
      // Smooth scroll to result
      window.scrollTo({ top: 600, behavior: 'smooth' });
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please check inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleJD = () => {
    setJobDescription(SAMPLE_JD);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-radial-gradient pointer-events-none"></div>

      {/* Top Navbar with Rich Glassmorphism */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-lg shadow-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer group" onClick={() => navigate('/dashboard')}>
            <div className="bg-white/90 hover:bg-white backdrop-blur-xl border border-white/40 px-3.5 py-1.5 rounded-xl shadow-md shadow-indigo-500/10 transition-all duration-200">
              <img src={logoImg} alt="ResumeIQ" className="h-6 sm:h-7 w-auto object-contain" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/history')}
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-900"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </button>

            <div className="h-4 w-px bg-slate-800"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-slate-200">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-rose-400 hover:text-rose-300 transition-colors font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 relative">
        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Real-time Keyword & ATS Alignment Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Analyze & Optimize Your Resume For ATS
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Compare your resume against any target job description. Identify critical keyword gaps, eliminate non-technical noise, and elevate interview call rates.
          </p>
        </div>

        {/* Input Form Card */}
        <form onSubmit={handleAnalyze} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
              <svg className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resume Upload Column */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  1. Resume (PDF)
                </label>
                <span className="text-[11px] text-slate-500">Max 5MB</span>
              </div>

              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`h-64 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? 'border-indigo-500 bg-indigo-950/20'
                    : file
                    ? 'border-emerald-500/40 bg-emerald-950/10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                      setError('');
                    }
                  }}
                />

                {file ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-200 truncate max-w-xs">{file.name}</div>
                      <div className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 font-medium underline mt-1"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-300">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-300">
                      Drag & drop your resume PDF
                    </div>
                    <p className="text-xs text-slate-500">or click to browse from device</p>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description Column */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Target Job Description
                </label>
                <button
                  type="button"
                  onClick={loadSampleJD}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Load Sample
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job requirements, responsibilities, and required tech stack..."
                  className="w-full h-64 bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 resize-none transition-all leading-relaxed"
                />
                <div className="absolute bottom-3 right-3 text-[11px] text-slate-500 font-mono">
                  {jobDescription.length} chars
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 active:brightness-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span>Parsing Document & Matching Keywords...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span>Run ATS Precision Analysis</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results View */}
        {result && (
          <div className="mt-10 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Analysis Results</h3>
                <p className="text-xs text-slate-400">Detailed keyword breakdown and match scoring</p>
              </div>
              <button
                onClick={() => navigate('/history')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                View in History →
              </button>
            </div>

            <ScoreCard
              score={result.matchScore}
              analysisMode={result.analysisMode}
              breakdown={result.breakdown}
              disclaimer={result.disclaimer}
            />
            <KeywordChips matched={result.matchedKeywords} missing={result.missingKeywords} />
            <Suggestions suggestions={result.suggestions} />
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;

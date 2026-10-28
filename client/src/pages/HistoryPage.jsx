import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analysisAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const HistoryPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await analysisAPI.getHistory();
        setAnalyses(data.analyses || []);
      } catch {
        setError('Failed to retrieve analysis history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this saved analysis record?')) return;
    try {
      await analysisAPI.deleteOne(id);
      setAnalyses((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert('Could not delete record.');
    }
  };

  const filtered = analyses.filter((item) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    const date = new Date(item.createdAt).toLocaleDateString().toLowerCase();
    const score = String(item.matchScore);
    const kw = (item.matchedKeywords || []).concat(item.missingKeywords || []).join(' ').toLowerCase();
    return date.includes(term) || score.includes(term) || kw.includes(term);
  });

  const getScoreBadge = (score) => {
    if (score >= 70) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (score >= 40) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
              R
            </div>
            <span className="font-bold text-white tracking-tight">ResumeIQ</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              + New Analysis
            </button>
            <div className="h-4 w-px bg-slate-800"></div>
            <button
              onClick={async () => { await logout(); navigate('/login'); }}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Audit & Analysis History</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Review past resume scans, score trends, and keyword match diagnostics.</p>
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search keyword or score..."
              className="w-full sm:w-64 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm">
            Loading analysis records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-300">No analysis records found</p>
            <p className="text-xs text-slate-500 mt-1">Run an ATS scan to start logging your match results.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
            >
              Analyze Resume Now
            </button>
          </div>
        ) : (
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Match Score</th>
                    <th className="py-3.5 px-4 font-semibold">Engine</th>
                    <th className="py-3.5 px-4 font-semibold">Matched</th>
                    <th className="py-3.5 px-4 font-semibold">Missing</th>
                    <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filtered.map((item) => (
                    <tr
                      key={item._id}
                      onClick={() => navigate(`/analysis/${item._id}`)}
                      className="hover:bg-slate-800/30 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreBadge(item.matchScore)}`}>
                          {item.matchScore}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {item.analysisMode === 'ai-enhanced' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                            AI
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            Zero-Cost
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-emerald-400 font-medium">
                        {item.matchedKeywords?.length || 0} skills
                      </td>
                      <td className="py-4 px-4 text-rose-400 font-medium">
                        {item.missingKeywords?.length || 0} gaps
                      </td>
                      <td className="py-4 px-4 text-slate-400 text-xs">
                        {new Date(item.createdAt).toLocaleDateString()} at{' '}
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleDelete(item._id, e)}
                          className="text-xs text-slate-500 hover:text-rose-400 transition-colors p-1"
                          title="Delete record"
                        >
                          <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analysisAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const HistoryPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await analysisAPI.getHistory();
        setAnalyses(data.analyses);
      } catch {
        setError('Failed to load history.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this analysis?')) return;
    try {
      await analysisAPI.deleteOne(id);
      setAnalyses((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert('Failed to delete.');
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 70) return 'bg-green-100 text-green-700';
    if (score >= 40) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const handleLogout = async () => { await logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="font-bold text-gray-800 text-lg">AI Resume Analyzer</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Hi, <span className="font-medium text-gray-800">{user?.name}</span></span>
          <button onClick={() => navigate('/dashboard')} className="text-sm text-indigo-600 hover:underline font-medium">New Analysis</button>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline font-medium">Logout</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis History</h2>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && analyses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500 font-medium">No analyses yet.</p>
            <button onClick={() => navigate('/dashboard')} className="mt-4 text-indigo-600 hover:underline text-sm font-medium">
              Analyze your first resume →
            </button>
          </div>
        )}

        {!loading && analyses.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">#</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Score</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Matched</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Missing</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analyses.map((a, i) => (
                  <tr key={a._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getScoreBadge(a.matchScore)}`}>
                        {a.matchScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-green-600 font-medium">{a.matchedKeywords.length} keywords</td>
                    <td className="px-6 py-4 text-red-500 font-medium">{a.missingKeywords.length} keywords</td>
                    <td className="px-6 py-4 text-gray-400">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button onClick={() => navigate(`/analysis/${a._id}`)} className="text-indigo-600 hover:underline font-medium">View</button>
                      <button onClick={() => handleDelete(a._id)} className="text-red-400 hover:underline font-medium">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

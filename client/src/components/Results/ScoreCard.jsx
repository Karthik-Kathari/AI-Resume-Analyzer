const ScoreCard = ({ score }) => {
  const getColor = () => {
    if (score >= 70) return { ring: '#22c55e', text: 'text-green-600', label: 'Strong Match 🎯', bg: 'bg-green-50 border-green-200' };
    if (score >= 40) return { ring: '#f59e0b', text: 'text-yellow-600', label: 'Moderate Match ⚡', bg: 'bg-yellow-50 border-yellow-200' };
    return { ring: '#ef4444', text: 'text-red-600', label: 'Low Match ⚠️', bg: 'bg-red-50 border-red-200' };
  };

  const { ring, text, label, bg } = getColor();
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`bg-white rounded-2xl shadow-sm border p-8 text-center ${bg}`}>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Match Score</h3>
      <div className="flex justify-center mb-4">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="54" fill="none" stroke="#e5e7eb" strokeWidth="12" />
          <circle
            cx="70" cy="70" r="54" fill="none"
            stroke={ring} strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
          <text x="70" y="75" textAnchor="middle" className="font-bold" style={{ fontSize: '28px', fill: ring, fontWeight: 700 }}>
            {score}%
          </text>
        </svg>
      </div>
      <p className={`text-lg font-semibold ${text}`}>{label}</p>
    </div>
  );
};

export default ScoreCard;

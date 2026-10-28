import React from 'react';

const ScoreCard = ({ score }) => {
  const getBadgeConfig = () => {
    if (score >= 75) {
      return {
        stroke: '#10b981', // emerald-500
        glow: 'rgba(16, 185, 129, 0.25)',
        text: 'text-emerald-400',
        bg: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/30',
        badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
        label: 'Exceptional Fit',
        subtext: 'Your resume demonstrates high technical alignment with this role.',
      };
    }
    if (score >= 45) {
      return {
        stroke: '#f59e0b', // amber-500
        glow: 'rgba(245, 158, 11, 0.25)',
        text: 'text-amber-400',
        bg: 'from-amber-500/10 to-orange-500/5 border-amber-500/30',
        badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
        label: 'Moderate Alignment',
        subtext: 'Solid foundation, but critical domain keywords are missing.',
      };
    }
    return {
      stroke: '#ef4444', // red-500
      glow: 'rgba(239, 68, 68, 0.25)',
      text: 'text-rose-400',
      bg: 'from-rose-500/10 to-red-500/5 border-rose-500/30',
      badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      label: 'Low Alignment',
      subtext: 'Significant skill discrepancies detected against job specifications.',
    };
  };

  const config = getBadgeConfig();
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`rounded-2xl border p-6 bg-gradient-to-br ${config.bg} backdrop-blur-xl relative overflow-hidden transition-all duration-300`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Circular Progress Gauge */}
          <div className="relative flex items-center justify-center">
            <svg width="144" height="144" className="transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke={config.stroke}
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{ filter: `drop-shadow(0 0 10px ${config.glow})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">{score}%</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Match</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
                {config.label}
              </span>
              <span className="text-xs text-slate-400">ATS Assessment</span>
            </div>
            <h4 className="text-lg font-bold text-white tracking-tight">Keyword Relevance Score</h4>
            <p className="text-xs text-slate-300 max-w-sm mt-1 leading-relaxed">
              {config.subtext}
            </p>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3">
          <div className="text-center px-2">
            <div className="text-xs text-slate-400 font-medium">Status</div>
            <div className={`text-sm font-bold ${config.text}`}>
              {score >= 70 ? 'Ready to Apply' : score >= 40 ? 'Needs Tuning' : 'Revise Resume'}
            </div>
          </div>
          <div className="h-8 w-px bg-slate-700/50"></div>
          <div className="text-center px-2">
            <div className="text-xs text-slate-400 font-medium">Engine</div>
            <div className="text-sm font-bold text-indigo-400">Precision ATS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

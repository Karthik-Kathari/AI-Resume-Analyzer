import React from 'react';

const ScoreCard = ({
  score = 0,
  analysisMode = 'rule-based',
  breakdown = null,
  disclaimer = null,
}) => {
  const getBadgeConfig = () => {
    if (score >= 75) {
      return {
        stroke: '#10b981', // emerald-500
        glow: 'rgba(16, 185, 129, 0.25)',
        text: 'text-emerald-400',
        bg: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/30',
        badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
        label: 'Strong Alignment',
        subtext: 'Your resume shows high technical overlap with the specified requirements.',
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
        subtext: 'Good baseline overlap, but key technical tools or domain keywords are absent.',
      };
    }
    return {
      stroke: '#ef4444', // red-500
      glow: 'rgba(239, 68, 68, 0.25)',
      text: 'text-rose-400',
      bg: 'from-rose-500/10 to-red-500/5 border-rose-500/30',
      badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      label: 'Low Alignment',
      subtext: 'Substantial skill gaps detected between your resume and the target role.',
    };
  };

  const config = getBadgeConfig();
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const total = breakdown?.totalKeywords || 0;
  const matched = breakdown?.matchedCount || 0;
  const missing = breakdown?.missingCount || 0;

  return (
    <div className="space-y-4">
      {/* Main Score & Engine Card */}
      <div className={`rounded-2xl border p-6 bg-gradient-to-br ${config.bg} backdrop-blur-xl relative overflow-hidden transition-all duration-300`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Circular Gauge */}
            <div className="relative flex items-center justify-center flex-shrink-0">
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
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
                  {config.label}
                </span>

                {/* Analysis Mode Badge */}
                {analysisMode === 'ai-enhanced' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    AI Enhanced Mode
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Rule-Based Engine (Zero-Cost)
                  </span>
                )}
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">Keyword Alignment Diagnostic</h4>
              <p className="text-xs text-slate-300 max-w-md mt-1 leading-relaxed">
                {config.subtext}
              </p>
            </div>
          </div>

          {/* Transparent Mathematical Breakdown KPIs */}
          <div className="grid grid-cols-3 gap-2 w-full lg:w-auto bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="text-center px-3 py-1">
              <div className="text-[11px] text-slate-400 font-medium">Matched</div>
              <div className="text-sm font-bold text-emerald-400">{matched}</div>
            </div>
            <div className="text-center px-3 py-1 border-x border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Missing</div>
              <div className="text-sm font-bold text-rose-400">{missing}</div>
            </div>
            <div className="text-center px-3 py-1">
              <div className="text-[11px] text-slate-400 font-medium">Total Skills</div>
              <div className="text-sm font-bold text-indigo-400">{total}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Methodology & Scoring Limitations Disclaimer */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
        <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <span className="font-semibold text-slate-300">Methodology & Disclaimer: </span>
          <span>
            {disclaimer ||
              'This score reflects an algorithmic keyword match ratio between extracted resume terms and target job requirements. It is a preparation and optimization metric and does not guarantee or predict actual employer ATS acceptance or hiring decisions.'}
          </span>
          {total > 0 && (
            <span className="block mt-1 font-mono text-[11px] text-slate-500">
              Formula: ({matched} matched ÷ {total} required skills) × 100 = {score}% match.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

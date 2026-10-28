import React from 'react';

const Suggestions = ({ suggestions = [] }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Strategic Resume Optimization
            </h4>
            <p className="text-xs text-slate-400">Tailored action steps to increase recruiter engagement and pass ATS filters</p>
          </div>
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline">Priority Sorted</span>
      </div>

      <div className="space-y-3">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-indigo-500/15 text-indigo-400 text-xs font-bold flex items-center justify-center mt-0.5">
              {index + 1}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;

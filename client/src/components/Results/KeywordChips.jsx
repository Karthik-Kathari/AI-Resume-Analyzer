import React, { useState } from 'react';

const KeywordChips = ({ matched = [], missing = [] }) => {
  const [copied, setCopied] = useState(false);

  const copyMissingToClipboard = () => {
    if (missing.length === 0) return;
    navigator.clipboard.writeText(missing.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Matched Keywords Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Matched Skills
            </h4>
          </div>
          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {matched.length} detected
          </span>
        </div>

        {matched.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-4 text-center">
            No technical skill matches detected between resume and job description.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
            {matched.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 shadow-sm"
              >
                <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Missing Keywords Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Missing Skills / Gaps
            </h4>
          </div>
          <div className="flex items-center gap-2">
            {missing.length > 0 && (
              <button
                type="button"
                onClick={copyMissingToClipboard}
                className="text-[11px] font-medium text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                title="Copy missing skills"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
            <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {missing.length} missing
            </span>
          </div>
        </div>

        {missing.length === 0 ? (
          <p className="text-xs text-emerald-400 py-4 text-center font-medium">
            🎯 Zero skill gaps! All primary technical keywords were matched.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
            {missing.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-rose-950/40 text-rose-300 border border-rose-500/20 shadow-sm"
              >
                <span className="text-rose-400 font-bold leading-none">+</span>
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordChips;

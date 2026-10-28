const KeywordChips = ({ matched, missing }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <h3 className="text-lg font-semibold text-gray-700">Keyword Analysis</h3>

      {/* Matched */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
          <p className="text-sm font-medium text-gray-600">Matched ({matched.length})</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {matched.length > 0 ? matched.map((kw) => (
            <span key={kw} className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
              ✓ {kw}
            </span>
          )) : <p className="text-xs text-gray-400">No matched keywords found.</p>}
        </div>
      </div>

      {/* Missing */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
          <p className="text-sm font-medium text-gray-600">Missing ({missing.length})</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {missing.length > 0 ? missing.map((kw) => (
            <span key={kw} className="bg-red-50 text-red-700 text-xs font-medium px-3 py-1 rounded-full border border-red-200">
              ✕ {kw}
            </span>
          )) : <p className="text-xs text-green-600 font-medium">🎉 All keywords matched!</p>}
        </div>
      </div>
    </div>
  );
};

export default KeywordChips;

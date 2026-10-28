const Suggestions = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">💡 Improvement Suggestions</h3>
      <ul className="space-y-3">
        {suggestions.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-700">
            <span className="text-indigo-500 font-bold mt-0.5">→</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;

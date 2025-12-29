export default function FiltersPanel({ statusCounts, tagCounts, onFilterChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Deals distribution by status:</h4>
          <div className="space-y-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => onFilterChange?.('status', status)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left rtl:text-right"
              >
                <span className="text-sm text-gray-700 capitalize">{status}</span>
                <span className="text-sm font-medium text-gray-900">({count})</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h4>
          <div className="space-y-2">
            {Object.entries(tagCounts).map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => onFilterChange?.('tag', tag)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left rtl:text-right"
              >
                <span className="text-sm text-gray-700">{tag}</span>
                <span className="text-sm font-medium text-gray-900">({count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


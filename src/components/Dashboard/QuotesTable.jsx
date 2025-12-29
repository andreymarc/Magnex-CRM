import { useState } from 'react'
import { FiSearch, FiCalendar, FiDollarSign } from 'react-icons/fi'

export default function DealsTable({ deals, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredDeals = deals.filter(deal => {
    const searchLower = searchTerm.toLowerCase()
    return (
      deal.from.toLowerCase().includes(searchLower) ||
      deal.company.toLowerCase().includes(searchLower) ||
      deal.subject.toLowerCase().includes(searchLower)
    )
  })

  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDeals = filteredDeals.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'bg-purple-100 text-purple-700',
      'Sent': 'bg-blue-100 text-blue-700',
      'Won': 'bg-green-100 text-green-700',
      'Negotiating': 'bg-yellow-100 text-yellow-700',
      'Lost': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search deals, companies, contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">From</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Subject</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Received</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Deal Value</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDeals.map((deal) => (
              <tr key={deal.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(deal.status)}`}>
                      {deal.status}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">{deal.from}</div>
                      <div className="text-sm text-gray-500">{deal.company}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-900">{deal.subject}</div>
                  {deal.tags.length > 0 && (
                    <div className="flex space-x-2 rtl:space-x-reverse mt-1">
                      {deal.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                    <FiCalendar className="w-4 h-4" />
                    <span>{deal.received}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FiDollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      ${deal.dealValue.toLocaleString()}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredDeals.length)} of {filteredDeals.length} Deals
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt; Back
          </button>
          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => {
            const page = i + 1
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )
          })}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  )
}


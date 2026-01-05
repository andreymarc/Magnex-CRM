import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiDollarSign, FiTrendingUp, FiZap, FiMoreVertical } from 'react-icons/fi'
import { getDeals, deleteDeal, updateDeal, getDealStats } from '../../../services/dealsService'
import { dealStages } from '../../../data/mockDeals'
import DealModal from './DealModal'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import AIAssistant from '../AIAssistant'
import { format } from 'date-fns'

export default function DealsList() {
  const [deals, setDeals] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [error, setError] = useState(null)
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false)
  const [viewMode, setViewMode] = useState('kanban') // 'kanban' or 'list'

  useEffect(() => {
    loadDeals()
    loadStats()
  }, [searchTerm])

  const loadDeals = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      if (searchTerm) {
        filters.search = searchTerm
      }

      const result = await getDeals(filters)
      
      if (result.error) {
        setError(result.message || 'Failed to load deals')
        setDeals([])
      } else {
        setDeals(result.data || [])
        setError(null)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setDeals([])
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    const result = await getDealStats()
    if (!result.error) {
      setStats(result.data)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      const result = await deleteDeal(id)
      if (!result.error) {
        loadDeals()
        loadStats()
      } else {
        alert(result.message || 'Failed to delete deal')
      }
    }
  }

  const handleStageChange = async (dealId, newStage) => {
    const result = await updateDeal(dealId, { stage: newStage })
    if (!result.error) {
      loadDeals()
      loadStats()
    }
  }

  const handleEdit = (deal) => {
    setSelectedDeal(deal)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDeal(null)
    loadDeals()
    loadStats()
  }

  const getDealsByStage = (stage) => {
    return deals.filter(deal => deal.stage === stage)
  }

  const getStageColor = (stage) => {
    const stageConfig = dealStages.find(s => s.id === stage)
    return stageConfig?.color || 'bg-gray-100 text-gray-800'
  }

  const getStageLabel = (stage) => {
    const stageConfig = dealStages.find(s => s.id === stage)
    return stageConfig?.label || stage
  }

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col pr-16 lg:pr-16">
          <TopNav />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col pr-16 lg:pr-16">
        <TopNav />
        {/* Free Trial Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-6 text-center text-sm font-semibold">
          🎉 First Month Free - No Credit Card Required • Start Your Free Trial Today! 🎉
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Deals Pipeline</h1>
                <p className="text-gray-600 mt-1">ניהול עסקאות</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  {viewMode === 'kanban' ? 'List View' : 'Kanban View'}
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Add Deal</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Deals</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-green-600">
                    ${(stats.won_value / 1000).toFixed(0)}k
                  </div>
                  <div className="text-sm text-gray-600">Won Value</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-primary-600">
                    ${(stats.total_value / 1000).toFixed(0)}k
                  </div>
                  <div className="text-sm text-gray-600">Total Value</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    ${(stats.average_deal_size / 1000).toFixed(0)}k
                  </div>
                  <div className="text-sm text-gray-600">Avg Deal Size</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.win_rate.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.by_stage.negotiation + stats.by_stage.proposal}
                  </div>
                  <div className="text-sm text-gray-600">In Pipeline</div>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Info Message */}
            {deals.length > 0 && deals[0]?.usingMockData && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
                <p className="font-semibold">📝 Using Demo Data</p>
                <p className="text-sm mt-1">You're currently viewing mock data. Set up Supabase to use real data persistence.</p>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
                <p className="font-semibold">Note: {error}</p>
                <p className="text-sm mt-1">Please configure Supabase in your .env file to use this feature.</p>
              </div>
            )}

            {/* Kanban Board */}
            {viewMode === 'kanban' ? (
              <div className="overflow-x-auto">
                <div className="flex space-x-4 min-w-max pb-4">
                  {dealStages.map((stage) => {
                    const stageDeals = getDealsByStage(stage.id)
                    const stageValue = stageDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0)
                    
                    return (
                      <div key={stage.id} className="flex-shrink-0 w-80">
                        <div className="bg-white rounded-lg shadow">
                          <div className={`p-4 rounded-t-lg ${getStageColor(stage.id)}`}>
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{stage.label}</h3>
                              <span className="text-sm font-medium">{stageDeals.length}</span>
                            </div>
                            {stageValue > 0 && (
                              <div className="text-xs mt-1 opacity-90">
                                ${(stageValue / 1000).toFixed(0)}k
                              </div>
                            )}
                          </div>
                          <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                            {stageDeals.length === 0 ? (
                              <div className="text-center py-8 text-gray-400 text-sm">
                                No deals in this stage
                              </div>
                            ) : (
                              stageDeals.map((deal) => (
                                <div
                                  key={deal.id}
                                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                                  onClick={() => handleEdit(deal)}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-gray-900 text-sm flex-1">
                                      {deal.title}
                                    </h4>
                                    <div className="flex items-center space-x-1 ml-2">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleEdit(deal)
                                        }}
                                        className="text-gray-400 hover:text-primary-600 p-1"
                                      >
                                        <FiEdit className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDelete(deal.id)
                                        }}
                                        className="text-gray-400 hover:text-red-600 p-1"
                                      >
                                        <FiTrash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <FiDollarSign className="w-4 h-4 text-green-600" />
                                    <span className="font-semibold text-gray-900">
                                      ${deal.amount?.toLocaleString()}
                                    </span>
                                  </div>
                                  {deal.probability > 0 && (
                                    <div className="flex items-center space-x-2 mb-2">
                                      <FiTrendingUp className="w-4 h-4 text-blue-600" />
                                      <span className="text-xs text-gray-600">
                                        {deal.probability}% probability
                                      </span>
                                    </div>
                                  )}
                                  {deal.expected_close_date && (
                                    <div className="text-xs text-gray-500">
                                      Expected: {format(new Date(deal.expected_close_date), 'MMM d, yyyy')}
                                    </div>
                                  )}
                                  {deal.tags && deal.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {deal.tags.slice(0, 2).map((tag, idx) => (
                                        <span
                                          key={idx}
                                          className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                  {/* Stage selector for quick change */}
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <select
                                      value={deal.stage}
                                      onChange={(e) => {
                                        e.stopPropagation()
                                        handleStageChange(deal.id, e.target.value)
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                                    >
                                      {dealStages.map(s => (
                                        <option key={s.id} value={s.id}>{s.label}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              /* List View */
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Close</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{deal.title}</div>
                          {deal.description && (
                            <div className="text-sm text-gray-500">{deal.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <FiDollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold">${deal.amount?.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getStageColor(deal.stage)}`}>
                            {getStageLabel(deal.stage)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${deal.probability || 0}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{deal.probability || 0}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {deal.expected_close_date
                            ? format(new Date(deal.expected_close_date), 'MMM d, yyyy')
                            : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(deal)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <FiEdit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(deal.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Deal Modal */}
            <DealModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              deal={selectedDeal}
            />
          </div>
        </main>
      </div>

      {/* AI Assistant Button */}
      <button
        onClick={() => setAIAssistantOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 z-40"
        title="Open AI Assistant"
      >
        <FiZap className="w-6 h-6" />
      </button>

      {/* AI Assistant */}
      <AIAssistant isOpen={aiAssistantOpen} onClose={() => setAIAssistantOpen(false)} />
    </div>
  )
}


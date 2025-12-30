import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiBriefcase, FiZap } from 'react-icons/fi'
import { getLeads, deleteLead, convertLeadToContact } from '../../../services/leadsService'
import LeadModal from './LeadModal'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import AIAssistant from '../AIAssistant'

export default function LeadsList() {
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLeads()
  }, [searchTerm, statusFilter])

  const loadLeads = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      if (searchTerm) {
        filters.search = searchTerm
      }
      
      if (statusFilter !== 'all') {
        filters.status = statusFilter
      }

      const result = await getLeads(filters)
      
      if (result.error) {
        setError(result.message || 'Failed to load leads')
        // For development, use mock data if Supabase is not configured
        setLeads([])
      } else {
        setLeads(result.data || [])
        setError(null)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const result = await deleteLead(id)
      if (!result.error) {
        loadLeads()
      } else {
        alert(result.message || 'Failed to delete lead')
      }
    }
  }

  const handleConvert = async (id) => {
    if (window.confirm('Convert this lead to a contact?')) {
      const result = await convertLeadToContact(id)
      if (!result.error) {
        alert('Lead converted to contact successfully!')
        loadLeads()
      } else {
        alert(result.message || 'Failed to convert lead')
      }
    }
  }

  const handleEdit = (lead) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLead(null)
    loadLeads()
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      converted: 'bg-purple-100 text-purple-800',
      lost: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
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
          <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-600 mt-1">ניהול מתעניינים</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Info Message */}
      {leads.length > 0 && leads[0]?.usingMockData && (
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

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {leads.length === 0 ? (
          <div className="text-center py-12">
            <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No leads found</p>
            <p className="text-gray-400 text-sm mt-2">Click "Add Lead" to create your first lead</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <FiUser className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {lead.first_name} {lead.last_name}
                          </div>
                          {lead.job_title && (
                            <div className="text-sm text-gray-500">{lead.job_title}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 space-y-1">
                        {lead.email && (
                          <div className="flex items-center space-x-2">
                            <FiMail className="w-4 h-4 text-gray-400" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center space-x-2">
                            <FiPhone className="w-4 h-4 text-gray-400" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.company && (
                        <div className="flex items-center space-x-2 text-sm text-gray-900">
                          <FiBriefcase className="w-4 h-4 text-gray-400" />
                          <span>{lead.company}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.score || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(lead)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      {lead.status !== 'converted' && (
                        <button
                          onClick={() => handleConvert(lead.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Convert to Contact"
                        >
                          Convert
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

            {/* Lead Modal */}
            <LeadModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              lead={selectedLead}
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


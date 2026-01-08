import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiDollarSign, FiCheck, FiClock, FiAlertCircle, FiDownload, FiZap, FiFileText } from 'react-icons/fi'
import { getInvoices, deleteInvoice, markInvoiceAsPaid, getInvoiceStatistics } from '../../../services/invoicesService'
import InvoiceModal from './InvoiceModal'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import AIAssistant from '../AIAssistant'
import { format, isPast, isToday } from 'date-fns'

export default function PaymentsList() {
  const [invoices, setInvoices] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [error, setError] = useState(null)
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false)

  useEffect(() => {
    loadInvoices()
    loadStats()
  }, [searchTerm, statusFilter])

  const loadInvoices = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      if (searchTerm) {
        filters.search = searchTerm
      }
      
      if (statusFilter !== 'all') {
        filters.status = statusFilter
      }

      const result = await getInvoices(filters)
      
      if (result.error) {
        setError(result.message || 'Failed to load invoices')
        setInvoices([])
      } else {
        setInvoices(result.data || [])
        setError(null)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setInvoices([])
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    const result = await getInvoiceStatistics()
    if (!result.error) {
      setStats(result.data)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      const result = await deleteInvoice(id)
      if (!result.error) {
        loadInvoices()
        loadStats()
      } else {
        alert(result.message || 'Failed to delete invoice')
      }
    }
  }

  const handleMarkAsPaid = async (id) => {
    const paymentMethod = window.prompt('Enter payment method (e.g., Credit Card, Bank Transfer, PayPal):')
    if (paymentMethod) {
      const result = await markInvoiceAsPaid(id, paymentMethod)
      if (!result.error) {
        loadInvoices()
        loadStats()
      } else {
        alert(result.message || 'Failed to mark invoice as paid')
      }
    }
  }

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedInvoice(null)
    loadInvoices()
    loadStats()
  }

  const getStatusColor = (status, dueDate) => {
    if (status === 'paid') {
      return 'bg-green-100 text-green-800 border-green-300'
    }
    if (status === 'overdue') {
      return 'bg-red-100 text-red-800 border-red-300'
    }
    if (status === 'pending') {
      if (dueDate && isPast(new Date(dueDate)) && !isToday(new Date(dueDate))) {
        return 'bg-red-100 text-red-800 border-red-300'
      }
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    }
    return 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <FiCheck className="w-4 h-4" />
      case 'overdue':
        return <FiAlertCircle className="w-4 h-4" />
      case 'pending':
        return <FiClock className="w-4 h-4" />
      default:
        return null
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:pr-16">
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
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Payments & Invoices</h1>
                <p className="text-gray-600 mt-1">ניהול תשלומים וחשבוניות</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
                <span>Create Invoice</span>
              </button>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Invoices</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                  <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
                  <div className="text-sm text-gray-600">Paid</div>
                  <div className="text-xs text-gray-500 mt-1">{formatCurrency(stats.paidAmount)}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                  <div className="text-xs text-gray-500 mt-1">{formatCurrency(stats.pendingAmount)}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
                  <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                  <div className="text-sm text-gray-600">Overdue</div>
                  <div className="text-xs text-gray-500 mt-1">{formatCurrency(stats.overdueAmount)}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-primary-600">{formatCurrency(stats.totalAmount)}</div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.paidAmount)}</div>
                  <div className="text-sm text-gray-600">Paid Amount</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-yellow-600">{formatCurrency(stats.pendingAmount)}</div>
                  <div className="text-sm text-gray-600">Pending Amount</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-red-600">{formatCurrency(stats.overdueAmount)}</div>
                  <div className="text-sm text-gray-600">Overdue Amount</div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
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
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info Message */}
            {invoices.length > 0 && invoices[0]?.usingMockData && (
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

            {/* Invoices Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {invoices.length === 0 ? (
                <div className="text-center py-12">
                  <FiFileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No invoices found</p>
                  <p className="text-gray-400 text-sm mt-2">Click "Create Invoice" to create your first invoice</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{invoice.invoice_number}</div>
                            <div className="text-sm text-gray-500">{invoice.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{invoice.customer_name || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-1">
                              <FiDollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex items-center space-x-1 text-xs font-semibold rounded border ${getStatusColor(invoice.status, invoice.due_date)}`}>
                              {getStatusIcon(invoice.status)}
                              <span className="capitalize">{invoice.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {invoice.due_date ? format(new Date(invoice.due_date), 'MMM d, yyyy') : '-'}
                            </div>
                            {invoice.paid_date && (
                              <div className="text-xs text-gray-500">
                                Paid: {format(new Date(invoice.paid_date), 'MMM d, yyyy')}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {invoice.payment_method || '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {invoice.status !== 'paid' && (
                                <button
                                  onClick={() => handleMarkAsPaid(invoice.id)}
                                  className="text-green-600 hover:text-green-900"
                                  title="Mark as Paid"
                                >
                                  <FiCheck className="w-5 h-5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleEdit(invoice)}
                                className="text-primary-600 hover:text-primary-900"
                              >
                                <FiEdit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => window.print()}
                                className="text-blue-600 hover:text-blue-900"
                                title="Download/Print"
                              >
                                <FiDownload className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(invoice.id)}
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
            </div>

            {/* Invoice Modal */}
            <InvoiceModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              invoice={selectedInvoice}
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


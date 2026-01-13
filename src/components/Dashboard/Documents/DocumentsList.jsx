import { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiDownload, FiFile, FiTag, FiLink } from 'react-icons/fi'
import { getDocuments, deleteDocument, getDocumentStats, getDocumentUrl } from '../../../services/documentsService'
import { documentCategories, formatFileSize, getFileIcon } from '../../../data/mockDocuments'
import DocumentModal from './DocumentModal'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import { format } from 'date-fns'

export default function DocumentsList() {
  const [documents, setDocuments] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [relatedFilter, setRelatedFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  useEffect(() => {
    loadDocuments()
    loadStats()
  }, [searchTerm, categoryFilter, relatedFilter])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      if (searchTerm) {
        filters.search = searchTerm
      }
      
      if (categoryFilter !== 'all') {
        filters.category = categoryFilter
      }

      if (relatedFilter !== 'all') {
        filters.related_to_type = relatedFilter
      }

      const result = await getDocuments(filters)
      
      if (result.error) {
        setError(result.message || 'Failed to load documents')
        setDocuments([])
      } else {
        setDocuments(result.data || [])
        setError(null)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    const result = await getDocumentStats()
    if (!result.error) {
      setStats(result.data)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      const result = await deleteDocument(id)
      if (!result.error) {
        loadDocuments()
        loadStats()
      } else {
        alert(result.message || 'Failed to delete document')
      }
    }
  }

  const handleDownload = async (document) => {
    const result = await getDocumentUrl(document)
    if (!result.error && result.url) {
      window.open(result.url, '_blank')
    } else {
      alert('Document download not available in demo mode')
    }
  }

  const handleEdit = (document) => {
    setSelectedDocument(document)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDocument(null)
    loadDocuments()
    loadStats()
  }

  const getCategoryInfo = (categoryId) => {
    return documentCategories.find(cat => cat.id === categoryId) || documentCategories[documentCategories.length - 1]
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
                <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                <p className="text-gray-600 mt-1">ניהול מסמכים בענן</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-700'}`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-700'}`}
                  >
                    List
                  </button>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Upload Document</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Documents</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="text-2xl font-bold text-primary-600">
                    {formatFileSize(stats.total_size)}
                  </div>
                  <div className="text-sm text-gray-600">Total Size</div>
                </div>
                {Object.entries(stats.by_category).slice(0, 4).map(([category, count]) => {
                  const catInfo = getCategoryInfo(category)
                  return (
                    <div key={category} className="bg-white rounded-lg shadow p-4">
                      <div className="text-2xl font-bold text-gray-900">{count}</div>
                      <div className="text-sm text-gray-600">{catInfo.label}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FiFilter className="text-gray-400 w-5 h-5" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {documentCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <select
                    value={relatedFilter}
                    onChange={(e) => setRelatedFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Relations</option>
                    <option value="lead">Leads</option>
                    <option value="contact">Contacts</option>
                    <option value="deal">Deals</option>
                    <option value="project">Projects</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info Message */}
            {documents.length > 0 && documents[0]?.usingMockData && (
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

            {/* Documents View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {documents.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <FiFile className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No documents found</p>
                    <p className="text-gray-400 text-sm mt-2">Click "Upload Document" to add your first document</p>
                  </div>
                ) : (
                  documents.map((document) => {
                    const categoryInfo = getCategoryInfo(document.category)
                    return (
                      <div
                        key={document.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="text-4xl mb-2">{getFileIcon(document.file_type)}</div>
                            <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                              {document.name}
                            </h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded ${categoryInfo.color}`}>
                                {categoryInfo.label}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <FiFile className="w-3 h-3" />
                            <span className="truncate">{document.file_name}</span>
                          </div>
                          <div>{formatFileSize(document.file_size)}</div>
                          <div>{format(new Date(document.created_at), 'MMM d, yyyy')}</div>
                          {document.related_to_type && (
                            <div className="flex items-center space-x-1">
                              <FiLink className="w-3 h-3" />
                              <span>Linked to {document.related_to_type}</span>
                            </div>
                          )}
                        </div>
                        {document.tags && document.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {document.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded flex items-center space-x-1"
                              >
                                <FiTag className="w-3 h-3" />
                                <span>{tag}</span>
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center space-x-2 pt-3 border-t">
                          <button
                            onClick={() => handleDownload(document)}
                            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm"
                          >
                            <FiDownload className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() => handleEdit(document)}
                            className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(document.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            ) : (
              /* List View */
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <FiFile className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 text-lg">No documents found</p>
                          <p className="text-gray-400 text-sm mt-2">Click "Upload Document" to add your first document</p>
                        </td>
                      </tr>
                    ) : (
                      documents.map((document) => {
                        const categoryInfo = getCategoryInfo(document.category)
                        return (
                          <tr key={document.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="text-2xl">{getFileIcon(document.file_type)}</div>
                                <div>
                                  <div className="font-medium text-gray-900">{document.name}</div>
                                  <div className="text-sm text-gray-500">{document.file_name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs font-semibold rounded ${categoryInfo.color}`}>
                                {categoryInfo.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {formatFileSize(document.file_size)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {format(new Date(document.created_at), 'MMM d, yyyy')}
                            </td>
                            <td className="px-6 py-4">
                              {document.tags && document.tags.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {document.tags.slice(0, 3).map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {document.tags.length > 3 && (
                                    <span className="text-xs text-gray-500">+{document.tags.length - 3}</span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleDownload(document)}
                                  className="text-primary-600 hover:text-primary-900"
                                  title="Download"
                                >
                                  <FiDownload className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleEdit(document)}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  <FiEdit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(document.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <FiTrash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Document Modal */}
            <DocumentModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              document={selectedDocument}
            />
          </div>
        </main>
      </div>

    </div>
  )
}


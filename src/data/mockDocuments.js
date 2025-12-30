// Mock Documents Data
// This will be used when Supabase is not configured

export const mockDocuments = [
  {
    id: '1',
    name: 'Contract - Manufacturing Co',
    file_name: 'contract_manufacturing_co_2024.pdf',
    file_path: '/documents/contracts/contract_manufacturing_co_2024.pdf',
    file_type: 'application/pdf',
    file_size: 2456789, // bytes
    category: 'contract',
    tags: ['contract', 'signed', 'enterprise'],
    related_to_type: 'contact',
    related_to_id: '1',
    uploaded_by: null,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    name: 'Proposal - Tech Solutions Ltd',
    file_name: 'proposal_tech_solutions_q2_2024.pdf',
    file_path: '/documents/proposals/proposal_tech_solutions_q2_2024.pdf',
    file_type: 'application/pdf',
    file_size: 1234567,
    category: 'proposal',
    tags: ['proposal', 'pending'],
    related_to_type: 'contact',
    related_to_id: '2',
    uploaded_by: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'Invoice #INV-2024-001',
    file_name: 'invoice_2024_001.pdf',
    file_path: '/documents/invoices/invoice_2024_001.pdf',
    file_type: 'application/pdf',
    file_size: 456789,
    category: 'invoice',
    tags: ['invoice', 'paid'],
    related_to_type: 'contact',
    related_to_id: '4',
    uploaded_by: null,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    name: 'Product Presentation Deck',
    file_name: 'product_presentation_2024.pptx',
    file_path: '/documents/presentations/product_presentation_2024.pptx',
    file_type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    file_size: 5678901,
    category: 'presentation',
    tags: ['presentation', 'marketing'],
    related_to_type: null,
    related_to_id: null,
    uploaded_by: null,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    name: 'NDA - Startup Innovations',
    file_name: 'nda_startup_innovations.pdf',
    file_path: '/documents/legal/nda_startup_innovations.pdf',
    file_type: 'application/pdf',
    file_size: 234567,
    category: 'legal',
    tags: ['nda', 'legal', 'signed'],
    related_to_type: 'lead',
    related_to_id: '2',
    uploaded_by: null,
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    name: 'Service Agreement - Retail Chain',
    file_name: 'service_agreement_retail_chain.pdf',
    file_path: '/documents/contracts/service_agreement_retail_chain.pdf',
    file_type: 'application/pdf',
    file_size: 3456789,
    category: 'contract',
    tags: ['contract', 'service', 'enterprise'],
    related_to_type: 'contact',
    related_to_id: '5',
    uploaded_by: null,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    name: 'Marketing Materials - Q1 2024',
    file_name: 'marketing_materials_q1_2024.zip',
    file_path: '/documents/marketing/marketing_materials_q1_2024.zip',
    file_type: 'application/zip',
    file_size: 12345678,
    category: 'marketing',
    tags: ['marketing', 'materials'],
    related_to_type: null,
    related_to_id: null,
    uploaded_by: null,
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    name: 'Invoice #INV-2024-002',
    file_name: 'invoice_2024_002.pdf',
    file_path: '/documents/invoices/invoice_2024_002.pdf',
    file_type: 'application/pdf',
    file_size: 567890,
    category: 'invoice',
    tags: ['invoice', 'pending'],
    related_to_type: 'contact',
    related_to_id: '6',
    uploaded_by: null,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    name: 'Technical Specification Document',
    file_name: 'technical_spec_v2.1.docx',
    file_path: '/documents/technical/technical_spec_v2.1.docx',
    file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    file_size: 2345678,
    category: 'technical',
    tags: ['technical', 'specification'],
    related_to_type: null,
    related_to_id: null,
    uploaded_by: null,
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    name: 'Quote - Business Excellence Group',
    file_name: 'quote_business_excellence_group.pdf',
    file_path: '/documents/quotes/quote_business_excellence_group.pdf',
    file_type: 'application/pdf',
    file_size: 890123,
    category: 'quote',
    tags: ['quote', 'pending'],
    related_to_type: 'contact',
    related_to_id: '4',
    uploaded_by: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Document categories
export const documentCategories = [
  { id: 'contract', label: 'Contract', icon: '📄', color: 'bg-blue-100 text-blue-800' },
  { id: 'invoice', label: 'Invoice', icon: '🧾', color: 'bg-green-100 text-green-800' },
  { id: 'proposal', label: 'Proposal', icon: '📋', color: 'bg-purple-100 text-purple-800' },
  { id: 'quote', label: 'Quote', icon: '💰', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'legal', label: 'Legal', icon: '⚖️', color: 'bg-red-100 text-red-800' },
  { id: 'presentation', label: 'Presentation', icon: '📊', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'marketing', label: 'Marketing', icon: '📢', color: 'bg-pink-100 text-pink-800' },
  { id: 'technical', label: 'Technical', icon: '🔧', color: 'bg-gray-100 text-gray-800' },
  { id: 'other', label: 'Other', icon: '📁', color: 'bg-gray-100 text-gray-800' }
]

// Helper function to filter mock documents
export const filterMockDocuments = (documents, filters) => {
  let filtered = [...documents]

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(doc => doc.category === filters.category)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(doc => 
      doc.name.toLowerCase().includes(searchLower) ||
      doc.file_name.toLowerCase().includes(searchLower) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  if (filters.related_to_type && filters.related_to_type !== 'all') {
    filtered = filtered.filter(doc => doc.related_to_type === filters.related_to_type)
  }

  return filtered
}

// Helper to format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Helper to get file icon
export const getFileIcon = (fileType) => {
  if (fileType?.includes('pdf')) return '📄'
  if (fileType?.includes('word') || fileType?.includes('document')) return '📝'
  if (fileType?.includes('excel') || fileType?.includes('spreadsheet')) return '📊'
  if (fileType?.includes('powerpoint') || fileType?.includes('presentation')) return '📽️'
  if (fileType?.includes('image')) return '🖼️'
  if (fileType?.includes('zip') || fileType?.includes('archive')) return '📦'
  return '📁'
}


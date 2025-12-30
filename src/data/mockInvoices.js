// Mock Invoices & Payments Data
// This will be used when Supabase is not configured

export const mockInvoices = [
  {
    id: '1',
    invoice_number: 'INV-2024-001',
    customer_id: '1',
    customer_name: 'Manufacturing Co',
    amount: 45000,
    currency: 'USD',
    status: 'paid',
    due_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    paid_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: 'Bank Transfer',
    description: 'Enterprise CRM License - Annual Contract',
    items: [
      { description: 'CRM License - 50 users', quantity: 1, unit_price: 45000, total: 45000 }
    ],
    tax: 0,
    total: 45000,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    invoice_number: 'INV-2024-002',
    customer_id: '4',
    customer_name: 'Business Excellence Group',
    amount: 95000,
    currency: 'USD',
    status: 'pending',
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    paid_date: null,
    payment_method: null,
    description: 'Cloud Infrastructure Migration Project',
    items: [
      { description: 'Migration Services', quantity: 1, unit_price: 60000, total: 60000 },
      { description: 'Infrastructure Setup', quantity: 1, unit_price: 35000, total: 35000 }
    ],
    tax: 0,
    total: 95000,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    invoice_number: 'INV-2024-003',
    customer_id: '5',
    customer_name: 'Retail Chain Ltd',
    amount: 125000,
    currency: 'USD',
    status: 'paid',
    due_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    paid_date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: 'Credit Card',
    description: 'Point of Sale System Implementation',
    items: [
      { description: 'POS System License', quantity: 1, unit_price: 80000, total: 80000 },
      { description: 'Implementation Services', quantity: 1, unit_price: 45000, total: 45000 }
    ],
    tax: 0,
    total: 125000,
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    invoice_number: 'INV-2024-004',
    customer_id: '6',
    customer_name: 'Consulting Partners',
    amount: 32000,
    currency: 'USD',
    status: 'overdue',
    due_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    paid_date: null,
    payment_method: null,
    description: 'CRM Implementation & Training Package',
    items: [
      { description: 'CRM Setup', quantity: 1, unit_price: 20000, total: 20000 },
      { description: 'Training Sessions', quantity: 4, unit_price: 3000, total: 12000 }
    ],
    tax: 0,
    total: 32000,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    invoice_number: 'INV-2024-005',
    customer_id: '2',
    customer_name: 'Tech Solutions Ltd',
    amount: 28000,
    currency: 'USD',
    status: 'pending',
    due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    paid_date: null,
    payment_method: null,
    description: 'Marketing Campaign Services - Q2 2024',
    items: [
      { description: 'Campaign Management', quantity: 1, unit_price: 28000, total: 28000 }
    ],
    tax: 0,
    total: 28000,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    invoice_number: 'INV-2024-006',
    customer_id: '7',
    customer_name: 'Tech Startup',
    amount: 15000,
    currency: 'USD',
    status: 'paid',
    due_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    paid_date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: 'PayPal',
    description: 'Payment Processing Integration',
    items: [
      { description: 'Integration Services', quantity: 1, unit_price: 15000, total: 15000 }
    ],
    tax: 0,
    total: 15000,
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    invoice_number: 'INV-2024-007',
    customer_id: '3',
    customer_name: 'Startup Innovations',
    amount: 22000,
    currency: 'USD',
    status: 'pending',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    paid_date: null,
    payment_method: null,
    description: 'Property Management Software License',
    items: [
      { description: 'Software License', quantity: 1, unit_price: 22000, total: 22000 }
    ],
    tax: 0,
    total: 22000,
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    invoice_number: 'INV-2024-008',
    customer_id: null,
    customer_name: 'Education Services',
    amount: 75000,
    currency: 'USD',
    status: 'paid',
    due_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    paid_date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: 'Bank Transfer',
    description: 'Learning Management System - Multi-year',
    items: [
      { description: 'LMS License - 3 years', quantity: 1, unit_price: 75000, total: 75000 }
    ],
    tax: 0,
    total: 75000,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Helper function to filter mock invoices
export const filterMockInvoices = (invoices, filters) => {
  let filtered = [...invoices]

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(inv => inv.status === filters.status)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(inv => 
      inv.invoice_number.toLowerCase().includes(searchLower) ||
      inv.customer_name?.toLowerCase().includes(searchLower) ||
      inv.description?.toLowerCase().includes(searchLower)
    )
  }

  return filtered
}

// Helper to get invoice statistics
export const getInvoiceStats = (invoices) => {
  const total = invoices.length
  const paid = invoices.filter(inv => inv.status === 'paid').length
  const pending = invoices.filter(inv => inv.status === 'pending').length
  const overdue = invoices.filter(inv => inv.status === 'overdue').length
  
  const totalAmount = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0)
  const paidAmount = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.amount || 0), 0)
  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + (inv.amount || 0), 0)
  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + (inv.amount || 0), 0)

  return {
    total,
    paid,
    pending,
    overdue,
    totalAmount,
    paidAmount,
    pendingAmount,
    overdueAmount
  }
}


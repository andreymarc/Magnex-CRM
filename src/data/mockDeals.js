// Mock Deals Data
// This will be used when Supabase is not configured

export const mockDeals = [
  {
    id: '1',
    title: 'Enterprise Software License - Annual Contract',
    description: 'Annual contract for enterprise CRM solution with 50+ users',
    amount: 45000,
    currency: 'USD',
    stage: 'prospecting',
    probability: 20,
    expected_close_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: null,
    customer_id: '2',
    lead_id: '1',
    owner_id: null,
    tags: ['High Priority', 'Enterprise'],
    notes: 'Initial contact made. Waiting for budget approval.',
    created_by: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Marketing Campaign Services - Q2 2024',
    description: 'Comprehensive marketing campaign for Q2 2024 launch',
    amount: 28000,
    currency: 'USD',
    stage: 'qualification',
    probability: 40,
    expected_close_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: null,
    customer_id: '3',
    lead_id: '2',
    owner_id: null,
    tags: ['Follow Up'],
    notes: 'Qualified lead. Needs to see demo before decision.',
    created_by: null,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Point of Sale System Implementation',
    description: 'Full POS system implementation for retail chain',
    amount: 125000,
    currency: 'USD',
    stage: 'closed_won',
    probability: 100,
    expected_close_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    customer_id: '5',
    lead_id: '6',
    owner_id: null,
    tags: ['Contract Signed', 'Large Deal'],
    notes: 'Deal closed successfully. Implementation starting next month.',
    created_by: null,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Cloud Infrastructure Migration Project',
    description: 'Complete cloud migration for healthcare services',
    amount: 95000,
    currency: 'USD',
    stage: 'proposal',
    probability: 60,
    expected_close_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: null,
    customer_id: '4',
    lead_id: null,
    owner_id: null,
    tags: ['Needs Review', 'Technical'],
    notes: 'Proposal sent. Technical review in progress.',
    created_by: null,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    title: 'CRM Implementation & Training Package',
    description: 'CRM setup and comprehensive training for financial advisors',
    amount: 32000,
    currency: 'USD',
    stage: 'qualification',
    probability: 35,
    expected_close_date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: null,
    customer_id: '6',
    lead_id: null,
    owner_id: null,
    tags: [],
    notes: 'Initial qualification complete. Scheduling discovery call.',
    created_by: null,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    title: 'ERP System Upgrade & Integration',
    description: 'ERP system upgrade with custom integrations',
    amount: 180000,
    currency: 'USD',
    stage: 'closed_won',
    probability: 100,
    expected_close_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    customer_id: '1',
    lead_id: '8',
    owner_id: null,
    tags: ['Large Deal', 'Enterprise'],
    notes: 'Major enterprise deal closed. Largest this quarter.',
    created_by: null,
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    title: 'Payment Processing Integration',
    description: 'Payment gateway integration for e-commerce platform',
    amount: 15000,
    currency: 'USD',
    stage: 'prospecting',
    probability: 15,
    expected_close_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: null,
    customer_id: null,
    lead_id: '4',
    owner_id: null,
    tags: ['Needs Review'],
    notes: 'Early stage. Need to understand requirements better.',
    created_by: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    title: 'Property Management Software License',
    description: 'Software license for real estate property management',
    amount: 22000,
    currency: 'USD',
    stage: 'negotiation',
    probability: 75,
    expected_close_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: null,
    customer_id: null,
    lead_id: null,
    owner_id: null,
    tags: ['High Priority'],
    notes: 'In final negotiation. Price discussion ongoing.',
    created_by: null,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    title: 'Learning Management System - Multi-year',
    description: 'Multi-year LMS license for education services',
    amount: 75000,
    currency: 'USD',
    stage: 'closed_won',
    probability: 100,
    expected_close_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    customer_id: null,
    lead_id: null,
    owner_id: null,
    tags: ['Multi-year'],
    notes: 'Multi-year contract signed. Great win!',
    created_by: null,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    title: 'Fleet Management Software & Hardware',
    description: 'Complete fleet management solution with hardware',
    amount: 110000,
    currency: 'USD',
    stage: 'proposal',
    probability: 55,
    expected_close_date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: null,
    customer_id: null,
    lead_id: null,
    owner_id: null,
    tags: ['Follow Up'],
    notes: 'Proposal submitted. Waiting for decision committee.',
    created_by: null,
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '11',
    title: 'Business Intelligence Dashboard Development',
    description: 'Custom BI dashboard development for consulting firm',
    amount: 45000,
    currency: 'USD',
    stage: 'negotiation',
    probability: 70,
    expected_close_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: null,
    customer_id: null,
    lead_id: '11',
    owner_id: null,
    tags: ['High Priority', 'Custom Development'],
    notes: 'Negotiating terms. Close to agreement.',
    created_by: null,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '12',
    title: 'Hotel Management System - Chain-wide',
    description: 'Hotel management system for entire hospitality chain',
    amount: 200000,
    currency: 'USD',
    stage: 'closed_won',
    probability: 100,
    expected_close_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    actual_close_date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    customer_id: null,
    lead_id: null,
    owner_id: null,
    tags: ['Contract Signed', 'Large Deal', 'Enterprise'],
    notes: 'Major enterprise win. Chain-wide implementation.',
    created_by: null,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Deal stages configuration
export const dealStages = [
  { id: 'prospecting', label: 'Prospecting', color: 'bg-gray-100 text-gray-800', order: 1 },
  { id: 'qualification', label: 'Qualification', color: 'bg-blue-100 text-blue-800', order: 2 },
  { id: 'proposal', label: 'Proposal', color: 'bg-yellow-100 text-yellow-800', order: 3 },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 text-orange-800', order: 4 },
  { id: 'closed_won', label: 'Closed Won', color: 'bg-green-100 text-green-800', order: 5 },
  { id: 'closed_lost', label: 'Closed Lost', color: 'bg-red-100 text-red-800', order: 6 }
]

// Helper function to filter mock deals
export const filterMockDeals = (deals, filters) => {
  let filtered = [...deals]

  if (filters.stage && filters.stage !== 'all') {
    filtered = filtered.filter(deal => deal.stage === filters.stage)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(deal => 
      deal.title.toLowerCase().includes(searchLower) ||
      deal.description?.toLowerCase().includes(searchLower) ||
      deal.notes?.toLowerCase().includes(searchLower)
    )
  }

  if (filters.minAmount) {
    filtered = filtered.filter(deal => deal.amount >= filters.minAmount)
  }

  if (filters.maxAmount) {
    filtered = filtered.filter(deal => deal.amount <= filters.maxAmount)
  }

  return filtered
}


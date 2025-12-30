// Mock Leads Data
// This will be used when Supabase is not configured

export const mockLeads = [
  {
    id: '1',
    first_name: 'Sarah',
    last_name: 'Cohen',
    email: 'sarah.cohen@example.com',
    phone: '+972-50-123-4567',
    company: 'Tech Solutions Ltd',
    job_title: 'CTO',
    source: 'website',
    status: 'new',
    score: 85,
    notes: 'Interested in CRM for their growing team. Follow up next week.',
    assigned_to: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    first_name: 'David',
    last_name: 'Levi',
    email: 'david.levi@startup.io',
    phone: '+972-52-234-5678',
    company: 'Startup Innovations',
    job_title: 'Founder',
    source: 'referral',
    status: 'contacted',
    score: 72,
    notes: 'Referred by existing customer. Very interested in automation features.',
    assigned_to: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    first_name: 'Rachel',
    last_name: 'Mizrahi',
    email: 'rachel.m@business.co.il',
    phone: '+972-54-345-6789',
    company: 'Business Excellence Group',
    job_title: 'Operations Manager',
    source: 'campaign',
    status: 'qualified',
    score: 90,
    notes: 'High-value prospect. Needs custom integration with their accounting system.',
    assigned_to: null,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    first_name: 'Michael',
    last_name: 'Ben-David',
    email: 'michael.bd@enterprise.com',
    phone: '+972-50-456-7890',
    company: 'Enterprise Solutions Inc',
    job_title: 'Sales Director',
    source: 'social',
    status: 'new',
    score: 65,
    notes: 'Found us through LinkedIn. Requested demo.',
    assigned_to: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    first_name: 'Tamar',
    last_name: 'Avraham',
    email: 'tamar.avraham@consulting.co.il',
    phone: '+972-52-567-8901',
    company: 'Consulting Partners',
    job_title: 'Partner',
    source: 'website',
    status: 'contacted',
    score: 78,
    notes: 'Looking for CRM for their consulting practice. Multiple team members.',
    assigned_to: null,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    first_name: 'Yossi',
    last_name: 'Katz',
    email: 'yossi.katz@retail.co.il',
    phone: '+972-54-678-9012',
    company: 'Retail Chain Ltd',
    job_title: 'IT Manager',
    source: 'referral',
    status: 'qualified',
    score: 88,
    notes: 'Large retail chain. Needs multi-location support. High priority.',
    assigned_to: null,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    first_name: 'Noa',
    last_name: 'Shalom',
    email: 'noa.shalom@agency.com',
    phone: '+972-50-789-0123',
    company: 'Digital Agency',
    job_title: 'CEO',
    source: 'campaign',
    status: 'new',
    score: 70,
    notes: 'Small agency looking to streamline client management.',
    assigned_to: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    first_name: 'Eitan',
    last_name: 'Rosenberg',
    email: 'eitan.r@manufacturing.co.il',
    phone: '+972-52-890-1234',
    company: 'Manufacturing Co',
    job_title: 'VP Sales',
    source: 'website',
    status: 'converted',
    score: 95,
    notes: 'Converted to customer. Signed up for Premium plan.',
    assigned_to: null,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    first_name: 'Lior',
    last_name: 'Golan',
    email: 'lior.golan@services.co.il',
    phone: '+972-54-901-2345',
    company: 'Service Providers',
    job_title: 'Operations Director',
    source: 'other',
    status: 'lost',
    score: 45,
    notes: 'Went with competitor. Budget constraints.',
    assigned_to: null,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    first_name: 'Shira',
    last_name: 'Dahan',
    email: 'shira.dahan@techstartup.io',
    phone: '+972-50-012-3456',
    company: 'Tech Startup',
    job_title: 'Co-Founder',
    source: 'social',
    status: 'qualified',
    score: 82,
    notes: 'Early-stage startup. Very interested in AI features.',
    assigned_to: null,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Helper function to filter mock leads
export const filterMockLeads = (leads, filters) => {
  let filtered = [...leads]

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(lead => lead.status === filters.status)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(lead => 
      lead.first_name.toLowerCase().includes(searchLower) ||
      lead.last_name.toLowerCase().includes(searchLower) ||
      lead.email?.toLowerCase().includes(searchLower) ||
      lead.company?.toLowerCase().includes(searchLower) ||
      lead.phone?.includes(searchLower)
    )
  }

  return filtered
}


// Mock Contacts Data
// This will be used when Supabase is not configured

export const mockContacts = [
  {
    id: '1',
    first_name: 'Eitan',
    last_name: 'Rosenberg',
    email: 'eitan.r@manufacturing.co.il',
    phone: '+972-52-890-1234',
    mobile: '+972-52-890-1235',
    company: 'Manufacturing Co',
    job_title: 'VP Sales',
    address: '123 Industrial St',
    city: 'Tel Aviv',
    country: 'Israel',
    postal_code: '61000',
    website: 'https://manufacturing.co.il',
    type: 'customer',
    status: 'active',
    tags: ['premium', 'enterprise'],
    notes: 'Premium customer. Very satisfied with the service.',
    created_by: null,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    first_name: 'Sarah',
    last_name: 'Cohen',
    email: 'sarah.cohen@techsolutions.co.il',
    phone: '+972-50-123-4567',
    mobile: '+972-50-123-4568',
    company: 'Tech Solutions Ltd',
    job_title: 'CTO',
    address: '456 Tech Park',
    city: 'Herzliya',
    country: 'Israel',
    postal_code: '46000',
    website: 'https://techsolutions.co.il',
    type: 'customer',
    status: 'active',
    tags: ['tech', 'startup'],
    notes: 'Converted from lead. Interested in AI features.',
    created_by: null,
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    first_name: 'David',
    last_name: 'Levi',
    email: 'david.levi@startup.io',
    phone: '+972-52-234-5678',
    mobile: '+972-52-234-5679',
    company: 'Startup Innovations',
    job_title: 'Founder',
    address: '789 Innovation Hub',
    city: 'Tel Aviv',
    country: 'Israel',
    postal_code: '61000',
    website: 'https://startup.io',
    type: 'customer',
    status: 'active',
    tags: ['startup', 'referral'],
    notes: 'Referred by existing customer. Very happy with automation features.',
    created_by: null,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    first_name: 'Rachel',
    last_name: 'Mizrahi',
    email: 'rachel.m@business.co.il',
    phone: '+972-54-345-6789',
    mobile: '+972-54-345-6790',
    company: 'Business Excellence Group',
    job_title: 'Operations Manager',
    address: '321 Business Center',
    city: 'Jerusalem',
    country: 'Israel',
    postal_code: '91000',
    website: 'https://business.co.il',
    type: 'customer',
    status: 'active',
    tags: ['enterprise', 'integration'],
    notes: 'High-value customer. Uses custom integration with accounting system.',
    created_by: null,
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    first_name: 'Yossi',
    last_name: 'Katz',
    email: 'yossi.katz@retail.co.il',
    phone: '+972-54-678-9012',
    mobile: '+972-54-678-9013',
    company: 'Retail Chain Ltd',
    job_title: 'IT Manager',
    address: '654 Retail Plaza',
    city: 'Haifa',
    country: 'Israel',
    postal_code: '31000',
    website: 'https://retail.co.il',
    type: 'customer',
    status: 'active',
    tags: ['enterprise', 'multi-location'],
    notes: 'Large retail chain. Needs multi-location support. High priority account.',
    created_by: null,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    first_name: 'Tamar',
    last_name: 'Avraham',
    email: 'tamar.avraham@consulting.co.il',
    phone: '+972-52-567-8901',
    mobile: '+972-52-567-8902',
    company: 'Consulting Partners',
    job_title: 'Partner',
    address: '987 Consulting Ave',
    city: 'Tel Aviv',
    country: 'Israel',
    postal_code: '61000',
    website: 'https://consulting.co.il',
    type: 'customer',
    status: 'active',
    tags: ['consulting', 'multiple-users'],
    notes: 'Consulting practice with multiple team members. Very satisfied.',
    created_by: null,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    first_name: 'Shira',
    last_name: 'Dahan',
    email: 'shira.dahan@techstartup.io',
    phone: '+972-50-012-3456',
    mobile: '+972-50-012-3457',
    company: 'Tech Startup',
    job_title: 'Co-Founder',
    address: '147 Startup St',
    city: 'Tel Aviv',
    country: 'Israel',
    postal_code: '61000',
    website: 'https://techstartup.io',
    type: 'customer',
    status: 'active',
    tags: ['startup', 'ai-features'],
    notes: 'Early-stage startup. Very interested in AI features. Growing fast.',
    created_by: null,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    first_name: 'Avi',
    last_name: 'Goldstein',
    email: 'avi.goldstein@supplier.co.il',
    phone: '+972-52-111-2222',
    mobile: '+972-52-111-2223',
    company: 'Supply Chain Solutions',
    job_title: 'CEO',
    address: '258 Supply St',
    city: 'Netanya',
    country: 'Israel',
    postal_code: '42000',
    website: 'https://supplier.co.il',
    type: 'vendor',
    status: 'active',
    tags: ['vendor', 'supplier'],
    notes: 'Key vendor partner. Provides excellent service.',
    created_by: null,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    first_name: 'Maya',
    last_name: 'Ben-Shalom',
    email: 'maya.benshalom@partner.co.il',
    phone: '+972-54-333-4444',
    mobile: '+972-54-333-4445',
    company: 'Strategic Partners',
    job_title: 'Business Development',
    address: '369 Partnership Blvd',
    city: 'Ramat Gan',
    country: 'Israel',
    postal_code: '52000',
    website: 'https://partner.co.il',
    type: 'partner',
    status: 'active',
    tags: ['partner', 'strategic'],
    notes: 'Strategic business partner. Collaborative relationship.',
    created_by: null,
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    first_name: 'Noa',
    last_name: 'Shalom',
    email: 'noa.shalom@agency.com',
    phone: '+972-50-789-0123',
    mobile: '+972-50-789-0124',
    company: 'Digital Agency',
    job_title: 'CEO',
    address: '741 Digital Ave',
    city: 'Tel Aviv',
    country: 'Israel',
    postal_code: '61000',
    website: 'https://agency.com',
    type: 'customer',
    status: 'inactive',
    tags: ['agency', 'small-business'],
    notes: 'Small agency. Currently on hold. May reactivate next quarter.',
    created_by: null,
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Helper function to filter mock contacts
export const filterMockContacts = (contacts, filters) => {
  let filtered = [...contacts]

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(contact => contact.type === filters.type)
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(contact => contact.status === filters.status)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(contact => 
      contact.first_name.toLowerCase().includes(searchLower) ||
      contact.last_name.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.company?.toLowerCase().includes(searchLower) ||
      contact.phone?.includes(searchLower) ||
      contact.mobile?.includes(searchLower)
    )
  }

  return filtered
}


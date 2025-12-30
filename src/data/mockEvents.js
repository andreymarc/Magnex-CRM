// Mock Events Data
// This will be used when Supabase is not configured

export const mockEvents = [
  {
    id: '1',
    title: 'Demo Call - Tech Solutions Ltd',
    description: 'Product demonstration for their team. Focus on AI features.',
    type: 'meeting',
    start_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(), // Tomorrow 10 AM
    end_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(), // Tomorrow 11 AM
    location: 'Zoom Meeting',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: 'contact',
    related_to_id: '2',
    created_by: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Follow-up Meeting - Startup Innovations',
    description: 'Follow up on proposal. Discuss pricing and implementation timeline.',
    type: 'meeting',
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(), // Day after tomorrow 2 PM
    end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000).toISOString(),
    location: 'Office - Conference Room A',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: 'lead',
    related_to_id: '2',
    created_by: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Quarterly Review',
    description: 'Q1 sales review and planning for Q2',
    type: 'meeting',
    start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(), // 5 days from now 9 AM
    end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(),
    location: 'Office - Main Conference Room',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: null,
    related_to_id: null,
    created_by: null,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Client Onboarding - Manufacturing Co',
    description: 'Onboarding session for new client. Setup and training.',
    type: 'appointment',
    start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000).toISOString(), // 3 days from now 1 PM
    end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000).toISOString(),
    location: 'Client Office',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: 'contact',
    related_to_id: '1',
    created_by: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    title: 'Team Standup',
    description: 'Daily team standup meeting',
    type: 'meeting',
    start_time: new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString(), // Today 9 AM
    end_time: new Date(Date.now() + 9 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // Today 9:30 AM
    location: 'Zoom',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: null,
    related_to_id: null,
    created_by: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    title: 'Contract Review - Business Excellence Group',
    description: 'Review contract terms and finalize agreement',
    type: 'meeting',
    start_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000).toISOString(), // 4 days from now 4 PM
    end_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000).toISOString(),
    location: 'Zoom Meeting',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: 'contact',
    related_to_id: '4',
    created_by: null,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    title: 'Product Training Session',
    description: 'Training session for new team members',
    type: 'meeting',
    start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(), // 7 days from now 10 AM
    end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000).toISOString(),
    location: 'Office - Training Room',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: null,
    related_to_id: null,
    created_by: null,
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    title: 'Follow-up Call - Retail Chain Ltd',
    description: 'Follow up on service ticket and discuss expansion',
    type: 'call',
    start_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(), // 6 days from now 11 AM
    end_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    location: 'Phone Call',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: 'contact',
    related_to_id: '5',
    created_by: null,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    title: 'Company Holiday',
    description: 'National holiday - office closed',
    type: 'reminder',
    start_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    end_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: '',
    is_all_day: true,
    status: 'scheduled',
    attendees: [],
    related_to_type: null,
    related_to_id: null,
    created_by: null,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    title: 'Monthly Team Meeting',
    description: 'Monthly all-hands team meeting',
    type: 'meeting',
    start_time: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000).toISOString(), // 10 days from now 3 PM
    end_time: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000).toISOString(),
    location: 'Office - Main Conference Room',
    is_all_day: false,
    status: 'scheduled',
    attendees: [],
    related_to_type: null,
    related_to_id: null,
    created_by: null,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Helper function to filter mock events
export const filterMockEvents = (events, filters) => {
  let filtered = [...events]

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(event => event.type === filters.type)
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(event => event.status === filters.status)
  }

  if (filters.date) {
    const filterDate = new Date(filters.date)
    filterDate.setHours(0, 0, 0, 0)
    const nextDay = new Date(filterDate)
    nextDay.setDate(nextDay.getDate() + 1)
    
    filtered = filtered.filter(event => {
      const eventDate = new Date(event.start_time)
      return eventDate >= filterDate && eventDate < nextDay
    })
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(event => 
      event.title.toLowerCase().includes(searchLower) ||
      event.description?.toLowerCase().includes(searchLower) ||
      event.location?.toLowerCase().includes(searchLower)
    )
  }

  return filtered
}

// Helper to get events for a specific date
export const getEventsForDate = (events, date) => {
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)
  const nextDay = new Date(targetDate)
  nextDay.setDate(nextDay.getDate() + 1)
  
  return events.filter(event => {
    const eventDate = new Date(event.start_time)
    if (event.is_all_day) {
      const eventDay = new Date(eventDate)
      eventDay.setHours(0, 0, 0, 0)
      return eventDay.getTime() === targetDate.getTime()
    }
    return eventDate >= targetDate && eventDate < nextDay
  })
}

// Helper to get upcoming events
export const getUpcomingEvents = (events, days = 7) => {
  const now = new Date()
  const futureDate = new Date(now)
  futureDate.setDate(futureDate.getDate() + days)
  
  return events.filter(event => {
    const eventDate = new Date(event.start_time)
    return eventDate >= now && eventDate <= futureDate && event.status === 'scheduled'
  }).sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
}


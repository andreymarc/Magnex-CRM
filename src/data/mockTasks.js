// Mock Tasks Data
// This will be used when Supabase is not configured

export const mockTasks = [
  {
    id: '1',
    title: 'Follow up with Sarah Cohen',
    description: 'Discuss CRM features and pricing. She showed interest in AI capabilities.',
    type: 'task',
    priority: 'high',
    status: 'pending',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    assigned_to: null,
    related_to_type: 'lead',
    related_to_id: '1',
    created_by: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Send proposal to Tech Solutions Ltd',
    description: 'Prepare and send detailed proposal for their team of 15 users.',
    type: 'task',
    priority: 'urgent',
    status: 'in_progress',
    due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    assigned_to: null,
    related_to_type: 'contact',
    related_to_id: '2',
    created_by: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Review contract with Manufacturing Co',
    description: 'Review the contract terms before signing. Check payment schedule.',
    type: 'task',
    priority: 'medium',
    status: 'pending',
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    assigned_to: null,
    related_to_type: 'contact',
    related_to_id: '1',
    created_by: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Schedule demo for Startup Innovations',
    description: 'They want to see the AI features in action. Schedule 30-minute demo.',
    type: 'reminder',
    priority: 'high',
    status: 'pending',
    due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    assigned_to: null,
    related_to_type: 'lead',
    related_to_id: '2',
    created_by: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    title: 'Payment reminder - Business Excellence Group',
    description: 'Send payment reminder for invoice #INV-2024-001. Due in 5 days.',
    type: 'alert',
    priority: 'medium',
    status: 'pending',
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    assigned_to: null,
    related_to_type: 'contact',
    related_to_id: '4',
    created_by: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    title: 'Update customer portal access',
    description: 'Grant portal access to Retail Chain Ltd for their new team members.',
    type: 'task',
    priority: 'low',
    status: 'completed',
    due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    assigned_to: null,
    related_to_type: 'contact',
    related_to_id: '5',
    created_by: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    title: 'Follow up on service ticket #1234',
    description: 'Check if the issue reported by Consulting Partners has been resolved.',
    type: 'alert',
    priority: 'high',
    status: 'pending',
    due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    assigned_to: null,
    related_to_type: 'contact',
    related_to_id: '6',
    created_by: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    title: 'Prepare quarterly report',
    description: 'Compile sales data and prepare Q1 report for management review.',
    type: 'task',
    priority: 'medium',
    status: 'in_progress',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    assigned_to: null,
    related_to_type: null,
    related_to_id: null,
    created_by: null,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    title: 'Renewal reminder - Digital Agency',
    description: 'Subscription renewal coming up in 2 weeks. Reach out to discuss.',
    type: 'reminder',
    priority: 'medium',
    status: 'pending',
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    assigned_to: null,
    related_to_type: 'contact',
    related_to_id: '10',
    created_by: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    title: 'Onboarding call with Tech Startup',
    description: 'Schedule onboarding session for new customer. Show them key features.',
    type: 'task',
    priority: 'high',
    status: 'completed',
    due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    assigned_to: null,
    related_to_type: 'contact',
    related_to_id: '7',
    created_by: null,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Helper function to filter mock tasks
export const filterMockTasks = (tasks, filters) => {
  let filtered = [...tasks]

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(task => task.status === filters.status)
  }

  if (filters.priority && filters.priority !== 'all') {
    filtered = filtered.filter(task => task.priority === filters.priority)
  }

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(task => task.type === filters.type)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(task => 
      task.title.toLowerCase().includes(searchLower) ||
      task.description?.toLowerCase().includes(searchLower)
    )
  }

  // Filter by due date
  if (filters.dueDate) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    filtered = filtered.filter(task => {
      if (!task.due_date) return false
      const dueDate = new Date(task.due_date)
      
      switch (filters.dueDate) {
        case 'today':
          return dueDate.toDateString() === today.toDateString()
        case 'this_week':
          const weekEnd = new Date(today)
          weekEnd.setDate(weekEnd.getDate() + 7)
          return dueDate >= today && dueDate <= weekEnd
        case 'overdue':
          return dueDate < today && task.status !== 'completed'
        case 'upcoming':
          return dueDate > today
        default:
          return true
      }
    })
  }

  return filtered
}

// Helper to get overdue tasks
export const getOverdueTasks = (tasks) => {
  const now = new Date()
  return tasks.filter(task => {
    if (!task.due_date || task.status === 'completed') return false
    return new Date(task.due_date) < now
  })
}

// Helper to get tasks due today
export const getTasksDueToday = (tasks) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  return tasks.filter(task => {
    if (!task.due_date || task.status === 'completed') return false
    const dueDate = new Date(task.due_date)
    return dueDate >= today && dueDate < tomorrow
  })
}


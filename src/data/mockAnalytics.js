// Mock Analytics Data
// This will be used for the analytics dashboard

export const salesData = [
  { month: 'Jan', revenue: 45000, deals: 12, closed: 8 },
  { month: 'Feb', revenue: 52000, deals: 15, closed: 10 },
  { month: 'Mar', revenue: 48000, deals: 14, closed: 9 },
  { month: 'Apr', revenue: 61000, deals: 18, closed: 12 },
  { month: 'May', revenue: 72000, deals: 20, closed: 14 },
  { month: 'Jun', revenue: 85000, deals: 22, closed: 16 },
  { month: 'Jul', revenue: 95000, deals: 25, closed: 18 }
]

export const leadSourceData = [
  { name: 'Website', value: 35, color: '#8b5cf6' },
  { name: 'Referral', value: 25, color: '#06b6d4' },
  { name: 'Campaign', value: 20, color: '#10b981' },
  { name: 'Social Media', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#ef4444' }
]

export const dealStageData = [
  { name: 'Prospecting', value: 15, color: '#6b7280' },
  { name: 'Qualification', value: 20, color: '#3b82f6' },
  { name: 'Proposal', value: 18, color: '#f59e0b' },
  { name: 'Negotiation', value: 12, color: '#f97316' },
  { name: 'Closed Won', value: 25, color: '#10b981' },
  { name: 'Closed Lost', value: 10, color: '#ef4444' }
]

export const activityData = [
  { day: 'Mon', calls: 12, emails: 24, meetings: 5 },
  { day: 'Tue', calls: 15, emails: 28, meetings: 6 },
  { day: 'Wed', calls: 10, emails: 22, meetings: 4 },
  { day: 'Thu', calls: 18, emails: 30, meetings: 7 },
  { day: 'Fri', calls: 14, emails: 26, meetings: 5 },
  { day: 'Sat', calls: 5, emails: 10, meetings: 2 },
  { day: 'Sun', calls: 3, emails: 8, meetings: 1 }
]

export const topCustomers = [
  { name: 'Manufacturing Co', revenue: 180000, deals: 3, status: 'Active' },
  { name: 'Retail Chain Ltd', revenue: 125000, deals: 2, status: 'Active' },
  { name: 'Hotel Management', revenue: 200000, deals: 1, status: 'Active' },
  { name: 'Tech Solutions Ltd', revenue: 45000, deals: 1, status: 'Active' },
  { name: 'Business Excellence', revenue: 95000, deals: 2, status: 'Active' }
]

export const conversionFunnel = [
  { stage: 'Leads', count: 150, percentage: 100 },
  { stage: 'Qualified', count: 90, percentage: 60 },
  { stage: 'Proposal', count: 54, percentage: 36 },
  { stage: 'Negotiation', count: 32, percentage: 21 },
  { stage: 'Closed Won', count: 25, percentage: 17 }
]

export const teamPerformance = [
  { name: 'David', deals: 15, revenue: 125000, winRate: 75 },
  { name: 'Sarah', deals: 12, revenue: 98000, winRate: 70 },
  { name: 'Michael', deals: 10, revenue: 85000, winRate: 65 },
  { name: 'Emily', deals: 8, revenue: 72000, winRate: 80 }
]

export const monthlyComparison = {
  current: {
    revenue: 95000,
    deals: 25,
    closed: 18,
    avgDealSize: 5278
  },
  previous: {
    revenue: 85000,
    deals: 22,
    closed: 16,
    avgDealSize: 5000
  }
}

export const kpiMetrics = {
  totalRevenue: 508000,
  revenueGrowth: 11.8,
  totalDeals: 126,
  dealsGrowth: 13.6,
  winRate: 72,
  winRateChange: 2.5,
  avgDealSize: 4032,
  avgDealSizeChange: 5.6,
  pipelineValue: 425000,
  pipelineGrowth: 8.3
}


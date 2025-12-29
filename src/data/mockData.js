// Mock data for the dashboard - General Business CRM
export const mockDeals = [
  {
    id: 1,
    from: "Sarah Johnson",
    company: "Tech Solutions Inc",
    subject: "Enterprise Software License - Annual Contract",
    received: "16:20",
    dealValue: 45000,
    status: "Open",
    tags: ["High Priority"]
  },
  {
    id: 2,
    from: "Michael Chen",
    company: "Global Marketing Agency",
    subject: "Marketing Campaign Services - Q2 2024",
    received: "16:11",
    dealValue: 28000,
    status: "Sent",
    tags: ["Follow Up"]
  },
  {
    id: 3,
    from: "Emily Rodriguez",
    company: "Retail Chain Corp",
    subject: "Point of Sale System Implementation",
    received: "15:03",
    dealValue: 125000,
    status: "Won",
    tags: ["Contract Signed"]
  },
  {
    id: 4,
    from: "David Kim",
    company: "Healthcare Services",
    subject: "Cloud Infrastructure Migration Project",
    received: "14:45",
    dealValue: 95000,
    status: "Open",
    tags: ["Needs Review"]
  },
  {
    id: 5,
    from: "Lisa Anderson",
    company: "Financial Advisors Group",
    subject: "CRM Implementation & Training Package",
    received: "14:20",
    dealValue: 32000,
    status: "Sent",
    tags: []
  },
  {
    id: 6,
    from: "Robert Williams",
    company: "Manufacturing Co",
    subject: "ERP System Upgrade & Integration",
    received: "13:55",
    dealValue: 180000,
    status: "Won",
    tags: []
  },
  {
    id: 7,
    from: "Jennifer Martinez",
    company: "E-commerce Platform",
    subject: "Payment Processing Integration",
    received: "13:30",
    dealValue: 15000,
    status: "Open",
    tags: ["Needs Review"]
  },
  {
    id: 8,
    from: "James Thompson",
    company: "Real Estate Group",
    subject: "Property Management Software License",
    received: "13:15",
    dealValue: 22000,
    status: "Sent",
    tags: ["High Priority"]
  },
  {
    id: 9,
    from: "Amanda White",
    company: "Education Services",
    subject: "Learning Management System - Multi-year",
    received: "12:50",
    dealValue: 75000,
    status: "Won",
    tags: []
  },
  {
    id: 10,
    from: "Christopher Brown",
    company: "Logistics Solutions",
    subject: "Fleet Management Software & Hardware",
    received: "12:25",
    dealValue: 110000,
    status: "Open",
    tags: ["Follow Up"]
  },
  {
    id: 11,
    from: "Jessica Taylor",
    company: "Consulting Firm",
    subject: "Business Intelligence Dashboard Development",
    received: "12:10",
    dealValue: 45000,
    status: "Negotiating",
    tags: ["High Priority"]
  },
  {
    id: 12,
    from: "Daniel Garcia",
    company: "Hospitality Group",
    subject: "Hotel Management System - Chain-wide",
    received: "11:45",
    dealValue: 200000,
    status: "Won",
    tags: ["Contract Signed"]
  }
]

export const businessStats = {
  totalRevenue: 619983.2,
  totalChange: 25,
  profit: 95100,
  profitChange: 8,
  monthlyGoal: 116000,
  monthlyGoalChange: 8,
  distribution: {
    open: 429800,
    sent: 601400,
    won: 618700,
    negotiating: 107000,
    lost: 145000
  }
}

export const profitData = [
  { month: "Jan", profit: 45000 },
  { month: "Feb", profit: 52000 },
  { month: "Mar", profit: 48000 },
  { month: "Apr", profit: 61000 },
  { month: "May", profit: 72000 },
  { month: "Jun", profit: 85000 },
  { month: "Jul", profit: 95100 }
]

export const dealsByStatus = [
  { status: "Draft", count: 3 },
  { status: "Sent", count: 41 },
  { status: "Negotiating", count: 37 },
  { status: "Won", count: 34 }
]

export const statusCounts = {
  open: 41,
  sent: 63,
  won: 41,
  drafts: 3,
  negotiating: 28,
  lost: 12
}

export const tagCounts = {
  "High Priority": 8,
  "Needs Review": 5,
  "Follow Up": 12,
  "Contract Signed": 6
}

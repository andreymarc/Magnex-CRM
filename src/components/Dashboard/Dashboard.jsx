import { useState } from 'react'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import TrialExpiryBanner from './TrialExpiryBanner'
import { TotalRevenueCard, ProfitCard, MonthlyGoalCard } from './KPICard'
import DealsTable from './QuotesTable'
import FiltersPanel from './FiltersPanel'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { mockDeals, businessStats, profitData, statusCounts, tagCounts } from '../../data/mockData'

export default function Dashboard() {
  const [filteredDeals, setFilteredDeals] = useState(mockDeals)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile } = useAuth()
  const { isRTL, language } = useLanguage()

  const handleFilterChange = (type, value) => {
    // Filter logic would go here
    if (type === 'status') {
      const filtered = value === 'all' 
        ? mockDeals 
        : mockDeals.filter(deal => deal.status.toLowerCase() === value.toLowerCase())
      setFilteredDeals(filtered)
    } else if (type === 'tag') {
      const filtered = value === 'all'
        ? mockDeals
        : mockDeals.filter(deal => deal.tags.includes(value))
      setFilteredDeals(filtered)
    }
  }

  // Get user's first name from profile
  const userName = profile?.full_name?.split(' ')[0] || (language === 'he' ? 'משתמש' : 'User')

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:pr-64' : 'lg:pr-16'} transition-all duration-300`}>
        <TrialExpiryBanner />
        <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="mb-3 sm:mb-4 lg:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {language === 'he' ? `שלום ${userName}!` : `Hello ${userName}!`}
            </h1>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
            <TotalRevenueCard data={businessStats} change={businessStats.totalChange} />
            <ProfitCard data={profitData} profitValue={businessStats.profit} change={businessStats.profitChange} />
            <MonthlyGoalCard goal={businessStats.monthlyGoal} change={businessStats.monthlyGoalChange} />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <FiltersPanel 
                statusCounts={statusCounts}
                tagCounts={tagCounts}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className="lg:col-span-3 order-1 lg:order-2">
              <DealsTable deals={filteredDeals} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


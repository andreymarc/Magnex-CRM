import { useState } from 'react'
import { FiZap } from 'react-icons/fi'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import { TotalRevenueCard, ProfitCard, MonthlyGoalCard } from './KPICard'
import DealsTable from './QuotesTable'
import FiltersPanel from './FiltersPanel'
import AIAssistant from './AIAssistant'
import { mockDeals, businessStats, profitData, statusCounts, tagCounts } from '../../data/mockData'

export default function Dashboard() {
  const [filteredDeals, setFilteredDeals] = useState(mockDeals)
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-0">
        <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        {/* Free Trial Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 sm:px-6 text-center text-xs sm:text-sm font-semibold">
          <span className="hidden sm:inline">🎉 First Month Free - No Credit Card Required • Start Your Free Trial Today! 🎉</span>
          <span className="sm:hidden">🎉 First Month Free - No Credit Card Required 🎉</span>
        </div>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome David!</h1>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <TotalRevenueCard data={businessStats} change={businessStats.totalChange} />
            <ProfitCard data={profitData} profitValue={businessStats.profit} change={businessStats.profitChange} />
            <MonthlyGoalCard goal={businessStats.monthlyGoal} change={businessStats.monthlyGoalChange} />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
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

      {/* AI Assistant Button */}
      <button
        onClick={() => setAIAssistantOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 z-40"
        title="Open AI Assistant"
      >
        <FiZap className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* AI Assistant */}
      <AIAssistant isOpen={aiAssistantOpen} onClose={() => setAIAssistantOpen(false)} />
    </div>
  )
}


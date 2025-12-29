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
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        {/* Free Trial Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-6 text-center text-sm font-semibold">
          🎉 First Month Free - No Credit Card Required • Start Your Free Trial Today! 🎉
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome David!</h1>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <TotalRevenueCard data={businessStats} change={businessStats.totalChange} />
            <ProfitCard data={profitData} profitValue={businessStats.profit} change={businessStats.profitChange} />
            <MonthlyGoalCard goal={businessStats.monthlyGoal} change={businessStats.monthlyGoalChange} />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <FiltersPanel 
                statusCounts={statusCounts}
                tagCounts={tagCounts}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className="lg:col-span-3">
              <DealsTable deals={filteredDeals} />
            </div>
          </div>
        </main>
      </div>

      {/* AI Assistant Button */}
      <button
        onClick={() => setAIAssistantOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 z-40"
        title="Open AI Assistant"
      >
        <FiZap className="w-6 h-6" />
      </button>

      {/* AI Assistant */}
      <AIAssistant isOpen={aiAssistantOpen} onClose={() => setAIAssistantOpen(false)} />
    </div>
  )
}


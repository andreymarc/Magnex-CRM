import { useState } from 'react'
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiBriefcase, FiTarget, FiBarChart2, FiZap, FiDownload, FiFilter } from 'react-icons/fi'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts'
import Sidebar from '../Sidebar'
import TopNav from '../TopNav'
import AIAssistant from '../AIAssistant'
import { salesData, leadSourceData, dealStageData, activityData, topCustomers, conversionFunnel, teamPerformance, monthlyComparison, kpiMetrics } from '../../../data/mockAnalytics'

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1']

export default function AnalyticsDashboard() {
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false)
  const [dateRange, setDateRange] = useState('last30days')

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
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
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
                <p className="text-gray-600 mt-1">לוחות בקרה ודוחות</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last90days">Last 90 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="thisYear">This Year</option>
                </select>
                <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <FiDownload className="w-5 h-5" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Total Revenue</h3>
                  <FiDollarSign className="w-5 h-5 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(kpiMetrics.totalRevenue)}
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FiTrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">+{kpiMetrics.revenueGrowth}%</span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Total Deals</h3>
                  <FiBriefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {kpiMetrics.totalDeals}
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FiTrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">+{kpiMetrics.dealsGrowth}%</span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Win Rate</h3>
                  <FiTarget className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {kpiMetrics.winRate}%
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FiTrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">+{kpiMetrics.winRateChange}%</span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Pipeline Value</h3>
                  <FiBarChart2 className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(kpiMetrics.pipelineValue)}
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FiTrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">+{kpiMetrics.pipelineGrowth}%</span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Lead Sources */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Deal Pipeline */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Pipeline Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dealStageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {dealStageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Activity Overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="calls" stroke="#8b5cf6" strokeWidth={2} name="Calls" />
                    <Line type="monotone" dataKey="emails" stroke="#06b6d4" strokeWidth={2} name="Emails" />
                    <Line type="monotone" dataKey="meetings" stroke="#10b981" strokeWidth={2} name="Meetings" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conversion Funnel */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
                <div className="space-y-4">
                  {conversionFunnel.map((stage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                        <span className="text-sm text-gray-600">{stage.count} ({stage.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Performance */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
                <div className="space-y-4">
                  {teamPerformance.map((member, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{member.name}</span>
                        <span className="text-sm text-gray-600">Win Rate: {member.winRate}%</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{member.deals} Deals</span>
                        <span>{formatCurrency(member.revenue)} Revenue</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${member.winRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customers</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topCustomers.map((customer, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{customer.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatCurrency(customer.revenue)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{customer.deals}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {customer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monthly Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Revenue</h4>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(monthlyComparison.current.revenue)}
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FiTrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">
                    +{((monthlyComparison.current.revenue - monthlyComparison.previous.revenue) / monthlyComparison.previous.revenue * 100).toFixed(1)}%
                  </span>
                  <span className="text-gray-500">vs last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Deals</h4>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {monthlyComparison.current.deals}
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FiTrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">
                    +{((monthlyComparison.current.deals - monthlyComparison.previous.deals) / monthlyComparison.previous.deals * 100).toFixed(1)}%
                  </span>
                  <span className="text-gray-500">vs last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Closed</h4>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {monthlyComparison.current.closed}
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FiTrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">
                    +{((monthlyComparison.current.closed - monthlyComparison.previous.closed) / monthlyComparison.previous.closed * 100).toFixed(1)}%
                  </span>
                  <span className="text-gray-500">vs last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Avg Deal Size</h4>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(monthlyComparison.current.avgDealSize)}
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FiTrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">
                    +{((monthlyComparison.current.avgDealSize - monthlyComparison.previous.avgDealSize) / monthlyComparison.previous.avgDealSize * 100).toFixed(1)}%
                  </span>
                  <span className="text-gray-500">vs last month</span>
                </div>
              </div>
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


import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

export function TotalRevenueCard({ data, change }) {
  const chartData = [
    { name: 'Open', value: data.distribution.open / 1000, label: '$429.8K' },
    { name: 'Sent', value: data.distribution.sent / 1000, label: '$601.4K' },
    { name: 'Won', value: data.distribution.won / 1000, label: '$618.7K' },
    { name: 'Negotiating', value: data.distribution.negotiating / 1000, label: '$107K' },
    { name: 'Lost', value: data.distribution.lost / 1000, label: '$145K' }
  ]

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
        <h3 className="text-gray-600 font-medium text-sm sm:text-base">Total Revenue</h3>
        <span className="text-green-500 text-xs sm:text-sm font-semibold">+{change}% Last 30 Days</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        ${data.totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 1 })}
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Deals distribution by status:</p>
      <div className="h-24 sm:h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function ProfitCard({ data, profitValue, change }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
        <h3 className="text-gray-600 font-medium text-sm sm:text-base">Profit From Closed Deals</h3>
        <span className="text-green-500 text-xs sm:text-sm font-semibold">+{change}% Last 30 Days</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
        ${(profitValue / 1000).toFixed(1)}k
      </div>
      <div className="h-24 sm:h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#8b5cf6" 
              fillOpacity={1} 
              fill="url(#profitGradient)"
            />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function MonthlyGoalCard({ goal, change }) {
  const percentage = 75 // Example percentage
  const radius = 36 // Base radius for calculation
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
        <h3 className="text-gray-600 font-medium text-sm sm:text-base">Monthly Sales Goal</h3>
        <span className="text-green-500 text-xs sm:text-sm font-semibold">+{change}% Last 30 Days</span>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
          <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-primary-600 transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm sm:text-base lg:text-xl font-bold text-gray-900">
                ${(goal / 1000).toFixed(1)}k
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


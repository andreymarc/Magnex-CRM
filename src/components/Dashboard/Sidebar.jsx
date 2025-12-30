import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  FiHome, 
  FiZap, 
  FiList, 
  FiDollarSign, 
  FiClock, 
  FiMapPin, 
  FiUsers, 
  FiBarChart2, 
  FiFileText, 
  FiSettings,
  FiUserPlus,
  FiCheckSquare
} from 'react-icons/fi'

const menuItems = [
  { icon: FiHome, label: 'Home', path: '/dashboard', active: true },
  { icon: FiUserPlus, label: 'Leads', path: '/dashboard/leads' },
  { icon: FiUsers, label: 'Contacts', path: '/dashboard/contacts' },
  { icon: FiCheckSquare, label: 'Tasks', path: '/dashboard/tasks' },
  { icon: FiList, label: 'Deals', path: '/dashboard/deals' },
  { icon: FiClock, label: 'Schedule', path: '/dashboard/schedule' },
  { icon: FiFileText, label: 'Documents', path: '/dashboard/documents' },
  { icon: FiBarChart2, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: FiDollarSign, label: 'Payments', path: '/dashboard/payments' },
  { icon: FiSettings, label: 'Settings', path: '/dashboard/settings' }
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-6 space-y-6">
      {menuItems.map((item, index) => {
        const Icon = item.icon
        const active = isActive(item.path)
        return (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
              active
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title={item.label}
          >
            <Icon className="w-5 h-5" />
          </button>
        )
      })}
    </div>
  )
}


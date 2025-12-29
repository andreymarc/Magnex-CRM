import { useState } from 'react'
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
  FiSettings 
} from 'react-icons/fi'

const menuItems = [
  { icon: FiHome, label: 'Home', active: true },
  { icon: FiZap, label: 'Quick Actions' },
  { icon: FiList, label: 'Deals' },
  { icon: FiDollarSign, label: 'Payments' },
  { icon: FiClock, label: 'Schedule' },
  { icon: FiUsers, label: 'Contacts' },
  { icon: FiBarChart2, label: 'Analytics', active: true },
  { icon: FiFileText, label: 'Invoices' },
  { icon: FiSettings, label: 'Settings' }
]

export default function Sidebar() {
  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-6 space-y-6">
      {menuItems.map((item, index) => {
        const Icon = item.icon
        return (
          <button
            key={index}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
              item.active
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


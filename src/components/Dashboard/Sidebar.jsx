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
  FiCheckSquare,
  FiX
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

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  const handleNavClick = (path) => {
    navigate(path)
    // Close mobile menu after navigation
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-16
        bg-gray-900
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
        shadow-xl lg:shadow-none
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white font-semibold text-lg">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 lg:py-6">
          <div className="flex flex-col lg:items-center space-y-2 lg:space-y-6 px-2 lg:px-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.path)}
                  className={`
                    w-full lg:w-12 h-12
                    rounded-lg
                    flex items-center
                    lg:justify-center
                    px-4 lg:px-0
                    transition-all duration-200
                    ${active
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }
                  `}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="ml-3 lg:hidden text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}


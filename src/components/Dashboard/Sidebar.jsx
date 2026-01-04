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
  FiX,
  FiLock
} from 'react-icons/fi'
import { useFeatureAccess } from '../../hooks/useFeatureAccess'

const menuItems = [
  { icon: FiHome, label: 'ראשי', labelEn: 'Home', path: '/dashboard', feature: null },
  { icon: FiUserPlus, label: 'לידים', labelEn: 'Leads', path: '/dashboard/leads', feature: 'leads' },
  { icon: FiUsers, label: 'אנשי קשר', labelEn: 'Contacts', path: '/dashboard/contacts', feature: 'contacts' },
  { icon: FiCheckSquare, label: 'משימות', labelEn: 'Tasks', path: '/dashboard/tasks', feature: 'tasks' },
  { icon: FiList, label: 'עסקאות', labelEn: 'Deals', path: '/dashboard/deals', feature: 'deals' },
  { icon: FiClock, label: 'לוח זמנים', labelEn: 'Schedule', path: '/dashboard/schedule', feature: 'schedule' },
  { icon: FiFileText, label: 'מסמכים', labelEn: 'Documents', path: '/dashboard/documents', feature: 'documents' },
  { icon: FiBarChart2, label: 'אנליטיקה', labelEn: 'Analytics', path: '/dashboard/analytics', feature: 'analytics' },
  { icon: FiDollarSign, label: 'תשלומים', labelEn: 'Payments', path: '/dashboard/payments', feature: 'payments' },
  { icon: FiSettings, label: 'הגדרות', labelEn: 'Settings', path: '/dashboard/settings', feature: 'settings' }
]

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLocked, trialDaysRemaining, isTrialActive } = useFeatureAccess()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [lockedFeatureName, setLockedFeatureName] = useState('')

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  const handleNavClick = (item) => {
    // Check if feature is locked
    if (item.feature && isLocked(item.feature)) {
      setLockedFeatureName(item.label)
      setShowUpgradeModal(true)
      return
    }

    navigate(item.path)
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
          <h2 className="text-white font-semibold text-lg">תפריט</h2>
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
              const locked = item.feature && isLocked(item.feature)
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  className={`
                    w-full lg:w-12 h-12
                    rounded-lg
                    flex items-center
                    lg:justify-center
                    px-4 lg:px-0
                    transition-all duration-200
                    relative
                    ${locked
                      ? 'text-gray-600 hover:text-gray-500 cursor-not-allowed'
                      : active
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }
                  `}
                  title={locked ? `${item.label} (נעול)` : item.label}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="mr-3 lg:hidden text-sm font-medium">{item.label}</span>
                  {locked && (
                    <FiLock className="w-3 h-3 absolute top-1 left-1 lg:top-0 lg:left-0 text-yellow-500" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Trial Info */}
        {isTrialActive && trialDaysRemaining > 0 && (
          <div className="p-3 lg:p-2 border-t border-gray-800">
            <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg p-3 lg:p-2 text-center">
              <p className="text-xs text-gray-400 lg:hidden">תקופת ניסיון</p>
              <p className="text-sm lg:text-xs font-bold text-white">
                <span className="lg:hidden">נותרו </span>
                {trialDaysRemaining}
                <span className="lg:hidden"> ימים</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4" dir="rtl">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full border border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLock className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">תכונה נעולה</h3>
              <p className="text-gray-400 mb-4">
                {lockedFeatureName} זמין רק במנוי Pro.
                <br />
                שדרג את החשבון שלך כדי לגשת לכל התכונות.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  סגור
                </button>
                <button
                  onClick={() => {
                    setShowUpgradeModal(false)
                    navigate('/pricing')
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                  שדרג עכשיו
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


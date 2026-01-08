import { FiMenu, FiBell, FiSearch, FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { useAuth } from '../../context/AuthContext'

export default function TopNav({ onMenuClick }) {
  const { getTrialDaysRemaining, isPro } = useAuth()

  const daysRemaining = getTrialDaysRemaining()

  // Determine badge color based on days remaining
  const getTrialBadgeColor = () => {
    if (daysRemaining >= 15) return 'bg-green-500 text-white'
    if (daysRemaining >= 7) return 'bg-yellow-500 text-gray-900'
    return 'bg-red-500 text-white'
  }

  // Hebrew text for trial display
  const getTrialText = () => {
    if (daysRemaining === 0) return 'תקופת הניסיון הסתיימה'
    if (daysRemaining === 1) return 'יום אחד נותר'
    return `${daysRemaining} ימים נותרו`
  }

  return (
    <nav className="bg-purple-dark/95 backdrop-blur-md border-b border-purple-darker px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Menu toggle button - on left near sidebar */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-lg"
            aria-label="פתח תפריט"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <Logo size="default" />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Trial Countdown Badge - only show for non-pro users */}
          {!isPro() && (
            <Link
              to="/dashboard/settings"
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all hover:opacity-90 ${getTrialBadgeColor()}`}
            >
              <FiClock className="w-4 h-4" />
              <span>{getTrialText()}</span>
            </Link>
          )}
          <button className="text-white/70 hover:text-white transition-colors relative p-2">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </nav>
  )
}


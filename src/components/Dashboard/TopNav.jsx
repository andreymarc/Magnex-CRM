import { useState } from 'react'
import { FiMenu, FiBell, FiClock, FiZap } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import UpgradeModal from './UpgradeModal'

export default function TopNav({ onMenuClick }) {
  const { getTrialDaysRemaining, isPro, isTrialActive } = useAuth()
  const { language } = useLanguage()
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)

  const daysRemaining = getTrialDaysRemaining()
  const trialActive = isTrialActive()
  const isHebrew = language === 'he'

  // Determine badge color based on days remaining
  const getTrialBadgeColor = () => {
    if (!trialActive) return 'bg-red-500 text-white'
    if (daysRemaining >= 15) return 'bg-green-500 text-white'
    if (daysRemaining >= 7) return 'bg-yellow-500 text-gray-900'
    return 'bg-red-500 text-white'
  }

  // Text for trial display
  const getTrialText = () => {
    if (!trialActive) return isHebrew ? 'שדרג עכשיו' : 'Upgrade Now'
    if (daysRemaining === 0) return isHebrew ? 'יום אחרון!' : 'Last day!'
    if (daysRemaining === 1) return isHebrew ? 'יום אחד נותר' : '1 day left'
    return isHebrew ? `${daysRemaining} ימים נותרו` : `${daysRemaining} days left`
  }

  return (
    <>
      <nav className="bg-purple-dark/95 backdrop-blur-md border-b border-purple-darker px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Menu toggle button - visible on all screen sizes */}
            <button
              onClick={onMenuClick}
              className="text-white/70 hover:text-white transition-colors p-1.5 sm:p-2 bg-white/10 rounded-lg"
              aria-label={isHebrew ? 'פתח תפריט' : 'Open menu'}
            >
              <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
            {/* Trial Countdown Badge / Upgrade Button - only show for non-pro users */}
            {!isPro() && (
              <button
                onClick={() => setUpgradeModalOpen(true)}
                className={`hidden sm:flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all hover:opacity-90 hover:scale-105 ${getTrialBadgeColor()}`}
              >
                {trialActive ? (
                  <FiClock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <FiZap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
                <span>{getTrialText()}</span>
              </button>
            )}
            <button className="text-white/70 hover:text-white transition-colors relative p-1.5 sm:p-2">
              <FiBell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      <UpgradeModal isOpen={upgradeModalOpen} onClose={() => setUpgradeModalOpen(false)} />
    </>
  )
}


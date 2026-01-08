import { useState } from 'react'
import { FiAlertCircle, FiX, FiZap } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import UpgradeModal from './UpgradeModal'

export default function TrialExpiryBanner() {
  const [dismissed, setDismissed] = useState(false)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const { getTrialDaysRemaining, isPro, isTrialActive } = useAuth()
  const { language } = useLanguage()

  const daysRemaining = getTrialDaysRemaining()
  const isHebrew = language === 'he'

  // Don't show banner for pro users or if dismissed
  if (isPro() || dismissed) return null

  // Only show banner if trial has 7 or fewer days remaining, or has expired
  const trialActive = isTrialActive()
  if (trialActive && daysRemaining > 7) return null

  const texts = {
    he: {
      expired: 'תקופת הניסיון הסתיימה',
      expiredDesc: 'שדרג עכשיו כדי להמשיך להשתמש בכל התכונות',
      expiring: `נותרו ${daysRemaining} ימים לתקופת הניסיון`,
      expiringDesc: 'שדרג עכשיו כדי לא לאבד גישה לתכונות פרימיום',
      upgrade: 'שדרג עכשיו',
      lastDay: 'יום אחרון לתקופת הניסיון!'
    },
    en: {
      expired: 'Trial period has ended',
      expiredDesc: 'Upgrade now to continue using all features',
      expiring: `${daysRemaining} days left in trial`,
      expiringDesc: 'Upgrade now to keep access to premium features',
      upgrade: 'Upgrade Now',
      lastDay: 'Last day of trial!'
    }
  }

  const t = texts[isHebrew ? 'he' : 'en']
  const isExpired = !trialActive

  return (
    <>
      <div className={`relative ${isExpired ? 'bg-red-500' : 'bg-yellow-500'} text-white px-4 py-3`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <span className="font-semibold">
                {isExpired ? t.expired : (daysRemaining === 1 ? t.lastDay : t.expiring)}
              </span>
              <span className="hidden sm:inline mx-2">—</span>
              <span className="hidden sm:inline text-white/90">
                {isExpired ? t.expiredDesc : t.expiringDesc}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUpgradeModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium transition-colors ${
                isExpired
                  ? 'bg-white text-red-600 hover:bg-red-50'
                  : 'bg-white text-yellow-600 hover:bg-yellow-50'
              }`}
            >
              <FiZap className="w-4 h-4" />
              <span>{t.upgrade}</span>
            </button>

            {!isExpired && (
              <button
                onClick={() => setDismissed(true)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Dismiss"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />
    </>
  )
}

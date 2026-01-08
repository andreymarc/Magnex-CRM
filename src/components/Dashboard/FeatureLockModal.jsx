import { useState } from 'react'
import { FiX, FiLock, FiZap } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import UpgradeModal from './UpgradeModal'

export default function FeatureLockModal({ isOpen, onClose, featureName }) {
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const { language } = useLanguage()

  const isHebrew = language === 'he'

  // Feature name translations
  const featureNames = {
    he: {
      leads: 'ניהול לידים',
      deals: 'ניהול עסקאות',
      schedule: 'יומן ואירועים',
      documents: 'ניהול מסמכים',
      analytics: 'דוחות ואנליטיקס',
      payments: 'ניהול חשבוניות'
    },
    en: {
      leads: 'Lead Management',
      deals: 'Deal Management',
      schedule: 'Calendar & Events',
      documents: 'Document Management',
      analytics: 'Reports & Analytics',
      payments: 'Invoice Management'
    }
  }

  const texts = {
    he: {
      title: 'תכונה נעולה',
      description: 'תכונה זו זמינה רק למנויי Pro',
      featureLabel: 'התכונה:',
      upgradeText: 'שדרג ל-Pro כדי לקבל גישה מלאה לכל התכונות של המערכת',
      upgrade: 'שדרג עכשיו',
      cancel: 'אולי אחר כך'
    },
    en: {
      title: 'Feature Locked',
      description: 'This feature is only available to Pro subscribers',
      featureLabel: 'Feature:',
      upgradeText: 'Upgrade to Pro to get full access to all system features',
      upgrade: 'Upgrade Now',
      cancel: 'Maybe Later'
    }
  }

  const t = texts[isHebrew ? 'he' : 'en']
  const translatedFeatureName = featureNames[isHebrew ? 'he' : 'en'][featureName] || featureName

  if (!isOpen) return null

  const handleUpgrade = () => {
    onClose()
    setUpgradeModalOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Backdrop */}
          <div
            className="fixed inset-0 transition-opacity bg-gray-900/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-right align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:my-16">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLock className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
              <p className="text-gray-600 mt-1">{t.description}</p>
            </div>

            {/* Feature info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-500 mb-1">{t.featureLabel}</div>
              <div className="text-lg font-semibold text-gray-900">{translatedFeatureName}</div>
            </div>

            {/* Upgrade text */}
            <p className="text-gray-600 text-sm text-center mb-6">
              {t.upgradeText}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleUpgrade}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <FiZap className="w-4 h-4" />
                {t.upgrade}
              </button>
            </div>
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

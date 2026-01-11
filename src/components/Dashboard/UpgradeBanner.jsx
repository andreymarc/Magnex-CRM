import { useState } from 'react'
import { FiAlertTriangle, FiZap, FiX } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import UpgradeModal from './UpgradeModal'

export default function UpgradeBanner({ feature }) {
  const [showModal, setShowModal] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { language } = useLanguage()

  const isHebrew = language === 'he'

  if (dismissed) return null

  return (
    <>
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
              <FiAlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800">
                {isHebrew ? 'תקופת הניסיון הסתיימה' : 'Trial Period Ended'}
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                {isHebrew
                  ? 'אתה יכול לצפות בנתונים שלך, אך לא ניתן ליצור או לערוך. שדרג כדי להמשיך לעבוד.'
                  : 'You can view your data, but creating and editing is disabled. Upgrade to continue working.'}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-primary-600 hover:to-primary-700 transition-colors"
              >
                <FiZap className="w-4 h-4" />
                {isHebrew ? 'שדרג עכשיו' : 'Upgrade Now'}
              </button>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-400 hover:text-amber-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      <UpgradeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

import { useState } from 'react'
import { FiX, FiCheck, FiZap } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { createCheckoutSession, PRICING, formatPrice } from '../../services/stripeService'

export default function UpgradeModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('annual')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const { language } = useLanguage()

  const isHebrew = language === 'he'

  const texts = {
    he: {
      title: 'שדרג ל-Pro',
      subtitle: 'קבל גישה מלאה לכל התכונות',
      monthly: 'חודשי',
      annual: 'שנתי',
      perMonth: 'לחודש',
      perYear: 'לשנה',
      save: 'חסוך',
      mostPopular: 'הכי פופולרי',
      features: [
        'ניהול לידים ללא הגבלה',
        'ניהול עסקאות',
        'לוח שנה ותזכורות',
        'ניהול מסמכים',
        'דוחות ואנליטיקס',
        'ניהול חשבוניות',
        'תמיכה מלאה'
      ],
      upgrade: 'שדרג עכשיו',
      cancel: 'ביטול',
      processing: 'מעבד...'
    },
    en: {
      title: 'Upgrade to Pro',
      subtitle: 'Get full access to all features',
      monthly: 'Monthly',
      annual: 'Annual',
      perMonth: '/month',
      perYear: '/year',
      save: 'Save',
      mostPopular: 'Most Popular',
      features: [
        'Unlimited lead management',
        'Deal management',
        'Calendar & reminders',
        'Document management',
        'Reports & analytics',
        'Invoice management',
        'Full support'
      ],
      upgrade: 'Upgrade Now',
      cancel: 'Cancel',
      processing: 'Processing...'
    }
  }

  const t = texts[isHebrew ? 'he' : 'en']

  const handleUpgrade = async () => {
    setLoading(true)
    setError(null)

    try {
      const pricing = selectedPlan === 'annual' ? PRICING.annual : PRICING.monthly

      await createCheckoutSession({
        priceId: pricing.priceId,
        userId: user.id,
        userEmail: user.email,
        billingCycle: selectedPlan
      })
    } catch (err) {
      setError(isHebrew ? 'שגיאה בתהליך השדרוג. נסה שוב.' : 'Error during upgrade. Please try again.')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-900/75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-right align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:my-16">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiZap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
            <p className="text-gray-600 mt-1">{t.subtitle}</p>
          </div>

          {/* Plan Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Monthly Plan */}
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium text-gray-600 mb-1">{t.monthly}</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(PRICING.monthly.price)}
              </div>
              <div className="text-sm text-gray-500">{t.perMonth}</div>
            </button>

            {/* Annual Plan */}
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                selectedPlan === 'annual'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                {t.mostPopular}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">{t.annual}</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(PRICING.annual.price)}
              </div>
              <div className="text-sm text-gray-500">{t.perYear}</div>
              <div className="text-xs text-green-600 font-medium mt-1">
                {t.save} {PRICING.annual.discount}%
              </div>
            </button>
          </div>

          {/* Features List */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <ul className="space-y-2">
              {t.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

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
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.processing : t.upgrade}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

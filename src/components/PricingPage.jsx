import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiGlobe } from 'react-icons/fi'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'

const translations = {
  en: {
    nav: {
      language: "עברית",
      pricing: "Pricing"
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "One plan with everything you need to run your business",
      trial: "14-day trial | No credit card required",
      monthly: "Monthly License",
      annual: "Annual License",
      save: "Save 15%",
      plans: [
        {
          name: "Pricing",
          icon: "star",
          price: 25,
          description: "Full CRM access with all features you need to manage your business",
          features: [
            "Leads management",
            "Contacts management",
            "Tasks management",
            "Deals management",
            "Schedule management",
            "Documents management",
            "Analytics and reports",
            "Payments integration"
          ]
        }
      ]
    }
  },
  he: {
    nav: {
      language: "English",
      pricing: "מחירון"
    },
    pricing: {
      title: "תמחור פשוט ושקוף",
      subtitle: "תוכנית אחת עם כל מה שאתם צריכים להפעלת העסק שלכם",
      trial: "ניסיון של 14 יום | ללא צורך בכרטיס אשראי",
      monthly: "רישיון חודשי",
      annual: "רישיון שנתי",
      save: "חסכו 15%",
      plans: [
        {
          name: "תמחור",
          icon: "star",
          price: 25,
          description: "גישה מלאה ל-CRM עם כל התכונות שאתם צריכים לניהול העסק שלכם",
          features: [
            "ניהול מתעניינים",
            "ניהול אנשי קשר",
            "ניהול משימות",
            "ניהול עסקאות",
            "ניהול יומן",
            "ניהול מסמכים",
            "אנליטיקה ודוחות",
            "אינטגרציה לתשלומים"
          ]
        }
      ]
    }
  }
}

export default function PricingPage() {
  const { language, changeLanguage, isRTL } = useLanguage()
  const [billingCycle, setBillingCycle] = useState('monthly')
  const navigate = useNavigate()

  const t = translations[language]

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white antialiased">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo size="default" variant="dark" />
          </Link>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-primary-600 font-medium text-sm transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back' : 'חזרה'}</span>
            </button>
            
            <button
              onClick={() => changeLanguage(language === 'en' ? 'he' : 'en')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-primary-600 font-medium text-sm transition-colors"
            >
              <FiGlobe className="w-4 h-4" />
              <span>{t.nav.language}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.pricing.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              {t.pricing.subtitle}
            </p>
            <p className="text-sm text-gray-500">
              {t.pricing.trial}
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-full p-1 inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.pricing.monthly}
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 relative ${
                  billingCycle === 'annual'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.pricing.annual}
                {billingCycle === 'annual' && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {t.pricing.save}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="flex justify-center">
            {t.pricing.plans.map((plan, index) => {
              const monthlyPrice = plan.price
              const annualPrice = 255
              const pricePerMonth = billingCycle === 'annual' ? Math.round(annualPrice / 12) : monthlyPrice

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-primary-500 shadow-xl p-8 relative transition-all duration-300 hover:shadow-2xl max-w-md w-full"
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary-100">
                      {plan.icon === 'star' && (
                        <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-gray-900">
                      ₪{pricePerMonth}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {language === 'en' ? 'per user per month' : 'למשתמש לחודש'}
                    </div>
                    {billingCycle === 'annual' && (
                      <>
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          {t.pricing.save}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {language === 'en' ? `₪${annualPrice} per year (paid at once)` : `₪${annualPrice} לשנה (תשלום חד-פעמי)`}
                        </div>
                      </>
                    )}
                    {billingCycle === 'monthly' && (
                      <div className="text-sm text-gray-500 mt-1">
                        {language === 'en' ? `₪${monthlyPrice} per month` : `₪${monthlyPrice} לחודש`}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center mb-6 min-h-[3rem]">
                    {plan.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={`/register?plan_id=${index + 1}&plan=${plan.name.toUpperCase()}`}
                    className="w-full py-3 rounded-lg font-semibold mb-6 transition-all duration-200 block text-center bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl"
                  >
                    {language === 'en' ? 'Start Now' : 'התחילו עכשיו'}
                  </Link>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      {language === 'en' ? 'Full CRM access includes:' : 'גישה מלאה ל-CRM כוללת:'}
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 rtl:space-x-reverse">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="opacity-80">
              <Logo size="default" variant="light" />
            </div>
          </div>
          <p className="text-sm">
            {language === 'en' 
              ? '© 2026 Magnex CRM. All rights reserved.'
              : '© 2026 מגנקס CRM. כל הזכויות שמורות.'}
          </p>
        </div>
      </footer>
    </div>
  )
}


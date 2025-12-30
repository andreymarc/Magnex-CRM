import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiGlobe } from 'react-icons/fi'
import Logo from './Logo'

const translations = {
  en: {
    nav: {
      language: "עברית",
      pricing: "Pricing"
    },
    pricing: {
      title: "Packages and Pricing",
      subtitle: "Find the perfect plan for your organization",
      trial: "14-day trial | No credit card required",
      monthly: "Monthly License",
      annual: "Annual License",
      save: "Save 20%",
      plans: [
        {
          name: "Basic",
          icon: "star",
          price: 79,
          description: "Centralize organizational data and manage basic sales and customer management processes",
          features: [
            "Lead management",
            "Automated intake forms",
            "Campaign data centralization and control",
            "Task and alert management",
            "Event calendar management",
            "Customer management",
            "Cloud document management",
            "Project management",
            "Service call management",
            "Dashboards and reports",
            "Email inbox connection",
            "Reports and charts",
            "Mobile-optimized application"
          ]
        },
        {
          name: "Advanced",
          icon: "diamond",
          price: 249,
          description: "Take your organization a step forward with advanced automations and tools",
          features: [
            "All features from Basic package",
            "Automated workflows",
            "Scheduling automations",
            "Building online forms",
            "Designed price quotes",
            "Virtual PBX",
            "Digital signature",
            "Integrated WhatsApp Web",
            "Mailing system",
            "Adding relationships between modules",
            "Automated lead collection from calls",
            "Automated lead collection from WhatsApp",
            "WhatsApp API connection option"
          ]
        },
        {
          name: "Premium",
          icon: "crown",
          price: 289,
          description: "Build a dream system with full customization for managing all organizational processes",
          features: [
            "All features from all packages",
            "Accounting management interface",
            "Building new models",
            "External calendar synchronization",
            "Custom key metrics",
            "Work timer",
            "Inventory and supplier management",
            "Calculation and formula fields",
            "Sending data via Webhook",
            "Automated document collection",
            "Two-way OneDrive connection",
            "Organizational security settings",
            "Advanced AI capabilities - coming soon"
          ]
        }
      ]
    }
  },
  he: {
    nav: {
      language: "English",
      pricing: "תמחור"
    },
    pricing: {
      title: "חבילות ותמחורים",
      subtitle: "מצאו את התוכנית המושלמת לארגון שלכם",
      trial: "ניסיון של 14 יום | ללא צורך בכרטיס אשראי",
      monthly: "רישיון חודשי",
      annual: "רישיון שנתי",
      save: "חסכו 20%",
      plans: [
        {
          name: "בסיסי",
          icon: "star",
          price: 79,
          description: "ריכוז נתונים ארגוניים וניהול תהליכי מכירות וניהול לקוחות בסיסיים",
          features: [
            "ניהול מתעניינים",
            "טפסי קליטה אוטומטים",
            "ריכוז ובקרת נתוני קמפיינים",
            "ניהול משימות והתראות",
            "ניהול יומן אירועים",
            "ניהול לקוחות",
            "ניהול מסמכים בענן",
            "ניהול פרויקטים",
            "ניהול קריאות שירות",
            "לוחות בקרה ודוחות",
            "חיבור תיבת אימייל",
            "דוחות ותרשימים",
            "אפלקציה מותאמת לנייד"
          ]
        },
        {
          name: "מתקדם",
          icon: "diamond",
          price: 249,
          description: "קחו את הארגון שלכם צעד קדימה עם אוטומציות וכלים מתקדמים",
          features: [
            "כל התכונות מחבילת הבסיסי",
            "תהליכי עבודה אוטומטיים",
            "אוטומציות תזמון",
            "בניית טפסים מקוונים",
            "הצעות מחיר מעוצבות",
            "מרכזיה וירטואלית",
            "חתימה דיגיטלית",
            "WhatsApp Web משולב",
            "מערכת דיוור",
            "הוספת קשרים בין מודולים",
            "איסוף מתעניינים אוטומטי משיחות",
            "איסוף מתעניינים אוטומטי מ-WhatsApp",
            "אפשרות חיבור WhatsApp API"
          ]
        },
        {
          name: "פרימיום",
          icon: "crown",
          price: 289,
          description: "בנו מערכת חלומות עם התאמה אישית מלאה לניהול כל התהליכים הארגוניים",
          features: [
            "כל התכונות מכל החבילות",
            "ממשק ניהול חשבונאות",
            "בניית מודלים חדשים",
            "סנכרון יומן חיצוני",
            "מדדי מפתח מותאמים",
            "טיימר עבודה",
            "ניהול מלאי וספקים",
            "שדות חישוב ונוסחאות",
            "שליחת נתונים דרך Webhook",
            "איסוף מסמכים אוטומטי",
            "חיבור OneDrive דו-כיווני",
            "הגדרות אבטחה ארגוניות",
            "יכולות AI מתקדמות - בקרוב"
          ]
        }
      ]
    }
  }
}

export default function PricingPage() {
  const [language, setLanguage] = useState('en')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const navigate = useNavigate()

  const t = translations[language]
  const isRTL = language === 'he'

  return (
    <div className={`min-h-screen bg-white antialiased ${isRTL ? 'rtl' : 'ltr'}`}>
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
              onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
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

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {t.pricing.plans.map((plan, index) => {
              const monthlyPrice = plan.price
              const annualPrice = Math.round(plan.price * 12 * 0.8)
              const displayPrice = billingCycle === 'annual' ? annualPrice : monthlyPrice
              const pricePerMonth = billingCycle === 'annual' ? Math.round(annualPrice / 12) : monthlyPrice
              const totalFor3Users = pricePerMonth * 3

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border-2 p-8 relative transition-all duration-300 hover:shadow-2xl ${
                    index === 1
                      ? 'border-primary-500 shadow-xl scale-105'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {language === 'en' ? 'Most Popular' : 'הפופולרי ביותר'}
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-primary-100' : 'bg-purple-100'
                    }`}>
                      {plan.icon === 'star' && (
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      {plan.icon === 'diamond' && (
                        <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      )}
                      {plan.icon === 'crown' && (
                        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1s.4-1 1-1h12c.6 0 1 .4 1 1z"/>
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
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        {t.pricing.save}
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mt-2">
                      ₪{totalFor3Users}/{language === 'en' ? 'month' : 'חודש'} | {language === 'en' ? '3 users' : '3 משתמשים'}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center mb-6 min-h-[3rem]">
                    {plan.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={`/register?plan_id=${index + 1}&plan=${plan.name.toUpperCase()}`}
                    className={`w-full py-3 rounded-lg font-semibold mb-6 transition-all duration-200 block text-center ${
                      index === 1
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {language === 'en' ? 'Start Now' : 'התחילו עכשיו'}
                  </Link>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      {language === 'en' ? `${plan.name} License includes:` : `רישיון ${plan.name} כולל:`}
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


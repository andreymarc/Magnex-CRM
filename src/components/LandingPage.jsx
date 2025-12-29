import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiGlobe } from 'react-icons/fi'

const translations = {
  en: {
    hero: {
      headline: "Tailor-Made CRM for Modern Businesses",
      subheadline: "A complete CRM solution with payment integration and automated invoice generation. All the features you need, customized for your business."
    },
    problem: {
      title: "The Challenge with Traditional Business Management",
      items: [
        {
          title: "Disconnected Systems",
          description: "Customer data scattered across spreadsheets, emails, and different tools, making it impossible to get a complete view."
        },
        {
          title: "Manual Invoice Creation",
          description: "Time-consuming invoice generation, payment tracking, and follow-ups that take away from growing your business."
        },
        {
          title: "Payment Processing Complexity",
          description: "Managing payments separately from customer relationships leads to errors, delays, and missed opportunities."
        }
      ]
    },
    solution: {
      title: "Your Complete Business CRM Solution",
      items: [
        {
          title: "Full-Featured CRM",
          description: "All modern CRM capabilities including contact management, sales pipeline, task tracking, and communication history in one place."
        },
        {
          title: "Payment Integration",
          description: "Seamlessly connect with payment processors to accept payments, track transactions, and manage subscriptions directly from your CRM."
        },
        {
          title: "Automated Invoice Generation",
          description: "Generate professional invoices automatically, send them to clients, track payment status, and manage your billing effortlessly."
        }
      ]
    },
    caseStudy: {
      title: "Proven Results",
      subtitle: "See how businesses are transforming their operations",
      stats: [
        { number: "75%", label: "Time Saved" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "2.5x", label: "Revenue Growth" },
        { number: "60%", label: "Cost Reduction" }
      ],
      quote: "This CRM has transformed how we manage our business. The payment integration and automated invoicing alone have saved us countless hours every week.",
      author: "David Levy, Business Owner"
    },
    benefits: {
      title: "Why Choose Our Platform",
      items: [
        "Complete customer relationship management",
        "Seamless payment processing integration",
        "Automated invoice generation and tracking",
        "Real-time sales pipeline visibility",
        "Centralized communication history",
        "Customizable to your business needs",
        "Access from anywhere, anytime",
        "Integrate with your favorite tools"
      ]
    },
    cta: {
      title: "Ready to Transform Your Business Operations?",
      subtitle: "Join hundreds of businesses already using our tailor-made CRM solution",
      button: "Get Started Today",
      secondaryButton: "Schedule a Demo",
      freeTrial: "First Month Free - No Credit Card Required"
    },
    ai: {
      title: "AI-Powered Intelligence",
      subtitle: "Let artificial intelligence transform your CRM into a smart business assistant",
      headline: "AI That Helps You Close More Profitable Deals",
      items: [
        {
          title: "Intelligent Lead Scoring",
          description: "AI automatically ranks leads based on their likelihood to convert, helping you focus on the most promising opportunities."
        },
        {
          title: "Predictive Sales Forecasting",
          description: "Get accurate sales predictions using AI analysis of historical data, trends, and customer behavior patterns."
        },
        {
          title: "Smart Email Automation",
          description: "AI-powered email suggestions, auto-responses, and follow-up reminders that adapt to your communication style."
        },
        {
          title: "Sentiment Analysis",
          description: "Understand customer emotions from emails and conversations to identify at-risk accounts and improve satisfaction."
        },
        {
          title: "AI Assistant Chatbot",
          description: "24/7 AI assistant that answers questions, generates reports, and helps your team find information instantly."
        },
        {
          title: "Automated Data Entry",
          description: "AI automatically extracts and organizes information from emails, calls, and documents, saving hours of manual work."
        },
        {
          title: "Deal Probability Prediction",
          description: "AI calculates the probability of closing each deal, helping you prioritize and allocate resources effectively."
        },
        {
          title: "Smart Workflow Suggestions",
          description: "AI analyzes your processes and suggests optimizations to improve efficiency and reduce bottlenecks."
        }
      ]
    },
    features: {
      title: "Enterprise-Grade Features",
      subtitle: "Everything you need to manage your business relationships",
      items: [
        {
          title: "Contact Management",
          description: "Centralized database of all your contacts, customers, and leads with detailed profiles and interaction history."
        },
        {
          title: "Sales Pipeline",
          description: "Visual sales pipeline to track deals from lead to close with customizable stages and automation."
        },
        {
          title: "Email Integration",
          description: "Connect your email accounts to sync conversations, send emails directly from CRM, and track engagement."
        },
        {
          title: "Task & Activity Management",
          description: "Never miss a follow-up with automated reminders, task assignments, and activity tracking."
        },
        {
          title: "Document Management",
          description: "Store, organize, and share documents, contracts, and files with version control and access permissions."
        },
        {
          title: "Advanced Analytics",
          description: "Real-time dashboards, custom reports, and insights to make data-driven business decisions."
        },
        {
          title: "Workflow Automation",
          description: "Automate repetitive tasks, create custom workflows, and trigger actions based on conditions."
        },
        {
          title: "Mobile App",
          description: "Access your CRM on the go with native mobile apps for iOS and Android."
        },
        {
          title: "Team Collaboration",
          description: "Share information, assign tasks, and collaborate seamlessly with your team in real-time."
        },
        {
          title: "Custom Fields & Forms",
          description: "Customize your CRM with custom fields, forms, and data structures tailored to your business."
        },
        {
          title: "API & Integrations",
          description: "Connect with 1000+ apps including Slack, Google Workspace, Microsoft 365, and more."
        },
        {
          title: "Security & Compliance",
          description: "Enterprise-grade security with data encryption, role-based access, and GDPR compliance."
        }
      ]
    },
    nav: {
      language: "עברית"
    }
  },
  he: {
    hero: {
      headline: "CRM מותאם אישית לעסקים מודרניים",
      subheadline: "פתרון CRM מלא עם אינטגרציה לתשלומים ויצירת חשבוניות אוטומטית. כל התכונות שאתם צריכים, מותאמות לעסק שלכם."
    },
    problem: {
      title: "האתגר בניהול עסק מסורתי",
      items: [
        {
          title: "מערכות מפוצלות",
          description: "נתוני לקוחות מפוזרים על פני גיליונות אלקטרוניים, אימיילים וכלים שונים, מה שמקשה על קבלת תמונה מלאה."
        },
        {
          title: "יצירת חשבוניות ידנית",
          description: "יצירת חשבוניות, מעקב תשלומים ומעקבים שגוזלים זמן ומסיחים את הדעת מהצמיחה העסקית."
        },
        {
          title: "מורכבות עיבוד תשלומים",
          description: "ניהול תשלומים בנפרד מקשרי לקוחות מוביל לשגיאות, עיכובים והזדמנויות מבוזבזות."
        }
      ]
    },
    solution: {
      title: "פתרון ה-CRM המלא לעסק שלכם",
      items: [
        {
          title: "CRM מלא תכונות",
          description: "כל יכולות ה-CRM המודרניות כולל ניהול אנשי קשר, צינור מכירות, מעקב משימות והיסטוריית תקשורת במקום אחד."
        },
        {
          title: "אינטגרציה לתשלומים",
          description: "התחברות חלקה למעבדי תשלומים לקבלת תשלומים, מעקב עסקאות וניהול מנויים ישירות מה-CRM שלכם."
        },
        {
          title: "יצירת חשבוניות אוטומטית",
          description: "יצירת חשבוניות מקצועיות אוטומטית, שליחה ללקוחות, מעקב סטטוס תשלום וניהול חיוב ללא מאמץ."
        }
      ]
    },
    caseStudy: {
      title: "תוצאות מוכחות",
      subtitle: "ראו כיצד עסקים משנים את הפעילות שלהם",
      stats: [
        { number: "75%", label: "חיסכון בזמן" },
        { number: "98%", label: "שביעות רצון לקוחות" },
        { number: "2.5x", label: "גידול בהכנסות" },
        { number: "60%", label: "הפחתת עלויות" }
      ],
      quote: "ה-CRM הזה שינה את האופן שבו אנו מנהלים את העסק שלנו. האינטגרציה לתשלומים ויצירת החשבוניות האוטומטית לבדן חסכו לנו שעות רבות מדי שבוע.",
      author: "דוד לוי, בעל עסק"
    },
    benefits: {
      title: "למה לבחור בפלטפורמה שלנו",
      items: [
        "ניהול קשרי לקוחות מלא",
        "אינטגרציה חלקה לעיבוד תשלומים",
        "יצירת ומעקב חשבוניות אוטומטי",
        "נראות צינור מכירות בזמן אמת",
        "היסטוריית תקשורת מרכזית",
        "התאמה אישית לצרכים העסקיים שלכם",
        "גישה מכל מקום, בכל עת",
        "אינטגרציה עם הכלים האהובים עליכם"
      ]
    },
    cta: {
      title: "מוכנים לשנות את הפעילות העסקית שלכם?",
      subtitle: "הצטרפו למאות עסקים שכבר משתמשים בפתרון ה-CRM המותאם שלנו",
      button: "התחילו עוד היום",
      secondaryButton: "קבעו הדגמה",
      freeTrial: "חודש ראשון חינם - ללא צורך בכרטיס אשראי"
    },
    ai: {
      title: "בינה מלאכותית חכמה",
      subtitle: "תנו לבינה מלאכותית להפוך את ה-CRM שלכם לעוזר עסקי חכם",
      headline: "AI שעוזר לכם לסגור עסקאות רווחיות יותר",
      items: [
        {
          title: "ציון לידים חכם",
          description: "AI מדרג אוטומטית לידים לפי הסבירות להמרה, עוזר לכם להתמקד בהזדמנויות המבטיחות ביותר."
        },
        {
          title: "תחזית מכירות חיזויית",
          description: "קבלו תחזיות מכירות מדויקות באמצעות ניתוח AI של נתונים היסטוריים, מגמות ודפוסי התנהגות לקוחות."
        },
        {
          title: "אוטומציה חכמה לאימייל",
          description: "הצעות אימייל מונעות AI, תגובות אוטומטיות ותזכורות מעקב המתאימות לסגנון התקשורת שלכם."
        },
        {
          title: "ניתוח סנטימנט",
          description: "הבינו רגשות לקוחות מאימיילים ושיחות כדי לזהות חשבונות בסיכון ולשפר שביעות רצון."
        },
        {
          title: "צ'אטבוט עוזר AI",
          description: "עוזר AI 24/7 שעונה על שאלות, מייצר דוחות ועוזר לצוות שלכם למצוא מידע מיידית."
        },
        {
          title: "הזנת נתונים אוטומטית",
          description: "AI מחלץ ומארגן אוטומטית מידע מאימיילים, שיחות ומסמכים, חוסך שעות של עבודה ידנית."
        },
        {
          title: "חיזוי הסתברות עסקה",
          description: "AI מחשב את ההסתברות לסגירת כל עסקה, עוזר לכם לקבוע עדיפויות ולהקצות משאבים ביעילות."
        },
        {
          title: "הצעות תהליכי עבודה חכמים",
          description: "AI מנתח את התהליכים שלכם ומציע אופטימיזציות לשיפור יעילות והפחתת צווארי בקבוק."
        }
      ]
    },
    features: {
      title: "תכונות ברמה ארגונית",
      subtitle: "כל מה שאתם צריכים לניהול קשרי העסק שלכם",
      items: [
        {
          title: "ניהול אנשי קשר",
          description: "מסד נתונים מרכזי של כל אנשי הקשר, הלקוחות והלידים שלכם עם פרופילים מפורטים והיסטוריית אינטראקציות."
        },
        {
          title: "צינור מכירות",
          description: "צינור מכירות ויזואלי למעקב עסקאות מליד לסגירה עם שלבים הניתנים להתאמה ואוטומציה."
        },
        {
          title: "אינטגרציה לאימייל",
          description: "חברו את חשבונות האימייל שלכם לסנכרון שיחות, שליחת אימיילים ישירות מה-CRM ומעקב מעורבות."
        },
        {
          title: "ניהול משימות ופעילויות",
          description: "לעולם לא תפספסו מעקב עם תזכורות אוטומטיות, הקצאת משימות ומעקב פעילויות."
        },
        {
          title: "ניהול מסמכים",
          description: "אחסון, ארגון ושיתוף מסמכים, חוזים וקבצים עם בקרת גרסאות והרשאות גישה."
        },
        {
          title: "אנליטיקה מתקדמת",
          description: "לוחות בקרה בזמן אמת, דוחות מותאמים אישית ותובנות לקבלת החלטות עסקיות מבוססות נתונים."
        },
        {
          title: "אוטומציה של תהליכי עבודה",
          description: "אוטומציה של משימות חוזרות, יצירת תהליכי עבודה מותאמים אישית והפעלת פעולות על בסיס תנאים."
        },
        {
          title: "אפליקציה לנייד",
          description: "גישה ל-CRM שלכם על הדרך עם אפליקציות נייד מקוריות ל-iOS ו-Android."
        },
        {
          title: "שיתוף פעולה בצוות",
          description: "שיתוף מידע, הקצאת משימות ושיתוף פעולה חלק עם הצוות שלכם בזמן אמת."
        },
        {
          title: "שדות וטפסים מותאמים",
          description: "התאמה אישית של ה-CRM שלכם עם שדות מותאמים, טפסים ומבני נתונים המותאמים לעסק שלכם."
        },
        {
          title: "API ואינטגרציות",
          description: "התחברות ל-1000+ אפליקציות כולל Slack, Google Workspace, Microsoft 365 ועוד."
        },
        {
          title: "אבטחה ותאימות",
          description: "אבטחה ברמה ארגונית עם הצפנת נתונים, גישה מבוססת תפקידים ותאימות ל-GDPR."
        }
      ]
    },
    nav: {
      language: "English"
    }
  }
}

export default function LandingPage() {
  const [language, setLanguage] = useState('en')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const languageMenuRef = useRef(null)

  const t = translations[language]
  const isRTL = language === 'he'

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setShowLanguageMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className={`bg-purple-dark rounded-full shadow-xl transition-all duration-300 ${
            isScrolled ? 'px-4 py-2' : 'px-6 py-4'
          }`}>
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className={`bg-white rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isScrolled ? 'w-6 h-6' : 'w-8 h-8'
                }`}>
                  <svg className={`text-purple-dark transition-all duration-300 ${
                    isScrolled ? 'w-4 h-4' : 'w-5 h-5'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-white font-bold transition-all duration-300 ${
                  isScrolled ? 'text-base' : 'text-xl'
                }`}>
                  {language === 'en' ? 'Magnex CRM' : 'מגנקס CRM'}
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                <button className={`text-white/90 hover:text-white font-medium transition-colors flex items-center space-x-1 rtl:space-x-reverse ${
                  isScrolled ? 'text-xs' : 'text-sm'
                }`}>
                  <span>Solutions</span>
                  <svg className={`transition-all duration-300 ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className={`text-white/90 hover:text-white font-medium transition-colors ${
                  isScrolled ? 'text-xs' : 'text-sm'
                }`}>
                  Company
                </button>
                <button className={`text-white/90 hover:text-white font-medium transition-colors flex items-center space-x-1 rtl:space-x-reverse ${
                  isScrolled ? 'text-xs' : 'text-sm'
                }`}>
                  <span>Resources</span>
                  <svg className={`transition-all duration-300 ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className={`text-white/90 hover:text-white font-medium transition-colors ${
                  isScrolled ? 'text-xs' : 'text-sm'
                }`}>
                  Careers
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Link
                  to="/dashboard"
                  className={`text-white/90 hover:text-white font-medium transition-colors hidden sm:block ${
                    isScrolled ? 'text-xs' : 'text-sm'
                  }`}
                >
                  {language === 'en' ? 'Dashboard' : 'לוח בקרה'}
                </Link>
                
                {/* Language Selector */}
                <div className="relative" ref={languageMenuRef}>
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className={`text-white/90 hover:text-white transition-colors flex items-center space-x-1 rtl:space-x-reverse ${
                      isScrolled ? 'p-1.5' : 'p-2'
                    }`}
                    title="Select Language"
                  >
                    <FiGlobe className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  </button>
                  
                  {showLanguageMenu && (
                    <div className="absolute right-0 rtl:left-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                      <button
                        onClick={() => {
                          setLanguage('en')
                          setShowLanguageMenu(false)
                        }}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          language === 'en' ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span>English</span>
                        {language === 'en' && (
                          <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('he')
                          setShowLanguageMenu(false)
                        }}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          language === 'he' ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span>עברית</span>
                        {language === 'he' && (
                          <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <button className={`bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 ${
                  isScrolled ? 'px-4 py-1.5 text-xs' : 'px-6 py-2.5 text-sm'
                }`}>
                  {language === 'en' ? 'Book a Demo' : 'קבעו הדגמה'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Free Trial Banner */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm sm:text-base font-semibold">
            🎉 {t.cta.freeTrial} 🎉
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✨ {t.cta.freeTrial}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gradient-start via-primary-500 to-gradient-end bg-clip-text text-transparent">
                {t.hero.headline}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-0.5">
                {t.cta.button}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl">
                {t.cta.secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.caseStudy.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.problem.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.problem.items.map((item, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-bl-full opacity-50"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-dark via-purple-darker to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t.ai.headline}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t.ai.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.ai.items.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-gradient-start to-gradient-end rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.solution.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.solution.items.map((item, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 rounded-t-2xl"></div>
                <div className="mt-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t.caseStudy.title}
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              {t.caseStudy.subtitle}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 sm:p-12 mb-12 border border-white/20 shadow-2xl">
            <div className="flex items-start mb-6">
              <svg className="w-8 h-8 text-primary-200 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="text-xl sm:text-2xl italic text-white leading-relaxed flex-1">
                "{t.caseStudy.quote}"
              </p>
            </div>
            <p className="text-primary-100 font-semibold text-lg">
              — {t.caseStudy.author}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.benefits.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.items.map((benefit, index) => (
              <div key={index} className="group flex items-start space-x-4 rtl:space-x-reverse p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mt-1 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 flex-1 font-medium leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-700/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-green-500 text-white px-6 py-2 rounded-full text-lg font-bold mb-4 shadow-lg">
              🎁 {t.cta.freeTrial}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative bg-white text-gray-900 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1">
              {t.cta.button}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
            <button className="bg-transparent text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 border-2 border-white/30 hover:border-white/50 backdrop-blur-sm">
              {t.cta.secondaryButton}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent mb-4">
            {language === 'en' ? 'Magnex CRM' : 'מגנקס CRM'}
          </div>
          <p className="text-sm">
            {language === 'en' 
              ? '© 2024 Magnex CRM. All rights reserved.'
              : '© 2024 מגנקס CRM. כל הזכויות שמורות.'}
          </p>
        </div>
      </footer>
    </div>
  )
}

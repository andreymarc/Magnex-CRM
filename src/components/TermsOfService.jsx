import { Link } from 'react-router-dom'
import { FiArrowLeft, FiFileText, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'

const translations = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last Updated: January 2024",
    sections: {
      agreement: {
        title: "Agreement to Terms",
        content: "By accessing or using Magnex CRM ('Service'), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service."
      },
      description: {
        title: "Description of Service",
        content: "Magnex CRM is a cloud-based customer relationship management software that helps businesses manage contacts, leads, deals, invoices, and other business data."
      },
      account: {
        title: "User Accounts",
        content: "To use our Service, you must:",
        items: [
          "Provide accurate and complete information when creating an account",
          "Maintain the security of your account credentials",
          "Notify us immediately of any unauthorized use",
          "Be responsible for all activities under your account"
        ]
      },
      subscription: {
        title: "Subscription and Billing",
        content: "Our Service offers a free trial period. After the trial, subscription fees apply. You agree to:",
        items: [
          "Pay all fees associated with your subscription",
          "Automatic renewal unless cancelled",
          "Price changes with 30 days notice",
          "No refunds for partial periods"
        ]
      },
      acceptableUse: {
        title: "Acceptable Use",
        content: "You agree not to:",
        items: [
          "Use the Service for any illegal purpose",
          "Violate any laws or regulations",
          "Infringe on intellectual property rights",
          "Transmit harmful code or malware",
          "Interfere with the Service's operation",
          "Access other users' accounts without authorization"
        ]
      },
      data: {
        title: "Your Data",
        content: "You retain ownership of all data you upload to the Service. We will not access, use, or disclose your data except:",
        items: [
          "As necessary to provide the Service",
          "As required by law",
          "With your explicit consent",
          "To protect our rights and prevent fraud"
        ]
      },
      termination: {
        title: "Termination",
        content: "We may terminate or suspend your account immediately if you violate these Terms. You may cancel your account at any time. Upon termination, your access to the Service will cease."
      },
      disclaimer: {
        title: "Disclaimer of Warranties",
        content: "The Service is provided 'as is' without warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free."
      },
      limitation: {
        title: "Limitation of Liability",
        content: "To the maximum extent permitted by law, Magnex CRM shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service."
      },
      changes: {
        title: "Changes to Terms",
        content: "We reserve the right to modify these Terms at any time. We will notify users of material changes. Continued use of the Service after changes constitutes acceptance."
      },
      contact: {
        title: "Contact Information",
        content: "For questions about these Terms, contact us at:",
        email: "legal@magnex-crm.com"
      }
    },
    back: "Back to Home"
  },
  he: {
    title: "תנאי שירות",
    lastUpdated: "עודכן לאחרונה: ינואר 2024",
    sections: {
      agreement: {
        title: "הסכמה לתנאים",
        content: "על ידי גישה או שימוש ב-Magnex CRM ('השירות'), אתה מסכים להיות כפוף לתנאי השירות האלה. אם אתה לא מסכים עם חלק כלשהו מהתנאים האלה, אתה לא רשאי לגשת לשירות."
      },
      description: {
        title: "תיאור השירות",
        content: "Magnex CRM היא תוכנת ניהול קשרי לקוחות מבוססת ענן שעוזרת לעסקים לנהל אנשי קשר, לידים, עסקאות, חשבוניות ונתוני עסקים אחרים."
      },
      account: {
        title: "חשבונות משתמשים",
        content: "כדי להשתמש בשירות שלנו, אתה חייב:",
        items: [
          "לספק מידע מדויק ומלא בעת יצירת חשבון",
          "לתחזק את האבטחה של פרטי הכניסה שלך",
          "להודיע לנו מיד על כל שימוש לא מורשה",
          "להיות אחראי על כל הפעילויות תחת החשבון שלך"
        ]
      },
      subscription: {
        title: "מנוי וחיוב",
        content: "השירות שלנו מציע תקופת ניסיון חינם. לאחר הניסיון, חלים דמי מנוי. אתה מסכים ל:",
        items: [
          "לשלם את כל העמלות הקשורות למנוי שלך",
          "חידוש אוטומטי אלא אם כן בוטל",
          "שינויי מחירים עם הודעה של 30 יום",
          "אין החזרים לתקופות חלקיות"
        ]
      },
      acceptableUse: {
        title: "שימוש מקובל",
        content: "אתה מסכים לא:",
        items: [
          "להשתמש בשירות למטרה בלתי חוקית",
          "להפר חוקים או תקנות",
          "להפר זכויות קניין רוחני",
          "לשדר קוד מזיק או תוכנות זדוניות",
          "להפריע לפעולת השירות",
          "לגשת לחשבונות של משתמשים אחרים ללא הרשאה"
        ]
      },
      data: {
        title: "הנתונים שלך",
        content: "אתה שומר על בעלות על כל הנתונים שאתה מעלה לשירות. אנחנו לא נגש, נשתמש או נחשוף את הנתונים שלך למעט:",
        items: [
          "כפי שנדרש כדי לספק את השירות",
          "כפי שנדרש על פי החוק",
          "עם הסכמתך המפורשת",
          "כדי להגן על הזכויות שלנו ולמנוע הונאה"
        ]
      },
      termination: {
        title: "הפסקה",
        content: "אנחנו עשויים להפסיק או להשעות את החשבון שלך מיד אם אתה מפר את התנאים האלה. אתה יכול לבטל את החשבון שלך בכל עת. עם ההפסקה, הגישה שלך לשירות תיפסק."
      },
      disclaimer: {
        title: "הצהרת אחריות",
        content: "השירות מסופק 'כפי שהוא' ללא אחריות מכל סוג. אנחנו לא מבטיחים שהשירות יהיה ללא הפרעות, מאובטח או ללא שגיאות."
      },
      limitation: {
        title: "הגבלת אחריות",
        content: "במידה המקסימלית המותרת על פי החוק, Magnex CRM לא תהיה אחראית לכל נזקים עקיפים, מקריים, מיוחדים או תוצאתיים הנובעים משימוש שלך בשירות."
      },
      changes: {
        title: "שינויים בתנאים",
        content: "אנחנו שומרים לעצמנו את הזכות לשנות את התנאים האלה בכל עת. אנחנו נודיע למשתמשים על שינויים מהותיים. המשך השימוש בשירות לאחר שינויים מהווה קבלה."
      },
      contact: {
        title: "פרטי יצירת קשר",
        content: "לשאלות על התנאים האלה, צור קשר איתנו ב:",
        email: "legal@magnex-crm.com"
      }
    },
    back: "חזרה לדף הבית"
  }
}

export default function TermsOfService() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <nav className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse hover:opacity-80 transition-opacity">
            <FiArrowLeft className="w-5 h-5 text-white" />
            <Logo size="small" />
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <FiFileText className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">{t.title}</h1>
              <p className="text-gray-400 text-sm mt-1">{t.lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Agreement */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 text-purple-500" />
                {t.sections.agreement.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.agreement.content}</p>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.description.title}</h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.description.content}</p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.account.title}</h2>
              <p className="text-gray-300 mb-3">{t.sections.account.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                {t.sections.account.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Subscription */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.subscription.title}</h2>
              <p className="text-gray-300 mb-3">{t.sections.subscription.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                {t.sections.subscription.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FiXCircle className="w-5 h-5 text-red-500" />
                {t.sections.acceptableUse.title}
              </h2>
              <p className="text-gray-300 mb-3">{t.sections.acceptableUse.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                {t.sections.acceptableUse.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Your Data */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.data.title}</h2>
              <p className="text-gray-300 mb-3">{t.sections.data.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                {t.sections.data.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FiAlertCircle className="w-5 h-5 text-yellow-500" />
                {t.sections.termination.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.termination.content}</p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.disclaimer.title}</h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.disclaimer.content}</p>
            </section>

            {/* Limitation */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.limitation.title}</h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.limitation.content}</p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.changes.title}</h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.changes.content}</p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.contact.title}</h2>
              <p className="text-gray-300 mb-2">{t.sections.contact.content}</p>
              <a href={`mailto:${t.sections.contact.email}`} className="text-purple-400 hover:text-purple-300">
                {t.sections.contact.email}
              </a>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              {t.back}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


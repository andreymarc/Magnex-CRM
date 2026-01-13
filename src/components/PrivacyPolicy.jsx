import { Link } from 'react-router-dom'
import { FiArrowLeft, FiShield, FiLock, FiEye, FiDatabase, FiMail } from 'react-icons/fi'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'

const translations = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 2024",
    sections: {
      introduction: {
        title: "Introduction",
        content: "Magnex CRM ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our CRM software and services."
      },
      information: {
        title: "Information We Collect",
        content: "We collect information that you provide directly to us, including:",
        items: [
          "Account information (name, email address, phone number)",
          "Company information (company name, subdomain)",
          "Business data (contacts, leads, deals, invoices, documents)",
          "Payment information (processed securely through Stripe)",
          "Usage data and analytics"
        ]
      },
      use: {
        title: "How We Use Your Information",
        content: "We use the information we collect to:",
        items: [
          "Provide, maintain, and improve our services",
          "Process transactions and send related information",
          "Send technical notices and support messages",
          "Respond to your comments and questions",
          "Monitor and analyze usage patterns"
        ]
      },
      sharing: {
        title: "Information Sharing",
        content: "We do not sell, trade, or rent your personal information. We may share your information only:",
        items: [
          "With your consent",
          "To comply with legal obligations",
          "To protect our rights and safety",
          "With service providers who assist in our operations (e.g., Stripe for payments, Supabase for data storage)"
        ]
      },
      security: {
        title: "Data Security",
        content: "We implement appropriate technical and organizational measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure."
      },
      retention: {
        title: "Data Retention",
        content: "We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time."
      },
      rights: {
        title: "Your Rights",
        content: "You have the right to:",
        items: [
          "Access your personal information",
          "Correct inaccurate data",
          "Request deletion of your data",
          "Object to processing of your data",
          "Data portability"
        ]
      },
      cookies: {
        title: "Cookies",
        content: "We use essential cookies for authentication and session management. We do not use tracking cookies for advertising purposes."
      },
      changes: {
        title: "Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date."
      },
      contact: {
        title: "Contact Us",
        content: "If you have questions about this Privacy Policy, please contact us at:",
        email: "privacy@magnex-crm.com"
      }
    },
    back: "Back to Home"
  },
  he: {
    title: "מדיניות פרטיות",
    lastUpdated: "עודכן לאחרונה: ינואר 2024",
    sections: {
      introduction: {
        title: "הקדמה",
        content: "Magnex CRM ('אנחנו', 'שלנו', או 'אנחנו') מחויבים להגן על הפרטיות שלך. מדיניות הפרטיות הזו מסבירה איך אנחנו אוספים, משתמשים, חושפים ומגנים על המידע שלך כשאתה משתמש בתוכנת ה-CRM והשירותים שלנו."
      },
      information: {
        title: "מידע שאנחנו אוספים",
        content: "אנחנו אוספים מידע שאתה מספק לנו ישירות, כולל:",
        items: [
          "מידע על החשבון (שם, כתובת אימייל, מספר טלפון)",
          "מידע על החברה (שם החברה, תת-דומיין)",
          "נתוני עסקים (אנשי קשר, לידים, עסקאות, חשבוניות, מסמכים)",
          "מידע תשלום (מעובד בצורה מאובטחת דרך Stripe)",
          "נתוני שימוש ואנליטיקה"
        ]
      },
      use: {
        title: "איך אנחנו משתמשים במידע שלך",
        content: "אנחנו משתמשים במידע שאנחנו אוספים כדי:",
        items: [
          "לספק, לתחזק ולשפר את השירותים שלנו",
          "לעבד עסקאות ולשלוח מידע קשור",
          "לשלוח הודעות טכניות ותמיכה",
          "להגיב על התגובות והשאלות שלך",
          "לנטר ולנתח דפוסי שימוש"
        ]
      },
      sharing: {
        title: "שיתוף מידע",
        content: "אנחנו לא מוכרים, סוחרים או משכירים את המידע האישי שלך. אנחנו עשויים לשתף את המידע שלך רק:",
        items: [
          "עם הסכמתך",
          "כדי לעמוד בהתחייבויות משפטיות",
          "כדי להגן על הזכויות והבטיחות שלנו",
          "עם ספקי שירותים שמסייעים בפעולות שלנו (למשל, Stripe לתשלומים, Supabase לאחסון נתונים)"
        ]
      },
      security: {
        title: "אבטחת נתונים",
        content: "אנחנו מיישמים אמצעים טכניים וארגוניים מתאימים כדי להגן על המידע האישי שלך, כולל הצפנה, שרתים מאובטחים ובקרות גישה. עם זאת, אין שיטת העברה דרך האינטרנט שהיא מאובטחת ב-100%."
      },
      retention: {
        title: "שמירת נתונים",
        content: "אנחנו שומרים את המידע שלך כל עוד החשבון שלך פעיל או כפי שנדרש כדי לספק שירותים. אתה יכול לבקש מחיקה של הנתונים שלך בכל עת."
      },
      rights: {
        title: "הזכויות שלך",
        content: "יש לך את הזכות ל:",
        items: [
          "לגשת למידע האישי שלך",
          "לתקן נתונים לא מדויקים",
          "לבקש מחיקה של הנתונים שלך",
          "להתנגד לעיבוד הנתונים שלך",
          "ניידות נתונים"
        ]
      },
      cookies: {
        title: "עוגיות",
        content: "אנחנו משתמשים בעוגיות חיוניות לאימות וניהול סשן. אנחנו לא משתמשים בעוגיות מעקב למטרות פרסום."
      },
      changes: {
        title: "שינויים במדיניות זו",
        content: "אנחנו עשויים לעדכן את מדיניות הפרטיות הזו מעת לעת. אנחנו נודיע לך על כל שינוי על ידי פרסום המדיניות החדשה בדף הזה ועדכון התאריך 'עודכן לאחרונה'."
      },
      contact: {
        title: "צור קשר",
        content: "אם יש לך שאלות על מדיניות הפרטיות הזו, אנא צור קשר איתנו ב:",
        email: "privacy@magnex-crm.com"
      }
    },
    back: "חזרה לדף הבית"
  }
}

export default function PrivacyPolicy() {
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
            <FiShield className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">{t.title}</h1>
              <p className="text-gray-400 text-sm mt-1">{t.lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FiLock className="w-5 h-5 text-purple-500" />
                {t.sections.introduction.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.introduction.content}</p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FiDatabase className="w-5 h-5 text-purple-500" />
                {t.sections.information.title}
              </h2>
              <p className="text-gray-300 mb-3">{t.sections.information.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                {t.sections.information.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* How We Use */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FiEye className="w-5 h-5 text-purple-500" />
                {t.sections.use.title}
              </h2>
              <p className="text-gray-300 mb-3">{t.sections.use.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                {t.sections.use.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.sharing.title}</h2>
              <p className="text-gray-300 mb-3">{t.sections.sharing.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                {t.sections.sharing.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.security.title}</h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.security.content}</p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.retention.title}</h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.retention.content}</p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.rights.title}</h2>
              <p className="text-gray-300 mb-3">{t.sections.rights.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                {t.sections.rights.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.cookies.title}</h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.cookies.content}</p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">{t.sections.changes.title}</h2>
              <p className="text-gray-300 leading-relaxed">{t.sections.changes.content}</p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FiMail className="w-5 h-5 text-purple-500" />
                {t.sections.contact.title}
              </h2>
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


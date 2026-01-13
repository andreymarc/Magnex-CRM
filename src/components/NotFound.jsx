import { Link } from 'react-router-dom'
import { FiHome, FiSearch, FiArrowLeft } from 'react-icons/fi'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'

const translations = {
  en: {
    title: "404 - Page Not Found",
    subtitle: "Oops! The page you're looking for doesn't exist.",
    description: "The page you're trying to access may have been moved, deleted, or never existed.",
    suggestions: "Here's what you can do:",
    actions: [
      "Go back to the home page",
      "Check the URL for typos",
      "Use the navigation menu to find what you need"
    ],
    homeButton: "Go to Home Page",
    backButton: "Go Back"
  },
  he: {
    title: "404 - דף לא נמצא",
    subtitle: "אופס! הדף שאתה מחפש לא קיים.",
    description: "הדף שאתה מנסה לגשת אליו אולי הועבר, נמחק, או מעולם לא existed.",
    suggestions: "הנה מה שאתה יכול לעשות:",
    actions: [
      "חזור לדף הבית",
      "בדוק את ה-URL לשגיאות הקלדה",
      "השתמש בתפריט הניווט כדי למצוא מה שאתה צריך"
    ],
    homeButton: "עבור לדף הבית",
    backButton: "חזור"
  }
}

export default function NotFound() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo size="large" />
        </div>

        {/* 404 Content */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 sm:p-12 border border-gray-700/50 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t.title}
            </h2>
            <p className="text-gray-300 text-lg mb-2">
              {t.subtitle}
            </p>
            <p className="text-gray-400">
              {t.description}
            </p>
          </div>

          {/* Suggestions */}
          <div className="mb-8 text-left rtl:text-right">
            <p className="text-white font-semibold mb-3 flex items-center gap-2 justify-center sm:justify-start rtl:justify-end">
              <FiSearch className="w-5 h-5 text-purple-400" />
              {t.suggestions}
            </p>
            <ul className="space-y-2 text-gray-300">
              {t.actions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
            >
              <FiHome className="w-5 h-5" />
              {t.homeButton}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              {t.backButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


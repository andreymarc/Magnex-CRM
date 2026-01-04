import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import { FiMail, FiLock, FiArrowLeft, FiCheck } from 'react-icons/fi'

const translations = {
  title: 'התחברות',
  subtitle: 'ברוכים הבאים בחזרה',
  email: 'אימייל',
  password: 'סיסמה',
  loginButton: 'התחבר',
  magicLinkButton: 'התחברות עם קישור קסם',
  magicLinkSent: 'קישור התחברות נשלח לאימייל שלך',
  noAccount: 'אין לך חשבון?',
  register: 'הרשמה',
  backToHome: 'חזרה לדף הבית',
  forgotPassword: 'שכחת סיסמה?',
  or: 'או',
  errors: {
    invalidCredentials: 'אימייל או סיסמה שגויים',
    emailRequired: 'נא להזין אימייל',
    passwordRequired: 'נא להזין סיסמה',
    generic: 'אירעה שגיאה, נסה שוב'
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [mode, setMode] = useState('password') // 'password' or 'magic'

  const { signIn, signInWithMagicLink } = useAuth()
  const navigate = useNavigate()

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError(translations.errors.emailRequired)
      return
    }
    if (!password) {
      setError(translations.errors.passwordRequired)
      return
    }

    setLoading(true)
    try {
      await signIn({ email, password })
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      if (err.message.includes('Invalid login credentials')) {
        setError(translations.errors.invalidCredentials)
      } else {
        setError(translations.errors.generic)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError(translations.errors.emailRequired)
      return
    }

    setLoading(true)
    try {
      await signInWithMagicLink(email)
      setMagicLinkSent(true)
    } catch (err) {
      console.error('Magic link error:', err)
      setError(translations.errors.generic)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to home link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <FiArrowLeft className="rotate-180" />
          <span>{translations.backToHome}</span>
        </Link>

        {/* Login card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {translations.title}
          </h1>
          <p className="text-gray-400 text-center mb-8">
            {translations.subtitle}
          </p>

          {/* Magic link success message */}
          {magicLinkSent ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
              <FiCheck className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-green-300">{translations.magicLinkSent}</p>
            </div>
          ) : (
            <>
              {/* Error message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-red-300 text-center text-sm">
                  {error}
                </div>
              )}

              {/* Mode toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('password')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    mode === 'password'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700/50 text-gray-400 hover:text-white'
                  }`}
                >
                  סיסמה
                </button>
                <button
                  type="button"
                  onClick={() => setMode('magic')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    mode === 'magic'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700/50 text-gray-400 hover:text-white'
                  }`}
                >
                  קישור קסם
                </button>
              </div>

              <form onSubmit={mode === 'password' ? handlePasswordLogin : handleMagicLink}>
                {/* Email field */}
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm mb-2">
                    {translations.email}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="email@example.com"
                      dir="ltr"
                    />
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Password field - only show for password mode */}
                {mode === 'password' && (
                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm mb-2">
                      {translations.password}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="••••••••"
                        dir="ltr"
                      />
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>טוען...</span>
                    </span>
                  ) : mode === 'password' ? (
                    translations.loginButton
                  ) : (
                    translations.magicLinkButton
                  )}
                </button>
              </form>
            </>
          )}

          {/* Register link */}
          <p className="mt-6 text-center text-gray-400">
            {translations.noAccount}{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
              {translations.register}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

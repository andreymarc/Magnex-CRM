import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const LanguageContext = createContext({})

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }) {
  const { profile, updateProfile } = useAuth()
  const [language, setLanguage] = useState('en')
  const [isDetecting, setIsDetecting] = useState(true)

  // Detect country from IP address
  const detectCountryFromIP = async () => {
    try {
      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      // Try ipapi.co first
      try {
        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal
        })
        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          const countryCode = data.country_code || data.country
          return countryCode === 'IL'
        }
      } catch (error) {
        clearTimeout(timeoutId)
        // Fall through to fallback service
      }

      // Fallback to ip-api.com
      const fallbackController = new AbortController()
      const fallbackTimeoutId = setTimeout(() => fallbackController.abort(), 5000)

      try {
        const response = await fetch('https://ip-api.com/json/?fields=countryCode', {
          signal: fallbackController.signal
        })
        clearTimeout(fallbackTimeoutId)

        if (response.ok) {
          const data = await response.json()
          return data.countryCode === 'IL'
        }
      } catch (error) {
        clearTimeout(fallbackTimeoutId)
      }

      return null
    } catch (error) {
      return null
    }
  }

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      setIsDetecting(true)

      // First, check if user has a saved language preference
      if (profile?.language) {
        setLanguage(profile.language)
        setIsDetecting(false)
        return
      }

      // Check localStorage for previously selected language
      const savedLanguage = localStorage.getItem('preferredLanguage')
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'he')) {
        setLanguage(savedLanguage)
        setIsDetecting(false)
        return
      }

      // If no saved preference, detect from IP
      const isIsraeli = await detectCountryFromIP()
      if (isIsraeli) {
        setLanguage('he')
        localStorage.setItem('preferredLanguage', 'he')
      } else {
        setLanguage('en')
        localStorage.setItem('preferredLanguage', 'en')
      }

      setIsDetecting(false)
    }

    initializeLanguage()
  }, [profile?.language])

  // Update language and save to profile if user is logged in
  const changeLanguage = async (newLanguage) => {
    if (newLanguage !== 'en' && newLanguage !== 'he') {
      return
    }

    setLanguage(newLanguage)
    localStorage.setItem('preferredLanguage', newLanguage)

    // Save to user profile if logged in
    if (profile && updateProfile) {
      try {
        await updateProfile({ language: newLanguage })
      } catch (error) {
        // Error updating language in profile
      }
    }
  }

  const value = {
    language,
    changeLanguage,
    isDetecting,
    isRTL: language === 'he'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}


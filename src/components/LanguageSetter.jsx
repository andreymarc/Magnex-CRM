import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

/**
 * Component that sets the HTML lang attribute based on current language
 * This helps with SEO and accessibility
 */
export default function LanguageSetter() {
  const { language } = useLanguage()

  useEffect(() => {
    // Update the HTML lang attribute
    document.documentElement.lang = language === 'he' ? 'he' : 'en'
    
    // Also update the dir attribute for RTL support
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  }, [language])

  return null // This component doesn't render anything
}


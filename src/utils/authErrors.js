/**
 * Parses Supabase Auth errors and returns user-friendly error messages
 * @param {Error} error - The error object from Supabase Auth
 * @param {string} language - Language code ('en' or 'he')
 * @returns {string} User-friendly error message
 */
export function getAuthErrorMessage(error, language = 'en') {
  if (!error) {
    return language === 'he' ? 'אירעה שגיאה, נסה שוב' : 'An error occurred, please try again'
  }

  const errorMessage = error.message || error.toString()
  const lowerMessage = errorMessage.toLowerCase()

  // Error message mappings
  const errorMap = {
    en: {
      // Email errors
      'email not confirmed': 'Please confirm your email address before logging in',
      'email address': {
        'is invalid': 'Please enter a valid email address',
        'already registered': 'This email is already registered',
        'already exists': 'This email is already registered',
      },
      // Credential errors
      'invalid login credentials': 'Invalid email or password',
      'invalid credentials': 'Invalid email or password',
      // Password errors
      'password': {
        'too weak': 'Password is too weak. Please use a stronger password',
        'should be at least': 'Password is too short',
      },
      // Registration errors
      'user already registered': 'This email is already registered',
      'already registered': 'This email is already registered',
      // Network errors
      'network': 'Network error. Please check your connection',
      'fetch': 'Network error. Please check your connection',
      // Subdomain errors
      'subdomain': {
        'already taken': 'This subdomain is already taken',
        'already exists': 'This subdomain is already taken',
        'unique constraint': 'This subdomain is already taken',
      },
    },
    he: {
      // Email errors
      'email not confirmed': 'אנא אמת את כתובת האימייל שלך לפני ההתחברות',
      'email address': {
        'is invalid': 'נא להזין כתובת אימייל תקינה',
        'already registered': 'אימייל זה כבר רשום במערכת',
        'already exists': 'אימייל זה כבר רשום במערכת',
      },
      // Credential errors
      'invalid login credentials': 'אימייל או סיסמה שגויים',
      'invalid credentials': 'אימייל או סיסמה שגויים',
      // Password errors
      'password': {
        'too weak': 'הסיסמה חלשה מדי. אנא השתמש בסיסמה חזקה יותר',
        'should be at least': 'הסיסמה קצרה מדי',
      },
      // Registration errors
      'user already registered': 'אימייל זה כבר רשום במערכת',
      'already registered': 'אימייל זה כבר רשום במערכת',
      // Network errors
      'network': 'שגיאת רשת. אנא בדוק את החיבור שלך',
      'fetch': 'שגיאת רשת. אנא בדוק את החיבור שלך',
      // Subdomain errors
      'subdomain': {
        'already taken': 'תת-דומיין זה כבר תפוס',
        'already exists': 'תת-דומיין זה כבר תפוס',
        'unique constraint': 'תת-דומיין זה כבר תפוס',
      },
    },
  }

  const messages = errorMap[language] || errorMap.en
  const genericMessage = language === 'he' ? 'אירעה שגיאה, נסה שוב' : 'An error occurred, please try again'

  // Check for email address errors with specific patterns
  if (lowerMessage.includes('email address')) {
    if (lowerMessage.includes('is invalid')) {
      return messages['email address']['is invalid']
    }
    if (lowerMessage.includes('already registered') || lowerMessage.includes('already exists')) {
      return messages['email address']['already registered']
    }
  }

  // Check for email not confirmed
  if (lowerMessage.includes('email not confirmed')) {
    return messages['email not confirmed']
  }

  // Check for credential errors
  if (lowerMessage.includes('invalid login credentials') || lowerMessage.includes('invalid credentials')) {
    return messages['invalid login credentials']
  }

  // Check for password errors
  if (lowerMessage.includes('password')) {
    if (lowerMessage.includes('too weak')) {
      return messages.password['too weak']
    }
    if (lowerMessage.includes('should be at least') || lowerMessage.includes('too short')) {
      return messages.password['should be at least']
    }
  }

  // Check for registration errors
  if (lowerMessage.includes('user already registered') || lowerMessage.includes('already registered')) {
    return messages['user already registered']
  }

  // Check for subdomain errors
  if (lowerMessage.includes('subdomain')) {
    if (
      lowerMessage.includes('already taken') ||
      lowerMessage.includes('already exists') ||
      lowerMessage.includes('unique constraint') ||
      lowerMessage.includes('duplicate key')
    ) {
      return messages.subdomain['already taken']
    }
  }

  // Check for network errors
  if (lowerMessage.includes('network') || lowerMessage.includes('fetch') || lowerMessage.includes('timeout')) {
    return messages.network
  }

  // Return generic error if no match found
  return genericMessage
}

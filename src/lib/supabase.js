import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Supabase not configured - app will use mock data fallback
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Test connection function
export const testSupabaseConnection = async () => {
  if (!supabase) {
    return { success: false, error: 'Supabase client not initialized' }
  }
  
  try {
    // Try to fetch from a table (this will fail if credentials are wrong)
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    if (error) {
      // Check if it's an auth error (wrong credentials) or just no table
      if (error.message.includes('JWT') || error.message.includes('Invalid API key')) {
        return { success: false, error: 'Invalid credentials - check your API keys' }
      }
      // Other errors might just mean the table doesn't exist yet
      return { success: true, message: 'Connection works, but table might not exist', error: error.message }
    }
    
    return { success: true, message: 'Connection successful!' }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (error) {
    return {
      error: true,
      message: error.message || 'An error occurred',
      details: error
    }
  }
  return { error: false }
}
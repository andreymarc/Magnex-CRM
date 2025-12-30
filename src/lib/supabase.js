// Supabase client initialization
// If @supabase/supabase-js is not installed, this will show a helpful error

let supabaseClient = null

// Check if we're in a browser environment and can use dynamic imports
if (typeof window !== 'undefined') {
  // Use dynamic import in browser
  import('@supabase/supabase-js')
    .then(({ createClient }) => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase URL and Anon Key are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')
      } else {
        supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
      }
    })
    .catch((error) => {
      console.warn('@supabase/supabase-js is not installed. Please run: npm install @supabase/supabase-js')
      console.warn('The app will continue to work, but database features will be unavailable.')
    })
} else {
  // For SSR or build time, try regular import
  try {
    const { createClient } = require('@supabase/supabase-js')
    const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''

    if (supabaseUrl && supabaseAnonKey) {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    }
  } catch (error) {
    // Package not installed - that's okay, we'll handle it gracefully
  }
}

// Export a getter function that returns the client
export const getSupabase = () => {
  if (!supabaseClient) {
    console.warn('Supabase client is not initialized. Please install @supabase/supabase-js and configure your environment variables.')
  }
  return supabaseClient
}

// For backward compatibility, export supabase directly
// This will be null until the dynamic import completes
export const supabase = supabaseClient

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (error) {
    console.error('Supabase Error:', error)
    return {
      error: true,
      message: error.message || 'An error occurred',
      details: error
    }
  }
  return { error: false }
}

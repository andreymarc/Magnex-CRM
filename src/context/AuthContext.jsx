import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { initializeUserData, markDataInitialized } from '../services/dataInitService'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile from profiles table with timeout
  const fetchProfile = async (userId) => {
    console.log('Fetching profile for:', userId)

    // Create a default profile for fallback
    const defaultProfile = {
      id: userId,
      plan: 'trial',
      trial_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }

    // Check if supabase is available
    if (!supabase) {
      console.warn('Supabase not configured, using default profile')
      setProfile(defaultProfile)
      return null
    }

    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
      )

      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise])

      console.log('Profile result:', data, error)

      if (error) {
        console.error('Profile fetch error:', error)
        setProfile(defaultProfile)
        return null
      }

      if (data) {
        setProfile(data)
        // Initialize user data on first login
        if (!data.data_initialized) {
          console.log('First login detected, initializing user data...')
          const initSuccess = await initializeUserData(userId)
          if (initSuccess) {
            await markDataInitialized(userId)
            // Update local profile state
            setProfile(prev => ({ ...prev, data_initialized: true }))
          }
        }
        return data
      } else {
        console.log('No profile found, using default')
        setProfile(defaultProfile)
        return null
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(defaultProfile)
      return null
    }
  }

  // Check if trial is still active
  const isTrialActive = () => {
    if (!profile) return false
    if (profile.plan === 'pro') return true
    const trialEnd = new Date(profile.trial_ends_at)
    return new Date() < trialEnd
  }

  // Check if user has pro plan
  const isPro = () => {
    return profile?.plan === 'pro'
  }

  // Get days remaining in trial
  const getTrialDaysRemaining = () => {
    if (!profile || profile.plan === 'pro') return 0
    const trialEnd = new Date(profile.trial_ends_at)
    const now = new Date()
    const diff = trialEnd - now
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  // Sign up with email and password
  const signUp = async ({ email, password, fullName, companyName, phone }) => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please set up your environment variables.')
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName,
          phone: phone
        }
      }
    })

    if (error) throw error

    // Update profile with additional info
    if (data.user && supabase) {
      await supabase
        .from('profiles')
        .update({
          company_name: companyName,
          phone: phone
        })
        .eq('id', data.user.id)
    }

    return data
  }

  // Sign in with email and password
  const signIn = async ({ email, password }) => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please set up your environment variables.')
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  }

  // Sign in with magic link
  const signInWithMagicLink = async (email) => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please set up your environment variables.')
    }
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) throw error
    return data
  }

  // Sign out
  const signOut = async () => {
    if (!supabase) {
      setUser(null)
      setProfile(null)
      return
    }
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setProfile(null)
  }

  // Update profile
  const updateProfile = async (updates) => {
    if (!user) throw new Error('No user logged in')
    if (!supabase) throw new Error('Supabase is not configured. Please set up your environment variables.')

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error
    setProfile(data)
    return data
  }

  // Upload profile photo to Supabase Storage
  const uploadProfilePhoto = async (file) => {
    if (!user) throw new Error('No user logged in')
    if (!supabase) throw new Error('Supabase is not configured. Please set up your environment variables.')

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/avatar.${fileExt}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    // Update profile with avatar URL
    await updateProfile({ avatar_url: publicUrl })

    return publicUrl
  }

  useEffect(() => {
    // Check if supabase is available first
    if (!supabase) {
      console.warn('Supabase not configured, skipping auth initialization')
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email)
      setUser(session?.user ?? null)
      if (session?.user) {
        try {
          await fetchProfile(session.user.id)
        } catch (err) {
          console.error('Initial profile fetch error:', err)
        }
      }
      setLoading(false)
    }).catch(err => {
      console.error('Session error:', err)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        if (session?.user) {
          try {
            await fetchProfile(session.user.id)
          } catch (err) {
            console.error('Profile fetch error:', err)
          }
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithMagicLink,
    signOut,
    updateProfile,
    uploadProfilePhoto,
    isTrialActive,
    isPro,
    getTrialDaysRemaining
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

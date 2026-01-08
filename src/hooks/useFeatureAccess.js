import { useAuth } from '../context/AuthContext'

// Define which features are available for each plan
const FEATURE_ACCESS = {
  // Free features (available after trial ends)
  contacts: ['trial', 'free', 'pro'],
  tasks: ['trial', 'free', 'pro'],

  // Paid features (only during trial or with pro plan)
  leads: ['trial', 'pro'],
  deals: ['trial', 'pro'],
  schedule: ['trial', 'pro'],
  documents: ['trial', 'pro'],
  analytics: ['trial', 'pro'],
  payments: ['trial', 'pro'],
  settings: ['trial', 'free', 'pro'], // Settings always available
}

export function useFeatureAccess() {
  const { profile, isTrialActive, isPro, getTrialDaysRemaining, isSubscriptionActive } = useAuth()

  // Get current plan status
  const getCurrentPlan = () => {
    // If no profile yet, assume trial (be permissive while loading)
    if (!profile) return 'trial'

    // Check for active pro subscription
    if (isPro() && isSubscriptionActive()) return 'pro'

    // Check legacy pro users (without subscription tracking)
    if (profile.plan === 'pro' && !profile.subscription_status) return 'pro'

    // Active trial
    if (isTrialActive()) return 'trial'

    // Trial expired, no subscription
    return 'free'
  }

  // Check if a feature is accessible
  const canAccess = (feature) => {
    const currentPlan = getCurrentPlan()

    const allowedPlans = FEATURE_ACCESS[feature]
    if (!allowedPlans) return true // If feature not defined, allow access

    return allowedPlans.includes(currentPlan)
  }

  // Check if feature is locked (for UI display)
  const isLocked = (feature) => {
    return !canAccess(feature)
  }

  // Get list of all locked features
  const getLockedFeatures = () => {
    const currentPlan = getCurrentPlan()
    if (!currentPlan) return Object.keys(FEATURE_ACCESS)

    return Object.entries(FEATURE_ACCESS)
      .filter(([, plans]) => !plans.includes(currentPlan))
      .map(([feature]) => feature)
  }

  // Get list of all accessible features
  const getAccessibleFeatures = () => {
    const currentPlan = getCurrentPlan()
    if (!currentPlan) return []

    return Object.entries(FEATURE_ACCESS)
      .filter(([, plans]) => plans.includes(currentPlan))
      .map(([feature]) => feature)
  }

  return {
    canAccess,
    isLocked,
    getLockedFeatures,
    getAccessibleFeatures,
    getCurrentPlan,
    trialDaysRemaining: getTrialDaysRemaining(),
    isTrialActive: isTrialActive(),
    isPro: isPro()
  }
}

import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Price IDs from environment
export const PRICE_IDS = {
  monthly: import.meta.env.VITE_STRIPE_PRICE_ID_MONTHLY,
  annual: import.meta.env.VITE_STRIPE_PRICE_ID_ANNUAL
};

// Pricing display info
export const PRICING = {
  monthly: {
    price: 25,
    currency: 'NIS',
    period: 'month',
    priceId: PRICE_IDS.monthly
  },
  annual: {
    price: 255,
    currency: 'NIS',
    period: 'year',
    monthlyEquivalent: 21.25, // 255/12
    discount: 15,
    priceId: PRICE_IDS.annual
  }
};

/**
 * Create a checkout session and redirect to Stripe
 */
export const createCheckoutSession = async ({ priceId, userId, userEmail, billingCycle }) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, userId, userEmail, billingCycle })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    // Redirect to Stripe Checkout
    if (data.url) {
      window.location.href = data.url;
    }

    return data;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

/**
 * Open Stripe Customer Portal for subscription management
 */
export const openCustomerPortal = async (customerId) => {
  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create portal session');
    }

    // Redirect to Stripe Customer Portal
    if (data.url) {
      window.location.href = data.url;
    }

    return data;
  } catch (error) {
    console.error('Portal error:', error);
    throw error;
  }
};

/**
 * Format price for display
 */
export const formatPrice = (price, currency = 'NIS') => {
  return `${price} ${currency}`;
};

/**
 * Get subscription status display text
 */
export const getSubscriptionStatusText = (status, language = 'he') => {
  const statusTexts = {
    he: {
      active: 'פעיל',
      past_due: 'חוב',
      canceled: 'בוטל',
      unpaid: 'לא שולם',
      incomplete: 'לא הושלם',
      none: 'ללא מנוי',
      trialing: 'תקופת ניסיון'
    },
    en: {
      active: 'Active',
      past_due: 'Past Due',
      canceled: 'Canceled',
      unpaid: 'Unpaid',
      incomplete: 'Incomplete',
      none: 'No Subscription',
      trialing: 'Trial'
    }
  };

  return statusTexts[language]?.[status] || status;
};

/**
 * Get billing cycle display text
 */
export const getBillingCycleText = (cycle, language = 'he') => {
  const cycleTexts = {
    he: {
      monthly: 'חודשי',
      annual: 'שנתי'
    },
    en: {
      monthly: 'Monthly',
      annual: 'Annual'
    }
  };

  return cycleTexts[language]?.[cycle] || cycle;
};

export { stripePromise };

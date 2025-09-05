import { loadStripe } from '@stripe/stripe-js'
import { supabase } from './supabase'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  PREMIUM_MONTHLY: {
    priceId: import.meta.env.VITE_STRIPE_PREMIUM_MONTHLY_PRICE_ID,
    name: 'Premium Monthly',
    price: 4.99,
    interval: 'month',
    features: [
      'All state-specific rights guides',
      'Bilingual scripts (English & Spanish)',
      'Advanced recording features',
      'Encrypted location alerts',
      'Priority support'
    ]
  },
  PREMIUM_YEARLY: {
    priceId: import.meta.env.VITE_STRIPE_PREMIUM_YEARLY_PRICE_ID,
    name: 'Premium Yearly',
    price: 49.99,
    interval: 'year',
    features: [
      'All state-specific rights guides',
      'Bilingual scripts (English & Spanish)',
      'Advanced recording features',
      'Encrypted location alerts',
      'Priority support',
      '2 months free'
    ]
  }
}

// Create checkout session
export const createCheckoutSession = async (priceId, userId) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        priceId,
        userId,
        successUrl: `${window.location.origin}/profile?success=true`,
        cancelUrl: `${window.location.origin}/profile?canceled=true`
      }
    })

    if (error) throw error

    const stripe = await stripePromise
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId: data.sessionId
    })

    if (stripeError) throw stripeError

  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Create customer portal session
export const createPortalSession = async (customerId) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-portal-session', {
      body: {
        customerId,
        returnUrl: `${window.location.origin}/profile`
      }
    })

    if (error) throw error

    window.location.href = data.url

  } catch (error) {
    console.error('Error creating portal session:', error)
    throw error
  }
}

// Get user subscription status
export const getUserSubscription = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (error && error.code !== 'PGRST116') throw error

    return data
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return null
  }
}

// Check if user has premium access
export const hasPremiumAccess = (subscription) => {
  if (!subscription) return false
  
  return subscription.status === 'active' && 
         new Date(subscription.current_period_end) > new Date()
}

// Get subscription features based on plan
export const getSubscriptionFeatures = (subscription) => {
  if (!subscription || !hasPremiumAccess(subscription)) {
    return {
      stateGuides: false,
      bilingualScripts: false,
      advancedRecording: false,
      locationAlerts: false,
      prioritySupport: false
    }
  }

  return {
    stateGuides: true,
    bilingualScripts: true,
    advancedRecording: true,
    locationAlerts: true,
    prioritySupport: true
  }
}

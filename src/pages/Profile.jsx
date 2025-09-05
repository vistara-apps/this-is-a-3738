import React, { useState, useEffect } from 'react'
import { User, CreditCard, Settings, Crown, Check } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import EmergencyContacts from '../components/EmergencyContacts'
import LocationSelector from '../components/LocationSelector'
import { 
  SUBSCRIPTION_PLANS, 
  createCheckoutSession, 
  createPortalSession, 
  getUserSubscription, 
  hasPremiumAccess 
} from '../lib/stripe'
import { supabase } from '../lib/supabase'

const Profile = () => {
  const { user, signOut } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    if (user) {
      loadSubscription()
    }
  }, [user])

  const loadSubscription = async () => {
    try {
      const sub = await getUserSubscription(user.id)
      setSubscription(sub)
    } catch (error) {
      console.error('Error loading subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (priceId) => {
    setUpgrading(true)
    try {
      await createCheckoutSession(priceId, user.id)
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setUpgrading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      // Get user's Stripe customer ID from the database
      const { data: userData } = await supabase
        .from('users')
        .select('stripe_customer_id')
        .eq('id', user.id)
        .single()

      if (userData?.stripe_customer_id) {
        await createPortalSession(userData.stripe_customer_id)
      }
    } catch (error) {
      console.error('Error opening customer portal:', error)
      alert('Failed to open subscription management. Please try again.')
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">
              Profile
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in to access your profile and emergency contacts.
            </p>
            <a
              href="/auth"
              className="bg-accent text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Profile & Settings
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account and emergency contacts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-medium text-primary">Account Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.email}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Status
                </label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  hasPremiumAccess(subscription) 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {hasPremiumAccess(subscription) ? (
                    <>
                      <Crown className="h-3 w-3 mr-1" />
                      Premium Account
                    </>
                  ) : (
                    'Free Account'
                  )}
                </span>
              </div>
              
              <button
                onClick={handleSignOut}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-medium text-primary">Subscription</h2>
            </div>
            
            {loading ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading subscription...</p>
              </div>
            ) : hasPremiumAccess(subscription) ? (
              <div className="text-center py-6">
                <div className="flex items-center justify-center mb-4">
                  <Crown className="h-8 w-8 text-yellow-500 mr-2" />
                  <h3 className="text-2xl font-bold text-primary">Premium Active</h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Your premium subscription is active until{' '}
                  {subscription?.current_period_end && 
                    new Date(subscription.current_period_end).toLocaleDateString()
                  }
                </p>
                
                <div className="text-sm text-gray-600 mb-6 space-y-1">
                  <div className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>All state guides</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Bilingual scripts</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Advanced recording features</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Encrypted location alerts</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleManageSubscription}
                  className="w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Manage Subscription
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                  <div key={plan.priceId} className="border rounded-lg p-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-primary mb-2">{plan.name}</h3>
                      <p className="text-3xl font-bold text-accent mb-4">
                        ${plan.price}
                        <span className="text-lg text-gray-500">/{plan.interval}</span>
                      </p>
                      
                      <div className="text-sm text-gray-600 mb-4 space-y-1">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => handleUpgrade(plan.priceId)}
                        disabled={upgrading}
                        className="w-full bg-accent text-white px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {upgrading ? 'Processing...' : `Upgrade to ${plan.name}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Emergency Contacts */}
          <div className="lg:col-span-1">
            <EmergencyContacts />
          </div>

          {/* Location Settings */}
          <div className="lg:col-span-1">
            <LocationSelector />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

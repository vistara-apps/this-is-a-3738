import React from 'react'
import { User, CreditCard, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import EmergencyContacts from '../components/EmergencyContacts'
import LocationSelector from '../components/LocationSelector'

const Profile = () => {
  const { user, signOut } = useAuth()

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
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Free Account
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
            
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold text-primary mb-2">Premium</h3>
              <p className="text-3xl font-bold text-accent mb-4">$4.99<span className="text-lg text-gray-500">/month</span></p>
              
              <div className="text-sm text-gray-600 mb-6 space-y-1">
                <p>✓ All state guides</p>
                <p>✓ Bilingual scripts</p>
                <p>✓ Advanced recording features</p>
                <p>✓ Encrypted location alerts</p>
              </div>
              
              <button className="w-full bg-accent text-white px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors">
                Upgrade to Premium
              </button>
            </div>
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
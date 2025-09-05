import React from 'react'
import StateGuideCard from '../components/StateGuideCard'
import LocationSelector from '../components/LocationSelector'

const RightsGuide = () => {
  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Know Your Rights
          </h1>
          <p className="text-lg text-gray-600">
            State-specific legal information for police interactions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StateGuideCard />
          </div>
          <div>
            <LocationSelector />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightsGuide
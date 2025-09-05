import React from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { useLocation } from '../contexts/LocationContext'

const LocationSelector = () => {
  const { 
    currentState, 
    statesList, 
    locationPermission, 
    requestLocation, 
    setManualState 
  } = useLocation()

  return (
    <div className="bg-surface rounded-lg shadow-card p-6">
      <h3 className="text-lg font-medium text-primary mb-4">Location Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Current State:</span>
          <span className="text-sm text-accent font-medium">{currentState}</span>
        </div>

        {locationPermission !== 'granted' && (
          <button
            onClick={requestLocation}
            className="w-full flex items-center justify-center space-x-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <Navigation className="h-4 w-4" />
            <span>Auto-Detect Location</span>
          </button>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or select manually:
          </label>
          <select
            value={currentState}
            onChange={(e) => setManualState(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            {statesList.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default LocationSelector
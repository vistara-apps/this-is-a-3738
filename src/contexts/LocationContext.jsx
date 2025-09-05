import React, { createContext, useContext, useState, useEffect } from 'react'

const LocationContext = createContext()

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}

const statesList = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

export const LocationProvider = ({ children }) => {
  const [currentState, setCurrentState] = useState('California')
  const [coordinates, setCoordinates] = useState(null)
  const [locationPermission, setLocationPermission] = useState('prompt')

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported')
      return false
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
      
      // In a real app, you'd use reverse geocoding to get the state
      setLocationPermission('granted')
      return true
    } catch (error) {
      console.error('Error getting location:', error)
      setLocationPermission('denied')
      return false
    }
  }

  const setManualState = (state) => {
    setCurrentState(state)
  }

  const value = {
    currentState,
    coordinates,
    locationPermission,
    statesList,
    requestLocation,
    setManualState,
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
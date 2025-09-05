import React, { useState, useEffect } from 'react'
import { MapPin, Loader } from 'lucide-react'
import { useLocation } from '../contexts/LocationContext'
import { generateRightsGuide } from '../lib/openai'

const StateGuideCard = () => {
  const { currentState } = useLocation()
  const [rightsGuide, setRightsGuide] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRightsGuide = async () => {
      setLoading(true)
      const guide = await generateRightsGuide(currentState)
      setRightsGuide(guide)
      setLoading(false)
    }

    loadRightsGuide()
  }, [currentState])

  if (loading) {
    return (
      <div className="bg-surface rounded-lg shadow-card p-6 animate-pulse">
        <div className="flex items-center space-x-2 mb-4">
          <Loader className="h-5 w-5 animate-spin text-accent" />
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-lg shadow-card p-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-medium text-primary">
          Your Rights in {currentState}
        </h2>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <div className="text-gray-700 whitespace-pre-line">
          {rightsGuide}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> This information is for educational purposes only. 
          Laws may vary and change. Consult with a qualified attorney for legal advice.
        </p>
      </div>
    </div>
  )
}

export default StateGuideCard
import React, { useState, useEffect } from 'react'
import { Languages, Loader } from 'lucide-react'
import ScriptButton from '../components/ScriptButton'
import { useLocation } from '../contexts/LocationContext'
import { generateScripts } from '../lib/openai'

const Scripts = () => {
  const { currentState } = useLocation()
  const [language, setLanguage] = useState('english')
  const [scripts, setScripts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadScripts = async () => {
      setLoading(true)
      const newScripts = await generateScripts(currentState, language)
      setScripts(newScripts)
      setLoading(false)
    }

    loadScripts()
  }, [currentState, language])

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Bilingual Scripts
          </h1>
          <p className="text-lg text-gray-600">
            Pre-written responses for common police interaction scenarios
          </p>
        </div>

        <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <Languages className="h-5 w-5 text-accent" />
            <span className="font-medium text-primary">Language:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('english')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  language === 'english'
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('spanish')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  language === 'spanish'
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Español
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-md h-16"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary mb-4">
                Scripts for {currentState} ({language === 'english' ? 'English' : 'Español'})
              </h3>
              {scripts.map((script, index) => (
                <ScriptButton
                  key={index}
                  script={script}
                  variant={language}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">Usage Tips:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Tap any script to copy it to your clipboard</li>
            <li>• Practice these phrases beforehand to build confidence</li>
            <li>• Remain calm and speak clearly when using these scripts</li>
            <li>• Remember: You have the right to remain silent</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Scripts
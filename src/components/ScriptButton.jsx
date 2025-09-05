import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const ScriptButton = ({ script, variant = 'default' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'english':
        return 'border-blue-200 bg-blue-50 hover:bg-blue-100'
      case 'spanish':
        return 'border-green-200 bg-green-50 hover:bg-green-100'
      case 'recording':
        return 'border-red-200 bg-red-50 hover:bg-red-100'
      case 'alert':
        return 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100'
      default:
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100'
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`w-full text-left p-4 rounded-md border transition-colors ${getVariantStyles()}`}
    >
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-800 flex-1 pr-2">
          {script}
        </p>
        <div className="flex-shrink-0">
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
    </button>
  )
}

export default ScriptButton
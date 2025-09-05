import React, { useState } from 'react'
import { Mic, Video, Square, Play, Download, Trash2 } from 'lucide-react'
import { useRecording } from '../contexts/RecordingContext'

const Recording = () => {
  const {
    isRecording,
    recordingType,
    recordings,
    startRecording,
    stopRecording,
    deleteRecording
  } = useRecording()

  const [selectedType, setSelectedType] = useState('audio')

  const handleStartRecording = async () => {
    const success = await startRecording(selectedType)
    if (!success) {
      alert('Unable to access camera/microphone. Please check permissions.')
    }
  }

  const downloadRecording = (recording) => {
    const a = document.createElement('a')
    a.href = recording.url
    a.download = `recording-${recording.timestamp.toISOString()}.${recording.type === 'video' ? 'webm' : 'webm'}`
    a.click()
  }

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Quick Recording
          </h1>
          <p className="text-lg text-gray-600">
            One-tap audio and video recording for evidence collection
          </p>
        </div>

        {/* Recording Controls */}
        <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
          <div className="text-center">
            {!isRecording ? (
              <div>
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    onClick={() => setSelectedType('audio')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      selectedType === 'audio'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Mic className="h-4 w-4" />
                    <span>Audio</span>
                  </button>
                  <button
                    onClick={() => setSelectedType('video')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      selectedType === 'video'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Video className="h-4 w-4" />
                    <span>Video</span>
                  </button>
                </div>

                <button
                  onClick={handleStartRecording}
                  className="bg-danger text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors flex items-center space-x-2 mx-auto"
                >
                  {selectedType === 'video' ? (
                    <Video className="h-6 w-6" />
                  ) : (
                    <Mic className="h-6 w-6" />
                  )}
                  <span>Start {selectedType === 'video' ? 'Video' : 'Audio'} Recording</span>
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Recording {recordingType}...</span>
                  </div>
                </div>

                <button
                  onClick={stopRecording}
                  className="bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Square className="h-6 w-6" />
                  <span>Stop Recording</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recordings List */}
        <div className="bg-surface rounded-lg shadow-card p-6">
          <h3 className="text-lg font-medium text-primary mb-4">
            Saved Recordings ({recordings.length})
          </h3>

          {recordings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No recordings yet. Start your first recording above.
            </p>
          ) : (
            <div className="space-y-4">
              {recordings.map((recording) => (
                <div key={recording.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {recording.type === 'video' ? (
                          <Video className="h-4 w-4 text-accent" />
                        ) : (
                          <Mic className="h-4 w-4 text-accent" />
                        )}
                        <span className="font-medium text-sm text-primary">
                          {recording.type === 'video' ? 'Video' : 'Audio'} Recording
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {recording.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => downloadRecording(recording)}
                        className="text-accent hover:text-blue-600 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteRecording(recording.id)}
                        className="text-danger hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {recording.type === 'video' ? (
                    <video
                      controls
                      className="w-full mt-3 rounded"
                      style={{ maxHeight: '200px' }}
                    >
                      <source src={recording.url} type="video/webm" />
                    </video>
                  ) : (
                    <audio controls className="w-full mt-3">
                      <source src={recording.url} type="audio/webm" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-blue-800 mb-2">Recording Guidelines:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Know your state's recording consent laws</li>
            <li>• Keep your device visible during recording</li>
            <li>• Announce that you are recording if legally required</li>
            <li>• Recordings are stored locally on your device</li>
            <li>• Consider backing up important recordings to cloud storage</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Recording
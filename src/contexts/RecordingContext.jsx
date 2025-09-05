import React, { createContext, useContext, useState, useRef } from 'react'

const RecordingContext = createContext()

export const useRecording = () => {
  const context = useContext(RecordingContext)
  if (!context) {
    throw new Error('useRecording must be used within a RecordingProvider')
  }
  return context
}

export const RecordingProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingType, setRecordingType] = useState('audio') // 'audio' or 'video'
  const [recordings, setRecordings] = useState([])
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)

  const startRecording = async (type = 'audio') => {
    try {
      const constraints = type === 'video' 
        ? { video: true, audio: true }
        : { audio: true }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const chunks = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: type === 'video' ? 'video/webm' : 'audio/webm' 
        })
        const url = URL.createObjectURL(blob)
        
        const newRecording = {
          id: Date.now(),
          type,
          url,
          blob,
          timestamp: new Date(),
        }
        
        setRecordings(prev => [...prev, newRecording])
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingType(type)
      
      return true
    } catch (error) {
      console.error('Error starting recording:', error)
      return false
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const deleteRecording = (id) => {
    setRecordings(prev => prev.filter(recording => recording.id !== id))
  }

  const value = {
    isRecording,
    recordingType,
    recordings,
    startRecording,
    stopRecording,
    deleteRecording,
  }

  return (
    <RecordingContext.Provider value={value}>
      {children}
    </RecordingContext.Provider>
  )
}
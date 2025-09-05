import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LocationProvider } from './contexts/LocationContext'
import { RecordingProvider } from './contexts/RecordingContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import RightsGuide from './pages/RightsGuide'
import Scripts from './pages/Scripts'
import Recording from './pages/Recording'
import Profile from './pages/Profile'
import Auth from './pages/Auth'

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <RecordingProvider>
          <div className="min-h-screen bg-bg">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rights" element={<RightsGuide />} />
                <Route path="/scripts" element={<Scripts />} />
                <Route path="/recording" element={<Recording />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </main>
          </div>
        </RecordingProvider>
      </LocationProvider>
    </AuthProvider>
  )
}

export default App
import { supabase } from './supabase'

// Get user's emergency contacts
export const getEmergencyContacts = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .eq('user_id', userId)
      .order('is_primary', { ascending: false })
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching emergency contacts:', error)
    return []
  }
}

// Add emergency contact
export const addEmergencyContact = async (userId, contact) => {
  try {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .insert({
        user_id: userId,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        relationship: contact.relationship,
        is_primary: contact.is_primary || false
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error adding emergency contact:', error)
    return { data: null, error }
  }
}

// Update emergency contact
export const updateEmergencyContact = async (contactId, updates) => {
  try {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .update(updates)
      .eq('id', contactId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating emergency contact:', error)
    return { data: null, error }
  }
}

// Delete emergency contact
export const deleteEmergencyContact = async (contactId) => {
  try {
    const { error } = await supabase
      .from('emergency_contacts')
      .delete()
      .eq('id', contactId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error deleting emergency contact:', error)
    return { error }
  }
}

// Send emergency alert via SMS (requires Twilio or similar service)
export const sendEmergencyAlert = async (contacts, location, message) => {
  try {
    // This would typically call a Supabase Edge Function that handles SMS sending
    const { data, error } = await supabase.functions.invoke('send-emergency-alert', {
      body: {
        contacts,
        location,
        message,
        timestamp: new Date().toISOString()
      }
    })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error sending emergency alert:', error)
    return { success: false, error }
  }
}

// Send emergency alert via email
export const sendEmergencyEmail = async (contacts, location, message) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-emergency-email', {
      body: {
        contacts: contacts.filter(c => c.email),
        location,
        message,
        timestamp: new Date().toISOString()
      }
    })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error sending emergency email:', error)
    return { success: false, error }
  }
}

// Get location for emergency alert
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  })
}

// Format location for display
export const formatLocation = (location) => {
  if (!location || !location.lat || !location.lng) {
    return 'Location unavailable'
  }

  return `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
}

// Generate Google Maps link
export const getGoogleMapsLink = (location) => {
  if (!location || !location.lat || !location.lng) {
    return null
  }

  return `https://www.google.com/maps?q=${location.lat},${location.lng}`
}

// Validate phone number format
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}

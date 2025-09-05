import React, { useState } from 'react'
import { Phone, Plus, Trash2, AlertTriangle } from 'lucide-react'

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', phone: '' })
  const [alertSent, setAlertSent] = useState(false)

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now() }])
      setNewContact({ name: '', phone: '' })
      setShowAddForm(false)
    }
  }

  const removeContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const sendAlert = async () => {
    if (contacts.length === 0) return
    
    setAlertSent(true)
    
    // In a real app, this would send SMS/notifications
    console.log('Alert sent to contacts:', contacts)
    
    setTimeout(() => setAlertSent(false), 3000)
  }

  return (
    <div className="bg-surface rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-primary">Emergency Contacts</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="text-accent hover:text-blue-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {contacts.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          No emergency contacts added yet
        </p>
      ) : (
        <div className="space-y-3 mb-4">
          {contacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium text-sm text-gray-900">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <button
                onClick={() => removeContact(contact.id)}
                className="text-danger hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {contacts.length > 0 && (
        <button
          onClick={sendAlert}
          disabled={alertSent}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition-colors ${
            alertSent
              ? 'bg-green-100 text-green-800 cursor-not-allowed'
              : 'bg-danger text-white hover:bg-red-600'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          <span>{alertSent ? 'Alert Sent!' : 'Send Emergency Alert'}</span>
        </button>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-medium mb-4">Add Emergency Contact</h4>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Contact Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <div className="flex space-x-3">
                <button
                  onClick={addContact}
                  className="flex-1 bg-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Add Contact
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmergencyContacts
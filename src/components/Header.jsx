import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rights Guide', href: '/rights' },
    { name: 'Scripts', href: '/scripts' },
    { name: 'Recording', href: '/recording' },
  ]

  return (
    <header className="bg-surface shadow-card sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-xl font-semibold text-primary">KnowYourRights AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === item.href
                    ? 'text-accent'
                    : 'text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary hover:text-accent transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-accent ${
                    location.pathname === item.href
                      ? 'text-accent'
                      : 'text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                {user ? (
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-primary hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="block px-3 py-2 text-base font-medium text-accent hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
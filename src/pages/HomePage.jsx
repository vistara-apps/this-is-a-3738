import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, FileText, Mic, AlertTriangle, ArrowRight, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLocation } from '../contexts/LocationContext'

const HomePage = () => {
  const { user } = useAuth()
  const { currentState } = useLocation()

  const features = [
    {
      icon: Shield,
      title: 'Know Your Rights',
      description: 'Get state-specific legal information for police interactions.',
      link: '/rights',
      color: 'blue'
    },
    {
      icon: FileText,
      title: 'Bilingual Scripts',
      description: 'Pre-written responses in English and Spanish.',
      link: '/scripts',
      color: 'green'
    },
    {
      icon: Mic,
      title: 'Quick Recording',
      description: 'One-tap audio and video recording for evidence.',
      link: '/recording',
      color: 'red'
    },
    {
      icon: AlertTriangle,
      title: 'Safety Alerts',
      description: 'Instantly notify your emergency contacts.',
      link: '/profile',
      color: 'yellow'
    }
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      text: "This app gave me confidence during a traffic stop. The scripts helped me stay calm.",
      rating: 5
    },
    {
      name: "Carlos R.",
      text: "Los scripts en español fueron muy útiles. Me ayudaron a comunicarme claramente.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Know Your Rights
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-slide-up">
              Instant legal knowledge and safety tools for police interactions.
              Stay informed, stay safe, stay empowered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link
                to="/rights"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              {!user && (
                <Link
                  to="/auth"
                  className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                >
                  Sign Up Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Comprehensive Protection Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to protect yourself and know your rights during police interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                red: 'bg-red-100 text-red-600',
                yellow: 'bg-yellow-100 text-yellow-600'
              }

              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-surface rounded-lg shadow-card p-6 hover:shadow-modal transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-gray-600">State Guides Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">2</div>
              <div className="text-gray-600">Languages Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-gray-600">Access to Information</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Trusted by Communities
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from people who stayed safe and informed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-surface rounded-lg shadow-card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-primary">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Your Rights?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who trust KnowYourRights AI for their safety and legal knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rights"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Explore Rights for {currentState}
            </Link>
            {!user && (
              <Link
                to="/auth"
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
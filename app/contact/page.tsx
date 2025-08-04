import Link from 'next/link'
import { ArrowLeftIcon, EnvelopeIcon, GlobeAltIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-secondary-600 hover:text-primary-600 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-secondary-900">Contact</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-secondary-600">
            We welcome feedback, suggestions, and contributions to PoliticalCorner
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="feedback">General Feedback</option>
                  <option value="suggestion">Content Suggestion</option>
                  <option value="contribution">Contribution</option>
                  <option value="technical">Technical Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center mb-4">
                <EnvelopeIcon className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-lg font-semibold text-secondary-900">Contact Information</h3>
              </div>
              <div className="space-y-3 text-secondary-600">
                <p>
                  <strong>Email:</strong> contact@politicalcorner.com
                </p>
                <p>
                  <strong>Response Time:</strong> We aim to respond within 48 hours
                </p>
                <p>
                  <strong>Location:</strong> Global platform, discussions from around the world
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <GlobeAltIcon className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-lg font-semibold text-secondary-900">Get Involved</h3>
              </div>
              <div className="space-y-3 text-secondary-600">
                <p>
                  We welcome contributions from scholars, researchers, and political enthusiasts 
                  who share our commitment to balanced, thoughtful analysis.
                </p>
                <p>
                  If you're interested in contributing content or have suggestions for topics 
                  to cover, please reach out through the contact form.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <AcademicCapIcon className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-lg font-semibold text-secondary-900">Our Approach</h3>
              </div>
              <div className="space-y-3 text-secondary-600">
                <p>
                  We maintain high standards for content quality and intellectual rigor. 
                  All contributions are reviewed to ensure they meet our standards for 
                  balanced analysis and academic integrity.
                </p>
                <p>
                  We prioritize diverse perspectives and global viewpoints in our content 
                  selection and development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <div className="card">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  How can I contribute content?
                </h3>
                <p className="text-secondary-600">
                  We welcome contributions from qualified individuals with expertise in political 
                  science, economics, or related fields. Please contact us with your credentials 
                  and a brief proposal for the content you'd like to contribute.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Do you accept guest posts?
                </h3>
                <p className="text-secondary-600">
                  Yes, we accept guest posts that align with our mission and methodology. 
                  All submissions must follow our Thesis → Counter Thesis → Synthesis format 
                  and maintain our standards for balanced analysis.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  How do you ensure balanced perspectives?
                </h3>
                <p className="text-secondary-600">
                  Our structured approach requires examining multiple viewpoints on each topic. 
                  We actively seek diverse perspectives and ensure that all arguments are 
                  presented fairly and accurately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/" className="btn-primary mr-4">
            Explore Discussions
          </Link>
          <Link href="/methodology" className="btn-secondary">
            Learn Our Method
          </Link>
        </div>
      </div>
    </div>
  )
} 
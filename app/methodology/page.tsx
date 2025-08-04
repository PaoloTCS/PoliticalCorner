import Link from 'next/link'
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export default function Methodology() {
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
            <h1 className="text-2xl font-bold text-secondary-900">Methodology</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Our Discussion Methodology
          </h1>
          <p className="text-xl text-secondary-600">
            Understanding the Thesis → Counter Thesis → Synthesis approach
          </p>
        </div>

        {/* Methodology Overview */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            The Three-Part Structure
          </h2>
          <p className="text-secondary-600 mb-6">
            Our discussions follow a structured approach inspired by dialectical thinking, 
            ensuring that each topic is examined from multiple perspectives before reaching 
            a balanced conclusion.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Thesis */}
            <div className="thesis-card rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-green-800">Thesis</h3>
              </div>
              <p className="text-green-700">
                The initial position or argument. This section presents the main viewpoint, 
                supporting evidence, and theoretical framework for the discussion topic.
              </p>
            </div>

            {/* Counter Thesis */}
            <div className="counter-thesis-card rounded-lg p-6">
              <div className="flex items-center mb-4">
                <XCircleIcon className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold text-red-800">Counter Thesis</h3>
              </div>
              <p className="text-red-700">
                The opposing viewpoint or critique. This section examines alternative 
                perspectives, potential flaws in the original argument, and contrasting evidence.
              </p>
            </div>

            {/* Synthesis */}
            <div className="synthesis-card rounded-lg p-6">
              <div className="flex items-center mb-4">
                <LightBulbIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-blue-800">Synthesis</h3>
              </div>
              <p className="text-blue-700">
                The balanced conclusion. This section finds common ground, addresses 
                contradictions, and proposes a nuanced understanding that incorporates 
                insights from both positions.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            Why This Approach?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Balanced Analysis
              </h3>
              <p className="text-secondary-600">
                By examining multiple perspectives, we avoid one-sided arguments and 
                provide readers with a comprehensive understanding of complex issues.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Critical Thinking
              </h3>
              <p className="text-secondary-600">
                The structure encourages readers to think critically about political 
                and economic issues, considering both strengths and weaknesses of different positions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Nuanced Understanding
              </h3>
              <p className="text-secondary-600">
                The synthesis phase helps readers develop more sophisticated views that 
                acknowledge complexity rather than seeking simple answers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Global Perspective
              </h3>
              <p className="text-secondary-600">
                Organized by continents, this approach highlights how political and 
                economic issues manifest differently across geographic regions.
              </p>
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            Example: Democracy in Asia
          </h2>
          <div className="space-y-6">
            <div className="thesis-card rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Thesis</h4>
              <p className="text-green-700">
                "Asian democracies demonstrate unique characteristics that blend traditional 
                cultural values with modern democratic institutions, creating more stable 
                and culturally appropriate governance systems."
              </p>
            </div>
            <div className="counter-thesis-card rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Counter Thesis</h4>
              <p className="text-red-700">
                "The 'Asian democracy' model often masks authoritarian tendencies and 
                undermines fundamental democratic principles, leading to limited political 
                freedoms and human rights violations."
              </p>
            </div>
            <div className="synthesis-card rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Synthesis</h4>
              <p className="text-blue-700">
                "Asian democracies represent evolving experiments in governance that require 
                careful evaluation. While cultural adaptation is necessary, democratic 
                principles must remain fundamental. The challenge lies in balancing 
                cultural authenticity with democratic accountability."
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/" className="btn-primary">
            Explore Discussions
          </Link>
        </div>
      </div>
    </div>
  )
} 
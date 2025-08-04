import Link from 'next/link'
import { ArrowLeftIcon, GlobeAltIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
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
            <h1 className="text-2xl font-bold text-secondary-900">About</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            About PoliticalCorner
          </h1>
          <p className="text-xl text-secondary-600">
            A platform for thoughtful political and economic discussions
          </p>
        </div>

        {/* Mission */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <GlobeAltIcon className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-secondary-900">Our Mission</h2>
          </div>
          <p className="text-secondary-600 mb-4">
            PoliticalCorner is dedicated to fostering informed, balanced discussions about political 
            philosophy and economic systems across the globe. We believe that understanding different 
            perspectives is essential for developing nuanced views on complex political and economic issues.
          </p>
          <p className="text-secondary-600">
            Our platform serves readers who are interested in political theory, economic policy, 
            and the ways in which different societies organize themselves politically and economically.
          </p>
        </div>

        {/* Approach */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <AcademicCapIcon className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-secondary-900">Our Approach</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Structured Discussions
              </h3>
              <p className="text-secondary-600">
                Each topic is examined through our Thesis → Counter Thesis → Synthesis format, 
                ensuring that multiple perspectives are considered before reaching conclusions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Global Perspective
              </h3>
              <p className="text-secondary-600">
                We organize discussions by continents to highlight how political and economic 
                issues manifest differently across geographic regions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Balanced Analysis
              </h3>
              <p className="text-secondary-600">
                Our goal is to present arguments fairly and avoid one-sided perspectives, 
                helping readers develop more sophisticated political understanding.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Academic Rigor
              </h3>
              <p className="text-secondary-600">
                We draw from political science, economics, philosophy, and history to provide 
                well-researched and thoughtful analysis of complex issues.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <UsersIcon className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-secondary-900">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Intellectual Honesty</h3>
              <p className="text-secondary-600 text-sm">
                We present arguments fairly and acknowledge the complexity of political issues.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Global Perspective</h3>
              <p className="text-secondary-600 text-sm">
                We recognize that political and economic systems vary across cultures and regions.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Educational Focus</h3>
              <p className="text-secondary-600 text-sm">
                Our primary goal is to educate and inform rather than advocate for specific positions.
              </p>
            </div>
          </div>
        </div>

        {/* Topics Covered */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Topics We Cover</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Political Systems</h3>
              <ul className="space-y-2 text-secondary-600">
                <li>• Democratic institutions and processes</li>
                <li>• Authoritarian and hybrid regimes</li>
                <li>• Political parties and electoral systems</li>
                <li>• Civil society and political participation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Economic Models</h3>
              <ul className="space-y-2 text-secondary-600">
                <li>• Market economies and capitalism</li>
                <li>• Socialist and mixed economic systems</li>
                <li>• Development economics</li>
                <li>• International trade and globalization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Social Issues</h3>
              <ul className="space-y-2 text-secondary-600">
                <li>• Inequality and social justice</li>
                <li>• Human rights and civil liberties</li>
                <li>• Environmental policy</li>
                <li>• Migration and identity politics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">International Relations</h3>
              <ul className="space-y-2 text-secondary-600">
                <li>• Regional integration and cooperation</li>
                <li>• International organizations</li>
                <li>• Conflict and peace studies</li>
                <li>• Global governance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/methodology" className="btn-primary mr-4">
            Learn Our Method
          </Link>
          <Link href="/" className="btn-secondary">
            Explore Discussions
          </Link>
        </div>
      </div>
    </div>
  )
} 
import Link from 'next/link'
import { ArrowLeftIcon, MapIcon, AcademicCapIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline'

const discussions = [
  {
    id: 'democracy-asia',
    title: 'Democracy in Asia',
    description: 'Examining the unique characteristics of democratic systems across Asian nations',
    thesis: {
      title: 'Asian Democracy Model',
      content: 'Asian democracies demonstrate unique characteristics that blend traditional cultural values with modern democratic institutions, creating more stable and culturally appropriate governance systems. Countries like Japan, South Korea, and Taiwan show how Confucian values of harmony, respect for authority, and collective welfare can enhance democratic stability.',
      points: [
        'Cultural adaptation of democratic principles',
        'Stability through traditional values',
        'Economic development alongside democracy'
      ]
    },
    counterThesis: {
      title: 'Authoritarian Tendencies',
      content: 'The "Asian democracy" model often masks authoritarian tendencies and undermines fundamental democratic principles, leading to limited political freedoms and human rights violations. Many Asian democracies exhibit characteristics of illiberal democracy with restricted civil liberties.',
      points: [
        'Limited political freedoms',
        'Restricted civil liberties',
        'Concentration of power'
      ]
    },
    synthesis: {
      title: 'Balanced Approach',
      content: 'Asian democracies represent evolving experiments in governance that require careful evaluation. While cultural adaptation is necessary, democratic principles must remain fundamental. The challenge lies in balancing cultural authenticity with democratic accountability.',
      points: [
        'Cultural adaptation with democratic principles',
        'Ongoing evolution of governance models',
        'Need for balanced evaluation'
      ]
    }
  },
  {
    id: 'economic-development',
    title: 'Economic Development Models',
    description: 'Comparing different approaches to economic development across Asian economies',
    thesis: {
      title: 'State-Led Development',
      content: 'Asian economic success stories demonstrate the effectiveness of state-led development models, where governments play an active role in guiding economic growth through strategic planning, industrial policy, and targeted investments.',
      points: [
        'Strategic government intervention',
        'Industrial policy success',
        'Targeted investment strategies'
      ]
    },
    counterThesis: {
      title: 'Market-Driven Growth',
      content: 'The most successful Asian economies have thrived through market liberalization and reduced government intervention. State-led models often lead to inefficiency, corruption, and misallocation of resources.',
      points: [
        'Market liberalization benefits',
        'Reduced government intervention',
        'Efficiency through competition'
      ]
    },
    synthesis: {
      title: 'Hybrid Approaches',
      content: 'Successful Asian development combines strategic government intervention with market mechanisms. The key is finding the right balance between state guidance and market forces, adapting the approach to local conditions.',
      points: [
        'Strategic government intervention',
        'Market mechanism integration',
        'Local condition adaptation'
      ]
    }
  }
]

export default function AsiaPage() {
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
            <div className="flex items-center">
              <MapIcon className="h-6 w-6 text-orange-500 mr-2" />
              <h1 className="text-2xl font-bold text-secondary-900">Asia</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Political Philosophy in Asia
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Exploring political and economic discussions from Asian perspectives, 
              examining unique cultural contexts and governance models.
            </p>
          </div>
        </div>
      </section>

      {/* Discussions */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Featured Discussions
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Each discussion follows our Thesis → Counter Thesis → Synthesis format 
              to provide balanced perspectives on complex issues.
            </p>
          </div>

          <div className="space-y-12">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="card">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                    {discussion.title}
                  </h3>
                  <p className="text-secondary-600">
                    {discussion.description}
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Thesis */}
                  <div className="thesis-card rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <AcademicCapIcon className="h-6 w-6 text-green-600 mr-2" />
                      <h4 className="text-lg font-semibold text-green-800">
                        {discussion.thesis.title}
                      </h4>
                    </div>
                    <p className="text-green-700 mb-4">
                      {discussion.thesis.content}
                    </p>
                    <ul className="space-y-2">
                      {discussion.thesis.points.map((point, index) => (
                        <li key={index} className="text-green-600 text-sm flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Counter Thesis */}
                  <div className="counter-thesis-card rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <ChartBarIcon className="h-6 w-6 text-red-600 mr-2" />
                      <h4 className="text-lg font-semibold text-red-800">
                        {discussion.counterThesis.title}
                      </h4>
                    </div>
                    <p className="text-red-700 mb-4">
                      {discussion.counterThesis.content}
                    </p>
                    <ul className="space-y-2">
                      {discussion.counterThesis.points.map((point, index) => (
                        <li key={index} className="text-red-600 text-sm flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Synthesis */}
                  <div className="synthesis-card rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <LightBulbIcon className="h-6 w-6 text-blue-600 mr-2" />
                      <h4 className="text-lg font-semibold text-blue-800">
                        {discussion.synthesis.title}
                      </h4>
                    </div>
                    <p className="text-blue-700 mb-4">
                      {discussion.synthesis.content}
                    </p>
                    <ul className="space-y-2">
                      {discussion.synthesis.points.map((point, index) => (
                        <li key={index} className="text-blue-600 text-sm flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Key Topics in Asian Politics
            </h2>
            <p className="text-lg text-secondary-600">
              Explore the major themes and issues shaping political discourse across Asia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Democracy and Authoritarianism',
              'Economic Development Models',
              'Regional Cooperation',
              'Cultural Values and Governance',
              'Technology and Politics',
              'Environmental Policy'
            ].map((topic) => (
              <div key={topic} className="card text-center hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {topic}
                </h3>
                <p className="text-secondary-600 text-sm">
                  Exploring the intersection of {topic.toLowerCase()} in Asian contexts.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8">Explore Other Continents</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/continents/americas" className="card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Americas</h3>
                <p className="text-secondary-300 text-sm">
                  Political philosophy across North and South America
                </p>
              </Link>
              <Link href="/continents/europe" className="card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Europe</h3>
                <p className="text-secondary-300 text-sm">
                  European political thought and economic systems
                </p>
              </Link>
              <Link href="/continents/africa" className="card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Africa</h3>
                <p className="text-secondary-300 text-sm">
                  African political philosophy and development
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
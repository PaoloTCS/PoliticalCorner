import Link from 'next/link'
import { ArrowLeftIcon, MapIcon, AcademicCapIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline'

const discussions = [
  {
    id: 'social-democracy',
    title: 'Social Democracy and Welfare States',
    description: 'Examining European social democratic models and their effectiveness',
    thesis: {
      title: 'Social Democracy Success',
      content: 'European social democracy represents the most successful model for combining economic prosperity with social justice. Countries like Sweden, Denmark, and Germany demonstrate how strong welfare states can create more equal and stable societies.',
      points: [
        'Economic prosperity with social justice',
        'Strong welfare state benefits',
        'Reduced inequality and social stability'
      ]
    },
    counterThesis: {
      title: 'Economic Challenges and Dependency',
      content: 'Social democratic models face significant challenges including high taxes, economic inefficiency, and dependency culture. The welfare state can discourage innovation and create unsustainable fiscal burdens.',
      points: [
        'High tax burdens',
        'Economic inefficiency concerns',
        'Dependency culture risks'
      ]
    },
    synthesis: {
      title: 'Balanced Social Market Economy',
      content: 'The most successful European models balance social protection with economic dynamism. The key is maintaining welfare benefits while encouraging innovation and economic growth through smart policy design.',
      points: [
        'Social protection with economic dynamism',
        'Smart policy design',
        'Innovation-friendly welfare systems'
      ]
    }
  },
  {
    id: 'eu-integration',
    title: 'European Union Integration',
    description: 'Analyzing the benefits and challenges of European integration',
    thesis: {
      title: 'Integration Benefits',
      content: 'European integration has brought unprecedented peace, prosperity, and cooperation to the continent. The EU has created the largest single market, promoted democratic values, and enhanced Europe\'s global influence.',
      points: [
        'Peace and cooperation',
        'Economic benefits of single market',
        'Enhanced global influence'
      ]
    },
    counterThesis: {
      title: 'Democratic Deficit and Sovereignty',
      content: 'EU integration has created democratic deficits and eroded national sovereignty. The complex bureaucracy and lack of democratic accountability undermine the legitimacy of European governance.',
      points: [
        'Democratic deficit issues',
        'Erosion of national sovereignty',
        'Bureaucratic complexity'
      ]
    },
    synthesis: {
      title: 'Reformed European Governance',
      content: 'European integration needs reform to address democratic deficits while preserving its benefits. This requires better democratic accountability and clearer division of responsibilities between EU and national levels.',
      points: [
        'Democratic accountability reforms',
        'Clear responsibility division',
        'Preserving integration benefits'
      ]
    }
  }
]

export default function EuropePage() {
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
              <MapIcon className="h-6 w-6 text-purple-500 mr-2" />
              <h1 className="text-2xl font-bold text-secondary-900">Europe</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Political Philosophy in Europe
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Exploring European political thought, social democracy, and the evolution 
              of democratic institutions across the continent.
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
              Key Topics in European Politics
            </h2>
            <p className="text-lg text-secondary-600">
              Explore the major themes and issues shaping political discourse across Europe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Social Democracy and Welfare States',
              'European Union Integration',
              'Democratic Institutions',
              'Economic Models and Social Market',
              'Migration and Identity Politics',
              'Environmental Policy and Green Politics'
            ].map((topic) => (
              <div key={topic} className="card text-center hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {topic}
                </h3>
                <p className="text-secondary-600 text-sm">
                  Exploring the intersection of {topic.toLowerCase()} in European contexts.
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
              <Link href="/continents/asia" className="card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Asia</h3>
                <p className="text-secondary-300 text-sm">
                  Political and economic discussions from Asian perspectives
                </p>
              </Link>
              <Link href="/continents/americas" className="card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Americas</h3>
                <p className="text-secondary-300 text-sm">
                  Political philosophy across North and South America
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
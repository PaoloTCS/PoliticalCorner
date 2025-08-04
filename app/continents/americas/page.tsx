import Link from 'next/link'
import { ArrowLeftIcon, MapIcon, AcademicCapIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline'

const discussions = [
  {
    id: 'democratic-systems',
    title: 'Democratic Systems in the Americas',
    description: 'Comparing democratic models across North and South America',
    thesis: {
      title: 'Liberal Democracy Success',
      content: 'The Americas demonstrate the success of liberal democratic systems, with strong institutions, regular elections, and protection of individual rights. Countries like Canada and the United States show how democratic governance can provide stability and prosperity.',
      points: [
        'Strong democratic institutions',
        'Regular electoral processes',
        'Protection of individual rights'
      ]
    },
    counterThesis: {
      title: 'Democratic Deficits',
      content: 'Many American democracies suffer from significant deficits including voter suppression, corporate influence, and growing inequality. The gap between democratic ideals and reality continues to widen.',
      points: [
        'Voter suppression issues',
        'Corporate influence in politics',
        'Growing economic inequality'
      ]
    },
    synthesis: {
      title: 'Democratic Renewal',
      content: 'The Americas need democratic renewal that addresses both institutional strengths and systemic weaknesses. This requires strengthening democratic participation while addressing economic and social inequalities.',
      points: [
        'Strengthening democratic participation',
        'Addressing economic inequalities',
        'Renewing democratic institutions'
      ]
    }
  },
  {
    id: 'economic-models',
    title: 'Economic Models and Development',
    description: 'Examining different economic approaches across the Americas',
    thesis: {
      title: 'Market-Based Development',
      content: 'Market-based economic models have driven significant development across the Americas, creating wealth and opportunity. Free trade agreements and economic liberalization have benefited many countries in the region.',
      points: [
        'Market-driven development',
        'Free trade benefits',
        'Economic liberalization success'
      ]
    },
    counterThesis: {
      title: 'Inequality and Dependency',
      content: 'Market-based models have exacerbated inequality and created dependency on external markets. Many countries remain economically vulnerable and dependent on commodity exports.',
      points: [
        'Growing economic inequality',
        'Dependency on external markets',
        'Commodity export vulnerability'
      ]
    },
    synthesis: {
      title: 'Balanced Economic Development',
      content: 'Successful economic development in the Americas requires balancing market mechanisms with social protection and sustainable development. Regional cooperation can help address common challenges.',
      points: [
        'Market and social protection balance',
        'Sustainable development focus',
        'Regional cooperation benefits'
      ]
    }
  }
]

export default function AmericasPage() {
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
              <MapIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h1 className="text-2xl font-bold text-secondary-900">Americas</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Political Philosophy in the Americas
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Exploring democratic systems and economic models across North and South America, 
              examining the diversity of political thought in the Western Hemisphere.
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
              Key Topics in American Politics
            </h2>
            <p className="text-lg text-secondary-600">
              Explore the major themes and issues shaping political discourse across the Americas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Democratic Systems and Institutions',
              'Economic Models and Development',
              'Social Justice and Inequality',
              'Indigenous Rights and Politics',
              'Regional Integration',
              'Environmental Policy'
            ].map((topic) => (
              <div key={topic} className="card text-center hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {topic}
                </h3>
                <p className="text-secondary-600 text-sm">
                  Exploring the intersection of {topic.toLowerCase()} in American contexts.
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
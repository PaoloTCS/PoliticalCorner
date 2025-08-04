import Link from 'next/link'
import { GlobeAltIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const continents = [
  {
    name: 'Asia',
    description: 'Political and economic discussions from Asian perspectives',
    topics: ['Democracy in Asia', 'Economic Development', 'Regional Cooperation'],
    color: 'from-orange-500 to-red-500',
    href: '/continents/asia'
  },
  {
    name: 'Americas',
    description: 'Political philosophy across North and South America',
    topics: ['Democratic Systems', 'Economic Models', 'Social Justice'],
    color: 'from-blue-500 to-green-500',
    href: '/continents/americas'
  },
  {
    name: 'Europe',
    description: 'European political thought and economic systems',
    topics: ['Social Democracy', 'EU Integration', 'Welfare States'],
    color: 'from-purple-500 to-blue-500',
    href: '/continents/europe'
  },
  {
    name: 'Africa',
    description: 'African political philosophy and development',
    topics: ['Post-Colonial Politics', 'Economic Development', 'Pan-Africanism'],
    color: 'from-green-500 to-yellow-500',
    href: '/continents/africa'
  }
]

const features = [
  {
    name: 'Thesis',
    description: 'Presenting the main argument or position',
    icon: AcademicCapIcon,
    color: 'text-green-600'
  },
  {
    name: 'Counter Thesis',
    description: 'Exploring opposing viewpoints and critiques',
    icon: ChartBarIcon,
    color: 'text-red-600'
  },
  {
    name: 'Synthesis',
    description: 'Finding common ground and balanced perspectives',
    icon: GlobeAltIcon,
    color: 'text-blue-600'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GlobeAltIcon className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-2xl font-bold text-secondary-900">
                PoliticalCorner
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/resources" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Resources
              </Link>
              <Link href="/about" className="text-secondary-600 hover:text-primary-600 transition-colors">
                About
              </Link>
              <Link href="/methodology" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Methodology
              </Link>
              <Link href="/contact" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Political Philosophy
              <span className="block text-primary-200">Discussions</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Explore political and economic discussions organized by continents, 
              following the Thesis → Counter Thesis → Synthesis format.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/methodology" className="btn-primary">
                Learn Our Method
              </Link>
              <Link href="#continents" className="btn-secondary">
                Explore Continents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Our Discussion Format
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Each discussion follows a structured approach to ensure balanced and comprehensive analysis.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="card text-center">
                <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy-Continent Matrix */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Political Philosophies Across Continents
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Explore how different political philosophies manifest across geographic regions.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary-100">
                  <th className="text-left p-4 border border-secondary-200 font-semibold">Political Philosophy</th>
                  <th className="text-center p-4 border border-secondary-200 font-semibold">Asia</th>
                  <th className="text-center p-4 border border-secondary-200 font-semibold">Americas</th>
                  <th className="text-center p-4 border border-secondary-200 font-semibold">Europe</th>
                  <th className="text-center p-4 border border-secondary-200 font-semibold">Africa</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary-50">
                  <td className="p-4 border border-secondary-200 font-medium">
                    <Link href="/resources#philosophies" className="text-primary-600 hover:text-primary-700">
                      Natural Rights
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/asia" className="text-secondary-600 hover:text-primary-600">
                      Democracy in Asia
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/americas" className="text-secondary-600 hover:text-primary-600">
                      Democratic Systems
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/europe" className="text-secondary-600 hover:text-primary-600">
                      Social Democracy
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/africa" className="text-secondary-600 hover:text-primary-600">
                      Post-Colonial Rights
                    </Link>
                  </td>
                </tr>
                <tr className="hover:bg-secondary-50">
                  <td className="p-4 border border-secondary-200 font-medium">
                    <Link href="/resources#philosophies" className="text-primary-600 hover:text-primary-700">
                      Classical Republicanism
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/asia" className="text-secondary-600 hover:text-primary-600">
                      Regional Cooperation
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/americas" className="text-secondary-600 hover:text-primary-600">
                      Civic Participation
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/europe" className="text-secondary-600 hover:text-primary-600">
                      EU Integration
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/africa" className="text-secondary-600 hover:text-primary-600">
                      Pan-Africanism
                    </Link>
                  </td>
                </tr>
                <tr className="hover:bg-secondary-50">
                  <td className="p-4 border border-secondary-200 font-medium">
                    <Link href="/resources#philosophies" className="text-primary-600 hover:text-primary-700">
                      Constitutionalism
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/asia" className="text-secondary-600 hover:text-primary-600">
                      Economic Development
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/americas" className="text-secondary-600 hover:text-primary-600">
                      Economic Models
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/europe" className="text-secondary-600 hover:text-primary-600">
                      Welfare States
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/africa" className="text-secondary-600 hover:text-primary-600">
                      Development Models
                    </Link>
                  </td>
                </tr>
                <tr className="hover:bg-secondary-50">
                  <td className="p-4 border border-secondary-200 font-medium">
                    <Link href="/resources#philosophies" className="text-primary-600 hover:text-primary-700">
                      Social Contract
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/asia" className="text-secondary-600 hover:text-primary-600">
                      Cultural Adaptation
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/americas" className="text-secondary-600 hover:text-primary-600">
                      Social Justice
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/europe" className="text-secondary-600 hover:text-primary-600">
                      Democratic Governance
                    </Link>
                  </td>
                  <td className="p-4 border border-secondary-200 text-center">
                    <Link href="/continents/africa" className="text-secondary-600 hover:text-primary-600">
                      Sovereignty
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/resources" className="btn-primary">
              Explore All Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Continents Section */}
      <section id="continents" className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Explore by Continent
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover political and economic discussions from different geographic perspectives.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {continents.map((continent) => (
              <Link key={continent.name} href={continent.href}>
                <div className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <div className={`w-full h-32 rounded-lg mb-4 bg-gradient-to-r ${continent.color}`} />
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    {continent.name}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-3">
                    {continent.description}
                  </p>
                  <div className="space-y-1">
                    {continent.topics.map((topic) => (
                      <span key={topic} className="inline-block bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PoliticalCorner</h3>
              <p className="text-secondary-300">
                A platform for thoughtful political and economic discussions, 
                organized by continents with balanced perspectives.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/resources" className="text-secondary-300 hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="/about" className="text-secondary-300 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/methodology" className="text-secondary-300 hover:text-white transition-colors">Methodology</Link></li>
                <li><Link href="/contact" className="text-secondary-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Continents</h4>
              <ul className="space-y-2">
                {continents.map((continent) => (
                  <li key={continent.name}>
                    <Link href={continent.href} className="text-secondary-300 hover:text-white transition-colors">
                      {continent.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
            <p className="text-secondary-300">
              © 2024 PoliticalCorner. Created by PaoloTCS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
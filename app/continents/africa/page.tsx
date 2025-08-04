import Link from 'next/link'
import { ArrowLeftIcon, MapIcon, AcademicCapIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline'

const discussions = [
  {
    id: 'post-colonial-politics',
    title: 'Post-Colonial Politics and Development',
    description: 'Examining the political evolution of African nations after independence',
    thesis: {
      title: 'Independence and Self-Determination',
      content: 'African independence movements represented a crucial step toward self-determination and political autonomy. The post-colonial period has seen significant progress in nation-building, democratic institutions, and economic development across many African countries.',
      points: [
        'Self-determination achievements',
        'Democratic institution building',
        'Economic development progress'
      ]
    },
    counterThesis: {
      title: 'Neocolonial Dependencies',
      content: 'Post-colonial African nations continue to face neocolonial dependencies, with external powers maintaining economic and political influence. Many countries struggle with corruption, authoritarianism, and economic underdevelopment.',
      points: [
        'Continued external dependencies',
        'Corruption and authoritarianism',
        'Economic underdevelopment challenges'
      ]
    },
    synthesis: {
      title: 'Balanced Development Path',
      content: 'African nations need to balance external cooperation with internal sovereignty, learning from both colonial legacies and indigenous traditions. Success requires addressing both internal governance challenges and external dependencies.',
      points: [
        'External cooperation with sovereignty',
        'Learning from diverse traditions',
        'Addressing governance challenges'
      ]
    }
  },
  {
    id: 'pan-africanism',
    title: 'Pan-Africanism and Regional Integration',
    description: 'Analyzing the role of Pan-Africanism in modern African politics',
    thesis: {
      title: 'Unity and Cooperation Benefits',
      content: 'Pan-Africanism provides a framework for African unity, cooperation, and collective development. Regional organizations like the African Union demonstrate the benefits of continental cooperation in addressing common challenges.',
      points: [
        'Framework for African unity',
        'Collective development benefits',
        'Regional organization success'
      ]
    },
    counterThesis: {
      title: 'National Sovereignty Concerns',
      content: 'Pan-African initiatives often conflict with national sovereignty and local priorities. Many regional integration efforts have failed to deliver concrete benefits to ordinary citizens.',
      points: [
        'National sovereignty conflicts',
        'Failed integration efforts',
        'Limited citizen benefits'
      ]
    },
    synthesis: {
      title: 'Flexible Regional Cooperation',
      content: 'Successful Pan-African cooperation requires flexible approaches that respect national sovereignty while promoting regional benefits. The focus should be on practical cooperation rather than rigid integration.',
      points: [
        'Flexible cooperation approaches',
        'Respect for national sovereignty',
        'Practical regional benefits'
      ]
    }
  }
]

export default function AfricaPage() {
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
              <MapIcon className="h-6 w-6 text-green-500 mr-2" />
              <h1 className="text-2xl font-bold text-secondary-900">Africa</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Political Philosophy in Africa
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Exploring African political thought, post-colonial development, and the 
              evolution of governance across the continent.
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
              Key Topics in African Politics
            </h2>
            <p className="text-lg text-secondary-600">
              Explore the major themes and issues shaping political discourse across Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Post-Colonial Politics and Development',
              'Pan-Africanism and Regional Integration',
              'Democracy and Governance',
              'Economic Development Models',
              'Indigenous Political Systems',
              'Resource Politics and Development'
            ].map((topic) => (
              <div key={topic} className="card text-center hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {topic}
                </h3>
                <p className="text-secondary-600 text-sm">
                  Exploring the intersection of {topic.toLowerCase()} in African contexts.
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
              <Link href="/continents/europe" className="card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Europe</h3>
                <p className="text-secondary-300 text-sm">
                  European political thought and economic systems
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
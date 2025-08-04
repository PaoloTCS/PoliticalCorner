import Link from 'next/link'
import { ArrowLeftIcon, BookOpenIcon, AcademicCapIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function MachiavelliPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/resources" className="flex items-center text-secondary-600 hover:text-primary-600 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Resources
              </Link>
            </div>
            <div className="flex items-center">
              <AcademicCapIcon className="h-6 w-6 text-primary-600 mr-2" />
              <h1 className="text-2xl font-bold text-secondary-900">Niccolò Machiavelli</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Niccolò Machiavelli
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-4">
              1469-1527
            </p>
            <p className="text-lg text-red-200 max-w-3xl mx-auto">
              Italian Renaissance political philosopher, diplomat, and historian, 
              known for his realistic approach to political power and governance
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Key Information */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Key Information</h2>
              <div className="space-y-3 text-secondary-600">
                <p><strong>Born:</strong> May 3, 1469, Florence, Republic of Florence</p>
                <p><strong>Died:</strong> June 21, 1527, Florence, Republic of Florence</p>
                <p><strong>Education:</strong> University of Florence</p>
                <p><strong>Profession:</strong> Political Philosopher, Diplomat, Historian</p>
                <p><strong>Era:</strong> Renaissance</p>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Key Works</h2>
              <ul className="space-y-2 text-secondary-600">
                <li>• The Prince (1532)</li>
                <li>• Discourses on Livy (1531)</li>
                <li>• The Art of War (1521)</li>
                <li>• Florentine Histories (1532)</li>
                <li>• Mandragola (1518)</li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Detailed Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Core Ideas */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Core Political Ideas</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Realpolitik</h3>
                  <p className="text-secondary-600 mb-3">
                    Machiavelli's most famous contribution is his realistic approach to politics, 
                    emphasizing practical considerations over moral or idealistic concerns. He argued 
                    that political leaders must sometimes use morally questionable means to achieve 
                    political ends.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-red-800 text-sm italic">
                      "It is better to be feared than loved, if you cannot be both."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Virtù</h3>
                  <p className="text-secondary-600 mb-3">
                    Machiavelli's concept of virtù refers to the qualities needed for political 
                    success: strength, skill, and adaptability. A successful leader must be able 
                    to respond to changing circumstances and maintain power through both force and 
                    cunning.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-red-800 text-sm italic">
                      "The lion cannot protect himself from traps, and the fox cannot defend himself 
                      from wolves. One must therefore be a fox to recognize traps, and a lion to 
                      frighten wolves."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Republican Government</h3>
                  <p className="text-secondary-600 mb-3">
                    Despite his reputation for advocating authoritarian rule, Machiavelli was a 
                    strong advocate for republican government. In his Discourses on Livy, he 
                    praised the Roman Republic as a model of good governance.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-red-800 text-sm italic">
                      "The people are more prudent, more stable, and of better judgment than a prince."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Fortune and Free Will</h3>
                  <p className="text-secondary-600 mb-3">
                    Machiavelli argued that while fortune (chance) plays a role in political success, 
                    human agency and virtù can overcome fortune. Leaders must be prepared to adapt 
                    to changing circumstances.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-red-800 text-sm italic">
                      "Fortune is a woman, and it is necessary, if you wish to master her, to 
                      conquer her by force."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Influence */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Historical Influence</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Political Realism</h3>
                  <p className="text-secondary-600">
                    Machiavelli's realistic approach to politics influenced the development of 
                    political realism in international relations and political theory.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Republican Thought</h3>
                  <p className="text-secondary-600">
                    His advocacy for republican government influenced later thinkers like James 
                    Madison and the American Founding Fathers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Leadership Theory</h3>
                  <p className="text-secondary-600">
                    Machiavelli's insights about leadership and power dynamics continue to inform 
                    modern leadership studies and political psychology.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Political Science</h3>
                  <p className="text-secondary-600">
                    His empirical approach to studying politics helped establish political science 
                    as a discipline separate from moral philosophy.
                  </p>
                </div>
              </div>
            </div>

            {/* Contemporary Relevance */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Contemporary Relevance</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">International Relations</h3>
                  <p className="text-secondary-600">
                    Machiavelli's insights about power dynamics and state behavior remain relevant 
                    in modern international relations theory.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Political Leadership</h3>
                  <p className="text-secondary-600">
                    His analysis of leadership qualities and the challenges of maintaining power 
                    continues to inform studies of political leadership.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Democratic Theory</h3>
                  <p className="text-secondary-600">
                    Machiavelli's republican ideas about popular participation and institutional 
                    design influence modern democratic theory.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Discussions */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Related Discussions</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/continents/europe" className="card hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">EU Integration</h3>
                  <p className="text-secondary-600 text-sm">
                    Explore how Machiavelli's ideas about power and governance apply to European integration.
                  </p>
                </Link>
                
                <Link href="/continents/asia" className="card hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Democracy in Asia</h3>
                  <p className="text-secondary-600 text-sm">
                    Examine how Machiavelli's insights about political power manifest in Asian political systems.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
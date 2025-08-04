import Link from 'next/link'
import { ArrowLeftIcon, BookOpenIcon, AcademicCapIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function LockePage() {
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
              <h1 className="text-2xl font-bold text-secondary-900">John Locke</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              John Locke
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              1632-1704
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              English philosopher and physician, widely regarded as one of the most influential 
              Enlightenment thinkers and the "Father of Liberalism"
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
                <p><strong>Born:</strong> August 29, 1632, Wrington, Somerset, England</p>
                <p><strong>Died:</strong> October 28, 1704, High Laver, Essex, England</p>
                <p><strong>Education:</strong> Christ Church, Oxford</p>
                <p><strong>Profession:</strong> Philosopher, Physician, Political Theorist</p>
                <p><strong>Era:</strong> Enlightenment</p>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Key Works</h2>
              <ul className="space-y-2 text-secondary-600">
                <li>• Two Treatises of Government (1689)</li>
                <li>• An Essay Concerning Human Understanding (1689)</li>
                <li>• A Letter Concerning Toleration (1689)</li>
                <li>• Some Thoughts Concerning Education (1693)</li>
                <li>• The Reasonableness of Christianity (1695)</li>
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
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Natural Rights</h3>
                  <p className="text-secondary-600 mb-3">
                    Locke argued that individuals have natural rights to life, liberty, and property 
                    that exist independently of government. These rights are inalienable and cannot 
                    be surrendered.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-blue-800 text-sm italic">
                      "The state of nature has a law of nature to govern it, which obliges every one: 
                      and reason, which is that law, teaches all mankind, who will but consult it, 
                      that being all equal and independent, no one ought to harm another in his life, 
                      health, liberty, or possessions."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Social Contract Theory</h3>
                  <p className="text-secondary-600 mb-3">
                    Locke's version of the social contract emphasizes consent and limited government. 
                    Individuals consent to form government to protect their natural rights, but retain 
                    the right to revolution if government violates the contract.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-blue-800 text-sm italic">
                      "The only way whereby any one divests himself of his natural liberty, and puts 
                      on the bonds of civil society, is by agreeing with other men to join and unite 
                      into a community for their comfortable, safe, and peaceable living one amongst another."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Limited Government</h3>
                  <p className="text-secondary-600 mb-3">
                    Locke advocated for government with limited powers, separated branches, and 
                    constitutional constraints. Government exists to protect rights, not to grant them.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-blue-800 text-sm italic">
                      "The end of law is not to abolish or restrain, but to preserve and enlarge freedom."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Religious Toleration</h3>
                  <p className="text-secondary-600 mb-3">
                    Locke argued for religious tolerance and separation of church and state, 
                    believing that religious belief cannot be coerced and that government should 
                    not interfere in matters of conscience.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-blue-800 text-sm italic">
                      "The care of souls cannot belong to the civil magistrate, because his power 
                      consists only in outward force; but true and saving religion consists in the 
                      inward persuasion of the mind."
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
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">American Revolution</h3>
                  <p className="text-secondary-600">
                    Locke's ideas directly influenced the American Declaration of Independence and 
                    Constitution. Thomas Jefferson drew heavily from Locke's natural rights theory 
                    and social contract ideas.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Liberal Democracy</h3>
                  <p className="text-secondary-600">
                    Locke's emphasis on individual rights, limited government, and consent of the 
                    governed became foundational principles of liberal democracy worldwide.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Constitutionalism</h3>
                  <p className="text-secondary-600">
                    Locke's ideas about government structure and limitations influenced the development 
                    of constitutional government and the separation of powers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Human Rights</h3>
                  <p className="text-secondary-600">
                    Locke's natural rights theory provided the philosophical foundation for modern 
                    human rights concepts and international law.
                  </p>
                </div>
              </div>
            </div>

            {/* Contemporary Relevance */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Contemporary Relevance</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Democratic Theory</h3>
                  <p className="text-secondary-600">
                    Locke's ideas about consent and popular sovereignty continue to inform modern 
                    democratic theory and practice.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Property Rights</h3>
                  <p className="text-secondary-600">
                    Locke's theory of property rights remains influential in debates about economic 
                    policy and wealth distribution.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Religious Freedom</h3>
                  <p className="text-secondary-600">
                    Locke's arguments for religious toleration continue to be relevant in discussions 
                    about religious freedom and secular government.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Discussions */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Related Discussions</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/continents/americas" className="card hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Democratic Systems in the Americas</h3>
                  <p className="text-secondary-600 text-sm">
                    Explore how Locke's ideas influenced democratic development in North and South America.
                  </p>
                </Link>
                
                <Link href="/continents/europe" className="card hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Social Democracy in Europe</h3>
                  <p className="text-secondary-600 text-sm">
                    Examine how Locke's liberalism evolved into European social democratic traditions.
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
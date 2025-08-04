import Link from 'next/link'
import { ArrowLeftIcon, BookOpenIcon, UserIcon, AcademicCapIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const politicalPhilosophies = [
  {
    id: 'natural-rights',
    name: 'Natural Rights',
    description: 'The theory that individuals have inherent rights that exist independently of government',
    authors: ['John Locke', 'Thomas Jefferson', 'Thomas Paine'],
    keyWorks: ['Two Treatises of Government', 'Declaration of Independence', 'Rights of Man'],
    themes: ['Individual Liberty', 'Property Rights', 'Limited Government'],
    relatedTopics: ['Democracy', 'Constitutionalism', 'Human Rights']
  },
  {
    id: 'classical-republicanism',
    name: 'Classical Republicanism',
    description: 'Emphasizes civic virtue, mixed government, and the common good over individual interests',
    authors: ['Aristotle', 'Cicero', 'Machiavelli', 'James Madison'],
    keyWorks: ['Politics', 'De Republica', 'The Prince', 'Federalist Papers'],
    themes: ['Civic Virtue', 'Mixed Government', 'Common Good'],
    relatedTopics: ['Democracy', 'Constitutionalism', 'Civic Participation']
  },
  {
    id: 'constitutionalism',
    name: 'Constitutionalism',
    description: 'Government limited by a constitution that protects individual rights and establishes rule of law',
    authors: ['John Locke', 'Montesquieu', 'James Madison'],
    keyWorks: ['Spirit of the Laws', 'Federalist Papers', 'Constitutional Conventions'],
    themes: ['Rule of Law', 'Separation of Powers', 'Limited Government'],
    relatedTopics: ['Democracy', 'Natural Rights', 'Institutional Design']
  },
  {
    id: 'social-contract',
    name: 'Social Contract Theory',
    description: 'Individuals consent to surrender some freedoms in exchange for protection of remaining rights',
    authors: ['Thomas Hobbes', 'John Locke', 'Jean-Jacques Rousseau'],
    keyWorks: ['Leviathan', 'Two Treatises', 'The Social Contract'],
    themes: ['Consent', 'Legitimate Authority', 'Political Obligation'],
    relatedTopics: ['Democracy', 'Natural Rights', 'Political Authority']
  },
  {
    id: 'democracy',
    name: 'Democracy',
    description: 'Government by the people, either directly or through elected representatives',
    authors: ['Pericles', 'John Stuart Mill', 'Robert Dahl'],
    keyWorks: ['Funeral Oration', 'On Liberty', 'Democracy and Its Critics'],
    themes: ['Popular Sovereignty', 'Political Equality', 'Participation'],
    relatedTopics: ['Constitutionalism', 'Classical Republicanism', 'Political Rights']
  },
  {
    id: 'liberalism',
    name: 'Liberalism',
    description: 'Emphasizes individual freedom, equality, and limited government intervention',
    authors: ['John Locke', 'John Stuart Mill', 'Isaiah Berlin'],
    keyWorks: ['Two Treatises', 'On Liberty', 'Two Concepts of Liberty'],
    themes: ['Individual Liberty', 'Tolerance', 'Limited Government'],
    relatedTopics: ['Natural Rights', 'Democracy', 'Constitutionalism']
  },
  {
    id: 'socialism',
    name: 'Socialism',
    description: 'Collective ownership and democratic control of the means of production',
    authors: ['Karl Marx', 'Friedrich Engels', 'Rosa Luxemburg'],
    keyWorks: ['Communist Manifesto', 'Capital', 'Reform or Revolution'],
    themes: ['Collective Ownership', 'Economic Equality', 'Worker Control'],
    relatedTopics: ['Economic Democracy', 'Social Justice', 'Class Analysis']
  },
  {
    id: 'conservatism',
    name: 'Conservatism',
    description: 'Preservation of traditional institutions and gradual, organic change',
    authors: ['Edmund Burke', 'Michael Oakeshott', 'Russell Kirk'],
    keyWorks: ['Reflections on the Revolution in France', 'Rationalism in Politics'],
    themes: ['Tradition', 'Organic Change', 'Institutional Wisdom'],
    relatedTopics: ['Constitutionalism', 'Classical Republicanism', 'Social Order']
  }
]

const ancientGreekPhilosophy = [
  {
    id: 'plato',
    name: 'Plato',
    period: '428-348 BCE',
    keyWorks: ['The Republic', 'The Laws', 'The Statesman'],
    themes: ['Philosopher Kings', 'Justice', 'Ideal State'],
    influence: 'Foundation of Western political philosophy'
  },
  {
    id: 'aristotle',
    name: 'Aristotle',
    period: '384-322 BCE',
    keyWorks: ['Politics', 'Nicomachean Ethics', 'Constitution of Athens'],
    themes: ['Mixed Government', 'Civic Virtue', 'Natural Law'],
    influence: 'Empirical approach to political science'
  },
  {
    id: 'pericles',
    name: 'Pericles',
    period: '495-429 BCE',
    keyWorks: ['Funeral Oration', 'Democratic Reforms'],
    themes: ['Athenian Democracy', 'Civic Participation', 'Public Oratory'],
    influence: 'Model of democratic leadership'
  }
]

const renaissanceThinkers = [
  {
    id: 'machiavelli',
    name: 'Niccolò Machiavelli',
    period: '1469-1527',
    keyWorks: ['The Prince', 'Discourses on Livy'],
    themes: ['Realpolitik', 'Virtù', 'Republican Government'],
    influence: 'Realistic approach to political power'
  },
  {
    id: 'more',
    name: 'Thomas More',
    period: '1478-1535',
    keyWorks: ['Utopia'],
    themes: ['Ideal Society', 'Social Justice', 'Humanism'],
    influence: 'Utopian political thought'
  }
]

const enlightenmentThinkers = [
  {
    id: 'hobbes',
    name: 'Thomas Hobbes',
    period: '1588-1679',
    keyWorks: ['Leviathan', 'De Cive'],
    themes: ['Social Contract', 'Absolute Sovereignty', 'State of Nature'],
    influence: 'Foundation of modern political theory'
  },
  {
    id: 'locke',
    name: 'John Locke',
    period: '1632-1704',
    keyWorks: ['Two Treatises of Government', 'Letter Concerning Toleration'],
    themes: ['Natural Rights', 'Limited Government', 'Toleration'],
    influence: 'Liberal political theory'
  },
  {
    id: 'rousseau',
    name: 'Jean-Jacques Rousseau',
    period: '1712-1778',
    keyWorks: ['The Social Contract', 'Discourse on Inequality'],
    themes: ['General Will', 'Popular Sovereignty', 'Direct Democracy'],
    influence: 'Democratic theory and romanticism'
  },
  {
    id: 'montesquieu',
    name: 'Baron de Montesquieu',
    period: '1689-1755',
    keyWorks: ['The Spirit of the Laws'],
    themes: ['Separation of Powers', 'Constitutional Government', 'Political Liberty'],
    influence: 'Constitutional design'
  }
]

const modernThinkers = [
  {
    id: 'mill',
    name: 'John Stuart Mill',
    period: '1806-1873',
    keyWorks: ['On Liberty', 'Considerations on Representative Government'],
    themes: ['Individual Liberty', 'Harm Principle', 'Representative Democracy'],
    influence: 'Liberal democracy and utilitarianism'
  },
  {
    id: 'marx',
    name: 'Karl Marx',
    period: '1818-1883',
    keyWorks: ['Communist Manifesto', 'Capital', 'The German Ideology'],
    themes: ['Class Struggle', 'Historical Materialism', 'Revolution'],
    influence: 'Socialist and communist movements'
  },
  {
    id: 'tocqueville',
    name: 'Alexis de Tocqueville',
    period: '1805-1859',
    keyWorks: ['Democracy in America', 'The Old Regime and the Revolution'],
    themes: ['Democratic Society', 'Civil Society', 'Tyranny of Majority'],
    influence: 'Democratic theory and civil society'
  }
]

export default function ResourcesPage() {
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
              <BookOpenIcon className="h-6 w-6 text-primary-600 mr-2" />
              <h1 className="text-2xl font-bold text-secondary-900">Resources</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Political Philosophy Resources
          </h1>
          <p className="text-xl text-secondary-600">
            Explore political philosophies, key authors, and themes that shape our discussions
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Navigation */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Navigation</h2>
              <nav className="space-y-2">
                <a href="#philosophies" className="block text-primary-600 hover:text-primary-700 font-medium">
                  Political Philosophies
                </a>
                <a href="#ancient-greek" className="block text-secondary-600 hover:text-primary-600">
                  Ancient Greek Philosophy
                </a>
                <a href="#renaissance" className="block text-secondary-600 hover:text-primary-600">
                  Renaissance Thinkers
                </a>
                <a href="#enlightenment" className="block text-secondary-600 hover:text-primary-600">
                  Enlightenment Thinkers
                </a>
                <a href="#modern" className="block text-secondary-600 hover:text-primary-600">
                  Modern Thinkers
                </a>
              </nav>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Political Philosophies */}
            <section id="philosophies">
              <div className="flex items-center mb-6">
                <AcademicCapIcon className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900">Political Philosophies</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {politicalPhilosophies.map((philosophy) => (
                  <div key={philosophy.id} className="card hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                      {philosophy.name}
                    </h3>
                    <p className="text-secondary-600 mb-4">
                      {philosophy.description}
                    </p>
                                         <div className="space-y-2">
                       <div>
                         <span className="font-medium text-secondary-900">Key Authors:</span>
                         <p className="text-secondary-600 text-sm">
                           {philosophy.authors.map((author, index) => (
                             <span key={author}>
                               {author === 'John Locke' ? (
                                 <Link href="/authors/locke" className="text-primary-600 hover:text-primary-700 underline">
                                   {author}
                                 </Link>
                               ) : (
                                 author
                               )}
                               {index < philosophy.authors.length - 1 ? ', ' : ''}
                             </span>
                           ))}
                         </p>
                       </div>
                      <div>
                        <span className="font-medium text-secondary-900">Key Works:</span>
                        <p className="text-secondary-600 text-sm">{philosophy.keyWorks.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Themes:</span>
                        <p className="text-secondary-600 text-sm">{philosophy.themes.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Related Topics:</span>
                        <p className="text-secondary-600 text-sm">{philosophy.relatedTopics.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Ancient Greek Philosophy */}
            <section id="ancient-greek">
              <div className="flex items-center mb-6">
                <GlobeAltIcon className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900">Ancient Greek Philosophy</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {ancientGreekPhilosophy.map((thinker) => (
                  <div key={thinker.id} className="card hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      {thinker.name}
                    </h3>
                    <p className="text-secondary-500 text-sm mb-3">{thinker.period}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-secondary-900">Key Works:</span>
                        <p className="text-secondary-600 text-sm">{thinker.keyWorks.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Themes:</span>
                        <p className="text-secondary-600 text-sm">{thinker.themes.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Influence:</span>
                        <p className="text-secondary-600 text-sm">{thinker.influence}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Renaissance Thinkers */}
            <section id="renaissance">
              <div className="flex items-center mb-6">
                <UserIcon className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900">Renaissance Thinkers</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {renaissanceThinkers.map((thinker) => (
                  <div key={thinker.id} className="card hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      {thinker.name}
                    </h3>
                    <p className="text-secondary-500 text-sm mb-3">{thinker.period}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-secondary-900">Key Works:</span>
                        <p className="text-secondary-600 text-sm">{thinker.keyWorks.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Themes:</span>
                        <p className="text-secondary-600 text-sm">{thinker.themes.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Influence:</span>
                        <p className="text-secondary-600 text-sm">{thinker.influence}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Enlightenment Thinkers */}
            <section id="enlightenment">
              <div className="flex items-center mb-6">
                <BookOpenIcon className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900">Enlightenment Thinkers</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {enlightenmentThinkers.map((thinker) => (
                  <div key={thinker.id} className="card hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      {thinker.name}
                    </h3>
                    <p className="text-secondary-500 text-sm mb-3">{thinker.period}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-secondary-900">Key Works:</span>
                        <p className="text-secondary-600 text-sm">{thinker.keyWorks.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Themes:</span>
                        <p className="text-secondary-600 text-sm">{thinker.themes.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Influence:</span>
                        <p className="text-secondary-600 text-sm">{thinker.influence}</p>
                      </div>
                                             {thinker.name === 'John Locke' && (
                         <div className="pt-2">
                           <Link href="/authors/locke" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                             Read More About John Locke →
                           </Link>
                         </div>
                       )}
                       {thinker.name === 'Niccolò Machiavelli' && (
                         <div className="pt-2">
                           <Link href="/authors/machiavelli" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                             Read More About Machiavelli →
                           </Link>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Modern Thinkers */}
            <section id="modern">
              <div className="flex items-center mb-6">
                <AcademicCapIcon className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-secondary-900">Modern Thinkers</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {modernThinkers.map((thinker) => (
                  <div key={thinker.id} className="card hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      {thinker.name}
                    </h3>
                    <p className="text-secondary-500 text-sm mb-3">{thinker.period}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-secondary-900">Key Works:</span>
                        <p className="text-secondary-600 text-sm">{thinker.keyWorks.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Themes:</span>
                        <p className="text-secondary-600 text-sm">{thinker.themes.join(', ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900">Influence:</span>
                        <p className="text-secondary-600 text-sm">{thinker.influence}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 
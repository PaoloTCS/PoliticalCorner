import Link from 'next/link'
import { ArrowLeftIcon, ChatBubbleLeftRightIcon, SparklesIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const debateThemes = [
  {
    id: 'rule-of-law',
    name: 'Rule of Law',
    description: 'The principle that all people and institutions are subject to and accountable to law that is fairly applied and enforced',
    philosophers: ['F.A. Hayek', 'John Locke', 'Montesquieu'],
    keyQuestions: [
      'What constitutes legitimate law?',
      'How should law be applied equally?',
      'What limits should exist on government power?'
    ]
  },
  {
    id: 'separation-of-powers',
    name: 'Separation of Powers',
    description: 'The division of government responsibilities into distinct branches to prevent concentration of power',
    philosophers: ['Montesquieu', 'James Madison', 'John Locke'],
    keyQuestions: [
      'How should powers be divided?',
      'What checks and balances are necessary?',
      'How to prevent tyranny while maintaining efficiency?'
    ]
  },
  {
    id: 'limited-government',
    name: 'Limited Government',
    description: 'Government restricted in scope and power to protect individual liberties',
    philosophers: ['John Locke', 'F.A. Hayek', 'Milton Friedman'],
    keyQuestions: [
      'What are the proper limits of government?',
      'How to balance security and liberty?',
      'What role should government play in the economy?'
    ]
  },
  {
    id: 'democracy',
    name: 'Democracy',
    description: 'Government by the people, either directly or through elected representatives',
    philosophers: ['Pericles', 'John Stuart Mill', 'Alexis de Tocqueville'],
    keyQuestions: [
      'What makes democracy legitimate?',
      'How to protect minority rights?',
      'What is the role of civic participation?'
    ]
  },
  {
    id: 'economic-freedom',
    name: 'Economic Freedom',
    description: 'The ability of individuals to make economic decisions without government interference',
    philosophers: ['Milton Friedman', 'F.A. Hayek', 'Adam Smith'],
    keyQuestions: [
      'What is the proper role of markets?',
      'How to balance efficiency and equity?',
      'What economic rights should be protected?'
    ]
  },
  {
    id: 'social-contract',
    name: 'Social Contract',
    description: 'The implicit agreement among members of a society to cooperate for social benefits',
    philosophers: ['Thomas Hobbes', 'John Locke', 'Jean-Jacques Rousseau'],
    keyQuestions: [
      'What justifies political authority?',
      'What are the terms of the social contract?',
      'How to balance individual and collective interests?'
    ]
  }
]

export default function AIDebatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Political Debates</h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Watch AI models debate fundamental questions of political philosophy
          </p>
          <p className="text-lg text-gray-500">
            Choose a theme and watch ChatGPT and Claude debate the great questions of political thought
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <SparklesIcon className="h-8 w-8 text-purple-600 mr-3" />
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose a Theme</h3>
              <p className="text-gray-600">Select from fundamental political philosophy themes like Rule of Law, Democracy, or Economic Freedom</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Debate</h3>
              <p className="text-gray-600">Watch ChatGPT and Claude engage in a structured debate, each defending different philosophical positions</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn & Reflect</h3>
              <p className="text-gray-600">Gain insights from multiple perspectives and form your own conclusions about these fundamental questions</p>
            </div>
          </div>
        </div>

        {/* Debate Themes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <AcademicCapIcon className="h-8 w-8 text-purple-600 mr-3" />
            Choose a Debate Theme
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {debateThemes.map((theme) => (
              <div key={theme.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{theme.name}</h3>
                <p className="text-gray-600 mb-4">{theme.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Philosophers:</h4>
                  <p className="text-sm text-gray-600">{theme.philosophers.join(', ')}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Questions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {theme.keyQuestions.map((question, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={`/ai-debates/${theme.id}`}
                  className="btn-primary w-full text-center"
                >
                  Start Debate →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Debates */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Debates</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Rule of Law vs. Government Discretion</h3>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <p className="text-gray-600 mb-3">
                ChatGPT argued for strict adherence to written law, while Claude defended the need for judicial discretion in complex cases.
              </p>
              <div className="flex space-x-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">ChatGPT</span>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Claude</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Rule of Law</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Market Freedom vs. Government Regulation</h3>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
              <p className="text-gray-600 mb-3">
                Claude defended free market principles while ChatGPT argued for strategic government intervention in key sectors.
              </p>
              <div className="flex space-x-2">
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Claude</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">ChatGPT</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Economic Freedom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href="/" className="btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 
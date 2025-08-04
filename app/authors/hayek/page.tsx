import Link from 'next/link'

export default function HayekPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">F.A. Hayek</h1>
          <p className="text-xl text-gray-600">1899-1992 • Austrian School Economist</p>
          <p className="text-lg text-gray-500 mt-2">Nobel Prize in Economics (1974)</p>
        </div>

        {/* Key Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Works</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <em>The Road to Serfdom</em> (1944)</li>
              <li>• <em>The Constitution of Liberty</em> (1960)</li>
              <li>• <em>Law, Legislation and Liberty</em> (1973-1979)</li>
              <li>• <em>The Fatal Conceit</em> (1988)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Ideas</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Spontaneous Order</li>
              <li>• Knowledge Problem</li>
              <li>• Rule of Law</li>
              <li>• Market Process Theory</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Influence</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Classical Liberalism</li>
              <li>• Austrian Economics</li>
              <li>• Constitutional Economics</li>
              <li>• Free Market Advocacy</li>
            </ul>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {/* Spontaneous Order */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Spontaneous Order</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Hayek's most profound insight was the concept of spontaneous order - the idea that complex social systems 
                emerge naturally from human action but not human design. Markets, language, law, and culture all develop 
                through decentralized processes rather than central planning.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
                "The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design."
              </blockquote>
            </div>
          </div>

          {/* Knowledge Problem */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Knowledge Problem</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Hayek argued that knowledge in society is dispersed among millions of individuals, each possessing unique 
                information about their circumstances. No central planner could possibly gather and process all this 
                information, making central planning inherently inefficient.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
                "The knowledge of the circumstances of which we must make use never exists in concentrated or integrated form, 
                but solely as the dispersed bits of incomplete and frequently contradictory knowledge which all the separate 
                individuals possess."
              </blockquote>
            </div>
          </div>

          {/* Rule of Law */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Rule of Law</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Hayek emphasized that true freedom requires the rule of law - general, abstract rules that apply equally 
                to everyone, rather than specific commands from authorities. This creates a framework for peaceful 
                cooperation while protecting individual liberty.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
                "The Rule of Law means that government in all its actions is bound by rules fixed and announced beforehand."
              </blockquote>
            </div>
          </div>

          {/* Market Process */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Process Theory</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Hayek viewed markets as discovery processes where entrepreneurs discover new opportunities and coordinate 
                dispersed knowledge through price signals. Competition drives innovation and reveals what consumers actually want.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
                "Competition is essentially a process of the formation of opinion: by spreading information, it creates 
                that unity and coherence of the economic system which we presuppose when we think of it as one market."
              </blockquote>
            </div>
          </div>

          {/* Historical Influence */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Historical Influence</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Hayek's work influenced the revival of classical liberal thought in the 20th century. His critique of 
                socialism and defense of free markets provided intellectual ammunition for the conservative and libertarian 
                movements. His ideas continue to shape debates about the proper role of government in the economy.
              </p>
              <p className="text-lg text-gray-700">
                His warnings about the dangers of central planning and his defense of individual liberty remain relevant 
                in contemporary discussions about economic policy, regulation, and the balance between state and market.
              </p>
            </div>
          </div>

          {/* Contemporary Relevance */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contemporary Relevance</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Hayek's insights remain crucial for understanding:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-4">
                <li>The limitations of central planning and regulation</li>
                <li>The importance of decentralized decision-making</li>
                <li>The role of institutions in economic development</li>
                <li>The relationship between freedom and prosperity</li>
              </ul>
              <p className="text-lg text-gray-700">
                His work continues to inform debates about cryptocurrency, platform economics, and the digital transformation 
                of markets.
              </p>
            </div>
          </div>
        </div>

        {/* Related Discussions */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Discussions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Economic Systems</h3>
              <p className="text-gray-700 mb-4">Explore how Hayek's ideas relate to different economic models across continents.</p>
              <Link href="/continents/europe" className="btn-primary">
                European Economic Models →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Market vs. Planning</h3>
              <p className="text-gray-700 mb-4">Compare market-based and planned economic approaches in different regions.</p>
              <Link href="/continents/asia" className="btn-primary">
                Asian Development Models →
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href="/resources" className="btn-secondary">
            ← Back to Resources
          </Link>
        </div>
      </div>
    </div>
  )
} 
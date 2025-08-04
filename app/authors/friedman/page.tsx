import Link from 'next/link'

export default function FriedmanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Milton Friedman</h1>
          <p className="text-xl text-gray-600">1912-2006 • Monetarist Economist</p>
          <p className="text-lg text-gray-500 mt-2">Nobel Prize in Economics (1976)</p>
        </div>

        {/* Key Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Works</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <em>Capitalism and Freedom</em> (1962)</li>
              <li>• <em>Free to Choose</em> (1980)</li>
              <li>• <em>A Monetary History of the United States</em> (1963)</li>
              <li>• <em>Price Theory</em> (1976)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Ideas</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Monetarism</li>
              <li>• Free Market Advocacy</li>
              <li>• School Choice</li>
              <li>• Negative Income Tax</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Influence</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Chicago School</li>
              <li>• Economic Policy</li>
              <li>• Public Choice Theory</li>
              <li>• Market Liberalism</li>
            </ul>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {/* Monetarism */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Monetarism</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Friedman's most significant contribution was the development of monetarism - the theory that the money supply 
                is the primary determinant of economic activity and inflation. He argued that stable monetary policy, not 
                fiscal policy, was the key to economic stability.
              </p>
              <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600">
                "Inflation is always and everywhere a monetary phenomenon in the sense that it is and can be produced only 
                by a more rapid increase in the quantity of money than in output."
              </blockquote>
            </div>
          </div>

          {/* Free Market Advocacy */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Free Market Advocacy</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Friedman was a passionate defender of free markets and individual liberty. He argued that economic freedom 
                is essential for political freedom, and that government intervention often creates more problems than it solves.
              </p>
              <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600">
                "The most important single central fact about a free market is that no exchange takes place unless both 
                parties benefit."
              </blockquote>
            </div>
          </div>

          {/* School Choice */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">School Choice</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Friedman advocated for school vouchers and educational choice, arguing that competition would improve 
                educational quality and give parents more control over their children's education. This idea has influenced 
                education reform movements worldwide.
              </p>
              <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600">
                "The only way to improve the quality of education is to introduce competition and give parents a choice."
              </blockquote>
            </div>
          </div>

          {/* Negative Income Tax */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Negative Income Tax</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Friedman proposed a negative income tax as a more efficient alternative to traditional welfare programs. 
                This would provide a guaranteed minimum income while preserving work incentives and reducing bureaucratic overhead.
              </p>
              <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600">
                "The negative income tax would provide an assured minimum to all persons in need, regardless of the reasons 
                for their need, while doing so in a way that would not reduce the incentives of those helped to help themselves."
              </blockquote>
            </div>
          </div>

          {/* Historical Influence */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Historical Influence</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Friedman's influence on economic policy was profound. His ideas shaped the economic policies of Ronald Reagan 
                and Margaret Thatcher, leading to deregulation, privatization, and monetary policy reforms. His work continues 
                to influence central banking and economic policy worldwide.
              </p>
              <p className="text-lg text-gray-700">
                His popular writings and television series "Free to Choose" brought economic ideas to a broad audience, 
                making complex economic concepts accessible to the general public.
              </p>
            </div>
          </div>

          {/* Contemporary Relevance */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contemporary Relevance</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Friedman's insights remain crucial for understanding:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-4">
                <li>The relationship between monetary policy and inflation</li>
                <li>The benefits of market competition and choice</li>
                <li>The costs of government intervention and regulation</li>
                <li>The importance of individual responsibility and freedom</li>
              </ul>
              <p className="text-lg text-gray-700">
                His ideas continue to inform debates about universal basic income, education reform, healthcare policy, 
                and the role of government in the economy.
              </p>
            </div>
          </div>
        </div>

        {/* Related Discussions */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Discussions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Economic Policy</h3>
              <p className="text-gray-700 mb-4">Explore how Friedman's ideas influence economic policy across different regions.</p>
              <Link href="/continents/americas" className="btn-primary">
                American Economic Models →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Market Reforms</h3>
              <p className="text-gray-700 mb-4">Compare market-oriented reforms and their effects in different countries.</p>
              <Link href="/continents/europe" className="btn-primary">
                European Market Reforms →
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
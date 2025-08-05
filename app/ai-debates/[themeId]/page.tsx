import Link from 'next/link'
import { ChatBubbleLeftRightIcon, UserIcon, SparklesIcon } from '@heroicons/react/24/outline'

const debateData = {
  'rule-of-law': {
    name: 'Rule of Law',
    description: 'The principle that all people and institutions are subject to and accountable to law that is fairly applied and enforced',
    debate: {
      topic: 'Should judicial discretion be limited in favor of strict adherence to written law?',
      chatgpt: {
        position: 'Strict adherence to written law',
        arguments: [
          'Predictability and consistency in legal outcomes',
          'Prevents arbitrary judicial decisions',
          'Protects against judicial activism',
          'Ensures equal treatment under the law'
        ],
        response: `I argue for strict adherence to written law as the foundation of a just legal system. The rule of law requires that judges apply the law as written, not as they wish it to be. This ensures predictability, consistency, and equal treatment for all citizens.

When judges exercise excessive discretion, they essentially become legislators, which violates the separation of powers. The law must be clear, predictable, and applied uniformly. Judicial discretion should be limited to the narrowest possible interpretation of statutory language.

Furthermore, strict adherence prevents the arbitrary exercise of power. Citizens must be able to know in advance what the law requires of them. When judges can interpret laws broadly, it creates uncertainty and undermines the very purpose of having written laws.

The alternative - judicial discretion - leads to inconsistent outcomes and the potential for bias. Different judges might reach different conclusions on similar cases, creating injustice and undermining public confidence in the legal system.`
      },
      claude: {
        position: 'Judicial discretion is necessary for justice',
        arguments: [
          'Laws cannot anticipate all circumstances',
          'Justice requires consideration of context',
          'Prevents unjust outcomes from rigid application',
          'Allows for evolving legal interpretation'
        ],
        response: `I defend the necessity of judicial discretion for achieving true justice. While written laws provide important guidelines, they cannot anticipate every circumstance or nuance that arises in real cases. Rigid application of law can lead to unjust outcomes.

The law is not a machine that can be programmed to handle every situation. Human judgment is essential for interpreting how general principles apply to specific cases. This is especially true in complex situations where multiple legal principles conflict.

Judicial discretion allows courts to consider the unique circumstances of each case while still respecting legal precedent and statutory intent. It prevents the mechanical application of rules that would produce unjust results.

Moreover, the law must evolve with society. Judicial discretion allows for the gradual development of legal principles in response to changing social conditions and new challenges. This is essential for maintaining the relevance and effectiveness of the legal system.

The key is finding the right balance - discretion should be exercised within the framework of established legal principles, not arbitrarily.`
      }
    }
  },
  'separation-of-powers': {
    name: 'Separation of Powers',
    description: 'The division of government responsibilities into distinct branches to prevent concentration of power',
    debate: {
      topic: 'Should the executive branch have more power in times of crisis?',
      chatgpt: {
        position: 'Executive power should be limited even in crises',
        arguments: [
          'Checks and balances prevent abuse of power',
          'Crisis powers can become permanent',
          'Legislative oversight is essential',
          'Constitutional limits protect liberty'
        ],
        response: `I argue that executive power must remain limited even during crises. The separation of powers exists precisely to prevent the concentration of authority that can lead to tyranny. Crisis powers, once granted, often become permanent and are rarely relinquished.

The legislative branch must maintain its oversight role even in emergencies. This ensures that executive actions remain accountable and transparent. The temptation to grant unlimited power during crises is understandable, but history shows that such powers are rarely surrendered voluntarily.

Furthermore, the judiciary must continue to review executive actions to ensure they comply with constitutional limits. The rule of law does not disappear during emergencies - it becomes even more important as a safeguard against abuse.

The alternative - granting unlimited executive power - creates a slippery slope where temporary measures become permanent features of government. This undermines the very democratic principles that the government is supposed to protect.`
      },
      claude: {
        position: 'Executive flexibility is necessary in crises',
        arguments: [
          'Crises require swift, decisive action',
          'Legislative processes are too slow',
          'Executive can act within constitutional bounds',
          'Accountability comes after the crisis'
        ],
        response: `I defend the need for executive flexibility during genuine crises. When national security or public safety is at stake, the executive branch must be able to act swiftly and decisively. Legislative processes, while important for normal governance, are too slow for emergency situations.

The executive can and should act within constitutional bounds while exercising necessary discretion. This doesn't mean unlimited power, but rather the ability to respond quickly to immediate threats while maintaining basic legal and constitutional constraints.

Accountability mechanisms can and should operate after the crisis has passed. The executive should be required to justify its actions to the legislature and judiciary once the immediate threat has been addressed. This provides a balance between necessary flexibility and ultimate accountability.

The key is distinguishing between genuine emergencies and routine governance. In true crises, the executive needs the flexibility to protect public safety while still respecting fundamental constitutional principles.`
      }
    }
  },
  'limited-government': {
    name: 'Limited Government',
    description: 'Government restricted in scope and power to protect individual liberties',
    debate: {
      topic: 'Should government have the power to regulate speech for public safety?',
      chatgpt: {
        position: 'Speech regulation undermines liberty',
        arguments: [
          'Free speech is fundamental to democracy',
          'Regulation leads to censorship',
          'Government cannot be trusted with speech control',
          'Marketplace of ideas is self-correcting'
        ],
        response: `I argue that government should not have the power to regulate speech, even for public safety. Free speech is the foundation of democratic self-government and individual liberty. Once government gains the power to regulate speech, it inevitably leads to censorship and the suppression of dissenting views.

The marketplace of ideas is self-correcting - false or harmful ideas are best countered by more speech, not by government suppression. Government regulation of speech creates a slippery slope where legitimate criticism and dissent are stifled.

History shows that governments cannot be trusted with the power to regulate speech. What begins as regulation of "dangerous" speech often expands to include political opposition and criticism of government itself. This undermines the very democratic principles that government is supposed to protect.

The alternative - allowing free expression while countering harmful speech with more speech - preserves both liberty and public safety.`
      },
      claude: {
        position: 'Limited speech regulation can protect public safety',
        arguments: [
          'Some speech directly incites violence',
          'Public safety justifies limited restrictions',
          'Regulation can be narrowly tailored',
          'Other rights also have limits'
        ],
        response: `I defend the need for limited government regulation of speech when it directly threatens public safety. While free speech is essential to democracy, it is not absolute. Speech that directly incites violence or poses an immediate threat to public safety can and should be regulated.

The key is ensuring that any regulation is narrowly tailored and serves a compelling government interest. This means regulating only speech that poses a clear and present danger, not speech that is merely offensive or controversial.

Other fundamental rights also have reasonable limits - the right to bear arms doesn't include the right to carry weapons into courthouses, and the right to assembly doesn't include the right to block emergency vehicles. Speech should be treated similarly.

Government has a legitimate interest in protecting public safety, and limited speech regulation can serve this interest without undermining democratic principles. The challenge is finding the right balance between liberty and security.`
      }
    }
  }
}

// Generate static params for static export
export async function generateStaticParams() {
  return Object.keys(debateData).map((themeId) => ({
    themeId,
  }))
}

export default function DebatePage({ params }: { params: { themeId: string } }) {
  const themeData = debateData[params.themeId as keyof typeof debateData]

  if (!themeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Debate Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The requested debate theme could not be found.</p>
            <Link href="/ai-debates" className="btn-primary">
              ← Back to AI Debates
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Debate: {themeData.name}</h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">{themeData.description}</p>
          <p className="text-lg text-gray-500">Watch ChatGPT and Claude debate this fundamental question</p>
        </div>

        {/* Debate Topic */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <SparklesIcon className="h-6 w-6 text-purple-600 mr-3" />
            Debate Topic
          </h2>
          <p className="text-xl text-gray-700 font-medium">{themeData.debate.topic}</p>
        </div>

        {/* AI Responses */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* ChatGPT */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">ChatGPT</h3>
                <p className="text-sm text-gray-600">Position: {themeData.debate.chatgpt.position}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Key Arguments:</h4>
              <ul className="space-y-1">
                {themeData.debate.chatgpt.arguments.map((arg, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {arg}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{themeData.debate.chatgpt.response}</p>
            </div>
          </div>

          {/* Claude */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 rounded-full p-2 mr-3">
                <UserIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Claude</h3>
                <p className="text-sm text-gray-600">Position: {themeData.debate.claude.position}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Key Arguments:</h4>
              <ul className="space-y-1">
                {themeData.debate.claude.arguments.map((arg, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    {arg}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{themeData.debate.claude.response}</p>
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              This debate highlights the fundamental tension between competing values in political philosophy. 
              Both AI models present compelling arguments based on different philosophical traditions and priorities.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              The key question is how to balance these competing concerns in practice. Real-world political 
              decisions often require finding the right balance between different principles rather than choosing 
              one over the other entirely.
            </p>
            <p className="text-lg text-gray-700">
              Consider how these arguments might apply to current political debates and what insights they 
              provide for understanding the complexity of political decision-making.
            </p>
          </div>
        </div>

        {/* Related Resources */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore Related Themes</h3>
              <p className="text-gray-600 mb-4">Learn more about the philosophical foundations of these debates.</p>
              <Link href="/resources" className="btn-primary">
                Browse Resources →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Continent Discussions</h3>
              <p className="text-gray-600 mb-4">See how these themes play out in different regions of the world.</p>
              <Link href="/continents" className="btn-primary">
                Explore Continents →
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/ai-debates" className="btn-secondary">
            ← Back to AI Debates
          </Link>
          <Link href="/" className="btn-primary">
            Home
          </Link>
        </div>
      </div>
    </div>
  )
} 
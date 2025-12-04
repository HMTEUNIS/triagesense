import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🏥</span>
              </div>
              <h1 className="text-2xl font-bold text-white">TriageSense</h1>
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/triage"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Intake
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Disclaimer Banner */}
          <div className="mb-12 p-6 bg-yellow-900/30 border-2 border-yellow-600 rounded-lg">
            <div className="flex items-start space-x-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-2">PROOF OF CONCEPT PROJECT</h3>
                <p className="text-yellow-200 text-sm leading-relaxed">
                  TriageSense is a demonstration project designed to showcase AI-powered healthcare technology. 
                  This is NOT a real medical application and does NOT provide actual medical advice, diagnosis, 
                  or treatment. This project is for portfolio and educational purposes only. In case of a medical 
                  emergency, call 911 or visit your nearest emergency room.
                </p>
              </div>
            </div>
          </div>

          {/* About the Designer */}
          <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden border border-gray-700">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">About the Designer</h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Placeholder for headshot */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-6xl">👩‍💻</span>
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-2">
                    Add your headshot here
                  </p>
                </div>

                {/* Bio Section */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">Holly Teunis</h3>
                  
                  <div className="space-y-4 text-gray-300">
                    <p className="leading-relaxed">
                      [Your bio goes here - Add information about your background, experience, 
                      skills, and what inspired you to create TriageSense.]
                    </p>
                    
                    <p className="leading-relaxed">
                      [Additional bio information - You can discuss your passion for healthcare 
                      technology, AI integration, or your design philosophy.]
                    </p>
                    
                    <p className="leading-relaxed">
                      [More about your professional journey, interests, or future goals in 
                      technology and design.]
                    </p>
                  </div>

                  {/* Links */}
                  <div className="mt-8 space-y-3">
                    <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                    
                    <a
                      href="https://hollyteunis.info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                      <span className="text-2xl">🌐</span>
                      <div>
                        <div className="font-medium group-hover:underline">Portfolio Website</div>
                        <div className="text-sm text-gray-400">hollyteunis.info</div>
                      </div>
                    </a>

                    <a
                      href="https://github.com/HMTEUNIS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                      <span className="text-2xl">💻</span>
                      <div>
                        <div className="font-medium group-hover:underline">GitHub Profile</div>
                        <div className="text-sm text-gray-400">@HMTEUNIS</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-12 bg-gray-800 shadow-2xl rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">About TriageSense</h3>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                TriageSense is a proof-of-concept application demonstrating how AI can be integrated 
                into healthcare workflows. The system showcases:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Integration with DeepSeek AI for intelligent symptom analysis</li>
                <li>Real-time Slack notifications using webhook integrations</li>
                <li>Modern, accessible UI/UX design with voice-to-text capabilities</li>
                <li>Trans-inclusive form design and patient-centered approach</li>
                <li>Next.js 14 with TypeScript and Tailwind CSS</li>
              </ul>
              <p className="leading-relaxed mt-4">
                <strong className="text-white">Technology Stack:</strong> Next.js 14, React, TypeScript, 
                Tailwind CSS, DeepSeek AI API, Slack Webhooks, Web Speech API
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/triage"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
            >
              Try the Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏥</span>
              </div>
              <h4 className="text-xl font-bold">TriageSense</h4>
            </div>
            <p className="text-gray-400 mb-4">
              AI-Powered Patient Triage System (Proof of Concept)
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Created by Holly Teunis
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
              <Link href="/triage" className="hover:text-gray-300 transition-colors">Try Demo</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


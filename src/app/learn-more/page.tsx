import Link from "next/link";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🏥</span>
              </div>
              <h1 className="text-2xl font-bold text-white">TriageSense</h1>
            </Link>
            <Link
              href="/triage"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Intake
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How TriageSense Works
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A deep dive into the technical architecture and AI-powered workflow 
              that powers our intelligent patient triage system.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              System Architecture
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The complete data flow from patient input to medical staff notification
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-700">
            <div className="space-y-8">
              {/* Row 1: Patient Input */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-3xl mb-2">👤</div>
                  <h3 className="font-semibold text-blue-900">Patient</h3>
                  <p className="text-sm text-blue-700">Provides symptoms via form or voice</p>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="font-semibold text-green-900">Intake Form</h3>
                  <p className="text-sm text-green-700">Next.js 14 with voice-to-text</p>
                </div>
              </div>

              {/* Row 2: API Processing */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-3xl mb-2">🔧</div>
                  <h3 className="font-semibold text-purple-900">API Endpoint</h3>
                  <p className="text-sm text-purple-700">/api/triage validation & processing</p>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-3xl mb-2">🤖</div>
                  <h3 className="font-semibold text-orange-900">Infermedica AI</h3>
                  <p className="text-sm text-orange-700">Parse + Diagnosis APIs</p>
                </div>
              </div>

              {/* Row 3: AI Analysis */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-3xl mb-2">🧠</div>
                  <h3 className="font-semibold text-indigo-900">AI Analysis</h3>
                  <p className="text-sm text-indigo-700">Symptom parsing & triage classification</p>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-semibold text-red-900">Triage Level</h3>
                  <p className="text-sm text-red-700">Emergency/Urgent/Non-Urgent</p>
                </div>
              </div>

              {/* Row 4: Notifications */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-3xl mb-2">📱</div>
                  <h3 className="font-semibold text-teal-900">Slack Integration</h3>
                  <p className="text-sm text-teal-700">Rich Block Kit notifications</p>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center min-w-[200px]">
                  <div className="text-3xl mb-2">👩‍⚕️</div>
                  <h3 className="font-semibold text-gray-900">Medical Staff</h3>
                  <p className="text-sm text-gray-700">Real-time alerts & patient data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Implementation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Detailed breakdown of the AI-powered workflow and system components
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: AI Workflow */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Workflow</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Symptom Parsing</h4>
                  <p className="text-gray-600 mb-2">
                    Patient symptoms are sent to Infermedica's Parse API, which converts natural language 
                    into structured medical evidence using advanced NLP.
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                    POST /v3/parse<br/>
                    Input: "I have severe headache and fever"<br/>
                    Output: Structured evidence objects
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">2. AI Diagnosis</h4>
                  <p className="text-gray-600 mb-2">
                    The structured evidence is analyzed by Infermedica's Diagnosis API, which uses 
                    machine learning models trained on medical data to determine triage levels.
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                    POST /v3/diagnosis<br/>
                    Input: Evidence + patient demographics<br/>
                    Output: Triage level + condition probabilities
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Triage Classification</h4>
                  <p className="text-gray-600 mb-2">
                    The AI determines urgency levels based on symptom severity, potential conditions, 
                    and medical best practices.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">🚨</span>
                      <span className="text-sm"><strong>Emergency:</strong> Immediate attention required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">⚠️</span>
                      <span className="text-sm"><strong>Urgent:</strong> Medical attention within hours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✅</span>
                      <span className="text-sm"><strong>Non-Urgent:</strong> Routine care or follow-up</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: System Components */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">System Components</h3>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">Frontend (Next.js 14)</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• React components with TypeScript</li>
                    <li>• Tailwind CSS for responsive design</li>
                    <li>• Voice-to-text integration (Web Speech API)</li>
                    <li>• Real-time form validation</li>
                    <li>• Loading animations and UX feedback</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">Backend API</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Next.js API routes (/api/triage)</li>
                    <li>• Input validation and sanitization</li>
                    <li>• Age calculation from date of birth</li>
                    <li>• Error handling and logging</li>
                    <li>• Environment variable management</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-900 mb-3">AI Integration</h4>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li>• Infermedica Parse API integration</li>
                    <li>• Infermedica Diagnosis API integration</li>
                    <li>• Two-step AI workflow simulation</li>
                    <li>• Mock data generation for portfolio</li>
                    <li>• Realistic timing and delays</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-orange-900 mb-3">Notifications</h4>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>• Slack Incoming Webhooks</li>
                    <li>• Block Kit message formatting</li>
                    <li>• Rich media notifications</li>
                    <li>• Medical staff alert system</li>
                    <li>• Patient data formatting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Flow Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Data Flow & Security
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How patient data flows through the system with security and privacy considerations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-xl">🔒</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Data Security</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• HTTPS encryption for all communications</li>
                <li>• Environment variable protection</li>
                <li>• Input validation and sanitization</li>
                <li>• No persistent data storage</li>
                <li>• Secure API key management</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Optimized API calls with proper timing</li>
                <li>• Client-side form validation</li>
                <li>• Efficient state management</li>
                <li>• Responsive loading animations</li>
                <li>• Minimal external dependencies</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 text-xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Scalability</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Stateless API design</li>
                <li>• Horizontal scaling capability</li>
                <li>• Modular component architecture</li>
                <li>• Environment-based configuration</li>
                <li>• Cloud deployment ready</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Modern technologies powering the TriageSense platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">⚛️</div>
              <h3 className="font-semibold text-gray-900 mb-2">React 18</h3>
              <p className="text-sm text-gray-600">Component-based UI with hooks</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-2">Next.js 14</h3>
              <p className="text-sm text-gray-600">App Router & API routes</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Tailwind CSS</h3>
              <p className="text-sm text-gray-600">Utility-first styling</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-2">Infermedica AI</h3>
              <p className="text-sm text-gray-600">Medical AI diagnosis</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Slack API</h3>
              <p className="text-sm text-gray-600">Real-time notifications</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🎤</div>
              <h3 className="font-semibold text-gray-900 mb-2">Web Speech API</h3>
              <p className="text-sm text-gray-600">Voice-to-text input</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-semibold text-gray-900 mb-2">TypeScript</h3>
              <p className="text-sm text-gray-600">Type-safe development</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-semibold text-gray-900 mb-2">ESLint</h3>
              <p className="text-sm text-gray-600">Code quality & standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Try TriageSense?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the AI-powered patient triage system in action
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/triage"
              className="inline-block bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg"
            >
              🏥 Start Patient Intake
            </Link>
            <Link
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏥</span>
              </div>
              <h4 className="text-xl font-bold">TriageSense</h4>
            </div>
            <p className="text-gray-400 mb-4">
              AI-Powered Patient Triage System
            </p>
            <p className="text-sm text-gray-500">
              Built with Next.js 14, Tailwind CSS, and advanced AI integration
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

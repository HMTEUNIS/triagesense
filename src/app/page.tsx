import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🏥</span>
              </div>
              <h1 className="text-2xl font-bold text-white">TriageSense</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/about"
                className="text-gray-300 hover:text-white font-medium transition-colors flex items-center"
              >
                About
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

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI-Powered Patient
              <span className="text-blue-400"> Triage</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Streamline patient intake with intelligent symptom analysis, 
              automated triage classification, and real-time medical staff notifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/triage"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
              >
                🚀 Start Patient Intake
              </Link>
              <Link
                href="/learn-more"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-lg text-lg border border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                📖 Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              How TriageSense Works
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our intelligent system processes patient information and provides 
              instant triage recommendations to medical professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Smart Intake Form
              </h4>
              <p className="text-gray-300">
                Voice-to-text enabled form that captures patient symptoms 
                with intelligent validation and user-friendly interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                AI Analysis
              </h4>
              <p className="text-gray-600">
                Advanced AI processes symptoms to determine triage levels 
                and identify potential conditions with probability scores.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Real-time Alerts
              </h4>
              <p className="text-gray-600">
                Instant Slack notifications to medical staff with formatted 
                patient data, triage levels, and recommended actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Why Choose TriageSense?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Faster Triage</h4>
                    <p className="text-gray-300">Reduce patient wait times with instant AI-powered triage classification.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Improved Accuracy</h4>
                    <p className="text-gray-600">AI analysis helps identify critical cases that might be missed in manual triage.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Staff Efficiency</h4>
                    <p className="text-gray-600">Automated notifications ensure medical staff are immediately aware of new patients.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Voice Input</h4>
                    <p className="text-gray-600">Patients can describe symptoms naturally using voice-to-text technology.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Triage Levels</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <div className="font-semibold text-red-600">Emergency</div>
                    <div className="text-sm text-gray-600">Immediate medical attention required</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <div className="font-semibold text-yellow-600">Urgent</div>
                    <div className="text-sm text-gray-600">Medical attention needed within hours</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-semibold text-green-600">Non-Urgent</div>
                    <div className="text-sm text-gray-600">Routine care or follow-up</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Experience AI-Powered Triage?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Try our intelligent patient intake system and see how AI can 
            revolutionize healthcare triage processes.
          </p>
          <Link
            href="/triage"
            className="inline-block bg-white hover:bg-gray-100 text-blue-800 font-semibold py-4 px-8 rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 shadow-lg"
          >
            🏥 Start Patient Intake Now
          </Link>
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
            <p className="text-sm text-gray-500 mb-4">
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

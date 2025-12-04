'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function TriagePage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    symptoms: '',
    sex: '',
    discomfort: 5
  });
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [speechSupported, setSpeechSupported] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSlackNotification, setShowSlackNotification] = useState(false);
  const [slackNotificationData, setSlackNotificationData] = useState(null);
  const recognitionRef = useRef(null);

  // Helper function to calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return 'unknown';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  useEffect(() => {
    // Check if SpeechRecognition is available
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setFormData(prev => ({
            ...prev,
            symptoms: prev.symptoms + (prev.symptoms ? ' ' : '') + transcript
          }));
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      if (dobDate > today) {
        newErrors.dob = 'Date of birth cannot be in the future';
      }
    }
    
    if (!formData.symptoms.trim()) {
      newErrors.symptoms = 'Symptoms description is required';
    }
    
    if (!formData.sex) {
      newErrors.sex = 'Sex is required';
    }
    
    if (formData.discomfort < 0 || formData.discomfort > 10) {
      newErrors.discomfort = 'Discomfort level must be between 0 and 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setCurrentStep(0);
    
    // Define the initial loading steps (will be updated with real data)
    const initialSteps = [
      { 
        id: 1, 
        text: 'Validating patient information...', 
        icon: '✅', 
        completed: false,
        details: 'Checking name format, DOB validity, and symptom text length'
      },
      { 
        id: 2, 
        text: 'Connecting to DeepSeek AI API...', 
        icon: '🔌', 
        completed: false,
        details: 'Establishing secure connection to api.deepseek.com/v1/chat/completions'
      },
      { 
        id: 3, 
        text: 'Processing symptoms with AI...', 
        icon: '📝', 
        completed: false,
        details: 'DeepSeek analyzing symptoms and patient demographics for medical assessment'
      },
      { 
        id: 4, 
        text: 'AI diagnosis analysis...', 
        icon: '🧠', 
        completed: false,
        details: 'DeepSeek reasoning model analyzing symptoms and patient data...'
      },
      { 
        id: 5, 
        text: 'Calculating triage priority...', 
        icon: '⚡', 
        completed: false,
        details: 'AI determining urgency level based on symptom severity...'
      },
      { 
        id: 6, 
        text: 'Generating condition probabilities...', 
        icon: '📊', 
        completed: false,
        details: 'Analyzing possible conditions and their likelihood...'
      },
      { 
        id: 7, 
        text: 'Sending Slack notification...', 
        icon: '📱', 
        completed: false,
        details: 'Formatting Block Kit message with patient data and triage results'
      },
      { 
        id: 8, 
        text: 'Processing complete!', 
        icon: '🎉', 
        completed: false,
        details: 'Patient data processed and medical team notified'
      }
    ];
    
    setLoadingSteps(initialSteps);
    
    // Animate through the first few steps while API call is happening
    for (let i = 0; i < 4; i++) {
      setCurrentStep(i);
      setLoadingSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, completed: true } : step
      ));
      
      const delays = [500, 800, 1200, 1500];
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
    
    try {
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update the remaining steps with real data from the response
        const updatedSteps = [
          ...initialSteps.slice(0, 4), // Keep the first 4 steps as they were
          { 
            id: 5, 
            text: 'Calculating triage priority...', 
            icon: '⚡', 
            completed: false,
            details: `Triage level determined: ${result.triageLevel || 'Processing...'}`
          },
          { 
            id: 6, 
            text: 'Generating condition probabilities...', 
            icon: '📊', 
            completed: false,
            details: result.conditions ? `Found ${result.conditions.length} possible conditions` : 'Analyzing possible conditions...'
          },
          { 
            id: 7, 
            text: 'Sending Slack notification...', 
            icon: '📱', 
            completed: false,
            details: 'Formatting Block Kit message with patient data and triage results'
          },
          { 
            id: 8, 
            text: 'Processing complete!', 
            icon: '🎉', 
            completed: false,
            details: `Patient ID: ${result.patientId || 'PAT-' + Date.now()} | Status: Complete`
          }
        ];
        
        setLoadingSteps(updatedSteps);
        
        // Continue animation with updated steps
        for (let i = 4; i < updatedSteps.length; i++) {
          setCurrentStep(i);
          setLoadingSteps(prev => prev.map((step, index) => 
            index === i ? { ...step, completed: true } : step
          ));
          
          const delays = [1000, 800, 600, 300];
          await new Promise(resolve => setTimeout(resolve, delays[i - 4]));
        }
        
        // Show mock Slack notification
        setSlackNotificationData({
          name: formData.name,
          dob: formData.dob,
          sex: formData.sex,
          discomfort: formData.discomfort,
          symptoms: formData.symptoms,
          triageLevel: result.triageLevel,
          conditions: result.conditions || [],
          recommendedAction: result.recommendedAction,
          patientId: result.patientId
        });
        setShowSlackNotification(true);
        
        // Reset form after a delay
        setTimeout(() => {
          setFormData({ name: '', dob: '', symptoms: '', sex: '', discomfort: 5 });
          setErrors({});
          setLoadingSteps([]);
          setCurrentStep(0);
        }, 100);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                href="/about"
                className="text-gray-300 hover:text-white font-medium transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 shadow-2xl rounded-lg p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Patient Intake Form
            </h1>
            <p className="text-gray-300">
              Please provide your information to help us assess your needs
            </p>
            
            {/* Disclaimer Box */}
            <div className="mt-6 p-4 bg-yellow-900/30 border-2 border-yellow-600 rounded-lg">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚠️</span>
                <div className="text-left">
                  <h3 className="text-yellow-400 font-bold text-sm mb-1">PROOF OF CONCEPT - NOT FOR MEDICAL USE</h3>
                  <p className="text-yellow-200 text-xs leading-relaxed">
                    This is a demonstration project only. This application does NOT provide real medical advice, 
                    diagnosis, or treatment. Do not use this for actual medical decisions. In case of a medical 
                    emergency, call 911 or visit your nearest emergency room. Always consult with a qualified 
                    healthcare provider for medical advice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Show loading animation instead of form when submitting */}
          {isSubmitting && loadingSteps.length > 0 ? (
            <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-700">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-800/30 rounded-full mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                </div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  AI-Powered Triage Analysis
                </h3>
                <p className="text-blue-200 text-sm">
                  Processing patient data through DeepSeek AI API with real-time technical details...
                </p>
              </div>
              
              <div className="space-y-3">
                {loadingSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                      step.completed
                        ? 'bg-green-900/20 border border-green-700'
                        : index === currentStep
                        ? 'bg-blue-800/30 border border-blue-600'
                        : 'bg-gray-700/50 border border-gray-600'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed
                        ? 'bg-green-500 text-white'
                        : index === currentStep
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-gray-600 text-gray-400'
                    }`}>
                      {step.completed ? '✓' : index === currentStep ? step.icon : '○'}
                    </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          step.completed
                            ? 'text-green-300'
                            : index === currentStep
                            ? 'text-blue-300'
                            : 'text-gray-400'
                        }`}>
                          {step.text}
                        </p>
                        {step.details && (
                          <p className={`text-xs mt-1 ${
                            step.completed
                              ? 'text-green-400'
                              : index === currentStep
                              ? 'text-blue-400'
                              : 'text-gray-500'
                          }`}>
                            {step.details}
                          </p>
                        )}
                        {index === currentStep && (
                          <div className="mt-2">
                            <div className="w-full bg-blue-800/30 rounded-full h-1">
                              <div className="bg-blue-400 h-1 rounded-full animate-pulse" style={{width: '60%'}}></div>
                            </div>
                          </div>
                        )}
                      </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Date of Birth Field */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.dob ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.dob && (
                <p className="mt-1 text-sm text-red-400">{errors.dob}</p>
              )}
            </div>

            {/* Sex Field */}
            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-300 mb-2">
                Sex *
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.sex ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Select your sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="transgender-male">Transgender Male</option>
                <option value="transgender-female">Transgender Female</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.sex && (
                <p className="mt-1 text-sm text-red-400">{errors.sex}</p>
              )}
            </div>

            {/* Discomfort Level Field */}
            <div>
              <label htmlFor="discomfort" className="block text-sm font-medium text-gray-300 mb-2">
                Discomfort Level (0-10) *
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">0</span>
                  <input
                    type="range"
                    id="discomfort"
                    name="discomfort"
                    min="0"
                    max="10"
                    step="1"
                    value={formData.discomfort}
                    onChange={handleInputChange}
                    className={`flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider ${
                      errors.discomfort ? 'border-red-500' : ''
                    }`}
                    style={{
                      background: `linear-gradient(to right, #fce7f3 0%, #f472b6 20%, #ec4899 40%, #dc2626 60%, #b91c1c 80%, #991b1b 100%)`
                    }}
                  />
                  <span className="text-sm text-gray-400">10</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>No discomfort</span>
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                  <span>Extreme</span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-200">
                    Current Level: {formData.discomfort}/10
                  </span>
                </div>
              </div>
              {errors.discomfort && (
                <p className="mt-1 text-sm text-red-400">{errors.discomfort}</p>
              )}
            </div>

            {/* Symptoms Field */}
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-300 mb-2">
                Symptoms Description *
              </label>
              <div className="relative">
                <textarea
                  id="symptoms"
                  name="symptoms"
                  rows={4}
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                    errors.symptoms ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Describe your symptoms in detail..."
                />
                {speechSupported && (
                  <div className="absolute bottom-3 right-3">
                    {!isListening ? (
                      <button
                        type="button"
                        onClick={startListening}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        🎤 Voice-to-Text
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopListening}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 animate-pulse"
                      >
                        🔴 Listening...
                      </button>
                    )}
                  </div>
                )}
              </div>
              {errors.symptoms && (
                <p className="mt-1 text-sm text-red-400">{errors.symptoms}</p>
              )}
              {!speechSupported && (
                <p className="mt-1 text-sm text-gray-500">
                  Voice-to-text is not supported in your browser
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <div className="mb-4 p-3 bg-gray-700/50 border border-gray-600 rounded-lg">
                <p className="text-xs text-gray-400 text-center">
                  By submitting this form, you acknowledge this is a demonstration only and not a substitute for professional medical advice.
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Processing...' : 'Submit Intake Form'}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
      </div>

      {/* Mock Slack Notification Modal */}
      {showSlackNotification && slackNotificationData && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSlackNotification(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Slack Header */}
            <div className="bg-[#4A154B] text-white px-4 py-3 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-lg">🏥</span>
                </div>
                <div>
                  <div className="font-semibold">TriageSense Bot</div>
                  <div className="text-xs text-purple-200">#medical-alerts</div>
                </div>
              </div>
              <button
                onClick={() => setShowSlackNotification(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Slack Message Content */}
            <div className="p-4 space-y-3 bg-[#F8F8F8]">
              {/* Header Block */}
              <div className="bg-white rounded p-3 border-l-4 border-[#4A154B]">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  🏥 New Patient Triage Alert
                </h3>
              </div>

              {/* Patient Info Section */}
              <div className="bg-white rounded p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Patient Name</div>
                    <div className="text-gray-900 font-medium">{slackNotificationData.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Date of Birth</div>
                    <div className="text-gray-900 font-medium">{slackNotificationData.dob}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Sex</div>
                    <div className="text-gray-900 font-medium">
                      {slackNotificationData.sex.charAt(0).toUpperCase() + slackNotificationData.sex.slice(1).replace('-', ' ')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Discomfort Level</div>
                    <div className="text-gray-900 font-medium">{slackNotificationData.discomfort}/10</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Triage Level</div>
                    <div className="text-gray-900 font-medium">
                      {slackNotificationData.triageLevel === 'emergency' && '🚨 Emergency'}
                      {slackNotificationData.triageLevel === 'urgent' && '⚠️ Urgent'}
                      {slackNotificationData.triageLevel === 'non-urgent' && '✅ Non-Urgent'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Submitted</div>
                    <div className="text-gray-900 font-medium">{new Date().toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Symptoms Section */}
              <div className="bg-white rounded p-4">
                <div className="text-xs text-gray-500 font-semibold uppercase mb-2">Symptoms Description</div>
                <div className="text-gray-900 whitespace-pre-wrap">{slackNotificationData.symptoms}</div>
              </div>

              {/* Conditions Section */}
              {slackNotificationData.conditions && slackNotificationData.conditions.length > 0 && (
                <div className="bg-white rounded p-4">
                  <div className="text-xs text-gray-500 font-semibold uppercase mb-2">Top Possible Conditions</div>
                  <div className="space-y-2">
                    {slackNotificationData.conditions.slice(0, 3).map((condition, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-gray-600 font-medium">{index + 1}.</span>
                        <div className="flex-1">
                          <span className="text-gray-900 font-semibold">{condition.name}</span>
                          <span className="text-gray-600 ml-2">
                            ({Math.round((condition.probability || 0) * 100)}% probability)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Action */}
              {slackNotificationData.recommendedAction && (
                <div className="bg-white rounded p-4">
                  <div className="text-xs text-gray-500 font-semibold uppercase mb-2">Recommended Action</div>
                  <div className="text-gray-900">{slackNotificationData.recommendedAction}</div>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-300 my-2"></div>

              {/* Footer */}
              <div className="text-xs text-gray-500 flex items-center space-x-2">
                <span>Powered by DeepSeek AI</span>
                <span>•</span>
                <span>Patient ID: {slackNotificationData.patientId}</span>
              </div>
            </div>

            {/* Slack Footer Actions */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 rounded-b-lg flex items-center justify-between">
              <div className="text-xs text-gray-500">
                This is a mock notification showing what would be sent to Slack
              </div>
              <button
                onClick={() => setShowSlackNotification(false)}
                className="bg-[#4A154B] hover:bg-[#5B1F5C] text-white px-4 py-2 rounded font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

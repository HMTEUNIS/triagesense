# TriageSense - Patient Intake System

> **⚠️ IMPORTANT: This is a CONCEPT/PROTOTYPE project for portfolio purposes only.**
> 
> This application is **NOT intended for actual medical use** and does NOT provide real medical advice, diagnosis, or treatment. It is a demonstration project showcasing modern web development practices, AI integration, and real-time notification systems. **Do not use this for actual medical decisions.** In case of a medical emergency, call 911 or visit your nearest emergency room.

A modern patient intake form built with Next.js 15, featuring AI-powered triage analysis and Slack notifications. This is a portfolio project demonstrating full-stack development capabilities.

## ⚠️ Project Status

**This is a concept/prototype project for portfolio demonstration purposes only.**

- Not intended for production medical use
- AI analysis is for demonstration only
- All medical information should be verified by qualified healthcare professionals
- Deployed on Vercel as a portfolio showcase

## Features

- **Patient Intake Form**: Clean, professional form with required fields:
  - Full Name (text input)
  - Date of Birth (date picker)
  - Sex/Gender selection
  - Discomfort Level (0-10 scale)
  - Symptoms Description (textarea)

- **Voice-to-Text**: Speech recognition integration for easy symptom input
  - Uses browser's native SpeechRecognition API
  - Visual feedback with "Listening..." state
  - Graceful fallback for unsupported browsers

- **AI-Powered Triage**: AI analysis using DeepSeek API (for demonstration only):
  - Automatic symptom parsing and analysis
  - Triage level determination (Emergency/Urgent/Non-Urgent)
  - Top 3 possible conditions with probability scores
  - Realistic loading animation showing AI workflow
  - **Note: This is for demonstration purposes only and should not be used for actual medical decisions**

- **Slack Notifications**: Real-time alerts to medical staff with:
  - Patient information and triage level
  - Formatted Slack Block Kit messages
  - Top possible conditions and probabilities

- **Form Validation**: 
  - Client-side validation for all fields
  - Server-side validation in API endpoint
  - Real-time error feedback

- **Modern UI**: Built with Tailwind CSS for a professional, responsive design

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `env.example` to `.env.local`
   - Fill in your Slack webhook URL:
     - Create a Slack Incoming Webhook from your Slack workspace
     - Note: Infermedica API is mocked for this portfolio project

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

5. **Access the intake form** by clicking "Start Patient Intake" or navigate directly to `/triage`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Slack Webhook Configuration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# Note: Infermedica API is mocked for this portfolio project
# In a real implementation, you would add:
# INFERMEDICA_APP_ID=your_infermedica_app_id_here
# INFERMEDICA_APP_KEY=your_infermedica_app_key_here
```

### Getting API Credentials

**Slack Webhook:**
1. Go to your Slack workspace
2. Navigate to Apps → Incoming Webhooks
3. Create a new webhook for your desired channel
4. Copy the webhook URL

**Important Notes:**
- This is a **concept/prototype project** for portfolio purposes only
- The DeepSeek API is used for demonstration of AI integration capabilities
- **This application does NOT provide real medical advice or diagnosis**
- In a production medical environment, you would need proper medical API integrations, HIPAA compliance, and regulatory approvals

## Usage

1. **Fill out the form** with patient information
2. **Use voice-to-text** (if supported) by clicking the microphone button next to the symptoms field
3. **Submit the form** - data will be processed by AI and sent to Slack
4. **View confirmation** - successful submissions show a confirmation message with triage results

## API Endpoint

The form submits to `/api/triage` with the following structure:

```json
{
  "name": "Patient Name",
  "dob": "1990-01-01",
  "symptoms": "Description of symptoms..."
}
```

### API Response

The endpoint returns:

```json
{
  "success": true,
  "message": "Patient intake processed successfully",
  "patientId": "PAT-1234567890",
  "data": {
    "name": "Patient Name",
    "dob": "1990-01-01",
    "age": 34,
    "symptoms": "Description of symptoms...",
    "triageLevel": "urgent",
    "topConditions": [
      {
        "name": "Condition Name",
        "probability": 0.85
      }
    ],
    "submittedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## How It Works

1. **Patient submits form** with name, DOB, and symptoms
2. **Frontend shows loading animation** with realistic AI workflow steps
3. **API validates** the input data
4. **Mock Infermedica simulation** (for portfolio purposes):
   - Simulates symptom parsing with realistic delays
   - Generates mock triage levels and conditions
   - Creates believable AI analysis workflow
5. **Slack notification** is sent to medical staff with formatted results
6. **Response** is returned to the patient with triage information

### Loading Animation Features

- **7-step loading process** showing realistic AI workflow
- **Visual progress indicators** with icons and animations
- **Realistic timing** with different delays for each step
- **Professional UI** with medical-themed styling

## Browser Compatibility

- **Voice-to-Text**: Requires a browser that supports the SpeechRecognition API (Chrome, Edge, Safari)
- **Form functionality**: Works in all modern browsers
- **Responsive design**: Optimized for desktop and mobile devices

## Development

- Built with Next.js 15 App Router
- TypeScript support included
- Tailwind CSS for styling
- ESLint for code quality
- Deployed on Vercel

## Security Considerations

This project includes basic security measures for a portfolio demonstration:

- Input validation and sanitization
- Environment variable protection
- Error handling that prevents information leakage
- Input length limits to prevent DoS attacks
- XSS protection through proper escaping

**Note:** For production medical applications, additional security measures would be required:
- HIPAA compliance
- Rate limiting
- Authentication and authorization
- Audit logging
- Data encryption at rest and in transit
- Regular security audits

## Disclaimer

**This is a portfolio project and concept demonstration only. It is NOT intended for actual medical use. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment.**
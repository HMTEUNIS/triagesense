import { NextResponse } from 'next/server';

// Input sanitization helper
function sanitizeString(str, maxLength = 1000) {
  if (typeof str !== 'string') return '';
  // Remove control characters and trim
  return str.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLength);
}

// Validate sex value
function isValidSex(sex) {
  const validSexes = ['male', 'female', 'non-binary', 'transgender-male', 'transgender-female', 'prefer-not-to-say'];
  return validSexes.includes(sex);
}

// Helper function to calculate age from date of birth
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Helper function to determine sex (placeholder - in real app, collect this data)
function determineSex(name) {
  // This is a placeholder implementation
  // In a real application, you would collect this information from the patient
  // For now, we'll default to 'male' - you should modify this based on your needs
  return 'male';
}

// Helper function to call DeepSeek API for medical diagnosis
async function getDiagnosisFromDeepSeek(symptoms, age, sex, discomfort) {
  const deepSeekApiKey = process.env.DEEPSEEK_API_KEY;
  if (!deepSeekApiKey) {
    throw new Error('API configuration error');
  }

  const data = {
    "model": "deepseek-reasoner",
    "messages": [
      {
        "role": "system",
        "content": "You are a medical diagnostic API. Your task is to analyze symptom descriptions and return a structured JSON response. Always follow this exact format:\n\n{\n  \"triage_level\": \"string\", // One of: 'Emergency', 'Urgent', 'Non-Urgent'\n  \"possible_conditions\": [\n    {\n      \"condition\": \"string\",\n      \"likelihood\": \"string\" // One of: 'High', 'Medium', 'Low'\n    }\n  ],\n  \"recommended_action\": \"string\" // A brief, clear recommendation.\n}\n\nDo not include any other text, explanations, or markdown in your response. Only the JSON object."
      },
      {
        "role": "user",
        // Sanitize symptoms input to prevent injection
        "content": `Analyze the following symptoms: '${symptoms.replace(/'/g, "''")}'. Patient is a ${age}-year-old ${sex} with a discomfort level of ${discomfort}/10.`
      }
    ],
    "temperature": 0.1
  };

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepSeekApiKey}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const content = result.choices[0].message.content;
    
    // Parse the JSON response
    let diagnosisData;
    try {
      diagnosisData = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse API response');
      throw new Error('Invalid response from AI service');
    }

    // Transform the response to match our expected format
    const transformedData = {
      triage_level: diagnosisData.triage_level?.toLowerCase() || 'non-urgent',
      conditions: diagnosisData.possible_conditions?.map((condition, index) => ({
        id: `c_${index + 1}`,
        name: condition.condition,
        probability: condition.likelihood === 'High' ? 0.8 : condition.likelihood === 'Medium' ? 0.6 : 0.4,
        common_name: condition.condition
      })) || [],
      recommended_action: diagnosisData.recommended_action || 'Please consult with a healthcare provider'
    };

    return transformedData;
    
  } catch (error) {
    // Log full error server-side but throw generic error
    console.error('DeepSeek API error:', error.message);
    throw new Error('AI analysis service unavailable');
  }
}

// Helper function to format triage level
function formatTriageLevel(triageLevel) {
  const triageMap = {
    'emergency': '🚨 Emergency',
    'urgent': '⚠️ Urgent', 
    'non-urgent': '✅ Non-Urgent'
  };
  
  return triageMap[triageLevel] || '❓ Unknown';
}

// Helper function to create Slack message using Block Kit
function createSlackMessage(patientData, diagnosisData) {
  const { name, dob, symptoms, sex, discomfort } = patientData;
  const { triage_level, conditions } = diagnosisData;
  
  // Sanitize text for Slack (escape special characters)
  const escapeSlackText = (text) => {
    if (typeof text !== 'string') return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  
  // Get top 3 conditions (limit to prevent message size issues)
  const topConditions = conditions.slice(0, 3).map((condition, index) => {
    const probability = Math.round((condition.probability || 0) * 100);
    const conditionName = escapeSlackText(condition.name || 'Unknown');
    return `${index + 1}. *${conditionName}* (${probability}% probability)`;
  }).join('\n');

  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🏥 New Patient Triage Alert"
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Patient Name:*\n${escapeSlackText(name)}`
          },
          {
            type: "mrkdwn", 
            text: `*Date of Birth:*\n${escapeSlackText(dob)}`
          },
          {
            type: "mrkdwn",
            text: `*Sex:*\n${escapeSlackText(sex.charAt(0).toUpperCase() + sex.slice(1).replace('-', ' '))}`
          },
          {
            type: "mrkdwn",
            text: `*Discomfort Level:*\n${discomfort}/10`
          },
          {
            type: "mrkdwn",
            text: `*Triage Level:*\n${formatTriageLevel(triage_level)}`
          },
          {
            type: "mrkdwn",
            text: `*Submitted:*\n${new Date().toLocaleString()}`
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Symptoms Description:*\n${escapeSlackText(symptoms)}`
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Top Possible Conditions:*\n${topConditions}`
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Recommended Action:*\n${escapeSlackText(diagnosisData.recommended_action || 'Please consult with a healthcare provider')}`
        }
      },
      {
        type: "divider"
      },
      {
        type: "context",
        elements: [
        {
          type: "mrkdwn",
          text: `Powered by DeepSeek AI • Patient ID: PAT-${Date.now()}`
        }
        ]
      }
    ]
  };
}

// Helper function to send message to Slack
async function sendSlackMessage(message) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!slackWebhookUrl) {
    throw new Error('Slack webhook URL not configured');
  }

  const response = await fetch(slackWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  });

  if (!response.ok) {
    throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
  }

  return response;
}

export async function POST(request) {
  // Note: For production, implement rate limiting here (e.g., using Vercel Edge Config,
  // Upstash Redis, or a middleware solution) to prevent abuse and DoS attacks.
  
  try {
    // Step 1: Receive and Validate
    const body = await request.json();
    const { name, dob, symptoms, sex, discomfort } = body;

    // Server-side validation
    if (!name || !dob || !symptoms || !sex || discomfort === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Sanitize and validate name (max 200 chars)
    const sanitizedName = sanitizeString(name, 200);
    if (!sanitizedName || sanitizedName.length < 1) {
      return NextResponse.json(
        { error: 'Name is required and must be valid' },
        { status: 400 }
      );
    }

    // Validate and sanitize symptoms (max 5000 chars)
    const sanitizedSymptoms = sanitizeString(symptoms, 5000);
    if (!sanitizedSymptoms || sanitizedSymptoms.length < 3) {
      return NextResponse.json(
        { error: 'Symptoms description must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Validate sex
    if (!isValidSex(sex)) {
      return NextResponse.json(
        { error: 'Invalid sex value' },
        { status: 400 }
      );
    }

    // Validate discomfort level (must be a number)
    const discomfortNum = Number(discomfort);
    if (isNaN(discomfortNum) || discomfortNum < 0 || discomfortNum > 10) {
      return NextResponse.json(
        { error: 'Discomfort level must be a number between 0 and 10' },
        { status: 400 }
      );
    }

    // Validate date format
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Check if date is in the future
    const today = new Date();
    if (dobDate > today) {
      return NextResponse.json(
        { error: 'Date of birth cannot be in the future' },
        { status: 400 }
      );
    }

    // Check if date is too far in the past (reasonable age limit)
    const minDate = new Date('1900-01-01');
    if (dobDate < minDate) {
      return NextResponse.json(
        { error: 'Date of birth is invalid' },
        { status: 400 }
      );
    }

    // Calculate age and use provided sex
    const age = calculateAge(dob);

    // Log minimal information (no PII in production)
    console.log('Processing triage request - age:', age, 'discomfort:', discomfortNum);

    // Step 2: Call DeepSeek API for medical diagnosis
    console.log('🔄 Starting AI analysis workflow...');
    const diagnosisData = await getDiagnosisFromDeepSeek(sanitizedSymptoms, age, sex, discomfortNum);
    
    console.log('✅ AI analysis complete - triage level:', diagnosisData.triage_level);

    // Step 3: Format and Send to Slack
    try {
      const slackMessage = createSlackMessage(
        { name: sanitizedName, dob, symptoms: sanitizedSymptoms, sex, discomfort: discomfortNum },
        diagnosisData
      );
      
      await sendSlackMessage(slackMessage);
      console.log('Slack notification sent successfully');
      
    } catch (slackError) {
      // Log error without exposing sensitive details
      console.error('Slack notification failed');
      // Don't fail the entire request if Slack fails
    }

    // Return success response with triage data for animation
    return NextResponse.json({
      success: true,
      message: 'Your information has been sent to our medical team. You will be contacted shortly.',
      patientId: `PAT-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      triageLevel: diagnosisData.triage_level,
      conditions: diagnosisData.conditions,
      recommendedAction: diagnosisData.recommended_action
    });

  } catch (error) {
    // Log error details server-side but don't expose to client
    console.error('Error processing triage form:', error.message);
    
    // Return generic error message to prevent information leakage
    return NextResponse.json(
      { 
        error: 'Failed to process request. Please try again later.'
      },
      { status: 500 }
    );
  }
}

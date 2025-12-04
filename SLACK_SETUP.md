# Slack Webhook Setup Guide

## ✅ Your Slack Webhook is Working!

The test confirmed that your Slack webhook URL is valid and functional.

## 🔧 Complete Setup Steps

### 1. Environment Configuration
Your `.env.local` file should contain:
```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 2. Start the Development Server
```bash
cd /home/hol/Desktop/codestuff/triagesense
npm run dev
```

### 3. Test the Full Application
1. Open http://localhost:3000 in your browser
2. Click "Start Patient Intake"
3. Fill out the form with test data:
   - Name: John Doe
   - DOB: 1990-01-15
   - Symptoms: "I have a severe headache and fever"
4. Submit the form
5. Watch the loading animation
6. Check your Slack channel for the notification!

## 🐛 Troubleshooting

### If Slack notifications aren't working:

1. **Check the webhook URL format:**
   - Should start with `https://hooks.slack.com/services/`
   - Should have 3 parts separated by `/`

2. **Verify the Slack app is installed:**
   - Go to your Slack workspace
   - Check Apps → Incoming Webhooks
   - Make sure the webhook is active

3. **Check the channel permissions:**
   - The webhook should be configured for a specific channel
   - Make sure you have access to that channel

4. **Test with curl:**
   ```bash
   curl -X POST -H 'Content-type: application/json' \
   --data '{"text":"Test message"}' \
   YOUR_SLACK_WEBHOOK_URL
   ```

### If the API isn't working:

1. **Check server logs:**
   - Look for error messages in the terminal where `npm run dev` is running
   - Check for any CORS or network errors

2. **Verify environment variables:**
   - Make sure `.env.local` exists and has the correct webhook URL
   - Restart the development server after changing environment variables

3. **Test the API directly:**
   ```bash
   node test-api.js
   ```

## 🎉 Expected Results

When everything is working correctly, you should see:

1. **Frontend:** Beautiful loading animation with 7 steps
2. **Slack:** Rich notification with:
   - Patient information
   - Triage level (Emergency/Urgent/Non-Urgent)
   - Top 3 possible conditions
   - Professional medical formatting

## 📱 Slack Message Format

Your Slack notifications will look like this:

```
🏥 New Patient Triage Alert

Patient Name: John Doe
Date of Birth: 1990-01-15
Triage Level: ⚠️ Urgent
Submitted: 1/15/2024, 2:30:45 PM

Symptoms Description:
I have a severe headache and fever for the past 2 days...

Top Possible Conditions:
1. Acute viral infection (75% probability)
2. Musculoskeletal pain (60% probability)
3. Tension headache (45% probability)

Powered by Infermedica AI • Patient ID: PAT-1234567890
```

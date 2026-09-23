import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const HEALTH_SYSTEM_INSTRUCTION = `You are AuraHealth, a compassionate, evidence-informed educational AI wellness assistant.

CRITICAL MEDICAL, SAFETY & ETHICAL RULES:
1. STRICTLY EDUCATIONAL: You provide general health and wellness education. You DO NOT provide personalized medical diagnosis, prescription, or medical treatment plans.
2. NON-DIAGNOSTIC PHRASING: Never state "You have [condition]" or "You definitely suffer from X". Instead, use non-diagnostic phrasing such as "These symptoms can have several possible causes, including..." or "Common reasons people experience this include...".
3. NO PRESCRIBING OR INDIVIDUAL DOSING: Never tell users what drugs to take or adjust their prescribed dosages. Never instruct someone to stop taking a prescribed medication. Refer them to a physician or pharmacist.
4. EMERGENCY TRIAGE & RED FLAGS: If the user mentions any emergency or critical symptoms, IMMEDIATELY lead your response with a clear, prominent warning in bold:
"⚠️ **EMERGENCY NOTICE**: If you or someone with you is experiencing severe chest pain/pressure, severe difficulty breathing, sudden weakness or numbness on one side of the face or body, sudden confusion or slurred speech, loss of consciousness, severe allergic reaction (swelling of throat/lips, wheezing), uncontrollable bleeding, seizures, or thoughts of self-harm, please call your local emergency services (such as 911, 999, 112, or local equivalent) or go to the nearest emergency medical facility immediately."
Do not attempt to manage emergencies through extended conversation.
5. ACKNOWLEDGE UNCERTAINTY & NEED FOR LABS/EXAM: Acknowledge that symptoms overlap and only a qualified clinician with appropriate diagnostic tests (blood work, imaging, physical exam) can provide an accurate diagnosis.
6. PREGNANCY & VULNERABLE GROUPS: For pregnancy, nursing, pediatric questions, or elderly individuals, provide gentle, conservative educational facts and strongly emphasize consultation with an OB/GYN or pediatrician.
7. FORMAT & TONE: Be warm, empathetic, respectful, objective, and well-structured with clear headings, bullet points, and actionable lifestyle tips where safe. Conclude with a medical disclaimer.`;

app.post('/api/health-chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Please provide a valid question or health query.' });
      return;
    }

    const trimmedMessage = message.trim();

    // Check emergency keywords for immediate server-side awareness flag
    const emergencyRegex = /\b(chest pain|heart attack|can't breathe|cannot breathe|severe shortness of breath|stroke|slurred speech|facial drooping|suicid|kill myself|anaphylaxis|throat swelling|heavy bleeding)\b/i;
    const isEmergencySuspected = emergencyRegex.test(trimmedMessage);

    if (!apiKey) {
      // Graceful fallback when API key is missing during offline development
      const fallbackResponse = `${isEmergencySuspected ? "⚠️ **EMERGENCY NOTICE**: If you are experiencing severe symptoms, please immediately call local emergency services (e.g., 911, 999, 112) or seek urgent medical attention.\n\n" : ""}**Educational Overview**:
Regarding your question about "${trimmedMessage.slice(0, 60)}...":

General health education emphasizes:
- Symptoms can have multiple underlying causes ranging from benign to requiring medical assessment.
- Maintaining good hydration, balanced nutrition, regular restorative sleep (7–9 hours), and stress management support overall wellness.
- If symptoms are persistent, worsening, or interfering with your daily life, please schedule an evaluation with a licensed healthcare professional.

*Educational note: AI-generated health information is for educational purposes only and cannot replace professional medical advice.*`;
      
      res.json({
        reply: fallbackResponse,
        emergencyFlag: isEmergencySuspected,
      });
      return;
    }

    // Build chat contents including optional past turns
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history.slice(-6)) {
        if (turn.role && turn.text) {
          contents.push({
            role: turn.role === 'model' ? 'model' : 'user',
            parts: [{ text: turn.text }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: HEALTH_SYSTEM_INSTRUCTION,
        temperature: 0.4,
        topP: 0.9,
      },
    });

    const replyText = response.text || "I apologize, but I was unable to generate a response at this time. If you have immediate health concerns, please consult a qualified healthcare provider.";

    res.json({
      reply: replyText,
      emergencyFlag: isEmergencySuspected,
    });
  } catch (error: any) {
    console.error('Error in /api/health-chat:', error);
    res.status(500).json({
      error: 'Unable to process health request at this moment.',
      details: error.message || 'Unknown error',
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

async function start() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`AuraHealth full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, agent, memory, documentName } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    let userContent = `User query: ${prompt}`;
    if (documentName) {
      userContent = `Document: ${documentName}\n${userContent}`;
    }
    if (Array.isArray(memory) && memory.length > 0) {
      userContent += '\n\nUser memory/context:\n' + memory.map((m) => `- ${m.information} (${m.importance})`).join('\n');
    }

    const systemInstruction = `You are LifeOS AI, a specialist multi-agent assistant. Answer clearly and in an actionable way. The active agent is: ${agent || 'General'}.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [{
          role: 'user',
          parts: [{ text: userContent }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'Gemini request failed');
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'AI request failed' });
  }
}

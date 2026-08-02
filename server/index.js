import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, Goal, Task, Memory, Finance } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'lifeos_ultra_secret_salt_321';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lifeos';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✓ MongoDB Connection Established'))
  .catch(err => console.error('MongoDB connection failure:', err));

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Auth token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token signature' });
    req.user = user;
    next();
  });
};

// --- AUTH ROUTINGS ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already mapped' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '14d' });
    res.json({ token, user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ai', async (req, res) => {
  try {
    const { prompt, agent, memory, documentName } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
    if (!GEMINI_API_KEY) return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });

    let userContent = `User query: ${prompt}`;
    if (documentName) {
      userContent = `Document: ${documentName}\n${userContent}`;
    }
    if (Array.isArray(memory) && memory.length > 0) {
      userContent += '\n\nUser memory/context:\n' + memory.map(m => `- ${m.information} (${m.importance})`).join('\n');
    }

    const systemInstruction = `You are LifeOS AI, a specialist multi-agent assistant. Answer clearly and in an actionable way. The active agent is: ${agent || 'General'}.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
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
    res.json({ text });
  } catch (err) {
    console.error('Gemini error:', err);

    const statusCode = err?.status || (err?.message && err.message.includes('429') ? 429 : null);
    if (statusCode === 429) {
      const rAgent = req?.body?.agent || 'General';
      const rPrompt = req?.body?.prompt || '';
      const fallbackText = `Fallback (${rAgent}): Unable to reach external AI (rate limit). Based on your input "${rPrompt.slice(0,120)}", here are suggested next steps:\n1) Break the problem into smaller tasks.\n2) Prioritise the highest-impact action.\n3) If this is a resume/career request, update keywords and add two portfolio projects.\n(When quota is restored, the AI will provide a richer answer.)`;
      return res.json({ text: fallbackText, fallback: true, reason: 'rate_limit' });
    }

    res.status(500).json({ error: err.message || 'Gemini request failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Identifer not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Incorrect credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '14d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GOAL ROUTINGS ---
app.get('/api/goals', authenticateToken, async (req, res) => {
  try {
    const list = await Goal.find({ userId: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/goals', authenticateToken, async (req, res) => {
  try {
    const { title, category, deadline } = req.body;
    const newGoal = new Goal({ userId: req.user.id, title, category, deadline });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/goals/:id', authenticateToken, async (req, res) => {
  try {
    await Goal.deleteOne({ _id: req.params.id, userId: req.user.id });
    await Task.deleteMany({ goalId: req.params.id }); 
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- TASK ROUTINGS ---
app.post('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const { goalId, task } = req.body;
    const newTask = new Task({ goalId, task });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- COGNITIVE MEMORY ROUTINGS ---
app.get('/api/memory', authenticateToken, async (req, res) => {
  try {
    const list = await Memory.find({ userId: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/memory', authenticateToken, async (req, res) => {
  try {
    const { information, importance } = req.body;
    const block = new Memory({ userId: req.user.id, information, importance });
    await block.save();
    res.json(block);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/memory/:id', authenticateToken, async (req, res) => {
  try {
    await Memory.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- FINANCE LOG ROUTINGS ---
app.get('/api/finance', authenticateToken, async (req, res) => {
  try {
    const list = await Finance.find({ userId: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/finance', authenticateToken, async (req, res) => {
  try {
    const { name, amount, category, type } = req.body;
    const ledger = new Finance({ userId: req.user.id, name, amount, category, type });
    await ledger.save();
    res.json(ledger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server Initialization
app.listen(PORT, () => {
  console.log(`📡 LifeOS Express backend active on: http://localhost:${PORT}`);
});

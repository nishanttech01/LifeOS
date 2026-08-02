import React, { useState } from 'react';
import { BookOpen, Award, ArrowRightCircle, Target, CheckCircle } from 'lucide-react';
import LocalAgentChat from './LocalAgentChat';

export default function LearningRoadmap() {
  const [selectedRoadmap, setSelectedRoadmap] = useState('Frontend Developer');
  const [activeNode, setActiveNode] = useState('React Framework');
  const [quizActive, setQuizActive] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const roadmaps = {
    'Frontend Developer': [
      { name: "Semantics HTML & CSS Grid Layouts", desc: "Build structured and fluid layout sheets." },
      { name: "JS ES6 & Async Promises", desc: "Understand closures, scopes, and network API fetching." },
      { name: "React Framework (Vite + Hooks)", desc: "Build state-driven component pages." },
      { name: "Global State Management (Redux/Context)", desc: "Coordinate state slices dynamically." },
      { name: "Continuous Integration & Vercel Deploy", desc: "Configure pipelines and build checks." }
    ],
    'Fullstack SaaS Architect': [
      { name: "Express Servers & Router Configurations", desc: "Set up fast API endpoints." },
      { name: "Database Schemas (MongoDB Atlas)", desc: "Setup collection indexes and validation." },
      { name: "JWT Auth & Session Management", desc: "Configure cookies and secure HTTP request rules." },
      { name: "Payment Integrations (Stripe)", desc: "Set up Webhooks and checkout sessions." },
      { name: "Docker Container Deployments", desc: "Image packaging and cloud service deployment." }
    ]
  };

  const quizQuestions = {
    'Frontend Developer': [
      {
        q: "Which hook is used to cache the result of an expensive calculation in React?",
        options: ["useMemo", "useCallback", "useState", "useRef"],
        ans: 0
      },
      {
        q: "What is the primary benefit of declaring clean-up callbacks in useEffect hooks?",
        options: ["Increases page render speed", "Prevents memory leakages and cancels event listeners", "Triggers secondary state updates", "Forces page refresh"],
        ans: 1
      },
      {
        q: "How does the 'async/await' keyword interact with JS Promises?",
        options: ["Blocks the single thread completely", "Wraps functions to return Promises and resolves synchronously", "Eliminates syntax scopes", "Bypasses browser event loops"],
        ans: 1
      }
    ],
    'Fullstack SaaS Architect': [
      {
        q: "Which MongoDB index type is optimal for search queries matching geo-coordinates?",
        options: ["2dsphere", "Hashed", "Compound key", "Text index"],
        ans: 0
      },
      {
        q: "What is the purpose of HTTP 'Only' flag during cookie setup?",
        options: ["Prevents script access via document.cookie (XSS protection)", "Speeds up network transfer rates", "Encrypts payload content", "Enforces HTTPS protocol only"],
        ans: 0
      }
    ]
  };

  const handleAnswerSelect = (qIdx, optIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleSubmitQuiz = () => {
    const questions = quizQuestions[selectedRoadmap === 'Frontend Developer' ? 'Frontend Developer' : 'Fullstack SaaS Architect'];
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.ans) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  return (
    <div className="dash-grid">
      {/* Roadmap selector and timeline tree */}
      <div className="col-7 glow-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen style={{ color: '#8b5cf6' }} /> Interactive Learning Syllabus
          </h3>
          <select 
            className="form-input" 
            style={{ width: '220px', padding: '8px' }}
            value={selectedRoadmap}
            onChange={(e) => {
              setSelectedRoadmap(e.target.value);
              setQuizActive(false);
              setQuizSubmitted(false);
              setSelectedAnswers({});
            }}
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Fullstack SaaS Architect">Fullstack SaaS Architect</option>
          </select>
        </div>

        <div className="roadmap-timeline" style={{ margin: '20px 0' }}>
          {roadmaps[selectedRoadmap].map((node, i) => (
            <div 
              key={i} 
              className="roadmap-node"
              style={{ 
                cursor: 'pointer', 
                borderColor: activeNode === node.name ? 'var(--accent-secondary)' : 'var(--glass-border)',
                background: activeNode === node.name ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)'
              }}
              onClick={() => setActiveNode(node.name)}
            >
              <h4 style={{ fontSize: '0.98rem', color: '#fff', marginBottom: '4px' }}>{node.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{node.desc}</p>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={() => {
          setQuizActive(true);
          setQuizSubmitted(false);
          setSelectedAnswers({});
        }}>
          Generate Quiz for: {selectedRoadmap}
        </button>
      </div>

      {/* Quiz Console */}
      <div className="col-5 glow-card" style={{ padding: '30px' }}>
        {!quizActive ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
            <Award size={40} style={{ marginBottom: '15px', opacity: 0.5 }} />
            <p>Click "Generate Quiz" on the left to load technical questions targeting this developer roadmap.</p>
          </div>
        ) : (
          <div className="slide-in">
            <h3 style={{ marginBottom: '20px', color: '#fff', fontSize: '1.2rem' }}>Roadmap Competency Audit</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {quizQuestions[selectedRoadmap === 'Frontend Developer' ? 'Frontend Developer' : 'Fullstack SaaS Architect'].map((question, qIdx) => (
                <div key={qIdx} style={{ background: 'rgba(255,255,255,0.01)', padding: '15px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>QUESTION {qIdx + 1}</span>
                  <p style={{ color: '#fff', margin: '8px 0', fontSize: '0.92rem', fontWeight: '500' }}>{question.q}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                    {question.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      return (
                        <button 
                          key={optIdx} 
                          className="btn btn-secondary" 
                          style={{ 
                            justifyContent: 'flex-start', 
                            fontSize: '0.85rem', 
                            padding: '10px 14px', 
                            borderColor: isSelected ? 'var(--accent-primary)' : 'var(--glass-border)',
                            background: isSelected ? 'rgba(139,92,246,0.1)' : 'transparent',
                            color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)'
                          }}
                          onClick={() => !quizSubmitted && handleAnswerSelect(qIdx, optIdx)}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {!quizSubmitted ? (
                <button className="btn btn-primary" onClick={handleSubmitQuiz} style={{ width: '100%' }}>
                  Submit Answers
                </button>
              ) : (
                <div className="solutions-panel slide-in text-center" style={{ padding: '20px' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} className="text-gradient">
                    <CheckCircle size={16} /> Audit Summary
                  </h4>
                  <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: '10px 0', color: '#fff' }}>
                    Score: {quizScore} / {quizQuestions[selectedRoadmap === 'Frontend Developer' ? 'Frontend Developer' : 'Fullstack SaaS Architect'].length}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {quizScore === quizQuestions[selectedRoadmap === 'Frontend Developer' ? 'Frontend Developer' : 'Fullstack SaaS Architect'].length 
                      ? 'Perfect! You are fully competent in this track segment.' 
                      : 'We recommend adding the missing concepts to your Goal Planner checklist.'}
                  </p>
                  <button className="btn btn-secondary" style={{ width: '100%', marginTop: '15px' }} onClick={() => setQuizActive(false)}>
                    Close Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="col-12" style={{ marginTop: '10px' }}>
        <LocalAgentChat 
          agent="Learning Agent" 
          welcomeMessage="Welcome to the Learning AI Advisory Desk. Ask me to explain coding concepts, help with syntax issues, recommend resources, or construct customized learning roadmaps."
          placeholder="Ask your learning advisor anything (e.g. Can you explain closures in Javascript?)"
          presets={[
            "Explain Async/Await and JS Promises",
            "What projects should I build to learn Redux?",
            "Explain MongoDB indexing fundamentals"
          ]}
        />
      </div>
    </div>
  );
}

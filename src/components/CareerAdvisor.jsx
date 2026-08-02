import React, { useState } from 'react';
import { Briefcase, UploadCloud, Award, AlertTriangle, BookOpen, Star, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import LocalAgentChat from './LocalAgentChat';

export default function CareerAdvisor({ onAddGoal }) {
  const [analyzingResume, setAnalyzingResume] = useState(false);
  const [resumeParsed, setResumeParsed] = useState(false);
  const [atsScore, setAtsScore] = useState(45);
  const [mockRole, setMockRole] = useState('React Frontend Developer');
  
  // Mock Interview State
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  const mockQuestions = {
    'React Frontend Developer': [
      "What is the difference between Virtual DOM and Real DOM in React?",
      "Explain the dependency array in useEffect hook and how to avoid infinite render loops.",
      "How do you handle state management across deeply nested components in React?"
    ],
    'Node Backend Developer': [
      "Explain Node.js event-driven architecture and the Event Loop.",
      "What are the best practices to secure REST APIs (e.g., JWT, Rate Limiting)?",
      "How do you tackle race conditions in database transactions using MongoDB or SQL?"
    ],
    'Business Analyst / Startup Pitcher': [
      "How do you perform market sizing (TAM, SAM, SOM) for a new startup product?",
      "Explain the metrics to assess customer acquisition costs vs lifetime value (CAC vs LTV).",
      "How do you prioritize features using MoSCoW or RICE framework during early product scoping?"
    ]
  };

  const handleResumeAnalysis = () => {
    setAnalyzingResume(true);
    setResumeParsed(false);
    setTimeout(() => {
      setAtsScore(74);
      setResumeParsed(true);
      setAnalyzingResume(false);
    }, 2800);
  };

  const handleStartInterview = () => {
    setInterviewStarted(true);
    setCurrentQuestionIdx(0);
    setUserAnswer('');
    setFeedback(null);
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    setEvaluating(true);
    setFeedback(null);

    // Simulate AI evaluating answer
    setTimeout(() => {
      const length = userAnswer.trim().length;
      let score = 5;
      let review = "Your answer outlines core terminology but lacks technical execution details. Try referencing active syntax or real-world examples.";
      let improvement = "Mention React reconciliation algorithms (Fiber) or specific event loop thread pools to sound more advanced.";

      if (length > 200) {
        score = 9;
        review = "Excellent answer. Highly detailed, referencing architectural models, best practices, and runtime behaviors. Very confident delivery structure.";
        improvement = "Perfect score. Include references to custom hooks optimization or Redis caching layers if asked for extra edge.";
      } else if (length > 100) {
        score = 7.5;
        review = "Good operational response. You captured the key definitions and operational patterns correctly.";
        improvement = "Provide a concrete code workflow scenario (e.g. clean-up function in useEffect returning an abort controller).";
      }

      setFeedback({ score, review, improvement });
      setEvaluating(false);
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < mockQuestions[mockRole].length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      alert("Mock Session Complete! Check advisor reports for summary review.");
      setInterviewStarted(false);
      setCurrentQuestionIdx(0);
      setUserAnswer('');
      setFeedback(null);
    }
  };

  return (
    <div className="dash-grid">
      {/* ATS Resume Analyzer */}
      <div className="col-6 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
          <Briefcase style={{ color: '#8b5cf6' }} /> ATS AI Resume Analyzer
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
          Upload your resume files to check if they match standard ATS keyword scanners. The AI will outline missing tech stacks and generate learning goals.
        </p>

        {/* Drag and Drop Mock Area */}
        <div 
          style={{ 
            border: '2px dashed var(--glass-border)', 
            borderRadius: '12px', 
            padding: '30px', 
            textAlign: 'center', 
            background: 'rgba(255,255,255,0.01)',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
          onClick={handleResumeAnalysis}
        >
          {analyzingResume ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <RefreshCw className="text-gradient" style={{ animation: 'speaking-animation 1s infinite alternate' }} />
              <span>Scanning Resume Parser Nodes...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <UploadCloud size={32} style={{ color: 'var(--text-secondary)' }} />
              <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Upload Resume File (PDF, DOCX)</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click here to simulate resume scanning</span>
            </div>
          )}
        </div>

        {resumeParsed && (
          <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div className="ats-radial" style={{ '--score': atsScore }}>
                <span className="ats-radial-val">{atsScore}%</span>
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>ATS Match Quotient</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Weak keyword indicators found in modern framework architectures.</p>
              </div>
            </div>

            <div className="swot-grid">
              <div className="swot-cell swot-w" style={{ padding: '16px' }}>
                <h5 style={{ fontSize: '0.85rem', color: '#ef4444', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle size={14} /> Missing Skills
                </h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['React Context API', 'Webpack Config', 'Git Submodules', 'Unit Testing (Jest)'].map((sk, idx) => (
                    <span key={idx} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{sk}</span>
                  ))}
                </div>
              </div>

              <div className="swot-cell swot-s" style={{ padding: '16px' }}>
                <h5 style={{ fontSize: '0.85rem', color: '#10b981', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BookOpen size={14} /> Strong Skills Info
                </h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['HTML5 Semantic CSS', 'JS ES6 Arrow Syn', 'JSON REST Requests'].map((sk, idx) => (
                    <span key={idx} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{sk}</span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                onAddGoal("Study React Context API and Webpack configurations", "Career");
                alert("Goal added: Study React Context API.");
              }}
            >
              + Deploy Missing Skills to Goal Planner List
            </button>
          </div>
        )}
      </div>

      {/* Interview practice simulator */}
      <div className="col-6 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
          <Star style={{ color: '#06b6d4' }} /> Practice AI Mock Interview
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
          Select your target role. The AI generates contextual interview questions; type your answers, and receive detailed scores and corrections.
        </p>

        {!interviewStarted ? (
          <div>
            <div className="form-group">
              <label className="form-label">Select Target Role</label>
              <select 
                className="form-input"
                value={mockRole}
                onChange={(e) => setMockRole(e.target.value)}
              >
                <option value="React Frontend Developer">React Frontend Developer</option>
                <option value="Node Backend Developer">Node Backend Developer</option>
                <option value="Business Analyst / Startup Pitcher">Business Analyst / Startup Creator</option>
              </select>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={handleStartInterview}>
              Initialize Practice Board
            </button>
          </div>
        ) : (
          <div className="slide-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '12px' }}>
              <span>Role: <strong style={{ color: '#06b6d4' }}>{mockRole}</strong></span>
              <span>Question {currentQuestionIdx + 1} of {mockQuestions[mockRole].length}</span>
            </div>

            <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '20px' }}>
              <p style={{ fontWeight: '600', color: '#fff', fontSize: '1rem' }}>
                {mockQuestions[mockRole][currentQuestionIdx]}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Your Technical Answer</label>
              <textarea 
                className="form-input" 
                style={{ minHeight: '140px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                placeholder="Type your response here detailing framework mechanics or conceptual architecture..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={evaluating}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={handleEvaluate}
                disabled={evaluating || !userAnswer.trim()}
              >
                {evaluating ? 'Evaluating API Response...' : 'Evaluate Answer'}
              </button>
              <button className="btn btn-secondary" onClick={() => setInterviewStarted(false)}>
                Quit Session
              </button>
            </div>

            {feedback && (
              <div className="solutions-panel slide-in" style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.92rem' }} className="text-gradient">AI Evaluation Response</h4>
                  <span className="agent-badge-pill" style={{ margin: 0, color: '#10b981' }}>Score: {feedback.score} / 10</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#fff', marginBottom: '10px' }}>{feedback.review}</p>
                <div style={{ background: 'rgba(245,158,11,0.05)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid var(--warning)', fontSize: '0.8rem', color: '#fbbf24' }}>
                  <strong>Key Missing:</strong> {feedback.improvement}
                </div>
                
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%', marginTop: '15px', fontSize: '0.8rem', padding: '8px' }}
                  onClick={handleNextQuestion}
                >
                  Confirm and Proceed →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="col-12" style={{ marginTop: '10px' }}>
        <LocalAgentChat 
          agent="Career Agent" 
          welcomeMessage="Welcome to the Career AI Advisory Desk. Ask me anything about job search strategies, resume optimization, ATS keywords, interview preparation, or career transitions."
          placeholder="Ask your career advisor anything (e.g. How can I stand out in Frontend interviews?)"
          presets={[
            "What are the best keywords for a MERN stack resume?",
            "How do I prepare for a React Context and Redux interview?",
            "Tips for negotiating a developer salary"
          ]}
        />
      </div>
    </div>
  );
}

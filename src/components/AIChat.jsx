import React, { useState } from 'react';
import { MessageSquare, Send, Cpu, Brain, Check, BarChart2, Zap, ShieldAlert, Award, Play } from 'lucide-react';

export default function AIChat({ onAddGoal, activeAgent, onAgentChange, memoryList }) {
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your LifeOS Core. Enter any life bottleneck, career stagnation, or business challenge. Let's solve it step-by-step.",
      workflow: null
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const agents = [
    { id: 'general', label: 'LifeOS Core' },
    { id: 'career', label: 'Career Agent' },
    { id: 'finance', label: 'Finance Agent' },
    { id: 'business', label: 'Business Agent' },
    { id: 'learning', label: 'Learning Agent' }
  ];

  const workflowSteps = [
    "Problem Detection",
    "Root Cause Analysis",
    "Data Analysis Check",
    "Prediction Model",
    "AI Recommendation",
    "Action Plan Generation"
  ];

  const handlePresetClick = (preset) => {
    setInputText(preset);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const apiBase = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
    const userMsg = { sender: 'user', text: inputText };
    setChatLog(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);
    setCurrentStep(1);

    try {
      const response = await fetch(`${apiBase}/api/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: userMsg.text,
          agent: activeAgent,
          memory: memoryList
        })
      });

      const data = await response.json();
      const aiText = data.text || data.error || 'LifeOS AI could not generate a response.';
      setChatLog(prev => [...prev, { sender: 'ai', text: aiText }]);
    } catch (err) {
      setChatLog(prev => [...prev, { sender: 'ai', text: `AI request failed: ${err.message}` }]);
    } finally {
      setCurrentStep(workflowSteps.length);
      setIsProcessing(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Agent Selector Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu style={{ color: '#06b6d4' }} size={20} />
          <span style={{ fontWeight: '600' }}>Active AI Routing:</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {agents.map((agent) => (
            <button 
              key={agent.id} 
              className={`btn btn-secondary ${activeAgent === agent.id ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 12px', border: activeAgent === agent.id ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)' }}
              onClick={() => onAgentChange(agent.id)}
            >
              {agent.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat History */}
      <div className="chat-messages">
        {chatLog.map((chat, idx) => (
          <div key={idx} className={`chat-bubble ${chat.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
            
            {/* Stored Memory Context Inject Demonstration */}
            {chat.sender === 'ai' && idx > 0 && memoryList && memoryList.length > 0 && (
              <div className="agent-badge-pill" style={{ opacity: 0.85, fontSize: '0.7rem' }}>
                <Brain size={10} /> Stored user context injected (Skills: {memoryList.filter(m => m.importance === 'high').map(m => m.information).slice(0, 2).join(', ') || 'Active'})
              </div>
            )}

            <p style={{ whiteSpace: 'pre-line' }}>{chat.text}</p>

            {chat.workflow && (
              <div className="solutions-panel slide-in" style={{ marginTop: '20px' }}>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }} className="text-gradient">
                  <Award size={16} /> {chat.workflow.title}
                </h4>

                <div className="swot-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="swot-cell swot-w" style={{ padding: '12px' }}>
                    <div className="solution-section-title" style={{ fontSize: '0.7rem', color: '#ef4444' }}>Root Cause Analysis</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{chat.workflow.rootCause}</p>
                  </div>
                  <div className="swot-cell swot-t" style={{ padding: '12px' }}>
                    <div className="solution-section-title" style={{ fontSize: '0.7rem', color: '#f59e0b' }}>AI Prediction Model</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{chat.workflow.prediction}</p>
                  </div>
                </div>

                <div style={{ margin: '15px 0' }}>
                  <span className="solution-section-title" style={{ fontSize: '0.75rem', color: '#8b5cf6' }}>Recommendation</span>
                  <p style={{ fontSize: '0.88rem', color: '#fff' }}>{chat.workflow.recommendations}</p>
                </div>

                <div style={{ marginTop: '15px', borderTop: '1px solid var(--glass-border)', paddingTop: '15px' }}>
                  <span className="solution-section-title" style={{ fontSize: '0.75rem', color: '#10b981' }}>Generated Action Goals</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    {chat.workflow.actions.map((act, i) => (
                      <div key={i} style={{ display: 'flex', justifyOrigin: 'center', alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{act}</span>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '6px' }}
                          onClick={() => {
                            onAddGoal(act, chat.workflow.category);
                            alert(`Goal Added to Planner: "${act}"`);
                          }}
                        >
                          + Deploy Goal
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live Stepper Loader */}
        {isProcessing && (
          <div className="chat-bubble chat-bubble-ai" style={{ width: '100%', maxWidth: '100%', alignSelf: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
              <span className="text-violet" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Executing Engine Workflow:</span>
            </div>

            <div className="workflow-stepper">
              {workflowSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`workflow-step ${
                    currentStep > idx ? 'completed' : currentStep === idx ? 'active' : ''
                  }`}
                >
                  <span className="step-indicator">
                    {currentStep > idx ? <Check size={10} /> : idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preset Bottlenecks Panel */}
      <div style={{ padding: '10px 20px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px', overflowX: 'auto' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>Presets:</span>
        {[
          "My shop sales are decreasing",
          "I cannot get a software developer job",
          "I want to save ₹3000 this month",
          "I want to start clothing business"
        ].map((pr, index) => (
          <button 
            key={index} 
            className="btn btn-secondary" 
            style={{ fontSize: '0.75rem', padding: '4px 10px', whiteSpace: 'nowrap' }}
            onClick={() => handlePresetClick(pr)}
          >
            {pr}
          </button>
        ))}
      </div>

      {/* Chat Text Bar */}
      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Type your current life bottleneck or select a preset..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isProcessing}
          />
          <button 
            className="btn btn-primary" 
            style={{ padding: '8px 18px', borderRadius: '8px' }}
            onClick={handleSend}
            disabled={isProcessing}
          >
            <Send size={14} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

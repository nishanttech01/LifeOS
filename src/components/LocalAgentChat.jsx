import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Bot, User, RefreshCw } from 'lucide-react';

export default function LocalAgentChat({ agent, welcomeMessage, placeholder, presets = [] }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: welcomeMessage || `Hello! I am your specialized AI ${agent || 'Agent'}. How can I assist you with your tasks today?` }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom of messages when new ones arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (textToSend) => {
    const promptText = textToSend || inputVal;
    if (!promptText.trim() || isLoading) return;
    const apiBase = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

    if (!textToSend) setInputVal(''); // Clear main input if it wasn't a preset click

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: promptText }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: promptText,
          agent: agent || 'General'
        })
      });

      const data = await response.json();
      const aiReply = data.text || data.error || 'Failed to receive response from AI agent.';

      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: Unable to connect to the agent. ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glow-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu style={{ color: 'var(--accent-secondary)' }} size={20} />
          <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>Consult {agent || 'AI Specialist'}</h3>
        </div>
        <span className="agent-badge-pill" style={{ margin: 0, fontSize: '0.72rem', borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)' }}>
          Active Routing: {agent}
        </span>
      </div>

      {/* Messages Pane */}
      <div style={{ 
        height: '240px', 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        paddingRight: '6px',
        background: 'rgba(0,0,0,0.15)',
        borderRadius: '8px',
        padding: '12px'
      }}>
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              display: 'flex', 
              gap: '10px', 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
            }}
          >
            {/* Avatar icon */}
            <div style={{ 
              width: '28px', 
              height: '28px', 
              borderRadius: '50%', 
              background: msg.role === 'user' ? 'rgba(139,92,246,0.2)' : 'rgba(6,182,212,0.2)',
              border: `1px solid ${msg.role === 'user' ? 'var(--accent-primary)' : 'var(--accent-secondary)'}`,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {msg.role === 'user' ? <User size={13} style={{ color: 'var(--accent-primary)' }} /> : <Bot size={13} style={{ color: 'var(--accent-secondary)' }} />}
            </div>

            {/* Bubble */}
            <div style={{ 
              background: msg.role === 'user' ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${msg.role === 'user' ? 'rgba(139, 92, 246, 0.2)' : 'var(--glass-border)'}`,
              borderRadius: '12px',
              padding: '10px 14px',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              lineHeight: '1.45',
              whiteSpace: 'pre-line'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
            <div style={{ 
              width: '28px', 
              height: '28px', 
              borderRadius: '50%', 
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.2)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              animation: 'spin 1.5s linear infinite'
            }}>
              <RefreshCw size={13} style={{ color: 'var(--accent-secondary)' }} />
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontStyle: 'italic', display: 'flex', alignItems: 'center' }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Chips */}
      {presets.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
          {presets.map((p, idx) => (
            <button
              key={idx}
              className="btn btn-secondary"
              style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '15px' }}
              onClick={() => handleSend(p)}
              disabled={isLoading}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="chat-input-wrapper" style={{ padding: '4px 12px' }}>
        <input 
          type="text" 
          className="chat-input"
          style={{ fontSize: '0.86rem' }}
          placeholder={placeholder || "Ask your specialist agent anything..."}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button 
          className="btn btn-primary" 
          style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem' }}
          onClick={() => handleSend()}
          disabled={isLoading || !inputVal.trim()}
        >
          <Send size={12} />
        </button>
      </div>

    </div>
  );
}

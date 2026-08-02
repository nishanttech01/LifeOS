import React, { useState } from 'react';
import { Cpu, Plus, Sparkles, BrainCircuit, ShieldAlert, Award } from 'lucide-react';

export default function MemorySystem({ memoryList, onAddMemory, onDeleteMemory }) {
  const [newInfo, setNewInfo] = useState('');
  const [newImportance, setNewImportance] = useState('high');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newInfo.trim()) return;
    onAddMemory(newInfo, newImportance);
    setNewInfo('');
  };

  return (
    <div className="dash-grid">
      {/* Memory System Summary */}
      <div className="col-12 glow-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <BrainCircuit style={{ color: '#06b6d4' }} size={24} />
          <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>Long-Term AI Cognitive Memory</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', fontSize: '0.95rem' }}>
          This system records user specs directly to bypass normal prompt limits. The AI Solver Engine acts as a Digital Twin by referencing these preferences, verified assets, career goals, and skill limits when analyzing problems.
        </p>

        {/* Cognitive Context Active Showcase */}
        <div className="custom-alert custom-alert-info" style={{ marginTop: '20px', marginBottom: '0' }}>
          <Sparkles size={16} />
          <span>
            <strong>Active Brain Context:</strong> LifeOS is currently evaluating recommendations prioritizing skills like 
            <strong style={{ color: '#fff' }}> {memoryList.filter(m => m.importance === 'high').map(m => m.information).slice(0, 3).join(', ') || 'General'}</strong>.
          </span>
        </div>
      </div>

      {/* Adding context */}
      <div className="col-4 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ marginBottom: '20px', color: '#fff' }}>Insert Memory Block</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Context Description</label>
            <textarea 
              className="form-input" 
              style={{ minHeight: '120px', resize: 'vertical', fontFamily: 'inherit' }}
              placeholder="e.g. Completed React basics project yesterday / Target industry is fintech SaaS / Cannot work weekends due to college..."
              value={newInfo}
              onChange={(e) => setNewInfo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cognitive Weight (Importance)</label>
            <select 
              className="form-input"
              value={newImportance}
              onChange={(e) => setNewImportance(e.target.value)}
            >
              <option value="high">High (Influences all agent models)</option>
              <option value="medium">Medium (Used in reports & summaries)</option>
              <option value="low">Low (Reference only)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            <Plus size={16} /> Commit to Memory
          </button>
        </form>
      </div>

      {/* Memory Nodes List grid */}
      <div className="col-8 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ marginBottom: '20px', color: '#fff' }}>Recorded Cognitive Blocks</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', maxHeight: '420px', overflowY: 'auto', paddingRight: '5px' }}>
          {memoryList.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Memory core is blank. Fill in your skills, targets, or habits above!</p>
          ) : (
            memoryList.map((mem) => (
              <div 
                key={mem.id} 
                className="glow-card" 
                style={{ 
                  padding: '16px 20px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ marginTop: '4px' }}>
                    <span 
                      className="step-indicator" 
                      style={{ 
                        background: mem.importance === 'high' ? 'rgba(239, 68, 68, 0.2)' : 
                                    mem.importance === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                        color: mem.importance === 'high' ? '#f87171' : 
                               mem.importance === 'medium' ? '#fbbf24' : '#22d3ee',
                        border: 'none',
                        width: '28px',
                        height: '28px',
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}
                    >
                      {mem.importance.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.95rem', color: '#fff' }}>{mem.information}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Importance: {mem.importance.toUpperCase()} • Sync Complete</span>
                  </div>
                </div>

                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '6px 12px', fontSize: '0.75rem', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
                  onClick={() => onDeleteMemory(mem.id)}
                >
                  Forget
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

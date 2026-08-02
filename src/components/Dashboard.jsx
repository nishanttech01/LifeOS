import React from 'react';
import { Target, Zap, Clock, ShieldCheck, Award, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export default function Dashboard({ goalsList, tasks, activeTabChange }) {
  const completedGoalsCount = goalsList.filter(g => g.progress === 100).length;
  const averageGoalProgress = goalsList.length > 0 
    ? Math.round(goalsList.reduce((acc, curr) => acc + curr.progress, 0) / goalsList.length) 
    : 0;

  const incompleteTasks = tasks.filter(t => t.status === 'pending');

  return (
    <div className="dash-grid">
      {/* Morning AI Report Header */}
      <div className="col-12 glow-card" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <div className="agent-badge-pill" style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--accent-primary)', marginBottom: '10px' }}>
              <Sparkles size={12} /> Morning Engine Sync Complete
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
              Good Morning, <span className="text-gradient">Nishant Kumar</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
              Your digital twin context is loaded. Today's primary metrics show positive trajectory in Coding Skills (+12%) but potential runway exposure in Transport costs.
            </p>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MAPPING ACCURACY</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-secondary)', fontFamily: 'var(--font-mono)' }}>98.4%</div>
          </div>
        </div>

        {/* Priority items from active goals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '24px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              <Clock size={14} /> Morning Focus Checklist
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {incompleteTasks.slice(0, 3).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontSize: '0.85rem' }}>
                  <span className="step-indicator" style={{ width: '16px', height: '16px', fontSize: '9px', background: 'var(--bg-tertiary)' }}>{idx + 1}</span>
                  <span style={{ color: '#fff' }}>{item.task}</span>
                </div>
              ))}
              {incompleteTasks.length === 0 && (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>All milestones completed! Go to the Goal Planner to add new targets.</div>
              )}
            </div>
          </div>

          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              <TrendingUp size={14} /> Global Goal Projections
            </h4>
            <div style={{ background: 'rgba(255,255,255,0.01)', padding: '15px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Averaged Completion Target</span>
                <strong style={{ color: '#fff' }}>{averageGoalProgress}%</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${averageGoalProgress}%` }}></div>
              </div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '10px' }}>
                You have {goalsList.length} active trajectories, {completedGoalsCount} fully completed.
              </span>
            </div>
          </div>

          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              <ShieldCheck size={14} /> Cognitive AI Insights
            </h4>
            <div className="solutions-panel swot-s" style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.03)', marginTop: 0 }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                "Commitment records suggest JavaScript execution is stable. Focus on Webpack configuration parameters this week to lock in mock developer prerequisites."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trajectories Overview & Shortcut Grid */}
      <div className="col-8 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Target style={{ color: '#8b5cf6' }} /> Active Path Performance
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {goalsList.map(goal => (
            <div 
              key={goal.id} 
              className="glow-card" 
              style={{ padding: '18px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)' }}
            >
              <div style={{ display: 'flex', justificationContent: 'space-between', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="agent-badge-pill" style={{ margin: 0 }}>{goal.category}</span>
                <strong style={{ fontSize: '0.95rem', color: '#fff' }}>{goal.progress}%</strong>
              </div>
              <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '8px' }}>{goal.title}</h4>
              
              <div className="progress-track" style={{ marginBottom: '10px' }}>
                <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Deadline: {goal.deadline}</span>
            </div>
          ))}
        </div>

        <button 
          className="btn btn-secondary" 
          style={{ width: '100%', marginTop: '20px', fontSize: '0.85rem' }}
          onClick={() => activeTabChange('goals')}
        >
          Go to Goal Planner →
        </button>
      </div>

      {/* Specialist Agent loop dashboard */}
      <div className="col-4 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#fff' }}>Specialist System Nodes</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
          Toggle and audit active agent processes running on LifeOS background servers.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            { tag: "Career Agent", desc: "Auditing ATS parameters & interview pools", status: "Active" },
            { tag: "Finance Agent", desc: "Tracking discretionary subscription leakages", status: "Active" },
            { tag: "Business Growth Agent", desc: "Analyzing sustainable boutique market competitor pools", status: "Standby" },
            { tag: "Learning Mentor", desc: "Formulating JS closure test algorithms", status: "Active" }
          ].map((agent, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '12px 16px', 
                background: 'rgba(255,255,255,0.01)', 
                border: '1px solid var(--glass-border)', 
                borderRadius: '8px' 
              }}
            >
              <div>
                <h5 style={{ fontSize: '0.88rem', color: '#fff' }}>{agent.tag}</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{agent.desc}</p>
              </div>
              <span 
                className="agent-badge-pill" 
                style={{ 
                  margin: 0, 
                  background: agent.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                  color: agent.status === 'Active' ? '#10b981' : 'var(--text-muted)',
                  borderColor: agent.status === 'Active' ? 'rgba(16,185,129,0.2)' : 'var(--glass-border)'
                }}
              >
                {agent.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

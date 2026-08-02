import React, { useState } from 'react';
import { Settings, Shield, Award, CheckCircle, CreditCard, Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const [profileName, setProfileName] = useState('Nishant Kumar');
  const [profileEmail, setProfileEmail] = useState('nishant@lifeos.ai');
  const [digitalTwinTone, setDigitalTwinTone] = useState('analytical');
  const [subTier, setSubTier] = useState('Premium');

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile settings committed to long-term memory system!");
  };

  return (
    <div className="dash-grid">
      {/* Profile settings */}
      <div className="col-7 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Settings style={{ color: '#8b5cf6' }} /> User Profile & Digital Twin Config
        </h3>

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Access Hook</label>
              <input 
                type="email" 
                className="form-input"
                value={profileEmail}
                disabled
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '10px' }}>
            <label className="form-label">Digital Twin Reasoning Persona</label>
            <select 
              className="form-input"
              value={digitalTwinTone}
              onChange={(e) => setDigitalTwinTone(e.target.value)}
            >
              <option value="analytical">Analytical (Deconstructs variables with financial grids)</option>
              <option value="direct">Direct & Tough (Focuses on rapid correction loops)</option>
              <option value="empathetic">Encouraging Mentor (Adds positive validation triggers)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '15px' }}>
            Commit Profile State
          </button>
        </form>

        {/* Security Parameters */}
        <div style={{ marginTop: '30px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
          <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={16} style={{ color: '#10b981' }} /> System Security & Audit Compliance
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyOrigin: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>End-to-End Database Encryption:</span>
              <strong style={{ color: '#10b981' }}>COMPLIANT (AES-256)</strong>
            </div>
            <div style={{ display: 'flex', justifyOrigin: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Vector Match Rate Limit:</span>
              <strong style={{ color: '#fff' }}>60 requests / minute</strong>
            </div>
            <div style={{ display: 'flex', justifyOrigin: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Session Expiry:</span>
              <strong style={{ color: '#fff' }}>14 Days (JWT Renew Enabled)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription status */}
      <div className="col-5 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <CreditCard style={{ color: '#06b6d4' }} /> Subscription Tier
        </h3>

        <div style={{ background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '20px', textAlign: 'center' }}>
          <span className="agent-badge-pill" style={{ color: 'var(--accent-secondary)' }}>ACTIVE PLAN</span>
          <h2 style={{ fontSize: '2rem', color: '#fff', margin: '10px 0' }} className="text-gradient">{subTier} License</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Next automatic renewal: August 17, 2026 (₹299/month)</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { name: "Free Sandbox", price: "₹0" },
            { name: "Premium Tier", price: "₹299" },
            { name: "Pro Agent Deployment", price: "₹999" }
          ].map((tier, i) => (
            <button 
              key={i} 
              className="btn btn-secondary"
              style={{ 
                justifyContent: 'space-between', 
                fontSize: '0.88rem',
                borderColor: subTier.toLowerCase().includes(tier.name.split(' ')[0].toLowerCase()) ? 'var(--accent-primary)' : 'var(--glass-border)',
                background: subTier.toLowerCase().includes(tier.name.split(' ')[0].toLowerCase()) ? 'rgba(139,92,246,0.1)' : 'transparent'
              }}
              onClick={() => {
                const prefix = tier.name.split(' ')[0];
                setSubTier(prefix);
                alert(`Switched workspace tier to ${prefix}!`);
              }}
            >
              <span>{tier.name}</span>
              <strong style={{ color: '#fff' }}>{tier.price}/m</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Target, HelpCircle, TrendingUp, DollarSign, Award, Grid, ArrowRight } from 'lucide-react';
import LocalAgentChat from './LocalAgentChat';

export default function BusinessAdvisor() {
  const [businessIdea, setBusinessIdea] = useState('Clothing Store Online');
  const [analyzingIdea, setAnalyzingIdea] = useState(false);
  const [validatedIdea, setValidatedIdea] = useState(false);
  const [ideaReport, setIdeaReport] = useState(null);

  const performIdeaAnalysis = () => {
    if (!businessIdea.trim()) return;
    setAnalyzingIdea(true);
    setValidatedIdea(false);

    setTimeout(() => {
      setIdeaReport({
        investment: "₹3,50,000 - ₹5,00,000",
        marketOpportunity: "High. Local sustainable clothing market is growing at 18% CAGR. E-commerce platforms decrease physical showroom overhead cost.",
        targetAudience: "Ages 18-35: Digital natives preferring micro-influencer fashion suggestions over static retail designs.",
        riskScore: "Medium (Inventory risk and marketing density factors)",
        swot: {
          s: "Low inventory overhead using print-on-demand or dropship models; unique boutique aesthetics.",
          w: "Lacking capital buffer; high initial client acquisition costs.",
          o: "Niche targeting in eco-friendly cotton garments; Instagram Reels local exposure.",
          t: "Aggressive competition from fast-fashion incumbents (Zara, H&M, Meesho)."
        },
        marketingStrategy: [
          "Micro-influencer sampling (giving free product tags for review content)",
          "Configure local geographical Ads on Instagram focused on sustainable fashion hashtags",
          "Deploy a high-converting Shopify layout with 10% coupon popups"
        ]
      });
      setValidatedIdea(true);
      setAnalyzingIdea(false);
    }, 2500);
  };

  return (
    <div className="dash-grid">
      {/* Idea Inputs Form */}
      <div className="col-4 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#fff' }}>Idea Validator Engine</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
          Pitch your business concept to analyze investment requirements, calculate risk metrics, outline competitors, and generate a SWOT Matrix map.
        </p>

        <div className="form-group">
          <label className="form-label">Startup/Business Concept</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. Eco Friendly Clothing, AI Web Agency..."
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
          />
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '10px' }}
          onClick={performIdeaAnalysis}
          disabled={analyzingIdea}
        >
          {analyzingIdea ? 'Generating Opportunity Map...' : 'Analyze Market Feasibility'}
        </button>

        {validatedIdea && (
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '12px' }}>Operational Indicators</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyOrigin: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Calculated Capital Needed:</span>
                <strong style={{ color: '#fff' }}>{ideaReport.investment}</strong>
              </div>
              <div style={{ display: 'flex', justifyOrigin: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Risk Classification:</span>
                <strong style={{ color: '#fbbf24' }}>{ideaReport.riskScore}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SWOT Canvas & Plan Outputs */}
      <div className="col-8 glow-card" style={{ padding: '30px' }}>
        {analyzingIdea && (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)' }}>
            <TrendingUp className="text-gradient" size={40} style={{ animation: 'speaking-animation 1s infinite alternate', marginBottom: '15px' }} />
            <p>Evaluating regional market sizing datasets & competitive index ratios...</p>
          </div>
        )}

        {!analyzingIdea && !validatedIdea && (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
            <Grid size={40} style={{ marginBottom: '15px', opacity: '0.5' }} />
            <p>Submit your Business Concept on the left to activate competitor analysis & execution templates.</p>
          </div>
        )}

        {validatedIdea && ideaReport && (
          <div className="slide-in">
            <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '15px' }} className="text-gradient">
              Audit results: {businessIdea}
            </h3>

            {/* SWOT Grid */}
            <div className="swot-grid">
              <div className="swot-cell swot-s">
                <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#10b981' }}>S - STRENGTHS</span>
                <p style={{ fontSize: '0.8rem', color: '#fff', marginTop: '6px' }}>{ideaReport.swot.s}</p>
              </div>
              <div className="swot-cell swot-w">
                <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#ef4444' }}>W - WEAKNESSES</span>
                <p style={{ fontSize: '0.8rem', color: '#fff', marginTop: '6px' }}>{ideaReport.swot.w}</p>
              </div>
              <div className="swot-cell swot-o">
                <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#06b6d4' }}>O - OPPORTUNITIES</span>
                <p style={{ fontSize: '0.8rem', color: '#fff', marginTop: '6px' }}>{ideaReport.swot.o}</p>
              </div>
              <div className="swot-cell swot-t">
                <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#f59e0b' }}>T - THREATS</span>
                <p style={{ fontSize: '0.8rem', color: '#fff', marginTop: '6px' }}>{ideaReport.swot.t}</p>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '12px' }}>Growth Strategy Milestones</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ideaReport.marketingStrategy.map((strat, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <ArrowRight size={14} style={{ color: '#06b6d4' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{strat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="col-12" style={{ marginTop: '10px' }}>
        <LocalAgentChat 
          agent="Business Agent" 
          welcomeMessage="Welcome to the Business AI Advisory Desk. Pitch me your startup ideas, ask for SWOT evaluations, growth strategies, marketing advice, or funding avenues."
          placeholder="Ask your business advisor anything (e.g. How can I market activewear online?)"
          presets={[
            "How do I conduct market size analysis (TAM/SAM/SOM)?",
            "What is a standard customer acquisition cost (CAC) for e-commerce?",
            "Key strategies for bootstrapping a software agency"
          ]}
        />
      </div>
    </div>
  );
}

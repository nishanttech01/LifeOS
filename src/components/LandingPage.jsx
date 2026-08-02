import React, { useState } from 'react';
import { Shield, Brain, Zap, Target, Cpu, TrendingUp, Briefcase, Award, CheckCircle } from 'lucide-react';

export default function LandingPage({ onGetStarted, onNavigateToAuth }) {
  const [problemDemoInput, setProblemDemoInput] = useState('');
  const [demoState, setDemoState] = useState('idle'); // idle, processing, done
  const [demoResult, setDemoResult] = useState(null);

  const presets = [
    { text: "My shop sales are decreasing", desc: "Retail Shop Sales Recovery" },
    { text: "I want to save money", desc: "Personal Expense Optimization" },
    { text: "I can't get a job interview", desc: "Career Acceleration Strategy" }
  ];

  const runDemo = (problemText) => {
    setProblemDemoInput(problemText);
    setDemoState('processing');
    setDemoResult(null);

    // Simulate the LifeOS workflow steps
    setTimeout(() => {
      setDemoResult({
        detectedCategory: problemText.toLowerCase().includes('sales') ? 'Business Growth' : 
                          problemText.toLowerCase().includes('job') ? 'Career Development' : 'Personal Finance',
        rootCause: problemText.toLowerCase().includes('sales') 
          ? "Customer footfall is shifted online; low local marketing retention (20%)." 
          : problemText.toLowerCase().includes('job') 
          ? "Resume ATS mismatch (42% score) and lacking React project experience."
          : "Discretionary subscription spending matches 35% of total income.",
        recommendation: problemText.toLowerCase().includes('sales')
          ? "Launch a localized Instagram digital campaign and implement a customer loyalty discount program."
          : problemText.toLowerCase().includes('job')
          ? "Update resume with ATS-friendly action verbs, build 2 modern React projects, and practice dynamic mock interviews."
          : "Audit automatic subscription renewals and set a rigid food ordering cap of ₹2,500/month.",
        actionPlan: problemText.toLowerCase().includes('sales')
          ? ["Step 1: Set up Google Business Profile discounts (Day 1)", "Step 2: Print loyalty QR scanner cards (Day 3)", "Step 3: Run ₹100/day local Instagram ads target (Day 5)"]
          : problemText.toLowerCase().includes('job')
          ? ["Step 1: Optimize resume formatting to ATS standards (Day 1-2)", "Step 2: Complete Vite + API integration projects (Day 3-10)", "Step 3: Schedule 3 mock interviews (Day 11-14)"]
          : ["Step 1: Cancel unused Netflix & Gym memberships (Day 1)", "Step 2: Configure weekly savings auto-transfer (Day 2)", "Step 3: Track meal boxes vs dining out expenses (Weekly)"]
      });
      setDemoState('done');
    }, 2800);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Landing Navbar */}
      <header className="landing-navbar">
        <div className="navbar-brand">
          <Brain style={{ color: '#8b5cf6' }} />
          <span>LIFE<span style={{ color: '#06b6d4' }}>OS</span></span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn btn-secondary" onClick={() => onNavigateToAuth(true)}>Login</button>
          <button className="btn btn-primary" onClick={onGetStarted}>Try Free</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="ellipse-glow ellipse-cyan"></div>
          <div className="ellipse-glow ellipse-purple"></div>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="agent-badge-pill" style={{ marginBottom: '20px' }}>
            <Cpu size={14} /> NEW: V2 Brain Core with 10 Specialised agents active
          </div>
          <h1 className="hero-title">
            One AI. <span className="text-gradient">Every Problem.</span><br />One Solution.
          </h1>
          <p className="hero-tagline">
            Welcome to LifeOS AI, your personal Artificial Intelligence Operating System. We detect life bottlenecks, trace root causes, model financial runways, audit resumes, and roadmap your business ideas.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
            <button className="btn btn-primary" onClick={onGetStarted}>
              Initialize LifeOS Engine
            </button>
            <button className="btn btn-secondary" style={{ marginLeft: '12px' }} onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}>
              How It Works
            </button>
          </div>

          {/* Interactive Live Playground Widget */}
          <div className="glow-card" style={{ maxWidth: '750px', margin: '0 auto', padding: '30px', textAlign: 'left', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <h3 style={{ marginBottom: '10px' }} className="text-gradient">LifeOS Engine Live Playground</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Select a bottleneck preset below or write your own to see how LifeOS detects, predicts, and resolves complex real-life scenarios.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
              {presets.map((preset, idx) => (
                <button 
                  key={idx} 
                  className="btn btn-secondary" 
                  style={{ fontSize: '0.85rem', padding: '6px 14px', borderRadius: '20px' }}
                  onClick={() => runDemo(preset.text)}
                >
                  {preset.desc}
                </button>
              ))}
            </div>

            <div className="chat-input-wrapper">
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Ex. My shop sales are decreasing / I can't save money / I can't find a React job..."
                value={problemDemoInput} 
                onChange={(e) => setProblemDemoInput(e.target.value)} 
              />
              <button 
                className="btn btn-primary" 
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                onClick={() => runDemo(problemDemoInput || "My shop sales are decreasing")}
                disabled={demoState === 'processing'}
              >
                {demoState === 'processing' ? 'Thinking...' : 'Solve'}
              </button>
            </div>

            {/* Simulated Workflow Process */}
            {demoState !== 'idle' && (
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', gap: '15px', color: 'var(--text-secondary)', fontSize: '0.8rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px', marginBottom: '15px' }}>
                  <span className={demoState === 'processing' ? "text-violet" : "text-success"}>
                    {demoState === 'processing' ? '● Engine Running...' : '✓ Solved'}
                  </span>
                  <span>Category Detected: <strong style={{ color: '#fff' }}>{demoResult ? demoResult.detectedCategory : 'Identifying...'}</strong></span>
                </div>

                {demoState === 'processing' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 0' }}>
                    <div style={{ display: 'flex', justifySelf: 'start', alignItems: 'center', gap: '8px' }}>
                      <span className="step-indicator" style={{ background: '#8b5cf6', color: '#fff', width: '16px', height: '16px', fontSize: '10px' }}>1</span>
                      <span style={{ fontSize: '0.85rem', animation: 'pulse-glow 1s infinite' }}>Analyzing context & traces...</span>
                    </div>
                    <div style={{ display: 'flex', justifySelf: 'start', alignItems: 'center', gap: '8px' }}>
                      <span className="step-indicator" style={{ width: '16px', height: '16px', fontSize: '10px' }}>2</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Calculating root cause...</span>
                    </div>
                  </div>
                )}

                {demoResult && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="slide-in">
                    <div>
                      <div className="solution-section-title" style={{ fontSize: '0.75rem' }}>
                        <Brain size={12} /> Root Cause Analysis
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{demoResult.rootCause}</p>
                    </div>

                    <div>
                      <div className="solution-section-title" style={{ fontSize: '0.75rem', color: '#06b6d4' }}>
                        <Zap size={12} /> Core Recommendation
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{demoResult.recommendation}</p>
                    </div>

                    <div>
                      <div className="solution-section-title" style={{ fontSize: '0.75rem', color: '#10b981' }}>
                        <Target size={12} /> Action Plan Timeline
                      </div>
                      <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {demoResult.actionPlan.map((action, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <CheckCircle size={14} style={{ color: '#10b981' }} /> {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="section-heading">
          <span className="text-gradient" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Full Stack Capabilities</span>
          <h2>The AI Personal Operating System</h2>
          <p className="section-subtitle">Multi-tier execution modules tailored for the human life stack.</p>
        </div>

        <div className="features-grid">
          <div className="glow-card feature-box">
            <div className="feature-icon-wrapper"><Brain /></div>
            <h3>Root Cause Engine</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
              Traces any input problem (business, finance, relationship, focus) past symptoms down to core actionable behavioral variables.
            </p>
          </div>

          <div className="glow-card feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}><Target /></div>
            <h3>Dynamic Goal Planning</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
              Maps custom learning targets, careers, and savings. Breaks long-term visions into daily milestones and actionable checklists.
            </p>
          </div>

          <div className="glow-card feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}><Award /></div>
            <h3>Resume & Interview Coach</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
              Scans resumes for ATS scores, highlights tech missing gaps, builds roadmap paths, and runs full interactive simulated speech mock interviews.
            </p>
          </div>

          <div className="glow-card feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}><Cpu /></div>
            <h3>Structured Memory Store</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
              Maintains cognitive contexts (skills, tools, interests, past entries). The AI customizes replies around your existing capabilities.
            </p>
          </div>

          <div className="glow-card feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}><TrendingUp /></div>
            <h3>Smart Finance Analyst</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
              Aggregates income streams, measures budget bounds, charts spending, and identifies wasteful automated recurring monthly subscription leakages.
            </p>
          </div>

          <div className="glow-card feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}><Shield /></div>
            <h3>Business Growth Advisor</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
              Models investments, competitor SWOT, target niches, risks, and pricing formulas. Empowers startup founders with analytical clarity.
            </p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', background: 'var(--bg-secondary)' }}>
        <div className="section-heading">
          <h2>LifeOS Execution Workflow</h2>
          <p className="section-subtitle">How LifeOS translates raw life inputs into verified, structured outputs.</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {[
            { step: "01", title: "Problem Detection", desc: "You feed in text, audio, or files. System isolates category tags (Career, Finance, Health, Growth)." },
            { step: "02", title: "Root Cause & Data Analysis", desc: "Agents map current circumstances against historical memory datasets to identify the structural breakdown." },
            { step: "03", title: "Action Plan Generation", desc: "Generates custom calendars, checklists, runway models, or roadmaps with milestone definitions." },
            { step: "04", title: "Continuous Progress Auditing", desc: "Calculates weekly completion vectors. AI adapts recommendations dynamically to prevent backlog stagnation." }
          ].map((item, index) => (
            <div key={index} className="glow-card" style={{ display: 'flex', gap: '20px', padding: '24px', alignItems: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', opacity: '0.3', fontFamily: 'var(--font-mono)', minWidth: '60px' }} className="text-gradient">{item.step}</div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="section-heading">
          <h2>Transparent, Premium Subscriptions</h2>
          <p className="section-subtitle">Choose the level of computational agency required to operate your life targets.</p>
        </div>

        <div className="price-grid">
          <div className="price-card glow-card">
            <div>
              <h3 style={{ fontSize: '1.5rem' }}>Free Plan</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>For testing basic workflows</p>
              <div style={{ margin: '20px 0' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹0</span>
                <span style={{ color: 'var(--text-secondary)' }}>/month</span>
              </div>
              <ul className="price-feat-list">
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> Basic AI Solver</li>
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> Single Goal Planner</li>
                <li className="price-feat-item" style={{ opacity: 0.5 }}><CheckCircle size={14} /> Resume ATS Analyzer (Disabled)</li>
                <li className="price-feat-item" style={{ opacity: 0.5 }}><CheckCircle size={14} /> Financial Runway Graph (Disabled)</li>
              </ul>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onGetStarted}>Get Started</button>
          </div>

          <div className="price-card glow-card featured">
            <div>
              <div style={{ background: 'var(--accent-gradient)', color: '#fff', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '12px', display: 'inline-block', marginBottom: '10px' }}>MOST POPULAR</div>
              <h3 style={{ fontSize: '1.5rem' }}>Premium</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Perfect for professionals & builders</p>
              <div style={{ margin: '20px 0' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹299</span>
                <span style={{ color: 'var(--text-secondary)' }}>/month</span>
              </div>
              <ul className="price-feat-list">
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> Full Cognitive AI Memory Access</li>
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> Unlimited Goal Lifespans</li>
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> Resume Scan & Suggestion</li>
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> Personal Financial Runway Tool</li>
              </ul>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={onGetStarted}>Go Premium</button>
          </div>

          <div className="price-card glow-card">
            <div>
              <h3 style={{ fontSize: '1.5rem' }}>Professional</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>For active founders & learners</p>
              <div style={{ margin: '20px 0' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹999</span>
                <span style={{ color: 'var(--text-secondary)' }}>/month</span>
              </div>
              <ul className="price-feat-list">
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> 5 Active Specialist AI Agents</li>
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> Real-time SWOT & Idea Validator</li>
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> Advanced Interactive Mock Interview</li>
                <li className="price-feat-item"><CheckCircle size={14} style={{ color: '#10b981' }} /> PDF Document Core Summarizer</li>
              </ul>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onGetStarted}>Deploy Team Pro</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 8%', background: 'rgba(10, 11, 16, 0.9)', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain style={{ color: '#8b5cf6' }} size={20} />
          <span style={{ fontWeight: '800', letterSpacing: '0.05em' }}>LIFEOS AI</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          © 2026 LIFEOS Inc. All interfaces fully simulated & secure.
        </p>
      </footer>
    </div>
  );
}

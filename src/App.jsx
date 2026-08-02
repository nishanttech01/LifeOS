import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import GoalPlanner from './components/GoalPlanner';
import MemorySystem from './components/MemorySystem';
import CareerAdvisor from './components/CareerAdvisor';
import FinanceAdvisor from './components/FinanceAdvisor';
import BusinessAdvisor from './components/BusinessAdvisor';
import LearningRoadmap from './components/LearningRoadmap';
import DocumentAI from './components/DocumentAI';
import SettingsPage from './components/SettingsPage';
import { Brain, Globe, Shield, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('landing'); // 'landing', 'auth', 'app'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeAgent, setActiveAgent] = useState('general');
  const [user, setUser] = useState({ name: 'Nishant Kumar', email: 'nishant@lifeos.ai' });
  
  // Auth Form State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Seed Data: Goals
  const [goalsList, setGoalsList] = useState([
    { id: 1, title: 'Get a Software Career role', category: 'Career', deadline: '2026-10-31', progress: 50 },
    { id: 2, title: 'Save ₹10,000 emergency vault', category: 'Finance', deadline: '2026-08-15', progress: 66 },
    { id: 3, title: 'Study MERN Fullstack system', category: 'Education', deadline: '2026-11-20', progress: 25 }
  ]);

  // Seed Data: Goal Tasks Milestones
  const [tasks, setTasks] = useState([
    { id: 11, goalId: 1, task: 'Complete JavaScript basic principles & ES6 promises', status: 'completed' },
    { id: 12, goalId: 1, task: 'Build 2 modern React API integration portfolios', status: 'completed' },
    { id: 13, goalId: 1, task: 'Optimize resume structure for ATS key identifiers', status: 'pending' },
    { id: 14, goalId: 1, task: 'Apply to 5 Entry-level developer job openings', status: 'pending' },
    
    { id: 21, goalId: 2, task: 'Track daily expenses in the Finance AI sheet', status: 'completed' },
    { id: 22, goalId: 2, task: 'Cancel unused gym/Netflix recurring billing', status: 'completed' },
    { id: 23, goalId: 2, task: 'Auto-transfer ₹3,000 to saving vaults on Day 1', status: 'pending' },

    { id: 31, goalId: 3, task: 'Setup local Express router endpoints templates', status: 'completed' },
    { id: 32, goalId: 3, task: 'Establish MongoDB Atlas clusters parameters link', status: 'pending' },
    { id: 33, goalId: 3, task: 'Configure JWT cookies security headers', status: 'pending' },
    { id: 34, goalId: 3, task: 'Verify stripe checkout webhook validation logs', status: 'pending' }
  ]);

  // Seed Data: Long Term Memory System
  const [memoryList, setMemoryList] = useState([
    { id: 1, information: 'Goal is to transition to software developer roles in fintech startups', importance: 'high' },
    { id: 2, information: 'Completed introductory React components and basic Vite workflows', importance: 'high' },
    { id: 3, information: 'Prefers analytical explanations with quantitative metrics over abstract lists', importance: 'medium' }
  ]);

  // Recalculates progress percentage when tasks are ticked/changed
  const recalculateProgress = (goalId, currentTasks) => {
    const goalTasks = currentTasks.filter(t => t.goalId === goalId);
    if (goalTasks.length === 0) return 0;
    const completedCount = goalTasks.filter(t => t.status === 'completed').length;
    return Math.round((completedCount / goalTasks.length) * 100);
  };

  const handleToggleTask = (taskId) => {
    let updatedTasks;
    setTasks(prev => {
      updatedTasks = prev.map(t => t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t);
      
      // Find goalId of this task and update progress
      const taskObj = updatedTasks.find(t => t.id === taskId);
      if (taskObj) {
        const goalId = taskObj.goalId;
        const newProgress = recalculateProgress(goalId, updatedTasks);
        setGoalsList(gPrev => gPrev.map(g => g.id === goalId ? { ...g, progress: newProgress } : g));
      }
      return updatedTasks;
    });
  };

  const handleAddTask = (goalId, taskText) => {
    const newTask = {
      id: Date.now(),
      goalId,
      task: taskText,
      status: 'pending'
    };
    let updatedTasks;
    setTasks(prev => {
      updatedTasks = [...prev, newTask];
      const newProgress = recalculateProgress(goalId, updatedTasks);
      setGoalsList(gPrev => gPrev.map(g => g.id === goalId ? { ...g, progress: newProgress } : g));
      return updatedTasks;
    });
  };

  const handleAddGoal = (title, category, deadline = '2026-12-31') => {
    const newGoal = {
      id: Date.now(),
      title,
      category,
      deadline,
      progress: 0
    };
    setGoalsList(prev => [...prev, newGoal]);
    // Create initial base task for the goal
    handleAddTask(newGoal.id, `Define execution roadmap milestones for: ${title}`);
    return newGoal;
  };

  const handleDeleteGoal = (goalId) => {
    setGoalsList(prev => prev.filter(g => g.id !== goalId));
    setTasks(prev => prev.filter(t => t.goalId !== goalId));
  };

  const handleAddMemory = (information, importance) => {
    setMemoryList(prev => [...prev, {
      id: Date.now(),
      information,
      importance
    }]);
  };

  const handleDeleteMemory = (memId) => {
    setMemoryList(prev => prev.filter(m => m.id !== memId));
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setUser({
      name: emailInput.split('@')[0].toUpperCase(),
      email: emailInput
    });
    setActiveScreen('app');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      
      {/* 1. Landing Screen */}
      {activeScreen === 'landing' && (
        <LandingPage 
          onGetStarted={() => setActiveScreen('auth')} 
          onNavigateToAuth={() => setActiveScreen('auth')} 
        />
      )}

      {/* 2. Authentication Screen */}
      {activeScreen === 'auth' && (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
          <div className="hero-background">
            <div className="ellipse-glow ellipse-purple"></div>
            <div className="ellipse-glow ellipse-cyan"></div>
          </div>

          <div className="glow-card auth-panel slide-in">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div className="navbar-brand" style={{ justifyContent: 'center', marginBottom: '10px' }}>
                <Brain style={{ color: '#8b5cf6' }} />
                <span>LIFE<span style={{ color: '#06b6d4' }}>OS</span></span>
              </div>
              <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>
                {isRegistering ? 'Setup your Digital Twin Kernel' : 'Access your LifeOS Core'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '5px' }}>
                All authorization processes are encrypted locally.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit}>
              <div className="form-group">
                <label className="form-label">Email Access Hook</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="name@lifeos.ai" 
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password Segment</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="******" 
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                {isRegistering ? 'Initialize Digital Twin' : 'Synchronize Identity'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OR CONTEXT AUTH</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
            </div>

            {/* Quick Guest Auto Login button */}
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%' }}
              onClick={() => {
                setUser({ name: 'Nishant Kumar', email: 'nishant@lifeos.ai' });
                setActiveScreen('app');
              }}
            >
              <Globe size={16} style={{ color: '#06b6d4' }} /> Auto Login as Guest (CTO Mode)
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>
                {isRegistering ? 'Already deployed a Twin?' : 'Need to setup a digital twin?'}
              </span>
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-secondary)', marginLeft: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {isRegistering ? 'Sign In' : 'Register Core'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Core Operating Dashboard Screen */}
      {activeScreen === 'app' && (
        <div className="lifeos-app">
          {/* Left Navigation Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            onLogout={() => setActiveScreen('landing')} 
            user={user} 
          />

          {/* Right Main Content */}
          <main className="app-content">
            <header className="content-header">
              <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {activeTab.replace('_', ' ')} System Segment
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span className="agent-badge-pill" style={{ color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.05)' }}>
                  ● Core Server: SYNCED
                </span>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  Time Stamp: 2026.07.17
                </span>
              </div>
            </header>

            <div className="content-body">
              {activeTab === 'dashboard' && (
                <Dashboard 
                  goalsList={goalsList} 
                  tasks={tasks} 
                  activeTabChange={setActiveTab} 
                />
              )}

              {activeTab === 'chat' && (
                <AIChat 
                  onAddGoal={handleAddGoal} 
                  activeAgent={activeAgent} 
                  onAgentChange={setActiveAgent} 
                  memoryList={memoryList}
                />
              )}

              {activeTab === 'goals' && (
                <GoalPlanner 
                  goalsList={goalsList} 
                  onAddGoal={handleAddGoal} 
                  onDeleteGoal={handleDeleteGoal} 
                  tasks={tasks} 
                  onToggleTask={handleToggleTask} 
                  onAddTask={handleAddTask} 
                />
              )}

              {activeTab === 'memory' && (
                <MemorySystem 
                  memoryList={memoryList} 
                  onAddMemory={handleAddMemory} 
                  onDeleteMemory={handleDeleteMemory} 
                />
              )}

              {activeTab === 'career' && (
                <CareerAdvisor onAddGoal={handleAddGoal} />
              )}

              {activeTab === 'finance' && (
                <FinanceAdvisor />
              )}

              {activeTab === 'business' && (
                <BusinessAdvisor />
              )}

              {activeTab === 'learning' && (
                <LearningRoadmap />
              )}

              {activeTab === 'documents' && (
                <DocumentAI />
              )}

              {activeTab === 'reports' && (
                <SettingsPage />
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

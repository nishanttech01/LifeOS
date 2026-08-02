import React from 'react';
import { 
  Brain, LayoutDashboard, MessageSquare, Target, Cpu, 
  Briefcase, Landmark, ShieldCheck, BookOpen, FileText, Settings, LogOut 
} from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange, onLogout, user }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Solver Engine', icon: MessageSquare },
    { id: 'goals', label: 'Goal Planner', icon: Target },
    { id: 'memory', label: 'Memory System', icon: Cpu },
    { id: 'career', label: 'Career AI Module', icon: Briefcase },
    { id: 'finance', label: 'Finance AI', icon: Landmark },
    { id: 'business', label: 'Business Advisor', icon: ShieldCheck },
    { id: 'learning', label: 'Learning Center', icon: BookOpen },
    { id: 'documents', label: 'Document AI', icon: FileText },
    { id: 'reports', label: 'Reports & Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="navbar-brand" style={{ marginBottom: '10px' }}>
          <Brain style={{ color: '#8b5cf6' }} />
          <span>LIFE<span style={{ color: '#06b6d4' }}>OS</span></span>
        </div>
        <div style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', color: 'var(--text-secondary)', display: 'inline-block', marginBottom: '20px' }}>
          CTO Sandbox Activated
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li 
                key={item.id} 
                className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyOrigin: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
            N
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{user?.name || 'Nishant Kumar'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user?.email || 'nishant@lifeos.ai'}</div>
          </div>
        </div>
        
        <button 
          className="sidebar-item" 
          onClick={onLogout}
          style={{ width: '100%', background: 'transparent', border: 'none', justifyContent: 'flex-start', color: '#ef4444' }}
        >
          <LogOut />
          <span>Exit Workspace</span>
        </button>
      </div>
    </aside>
  );
}

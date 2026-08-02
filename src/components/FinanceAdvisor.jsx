import React, { useState } from 'react';
import { Landmark, ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, PlayCircle } from 'lucide-react';
import LocalAgentChat from './LocalAgentChat';

export default function FinanceAdvisor() {
  const [incomeInput, setIncomeInput] = useState('50000');
  const [expenseList, setExpenseList] = useState([
    { id: 1, name: 'Office rent rent-out', amount: 12000, category: 'Rent' },
    { id: 2, name: 'External Food delivery', amount: 6500, category: 'Food' },
    { id: 3, name: 'Coding Course subscription', amount: 3000, category: 'Education' },
    { id: 4, name: 'SaaS online servers hosting', amount: 1500, category: 'Utilities' }
  ]);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Food');

  const addExpense = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newAmount.trim()) return;
    const amountVal = parseFloat(newAmount);
    if (isNaN(amountVal)) return;

    setExpenseList(prev => [...prev, {
      id: Date.now(),
      name: newName,
      amount: amountVal,
      category: newCategory
    }]);

    setNewName('');
    setNewAmount('');
  };

  const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);
  const savings = parseFloat(incomeInput) - totalExpense;
  const foodSpend = expenseList.filter(e => e.category === 'Food').reduce((sum, e) => sum + e.amount, 0);
  const rentSpend = expenseList.filter(e => e.category === 'Rent').reduce((sum, e) => sum + e.amount, 0);
  const eduSpend = expenseList.filter(e => e.category === 'Education').reduce((sum, e) => sum + e.amount, 0);
  
  // Calculate relative chart percentage heights
  const maxVal = Math.max(incomeInput, totalExpense, savings) || 1;
  const incPercent = (incomeInput / maxVal) * 100;
  const expPercent = (totalExpense / maxVal) * 100;
  const savPercent = (savings / maxVal) * 100;

  return (
    <div className="dash-grid">
      {/* Financial Overview Metrics */}
      <div className="col-12 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Landmark style={{ color: '#8b5cf6' }} /> Personal Financial Runway System
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
          <div className="glow-card" style={{ padding: '20px', background: 'rgba(16,185,129,0.05)', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>SET MONTHLY SALARY</span>
              <ArrowUpRight size={16} style={{ color: '#10b981' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>₹</span>
              <input 
                type="number" 
                className="form-input" 
                style={{ background: 'transparent', border: 'none', padding: '0', fontSize: '1.5rem', fontWeight: '800', width: '120px', color: '#fff' }}
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
              />
            </div>
          </div>

          <div className="glow-card" style={{ padding: '20px', background: 'rgba(239,68,68,0.05)', borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>TOTAL OUTFLOW EXPENSE</span>
              <ArrowDownRight size={16} style={{ color: '#ef4444' }} />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginTop: '6px' }}>
              ₹{totalExpense.toLocaleString()}
            </div>
          </div>

          <div className="glow-card" style={{ padding: '20px', background: 'rgba(6,182,212,0.05)', borderLeft: '4px solid #06b6d4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>PROJECTED SAVED SURPLUS</span>
              <TrendingUp size={16} style={{ color: '#06b6d4' }} />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: savings >= 0 ? '#10b981' : '#ef4444', marginTop: '6px' }}>
              ₹{savings.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* SVG graph simulator */}
      <div className="col-8 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#fff' }}>Runway Visual Comparison Chart</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '220px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
          {/* Income Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
            <div style={{ height: `${incPercent * 1.5}px`, width: '100%', background: 'linear-gradient(to top, rgba(16,185,129,0.1), rgba(16,185,129,0.8))', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {incPercent > 20 ? `₹${parseInt(incomeInput).toLocaleString()}` : ''}
            </div>
            <span style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--text-secondary)' }}>Total Income</span>
          </div>

          {/* Expense Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
            <div style={{ height: `${expPercent * 1.5}px`, width: '100%', background: 'linear-gradient(to top, rgba(239,68,68,0.1), rgba(239,68,68,0.8))', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {expPercent > 20 ? `₹${totalExpense.toLocaleString()}` : ''}
            </div>
            <span style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--text-secondary)' }}>Expenses</span>
          </div>

          {/* Savings Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
            <div style={{ height: `${Math.max(savPercent, 2) * 1.5}px`, width: '100%', background: 'linear-gradient(to top, rgba(6,182,212,0.1), rgba(6,182,212,0.8))', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {savPercent > 20 ? `₹${savings.toLocaleString()}` : ''}
            </div>
            <span style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--text-secondary)' }}>Surplus Savings</span>
          </div>
        </div>

        {/* Expense Category items block */}
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ marginBottom: '15px', color: '#fff' }}>Detailed Balance Sheet</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            <div className="glow-card" style={{ padding: '15px', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RENT RATIO</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span style={{ color: '#fff', fontSize: '0.95rem' }}>₹{rentSpend.toLocaleString()}</span>
                <span style={{ color: '#8b5cf6', fontSize: '0.85rem' }}>{incomeInput > 0 ? ((rentSpend / incomeInput) * 100).toFixed(0) : 0}% of salary</span>
              </div>
            </div>
            <div className="glow-card" style={{ padding: '15px', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FOOD SPEND</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span style={{ color: '#fff', fontSize: '0.95rem' }}>₹{foodSpend.toLocaleString()}</span>
                <span style={{ color: '#06b6d4', fontSize: '0.85rem' }}>{incomeInput > 0 ? ((foodSpend / incomeInput) * 100).toFixed(0) : 0}% of salary</span>
              </div>
            </div>
            <div className="glow-card" style={{ padding: '15px', background: 'rgba(255,255,255,0.01)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EDUCATION SPEND</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span style={{ color: '#fff', fontSize: '0.95rem' }}>₹{eduSpend.toLocaleString()}</span>
                <span style={{ color: '#10b981', fontSize: '0.85rem' }}>{incomeInput > 0 ? ((eduSpend / incomeInput) * 100).toFixed(0) : 0}% of salary</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adding Expense Log & recommendations */}
      <div className="col-4 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ marginBottom: '20px', color: '#fff' }}>Log New Outflow</h3>
        <form onSubmit={addExpense}>
          <div className="form-group">
            <label className="form-label">Expense Label</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Netflix, Pizza, Uber commute..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input 
                type="number" 
                className="form-input"
                placeholder="₹"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-input"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Education">Education</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Add Transaction
          </button>
        </form>

        {/* AI Recommendations panel */}
        <div style={{ marginTop: '24px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#fbbf24', marginBottom: '15px' }}>
            <AlertTriangle size={14} /> AI Budget Auditing Alert
          </h4>

          <div className="solutions-panel swot-t" style={{ padding: '15px', background: 'rgba(245, 158, 11, 0.03)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
              "You spent ₹{foodSpend.toLocaleString()} on out-of-restaurant food delivery this billing period. Reducing this to and cooking at home could capture an extra ₹2,000 for your active emergency savings goal."
            </p>
          </div>
        </div>
      </div>
      <div className="col-12" style={{ marginTop: '10px' }}>
        <LocalAgentChat 
          agent="Finance Agent" 
          welcomeMessage="Welcome to the Finance AI Advisory Desk. Ask me anything about budgeting, expense auditing, emergency funds, savings, or investment allocation plans."
          placeholder="Ask your finance advisor anything (e.g. How can I optimize my monthly expenses?)"
          presets={[
            "How do I setup a proper 50/30/20 budget?",
            "What is a safe emergency fund target for a freelancer?",
            "Tips for reducing subscription overheads"
          ]}
        />
      </div>
    </div>
  );
}

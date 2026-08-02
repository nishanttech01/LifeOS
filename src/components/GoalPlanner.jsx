import React, { useState } from 'react';
import { Target, PlusCircle, CheckCircle, Calendar, Trash2, Award } from 'lucide-react';

export default function GoalPlanner({ goalsList, onAddGoal, onDeleteGoal, onUpdateProgress, tasks, onToggleTask, onAddTask }) {
  const [selectedGoalId, setSelectedGoalId] = useState(goalsList[0]?.id || null);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Career');
  const [newGoalDeadline, setNewGoalDeadline] = useState('2026-12-31');
  const [newTaskInput, setNewTaskInput] = useState('');

  const activeGoal = goalsList.find(g => g.id === selectedGoalId) || goalsList[0];
  const activeTasks = tasks.filter(t => t.goalId === activeGoal?.id);

  const handleSubmitGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    const added = onAddGoal(newGoalTitle, newGoalCategory, newGoalDeadline);
    setNewGoalTitle('');
    if (added) {
      setSelectedGoalId(added.id);
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim() || !activeGoal) return;
    onAddTask(activeGoal.id, newTaskInput);
    setNewTaskInput('');
  };

  const deleteGoalWrapper = (id) => {
    onDeleteGoal(id);
    if (selectedGoalId === id) {
      setSelectedGoalId(goalsList[0]?.id || null);
    }
  };

  return (
    <div className="dash-grid">
      {/* List of Goals */}
      <div className="col-6 glow-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target style={{ color: '#8b5cf6' }} /> Active Goals
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '450px', overflowY: 'auto', paddingRight: '5px' }}>
          {goalsList.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No active goals. Add some below or consult the AI Solver!</p>
          ) : (
            goalsList.map((goal) => (
              <div 
                key={goal.id} 
                className={`glow-card goal-card-item ${activeGoal?.id === goal.id ? 'active' : ''}`}
                style={{ 
                  cursor: 'pointer', 
                  borderLeft: `4px solid ${activeGoal?.id === goal.id ? 'var(--accent-secondary)' : 'var(--accent-primary)'}`,
                  background: activeGoal?.id === goal.id ? 'rgba(255,255,255,0.03)' : 'var(--glass-bg)'
                }}
                onClick={() => setSelectedGoalId(goal.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="agent-badge-pill" style={{ margin: '0 0 6px 0', fontSize: '0.65rem' }}>{goal.category}</span>
                    <h4 style={{ fontSize: '1rem', color: '#fff' }}>{goal.title}</h4>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteGoalWrapper(goal.id);
                    }}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyOrigin: 'center', justifyContent: 'flex-start', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <Calendar size={12} />
                  <span>Target: {goal.deadline}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Goal Form */}
        <form onSubmit={handleSubmitGoal} style={{ marginTop: '30px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
          <h4 style={{ marginBottom: '15px', color: '#fff' }}>Create Custom Goal</h4>
          <div className="form-group">
            <label className="form-label">Goal Title</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Become a Javascript Expert, Start Gym Stride..."
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-input"
                value={newGoalCategory}
                onChange={(e) => setNewGoalCategory(e.target.value)}
              >
                <option value="Career">Career</option>
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Productivity">Productivity</option>
                <option value="Health">Health</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Deadline</label>
              <input 
                type="date" 
                className="form-input"
                value={newGoalDeadline}
                onChange={(e) => setNewGoalDeadline(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            <PlusCircle size={16} /> Deploy New Goal
          </button>
        </form>
      </div>

      {/* Checklist / Milestones */}
      <div className="col-6 glow-card" style={{ padding: '30px' }}>
        {activeGoal ? (
          <div>
            <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '20px', marginBottom: '24px' }}>
              <span className="agent-badge-pill" style={{ color: 'var(--accent-secondary)' }}>{activeGoal.category} Focus</span>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginTop: '5px' }}>{activeGoal.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Goal ID: {activeGoal.id} • Dynamic Roadmap Milestones</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '220px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Award size={14} /> Action Milestones Link
              </h4>

              {activeTasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  No milestones configured. Create some targets below to calculate progress percentage!
                </div>
              ) : (
                activeTasks.map((task) => (
                  <div key={task.id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
                    <input 
                      type="checkbox" 
                      className="task-checkbox" 
                      checked={task.status === 'completed'}
                      onChange={() => onToggleTask(task.id)}
                    />
                    <span className="task-text">{task.task}</span>
                  </div>
                ))
              )}
            </div>

            {/* Add Task bar */}
            <form onSubmit={handleCreateTask} style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Add milestone study item or checklist action item..."
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                + Add Target
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
            Select or create a goal on the left to set custom progress milestones.
          </div>
        )}
      </div>
    </div>
  );
}

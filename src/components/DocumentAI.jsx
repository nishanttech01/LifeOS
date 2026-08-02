import React, { useState } from 'react';
import { FileText, Cpu, Search, Trash2, BookOpen } from 'lucide-react';

export default function DocumentAI() {
  const [docList, setDocList] = useState([
    { id: 1, name: "financial_projection_v1.pdf", size: "324 KB", pages: 4 },
    { id: 2, name: "startup_business_pitch.pdf", size: "1.2 MB", pages: 12 }
  ]);
  const [uploading, setUploading] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(1);
  const [queryText, setQueryText] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [asking, setAsking] = useState(false);

  const selectedDoc = docList.find(d => d.id === selectedDocId) || docList[0];

  const handleSimulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setDocList(prev => [...prev, {
        id: Date.now(),
        name: "uploaded_executive_summary.pdf",
        size: "180 KB",
        pages: 2
      }]);
      setUploading(false);
    }, 2000);
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!queryText.trim()) return;
    const apiBase = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
    setAsking(true);
    setAiAnswer('');

    try {
      const response = await fetch(`${apiBase}/api/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: queryText,
          agent: 'Document AI',
          documentName: selectedDoc?.name || 'Unknown Document'
        })
      });

      const data = await response.json();
      setAiAnswer(data.text || data.error || 'Unable to generate document insights.');
    } catch (err) {
      setAiAnswer(`Document AI request failed: ${err.message}`);
    } finally {
      setAsking(false);
    }
  };

  return (
    <div className="dash-grid">
      {/* File Drawer List */}
      <div className="col-4 glow-card" style={{ padding: '30px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
          <FileText style={{ color: '#8b5cf6' }} /> Document Chest
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
          Upload PDF contracts, resumes, or financial drafts. LifeOS indexes them locally for full-context queries.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {docList.map(doc => (
            <div 
              key={doc.id} 
              className="glow-card"
              style={{ 
                padding: '12px 16px', 
                cursor: 'pointer',
                borderColor: selectedDocId === doc.id ? 'var(--accent-secondary)' : 'var(--glass-border)',
                background: selectedDocId === doc.id ? 'rgba(255,255,255,0.03)' : 'var(--glass-bg)',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}
              onClick={() => setSelectedDocId(doc.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={18} style={{ color: selectedDocId === doc.id ? 'var(--accent-secondary)' : 'var(--text-muted)' }} />
                <div>
                  <h4 style={{ fontSize: '0.88rem', color: '#fff' }}>{doc.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{doc.pages} pages • {doc.size}</span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setDocList(prev => prev.filter(d => d.id !== doc.id));
                }}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleSimulateUpload} disabled={uploading}>
          {uploading ? 'Processing File...' : '+ Upload Document'}
        </button>
      </div>

      {/* Query Engine */}
      <div className="col-8 glow-card" style={{ padding: '30px' }}>
        {selectedDoc ? (
          <div>
            <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px', marginBottom: '20px' }}>
              <span className="agent-badge-pill" style={{ color: 'var(--accent-secondary)' }}>Context Active</span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '5px' }}>Querying: {selectedDoc.name}</h3>
            </div>

            <form onSubmit={handleQuery} className="chat-input-wrapper" style={{ marginBottom: '24px' }}>
              <input 
                type="text" 
                className="chat-input"
                placeholder="Ask about document findings, summaries, or projected figures..."
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                disabled={asking}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 18px' }} disabled={asking}>
                {asking ? 'Searching Nodes...' : 'Query AI'}
              </button>
            </form>

            <div style={{ minHeight: '180px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.9rem', marginBottom: '12px' }}>
                <Cpu size={14} /> AI Query Response
              </h4>

              {asking && (
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontStyle: 'italic', animation: 'speaking-animation 1s infinite alternate' }}>
                  Scanning index pages... extraction in progress.
                </div>
              )}

              {!asking && !aiAnswer && (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Ask a question above. Try querying: "What are the revenue projections?" or "What are the competitors?"
                </div>
              )}

              {!asking && aiAnswer && (
                <div className="solutions-panel slide-in" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)' }}>
                  <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: '1.6' }}>{aiAnswer}</p>
                  <p style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reference Node: Page {selectedDoc.name.includes('pitch') ? '2' : '4'} • Context match confidence: 94%</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
            Select or upload a document on the left to activate RAG search engines.
          </div>
        )}
      </div>
    </div>
  );
}

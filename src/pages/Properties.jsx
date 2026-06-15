import { Building2 } from 'lucide-react';

export default function Properties() {
  return (
    <div className="coming-soon-container stagger-fade-up">
      <div className="coming-soon-icon" style={{ boxShadow: '0 0 30px rgba(0,245,255,0.15)' }}>
        <Building2 size={36} style={{ color: 'var(--cyan)' }} />
      </div>
      <h2 style={{ fontSize: 24 }}>Properties Module</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 400, fontSize: 14 }}>
        Our intelligent property listing and matching system is launching soon.
        Manage listings, match properties to leads, and track viewings — all powered by AI.
      </p>
      <span className="badge badge-gold" style={{ fontSize: 12, padding: '6px 16px' }}>COMING SOON</span>
    </div>
  );
}

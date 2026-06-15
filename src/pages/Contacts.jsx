import { Contact2 } from 'lucide-react';

export default function Contacts() {
  return (
    <div className="coming-soon-container stagger-fade-up">
      <div className="coming-soon-icon" style={{ boxShadow: '0 0 30px rgba(0,255,136,0.15)' }}>
        <Contact2 size={36} style={{ color: 'var(--success)' }} />
      </div>
      <h2 style={{ fontSize: 24 }}>Contact Directory</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 400, fontSize: 14 }}>
        A unified contact management system with auto-sync from calls, emails,
        and AI interactions. Smart deduplication and enrichment coming soon.
      </p>
      <span className="badge badge-gold" style={{ fontSize: 12, padding: '6px 16px' }}>COMING SOON</span>
    </div>
  );
}

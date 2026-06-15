import { Settings2 } from 'lucide-react';

export default function Settings() {
  return (
    <div className="coming-soon-container stagger-fade-up">
      <div className="coming-soon-icon" style={{ boxShadow: '0 0 30px rgba(255,170,0,0.15)' }}>
        <Settings2 size={36} style={{ color: 'var(--gold)' }} />
      </div>
      <h2 style={{ fontSize: 24 }}>System Settings</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 400, fontSize: 14 }}>
        Configure your CallLiveAI workspace — team management, AI voice agent settings,
        notification preferences, and integration setup.
      </p>
      <span className="badge badge-gold" style={{ fontSize: 12, padding: '6px 16px' }}>COMING SOON</span>
    </div>
  );
}

import { BarChart3 } from 'lucide-react';

export default function Reports() {
  return (
    <div className="coming-soon-container stagger-fade-up">
      <div className="coming-soon-icon" style={{ boxShadow: '0 0 30px rgba(191,0,255,0.15)' }}>
        <BarChart3 size={36} style={{ color: 'var(--purple)' }} />
      </div>
      <h2 style={{ fontSize: 24 }}>Advanced Reports</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 400, fontSize: 14 }}>
        Deep analytics and intelligent reporting with AI-generated insights.
        Track conversion rates, agent performance, and revenue forecasts.
      </p>
      <span className="badge badge-gold" style={{ fontSize: 12, padding: '6px 16px' }}>COMING SOON</span>
    </div>
  );
}

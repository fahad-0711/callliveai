import { memo } from 'react';
import {
  Bot, Play, CheckCircle2, RotateCcw, Phone, MapPin,
  Users, FileText, Clock,
} from 'lucide-react';
import { aiCallLogs, activities } from '../data/mockData';

const statusStyles = {
  Connected: { bg: 'rgba(0,255,136,0.12)', color: '#00ff88', border: 'rgba(0,255,136,0.25)' },
  'No Answer': { bg: 'rgba(255,170,0,0.15)', color: '#ffaa00', border: 'rgba(255,170,0,0.3)' },
  Voicemail: { bg: 'rgba(191,0,255,0.15)', color: '#bf00ff', border: 'rgba(191,0,255,0.3)' },
  'Wrong Number': { bg: 'rgba(255,68,68,0.15)', color: '#ff4444', border: 'rgba(255,68,68,0.3)' },
};

const sentimentStyles = {
  Interested: { bg: 'rgba(0,245,255,0.12)', color: '#00f5ff', border: 'rgba(0,245,255,0.25)', icon: '🔥' },
  Neutral: { bg: 'rgba(255,255,255,0.06)', color: '#8892aa', border: 'rgba(255,255,255,0.1)', icon: '😐' },
  'Not Interested': { bg: 'rgba(255,68,68,0.12)', color: '#ff4444', border: 'rgba(255,68,68,0.25)', icon: '❌' },
};

const activityIcons = {
  'ai-call': Bot,
  'site-visit': MapPin,
  call: Phone,
  meeting: Users,
  proposal: FileText,
};

const Activities = memo(function Activities() {
  return (
    <div className="stagger-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ fontSize: 24 }}>Activities</h1>

      {/* AI Voice Calls Section */}
      <div className="glass-card" style={{
        padding: '24px', overflow: 'hidden',
        border: '1px solid rgba(0,245,255,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bot size={18} style={{ color: 'var(--cyan)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: 16 }}>AI Voice Calls</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>CallLiveAI automated call history</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="pulse-dot" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 500 }}>Live</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Phone</th>
                <th>Called At</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Sentiment</th>
                <th>Recording</th>
                <th>Follow-up</th>
              </tr>
            </thead>
            <tbody>
              {aiCallLogs.map(log => {
                const ss = statusStyles[log.status] || statusStyles.Connected;
                const sn = sentimentStyles[log.sentiment];
                return (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{log.leadName}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{log.phone}</td>
                    <td style={{ fontSize: 12 }}>{log.calledAt}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{log.duration}</td>
                    <td>
                      <span style={{
                        padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                        background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`,
                        display: 'inline-block',
                      }}>
                        {log.status}
                      </span>
                    </td>
                    <td>
                      {sn ? (
                        <span style={{
                          padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                          background: sn.bg, color: sn.color, border: `1px solid ${sn.border}`,
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                        }}>
                          {sn.icon} {log.sentiment}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                    <td>
                      {log.hasRecording ? (
                        <button className="btn btn-sm btn-ghost" style={{ gap: 4, padding: '4px 10px' }}>
                          <Play size={12} style={{ color: 'var(--cyan)' }} /> Play
                        </button>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>
                      )}
                    </td>
                    <td>
                      {log.followupSet ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--success)', fontSize: 12 }}>
                          <CheckCircle2 size={14} /> Set
                        </span>
                      ) : (
                        <button className="btn btn-sm btn-ghost" style={{ gap: 4, padding: '4px 10px', color: 'var(--warning)' }}>
                          <RotateCcw size={12} /> Retry
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming & Completed Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Upcoming */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} style={{ color: 'var(--cyan)' }} />
            Upcoming Activities
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {activities.filter(a => a.status === 'upcoming').map(act => {
              const Icon = activityIcons[act.type] || Clock;
              return (
                <div key={act.id} style={{
                  padding: '14px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  gap: 12,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(0,245,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} style={{ color: 'var(--cyan)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                      {act.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{act.description}</div>
                    <div style={{ fontSize: 11, color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                      {act.time} · {act.agent}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completed */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
            Completed Today
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {activities.filter(a => a.status === 'completed').map(act => {
              const Icon = activityIcons[act.type] || CheckCircle2;
              return (
                <div key={act.id} style={{
                  padding: '14px',
                  borderRadius: 12,
                  background: 'rgba(0,255,136,0.03)',
                  border: '1px solid rgba(0,255,136,0.1)',
                  display: 'flex',
                  gap: 12,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(0,255,136,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} style={{ color: 'var(--success)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                      {act.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{act.description}</div>
                    <div style={{ fontSize: 11, color: 'var(--success)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                      ✓ {act.time} · {act.agent}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Activities;

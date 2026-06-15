import { memo, useMemo } from 'react';
import {
  Mic, Plus, Phone, Calendar, FileText,
  Eye, Edit3, PhoneCall, CheckCircle2, Clock, MapPin,
  Users, Bot, Crown,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import StatCard from '../components/ui/StatCard';
import {
  kpiData, pipelineFunnelData, leadSourceData,
  callAnalyticsData, leads, agents, activities,
  agentLeaderboard, currentUser,
} from '../data/mockData';
import { formatDate } from '../utils/formatDate';

const statusColors = {
  Hot: { bg: 'rgba(255,0,110,0.15)', color: '#ff006e', border: 'rgba(255,0,110,0.3)' },
  Warm: { bg: 'rgba(255,170,0,0.15)', color: '#ffaa00', border: 'rgba(255,170,0,0.3)' },
  Cold: { bg: 'rgba(0,245,255,0.12)', color: '#00f5ff', border: 'rgba(0,245,255,0.25)' },
  Closed: { bg: 'rgba(0,255,136,0.12)', color: '#00ff88', border: 'rgba(0,255,136,0.25)' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card-static" style={{ padding: '10px 14px', borderRadius: 10 }}>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ fontSize: 12, color: p.color, fontFamily: 'var(--font-mono)' }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const Dashboard = memo(function Dashboard() {
  const recentLeads = useMemo(() => leads.slice(0, 8), []);
  const maxFunnel = pipelineFunnelData[0].count;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="stagger-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Greeting */}
      <div>
        <h1 style={{ fontSize: 28, marginBottom: 4 }}>
          {getGreeting()}, {currentUser.name.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Welcome back to your CallLiveAI command center
        </p>
      </div>

      {/* ROW 1 — Voice Agent Banner */}
      <div
        className="glass-card-static"
        style={{
          padding: '20px 28px',
          background: 'rgba(0,255,136,0.04)',
          border: '1px solid rgba(0,255,136,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 0 30px rgba(0,255,136,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(0,255,136,0.12)',
            border: '1px solid rgba(0,255,136,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mic size={22} style={{ color: 'var(--success)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>
              CallLiveAI Voice Agent — <span style={{ color: 'var(--success)' }}>LIVE</span>
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>3 calls in progress</span>
              {' · 47 calls today · 89% connect rate'}
            </p>
          </div>
        </div>
        {/* Audio bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 24 }}>
          <div className="audio-bar" />
          <div className="audio-bar" />
          <div className="audio-bar" />
        </div>
      </div>

      {/* ROW 2 — KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 16,
      }}>
        {kpiData.map(kpi => (
          <StatCard key={kpi.id} data={kpi} />
        ))}
      </div>

      {/* ROW 3 — Pipeline Funnel + Lead Sources */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* Pipeline Funnel */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: 20 }}>Lead Pipeline Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {pipelineFunnelData.map((stage, idx) => (
              <div key={stage.stage}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{stage.stage}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: stage.color, fontWeight: 600 }}>
                      {stage.count}
                    </span>
                  </div>
                  {stage.dropoff && (
                    <span style={{ fontSize: 11, color: 'var(--danger)', fontFamily: 'var(--font-mono)' }}>
                      {stage.dropoff}
                    </span>
                  )}
                </div>
                <div style={{
                  height: 8,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.05)',
                  overflow: 'hidden',
                }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(stage.count / maxFunnel) * 100}%`,
                      background: `linear-gradient(90deg, ${stage.color}, ${stage.color}88)`,
                      borderRadius: 4,
                      boxShadow: `0 0 10px ${stage.color}40`,
                      transition: 'width 1s ease-out',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources Donut */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: 10 }}>Lead Sources</h3>
          <div style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  stroke="none"
                  animationBegin={0}
                  animationDuration={1200}
                >
                  {leadSourceData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>284</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total Leads</div>
            </div>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 8 }}>
            {leadSourceData.map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.fill }} />
                {s.name} ({s.percentage}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 4 — Recent Leads + Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        {/* Recent Leads Table */}
        <div className="glass-card" style={{ padding: '24px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3>Recent Leads</h3>
            <a href="#/leads" style={{ fontSize: 12, color: 'var(--cyan)', textDecoration: 'none' }}>View All →</a>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Property</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Agent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map(lead => {
                  const agent = agents.find(a => a.id === lead.agentId);
                  const sc = statusColors[lead.status] || statusColors.Cold;
                  return (
                    <tr key={lead.id}>
                      <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{lead.name}</td>
                      <td>{lead.property} · {lead.locality}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{lead.budget}</td>
                      <td>
                        <span style={{
                          padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                          background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                        }}>
                          {lead.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: '50%',
                            background: agent?.gradient, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white',
                          }}>
                            {agent?.initials}
                          </div>
                          <span style={{ fontSize: 12 }}>{agent?.name?.split(' ')[0]}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn-icon btn-ghost" aria-label="View lead" style={{ padding: 4 }}>
                            <Eye size={14} />
                          </button>
                          <button className="btn-icon btn-ghost" aria-label="Edit lead" style={{ padding: 4 }}>
                            <Edit3 size={14} />
                          </button>
                          <button className="btn-icon btn-ghost" aria-label="Call lead" style={{ padding: 4 }}>
                            <PhoneCall size={14} style={{ color: 'var(--cyan)' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Activities */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: 20 }}>Today&apos;s Activities</h3>
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute', left: 8, top: 4, bottom: 4, width: 2,
              background: 'linear-gradient(to bottom, var(--cyan), var(--purple))',
              borderRadius: 1, opacity: 0.4,
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {activities.map(act => {
                const isCompleted = act.status === 'completed';
                return (
                  <div key={act.id} style={{ position: 'relative' }}>
                    {/* Dot on timeline */}
                    <div style={{
                      position: 'absolute', left: -24, top: 4,
                      width: 12, height: 12, borderRadius: '50%',
                      background: isCompleted ? 'var(--success)' : 'var(--cyan)',
                      boxShadow: `0 0 8px ${isCompleted ? 'rgba(0,255,136,0.5)' : 'rgba(0,245,255,0.5)'}`,
                    }}>
                      {isCompleted ? (
                        <CheckCircle2 size={12} style={{ color: 'white' }} />
                      ) : (
                        <Clock size={12} style={{ color: 'white' }} />
                      )}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {act.time}
                        </span>
                        {isCompleted && (
                          <span style={{ fontSize: 10, color: 'var(--success)', fontWeight: 600 }}>DONE</span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                        {act.title}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {act.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 5 — Leaderboard + Call Analytics + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.8fr', gap: 20 }}>
        {/* Agent Leaderboard */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: 16 }}>Agent Leaderboard</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {agentLeaderboard.map((agent, idx) => (
              <div key={agent.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px',
                borderRadius: 10,
                background: idx === 0 ? 'rgba(255,215,0,0.05)' : 'transparent',
                border: idx === 0 ? '1px solid rgba(255,215,0,0.15)' : '1px solid transparent',
              }}>
                <div style={{
                  width: 24, fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700,
                  color: idx === 0 ? 'var(--gold)' : 'var(--text-muted)', textAlign: 'center',
                }}>
                  {idx === 0 ? <Crown size={16} style={{ color: 'var(--gold)' }} /> : `#${idx + 1}`}
                </div>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: agent.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: 'white',
                }}>
                  {agent.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{agent.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {agent.totalCalls} calls · {agent.dealsThisMonth} deals
                  </div>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: agent.color, fontWeight: 600,
                }}>
                  {agent.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call Analytics */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: 16 }}>Call Analytics</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={callAnalyticsData}>
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="calls" stroke="#00f5ff" strokeWidth={2} dot={false} name="Calls" animationDuration={800} />
              <Line type="monotone" dataKey="connects" stroke="#bf00ff" strokeWidth={2} dot={false} name="Connects" animationDuration={800} animationBegin={200} />
              <Line type="monotone" dataKey="voicemails" stroke="#ffd700" strokeWidth={2} dot={false} name="Voicemails" animationDuration={800} animationBegin={400} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 20, marginTop: 8, justifyContent: 'center' }}>
            {[
              { label: 'Calls', color: '#00f5ff' },
              { label: 'Connects', color: '#bf00ff' },
              { label: 'Voicemails', color: '#ffd700' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div style={{ width: 10, height: 3, borderRadius: 2, background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: Plus, label: 'Add Lead', color: '#00f5ff' },
              { icon: Phone, label: 'Log Call', color: '#bf00ff' },
              { icon: Calendar, label: 'Site Visit', color: '#ffd700' },
              { icon: FileText, label: 'Send Proposal', color: '#00ff88' },
            ].map(action => {
              const Icon = action.icon;
              return (
                <div
                  key={action.label}
                  className="glass-card quick-action"
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `${action.color}12`,
                    border: `1px solid ${action.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 12px ${action.color}20`,
                  }}>
                    <Icon size={18} style={{ color: action.color }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
                    {action.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;

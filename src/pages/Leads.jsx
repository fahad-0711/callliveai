import { useState, useMemo, useCallback, memo } from 'react';
import {
  Plus, Search, Filter, RotateCcw, LayoutGrid, List,
  Phone, MessageCircle, Mail, MoreHorizontal,
  Eye, Edit3, PhoneCall, Calendar, Bot, X, ChevronRight,
} from 'lucide-react';
import { leads as allLeads, agents, pipelineStages, stageMap } from '../data/mockData';
import { formatDate } from '../utils/formatDate';
import Modal from '../components/ui/Modal';
import { useModal } from '../hooks/useModal';
import { useToast } from '../hooks/useToast';

const statusColors = {
  Hot: { bg: 'rgba(255,0,110,0.15)', color: '#ff006e', border: 'rgba(255,0,110,0.3)', icon: '🔥' },
  Warm: { bg: 'rgba(255,170,0,0.15)', color: '#ffaa00', border: 'rgba(255,170,0,0.3)', icon: '🟡' },
  Cold: { bg: 'rgba(0,245,255,0.12)', color: '#00f5ff', border: 'rgba(0,245,255,0.25)', icon: '❄️' },
  Closed: { bg: 'rgba(0,255,136,0.12)', color: '#00ff88', border: 'rgba(0,255,136,0.25)', icon: '✅' },
};

const sourceColors = {
  MagicBricks: '#00f5ff', '99acres': '#bf00ff',
  'Walk-in': '#ff006e', Instagram: '#ffd700', Referral: '#00ff88',
};

const stages = ['New Inquiry', 'Site Visit', 'Negotiation', 'Documentation', 'Closed Won'];

const tabs = [
  { key: 'all', label: 'ALL LEADS' },
  { key: 'Hot', label: 'HOT 🔥' },
  { key: 'Warm', label: 'WARM 🟡' },
  { key: 'Cold', label: 'COLD ❄️' },
  { key: 'Closed', label: 'CLOSED ✅' },
];

const Leads = memo(function Leads() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [view, setView] = useState('grid');
  const [selectedLead, setSelectedLead] = useState(null);
  const { isOpen, open, close } = useModal();
  const { addToast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', source: '', agentId: '',
    property: '', locality: '', budget: '', status: 'Warm', notes: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const filteredLeads = useMemo(() => {
    return allLeads.filter(lead => {
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && lead.source !== sourceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return lead.name.toLowerCase().includes(q) ||
          lead.locality.toLowerCase().includes(q) ||
          lead.property.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, statusFilter, sourceFilter]);

  const handleFormChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  }, []);

  const handleSubmit = useCallback(() => {
    const errors = {};
    if (!formData.name) errors.name = 'Required';
    if (!formData.phone) errors.phone = 'Required';
    if (!formData.source) errors.source = 'Required';
    if (!formData.property) errors.property = 'Required';
    if (!formData.locality) errors.locality = 'Required';
    if (!formData.budget) errors.budget = 'Required';

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    addToast('Lead added successfully ✓', 'success');
    close();
    setFormData({ name: '', phone: '', email: '', source: '', agentId: '', property: '', locality: '', budget: '', status: 'Warm', notes: '' });
  }, [formData, addToast, close]);

  const getStageIndex = (stage) => stages.indexOf(stage);

  // Lead Detail View
  if (selectedLead) {
    const lead = selectedLead;
    const agent = agents.find(a => a.id === lead.agentId);
    const sc = statusColors[lead.status] || statusColors.Cold;
    const stageIdx = getStageIndex(lead.stage);

    return (
      <div className="stagger-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Back button */}
        <button
          onClick={() => setSelectedLead(null)}
          className="btn btn-ghost"
          style={{ alignSelf: 'flex-start', gap: 6 }}
        >
          ← Back to Leads
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.8fr', gap: 20 }}>
          {/* Left — Lead Info */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: `linear-gradient(135deg, ${sc.color}, ${sc.color}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700, color: 'white',
                fontFamily: 'var(--font-heading)',
              }}>
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 style={{ fontSize: 18, marginBottom: 4 }}>{lead.name}</h2>
                <span style={{
                  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                }}>
                  {lead.status}
                </span>
              </div>
            </div>

            {[
              { label: 'Phone', value: lead.phone },
              { label: 'Email', value: lead.email },
              { label: 'Source', value: lead.source },
              { label: 'Property', value: lead.property },
              { label: 'Locality', value: lead.locality },
              { label: 'Budget', value: lead.budget },
              { label: 'Last Contact', value: formatDate(lead.lastContact) },
              { label: 'Next Follow-up', value: formatDate(lead.nextFollowup) },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.label}</span>
                <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{f.value || '—'}</span>
              </div>
            ))}

            {lead.notes && (
              <div style={{ marginTop: 8, padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Notes</span>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Center — Activity Timeline */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: 20 }}>Activity Timeline</h3>
            <div style={{ paddingLeft: 24, position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 8, top: 0, bottom: 0, width: 2,
                background: 'linear-gradient(to bottom, var(--cyan), var(--purple))', opacity: 0.3,
              }} />
              {[
                { icon: '🤖', title: `AI Voice Call`, detail: `${lead.aiCallDuration || 'N/A'} · ${lead.aiCallStatus}`, time: formatDate(lead.lastContact), color: 'var(--cyan)' },
                { icon: '📞', title: 'Manual Follow-up', detail: 'Discussed property options', time: '2 days ago', color: 'var(--purple)' },
                { icon: '📧', title: 'Email Sent', detail: 'Property brochure shared', time: '3 days ago', color: 'var(--gold)' },
                { icon: '🆕', title: 'Lead Created', detail: `Source: ${lead.source}`, time: formatDate(lead.createdAt), color: 'var(--success)' },
              ].map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 24, paddingLeft: 4 }}>
                  <div style={{
                    position: 'absolute', left: -20, top: 2, width: 12, height: 12,
                    borderRadius: '50%', background: item.color,
                    boxShadow: `0 0 8px ${item.color}`,
                  }} />
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{item.time}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{item.icon} {item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Pipeline & AI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Pipeline Stage */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <h4 style={{ marginBottom: 14 }}>Pipeline Stage</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {stages.map((stage, idx) => (
                  <button
                    key={stage}
                    style={{
                      padding: '8px 12px', borderRadius: 8, border: 'none',
                      background: idx === stageIdx ? `${pipelineStages[idx]?.color || 'var(--cyan)'}20` : 'rgba(255,255,255,0.03)',
                      color: idx === stageIdx ? pipelineStages[idx]?.color || 'var(--cyan)' : 'var(--text-muted)',
                      fontSize: 12, fontWeight: 500, cursor: 'pointer',
                      textAlign: 'left', fontFamily: 'var(--font-body)',
                      borderLeft: idx === stageIdx ? `3px solid ${pipelineStages[idx]?.color || 'var(--cyan)'}` : '3px solid transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Assigned Agent */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <h4 style={{ marginBottom: 12 }}>Assigned Agent</h4>
              {agent && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: agent.gradient, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: 'white',
                  }}>
                    {agent.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{agent.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{agent.role}</div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Call Schedule */}
            <div className="glass-card" style={{ padding: '20px', border: '1px solid rgba(0,245,255,0.2)' }}>
              <h4 style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Bot size={16} style={{ color: 'var(--cyan)' }} />
                AI Call Schedule
              </h4>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Next AI Call: <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>Tomorrow 10:00 AM</span>
              </div>
              <button className="btn btn-sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>
                <Edit3 size={12} /> Edit Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stagger-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 24 }}>Lead Management</h1>
        <button className="btn btn-primary" onClick={open}>
          <Plus size={16} /> Add New Lead
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card-static" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', flex: '1 1 200px', maxWidth: 280,
        }}>
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text" placeholder="Search leads..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              background: 'none', border: 'none', outline: 'none',
              color: 'var(--text-primary)', fontSize: 13, fontFamily: 'var(--font-body)', width: '100%',
            }}
          />
        </div>
        <select className="input" value={sourceFilter} onChange={e => setSourceFilter(e.target.value)} style={{ width: 'auto', minWidth: 130 }}>
          <option value="all">All Sources</option>
          <option value="MagicBricks">MagicBricks</option>
          <option value="99acres">99acres</option>
          <option value="Walk-in">Walk-in</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>
        <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setStatusFilter('all'); setSourceFilter('all'); }}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Tabs + View Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`tab-item ${statusFilter === tab.key ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab.key)}
            >
              {tab.label} {tab.key !== 'all' && `(${allLeads.filter(l => l.status === tab.key).length})`}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : ''}`}
            onClick={() => setView('grid')}
            aria-label="Grid view"
          >
            <LayoutGrid size={14} />
          </button>
          <button
            className={`btn btn-sm ${view === 'list' ? 'btn-primary' : ''}`}
            onClick={() => setView('list')}
            aria-label="List view"
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filteredLeads.map(lead => {
            const agent = agents.find(a => a.id === lead.agentId);
            const sc = statusColors[lead.status] || statusColors.Cold;
            const stageIdx = getStageIndex(lead.stage);

            return (
              <div
                key={lead.id}
                className="glass-card"
                style={{ padding: '20px', cursor: 'pointer' }}
                onClick={() => setSelectedLead(lead)}
              >
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h4 style={{ fontSize: 15, marginBottom: 4 }}>{lead.name}</h4>
                    <span style={{
                      padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 600,
                      background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                    }}>
                      {lead.status}
                    </span>
                  </div>
                  <span style={{
                    padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 500,
                    background: `${sourceColors[lead.source] || '#888'}15`,
                    color: sourceColors[lead.source] || '#888',
                    border: `1px solid ${sourceColors[lead.source] || '#888'}30`,
                  }}>
                    {lead.source}
                  </span>
                </div>

                {/* Property tag */}
                <div style={{
                  padding: '6px 10px', borderRadius: 8, fontSize: 12,
                  background: 'rgba(255,255,255,0.04)', marginBottom: 12,
                  color: 'var(--text-secondary)',
                }}>
                  {lead.property} · {lead.locality} · <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--text-primary)' }}>{lead.budget}</span>
                </div>

                {/* Agent */}
                {agent && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: agent.gradient, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: 8, fontWeight: 700, color: 'white',
                    }}>
                      {agent.initials}
                    </div>
                    Assigned to: <span style={{ color: 'var(--text-secondary)' }}>{agent.name}</span>
                  </div>
                )}

                {/* AI Call Status */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6, fontSize: 11,
                  color: 'var(--text-muted)', marginBottom: 10,
                }}>
                  <Bot size={12} style={{ color: 'var(--cyan)' }} />
                  Last AI Call: {lead.aiCallStatus === 'Connected' ? (
                    <span style={{ color: 'var(--success)' }}>Connected</span>
                  ) : (
                    <span style={{ color: 'var(--warning)' }}>{lead.aiCallStatus}</span>
                  )}
                </div>

                {/* Follow-up */}
                {lead.nextFollowup && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
                    <Calendar size={12} />
                    Follow-up: {formatDate(lead.nextFollowup)}
                  </div>
                )}

                {/* Pipeline dots */}
                <div className="pipeline-dots" style={{ marginBottom: 14 }}>
                  {stages.map((stage, idx) => (
                    <div
                      key={stage}
                      className={`pipeline-dot ${idx < stageIdx ? 'completed' : idx === stageIdx ? 'active' : ''}`}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  <button className="btn btn-sm btn-ghost" onClick={e => e.stopPropagation()} aria-label="Call">
                    <Phone size={13} /> Call
                  </button>
                  <button className="btn btn-sm btn-ghost" onClick={e => e.stopPropagation()} aria-label="WhatsApp">
                    <MessageCircle size={13} /> WhatsApp
                  </button>
                  <button className="btn btn-sm btn-ghost" onClick={e => e.stopPropagation()} aria-label="Email">
                    <Mail size={13} /> Email
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="glass-card-static" style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Property</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Stage</th>
                <th>Source</th>
                <th>Agent</th>
                <th>AI Call</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => {
                const agent = agents.find(a => a.id === lead.agentId);
                const sc = statusColors[lead.status] || statusColors.Cold;
                return (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)} style={{ cursor: 'pointer' }}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{lead.name}</td>
                    <td>{lead.property} · {lead.locality}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{lead.budget}</td>
                    <td>
                      <span style={{
                        padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                        background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                      }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 12 }}>{lead.stage}</td>
                    <td style={{ fontSize: 12 }}>{lead.source}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: '50%', background: agent?.gradient,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 8, fontWeight: 700, color: 'white',
                        }}>
                          {agent?.initials}
                        </div>
                        <span style={{ fontSize: 12 }}>{agent?.name?.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: 11,
                        color: lead.aiCallStatus === 'Connected' ? 'var(--success)' : lead.aiCallStatus === 'No Answer' ? 'var(--warning)' : 'var(--purple)',
                      }}>
                        {lead.aiCallStatus}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                        <button className="btn-icon btn-ghost" aria-label="View" style={{ padding: 4 }}><Eye size={14} /></button>
                        <button className="btn-icon btn-ghost" aria-label="Call" style={{ padding: 4 }}><PhoneCall size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Lead Modal */}
      <Modal isOpen={isOpen} onClose={close} title="Add New Lead" maxWidth={700}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { key: 'name', label: 'Full Name *', type: 'text' },
            { key: 'phone', label: 'Phone *', type: 'tel' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'source', label: 'Source *', type: 'select', options: ['MagicBricks', '99acres', 'Walk-in', 'Instagram', 'Referral'] },
            { key: 'agentId', label: 'Assigned Agent', type: 'select', options: agents.map(a => ({ value: a.id, label: a.name })) },
            { key: 'property', label: 'Property Type *', type: 'select', options: ['2BHK', '3BHK', '4BHK', 'Villa', 'Plot', 'Commercial'] },
            { key: 'locality', label: 'Preferred Locality *', type: 'text' },
            { key: 'budget', label: 'Budget Range *', type: 'text', placeholder: 'e.g. ₹85L' },
          ].map(field => (
            <div key={field.key}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  className={`input ${formErrors[field.key] ? 'input-error' : ''}`}
                  value={formData[field.key]}
                  onChange={e => handleFormChange(field.key, e.target.value)}
                >
                  <option value="">Select...</option>
                  {(field.options || []).map(opt =>
                    typeof opt === 'object' ? (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ) : (
                      <option key={opt} value={opt}>{opt}</option>
                    )
                  )}
                </select>
              ) : (
                <input
                  className={`input ${formErrors[field.key] ? 'input-error' : ''}`}
                  type={field.type}
                  value={formData[field.key]}
                  onChange={e => handleFormChange(field.key, e.target.value)}
                  placeholder={field.placeholder || ''}
                />
              )}
              {formErrors[field.key] && (
                <span style={{ fontSize: 11, color: 'var(--danger)', marginTop: 4, display: 'block' }}>{formErrors[field.key]}</span>
              )}
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>Notes</label>
            <textarea
              className="input"
              rows={3}
              value={formData.notes}
              onChange={e => handleFormChange('notes', e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button className="btn" onClick={close}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save Lead →</button>
        </div>
      </Modal>
    </div>
  );
});

export default Leads;

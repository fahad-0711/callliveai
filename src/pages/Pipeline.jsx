import { useState, useMemo, useCallback, memo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Bot, Calendar, Clock, User } from 'lucide-react';
import { leads as allLeads, agents, pipelineStages, stageMap, maskPhone } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import { formatCurrency } from '../utils/formatCurrency';

const stageOrder = ['New Inquiry', 'Site Visit', 'Negotiation', 'Documentation', 'Closed Won'];

const Pipeline = memo(function Pipeline() {
  const { addToast } = useToast();
  const [leadsState, setLeadsState] = useState(allLeads);

  const columns = useMemo(() => {
    const cols = {};
    stageOrder.forEach(stage => {
      const stageLeads = leadsState.filter(l => l.stage === stage);
      const totalValue = stageLeads.reduce((sum, l) => sum + (l.budgetNum || 0), 0);
      cols[stage] = { leads: stageLeads, totalValue };
    });
    return cols;
  }, [leadsState]);

  const totalPipelineValue = useMemo(() => {
    const total = leadsState.reduce((sum, l) => sum + (l.budgetNum || 0), 0);
    return formatCurrency(total);
  }, [leadsState]);

  const handleDragEnd = useCallback((result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const leadId = parseInt(draggableId);
    const newStage = destination.droppableId;

    setLeadsState(prev =>
      prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l)
    );

    addToast(`Moved to ${newStage}`, 'success');
  }, [addToast]);

  return (
    <div className="stagger-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 24 }}>Sales Pipeline</h1>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 10,
          background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)',
        }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total Pipeline:</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'var(--gold)' }}>
            {totalPipelineValue}
          </span>
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${stageOrder.length}, 1fr)`,
          gap: 14,
          minHeight: '65vh',
        }}>
          {stageOrder.map((stage, stageIdx) => {
            const stageConfig = pipelineStages[stageIdx];
            const col = columns[stage];

            return (
              <div
                key={stage}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(10, 8, 30, 0.35)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                }}
              >
                {/* Column Header */}
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid var(--border)',
                  borderTop: `3px solid ${stageConfig.color}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{stage}</h4>
                    <span style={{
                      padding: '2px 8px', borderRadius: 10, fontSize: 11,
                      fontFamily: 'var(--font-mono)', fontWeight: 600,
                      background: `${stageConfig.color}15`, color: stageConfig.color,
                    }}>
                      {col.leads.length}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(col.totalValue)}
                  </div>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={stage}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        flex: 1,
                        padding: '8px',
                        minHeight: 100,
                        transition: 'background 0.2s ease',
                        background: snapshot.isDraggingOver ? `${stageConfig.color}08` : 'transparent',
                        border: snapshot.isDraggingOver ? `1px dashed ${stageConfig.color}40` : '1px dashed transparent',
                        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
                      }}
                    >
                      {col.leads.map((lead, index) => {
                        const agent = agents.find(a => a.id === lead.agentId);
                        const daysInStage = Math.floor(Math.random() * 20) + 1;
                        const isOverdue = daysInStage > 14;

                        return (
                          <Draggable key={lead.id} draggableId={String(lead.id)} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={snapshot.isDragging ? 'kanban-card-dragging' : ''}
                                style={{
                                  ...provided.draggableProps.style,
                                  padding: '14px',
                                  marginBottom: 8,
                                  borderRadius: 14,
                                  background: 'rgba(10, 8, 30, 0.6)',
                                  backdropFilter: 'blur(16px)',
                                  border: snapshot.isDragging ? `1px solid ${stageConfig.color}60` : '1px solid var(--border)',
                                  cursor: 'grab',
                                  transition: snapshot.isDragging ? 'none' : 'all 0.2s ease',
                                }}
                              >
                                {/* Name & Phone */}
                                <div style={{ marginBottom: 8 }}>
                                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                                    {lead.name}
                                  </div>
                                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                    {maskPhone(lead.phone)}
                                  </div>
                                </div>

                                {/* Property tag */}
                                <div style={{
                                  padding: '4px 8px', borderRadius: 6, fontSize: 11,
                                  background: 'rgba(255,255,255,0.04)', marginBottom: 8,
                                  color: 'var(--text-secondary)', display: 'inline-block',
                                }}>
                                  {lead.property} · {lead.locality}
                                </div>

                                {/* Budget */}
                                <div style={{
                                  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                                  color: 'var(--gold)', marginBottom: 8,
                                }}>
                                  {lead.budget}
                                </div>

                                {/* Agent */}
                                {agent && (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                    <div style={{
                                      width: 20, height: 20, borderRadius: '50%',
                                      background: agent.gradient, display: 'flex',
                                      alignItems: 'center', justifyContent: 'center',
                                      fontSize: 7, fontWeight: 700, color: 'white',
                                    }}>
                                      {agent.initials}
                                    </div>
                                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{agent.name}</span>
                                  </div>
                                )}

                                {/* AI Call Status */}
                                <div style={{
                                  display: 'flex', alignItems: 'center', gap: 4,
                                  fontSize: 10, color: 'var(--text-muted)', marginBottom: 8,
                                }}>
                                  <Bot size={10} style={{ color: 'var(--cyan)' }} />
                                  {lead.aiCallStatus === 'Connected' ? (
                                    <span style={{ color: 'var(--success)' }}>Called · Connected</span>
                                  ) : (
                                    <span>{lead.aiCallStatus}</span>
                                  )}
                                </div>

                                {/* Bottom row */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  {/* Priority dot */}
                                  <div style={{
                                    width: 8, height: 8, borderRadius: '50%',
                                    background: lead.status === 'Hot' ? 'var(--danger)' : lead.status === 'Warm' ? 'var(--warning)' : 'var(--cyan)',
                                  }} />
                                  {/* Days in stage */}
                                  <span style={{
                                    fontSize: 10, fontFamily: 'var(--font-mono)',
                                    padding: '2px 6px', borderRadius: 6,
                                    background: isOverdue ? 'rgba(255,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                                    color: isOverdue ? 'var(--danger)' : 'var(--text-muted)',
                                  }}>
                                    {daysInStage}d
                                  </span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
});

export default Pipeline;

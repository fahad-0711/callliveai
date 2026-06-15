import { useState, useCallback, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, GitBranch, Building2,
  CalendarDays, Contact2, BarChart3, Settings2,
  ChevronLeft, ChevronRight, Mic,
} from 'lucide-react';
import { currentUser, agents } from '../../data/mockData';
import Logo from '../ui/Logo';

const navSections = [
  {
    label: 'MAIN',
    items: [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/leads', icon: Users, label: 'Leads' },
      { path: '/pipeline', icon: GitBranch, label: 'Pipeline' },
      { path: '/properties', icon: Building2, label: 'Properties', badge: 'COMING' },
    ],
  },
  {
    label: 'COMMUNICATION',
    items: [
      { path: '/activities', icon: CalendarDays, label: 'Activities' },
      { path: '/contacts', icon: Contact2, label: 'Contacts' },
    ],
  },
  {
    label: 'ANALYTICS',
    items: [
      { path: '/reports', icon: BarChart3, label: 'Reports' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { path: '/settings', icon: Settings2, label: 'Settings' },
    ],
  },
];

const Sidebar = memo(function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const width = collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)';

  return (
    <aside
      style={{
        width,
        minWidth: width,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease, min-width 0.3s ease',
        background: 'rgba(10, 8, 30, 0.7)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        borderRight: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 12px' : '20px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: collapsed ? 'center' : 'flex-start',
        position: 'relative',
      }}>
        <Logo collapsed={collapsed} />

        {/* Collapse toggle */}
        <button
          onClick={toggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            position: 'absolute',
            right: collapsed ? '50%' : 8,
            top: 20,
            transform: collapsed ? 'translateX(50%)' : 'none',
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--border)',
            display: collapsed ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'all 0.2s',
          }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* Agent Profile Card */}
      {!collapsed && (
        <div style={{ padding: '0 16px', marginBottom: 16 }}>
          <div className="glass-card-inset" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: currentUser.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, color: 'white',
              boxShadow: '0 0 16px rgba(0,245,255,0.5)',
              flexShrink: 0,
            }}>
              {currentUser.initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                {currentUser.name}
              </div>
              <span className="badge badge-team-lead" style={{ marginTop: 4, display: 'inline-block' }}>
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: collapsed ? '0 8px' : '0 12px' }}>
        {navSections.map(section => (
          <div key={section.label} style={{ marginBottom: 20 }}>
            {!collapsed && (
              <div style={{
                fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
                letterSpacing: '1.2px', padding: '0 16px', marginBottom: 6,
                textTransform: 'uppercase',
              }}>
                {section.label}
              </div>
            )}
            {section.items.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              const isDashActive = item.path === '/' && location.pathname === '/';

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive || isDashActive ? 'active' : ''}`}
                  style={{
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    padding: collapsed ? '10px' : undefined,
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.badge && (
                        <span className="badge badge-gold">{item.badge}</span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Voice Agent Status */}
      <div style={{ padding: collapsed ? '12px 8px' : '12px 16px' }}>
        <div className="glass-card-inset" style={{
          padding: collapsed ? '10px' : '12px 14px',
          display: 'flex',
          alignItems: collapsed ? 'center' : undefined,
          flexDirection: collapsed ? 'column' : 'row',
          gap: collapsed ? 8 : 10,
        }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Mic size={16} style={{ color: 'var(--success)' }} />
            <div className="pulse-dot" style={{
              position: 'absolute', top: -2, right: -2,
              width: 6, height: 6,
            }} />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                AI Voice Agent
              </div>
              <div style={{ fontSize: 11, color: 'var(--success)', fontWeight: 500 }}>
                LIVE · 3 active calls
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Agents */}
      <div style={{ padding: collapsed ? '8px' : '8px 16px 20px' }}>
        {!collapsed && (
          <div style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
            letterSpacing: '1px', marginBottom: 10, textTransform: 'uppercase',
          }}>
            ACTIVE AGENTS ({agents.length})
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          {agents.map((agent, i) => (
            <div
              key={agent.id}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: agent.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 11, color: 'white',
                border: '2px solid rgba(10,8,30,0.8)',
                marginLeft: i > 0 ? -8 : 0,
                position: 'relative',
                zIndex: agents.length - i,
              }}
              title={agent.name}
            >
              {agent.initials}
              <div className="online-dot" style={{ width: 8, height: 8 }} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
});

export default Sidebar;

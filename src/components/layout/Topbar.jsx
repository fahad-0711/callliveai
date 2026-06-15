import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { getCurrentDateString } from '../../utils/formatDate';

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Overview & Analytics' },
  '/leads': { title: 'Lead Management', subtitle: 'Track & manage all leads' },
  '/pipeline': { title: 'Sales Pipeline', subtitle: 'Visual deal flow' },
  '/properties': { title: 'Properties', subtitle: 'Property listings' },
  '/activities': { title: 'Activities', subtitle: 'Calls, tasks & follow-ups' },
  '/contacts': { title: 'Contacts', subtitle: 'Contact directory' },
  '/reports': { title: 'Reports', subtitle: 'Analytics & insights' },
  '/settings': { title: 'Settings', subtitle: 'System configuration' },
};

const Topbar = memo(function Topbar() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || pageTitles['/'];

  return (
    <header style={{
      height: 'var(--topbar-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(10, 8, 30, 0.4)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Left — Page Title */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{pageInfo.title}</h2>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pageInfo.subtitle}</p>
      </div>

      {/* Center — Date & Location */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: 'var(--text-secondary)',
      }}>
        <div className="pulse-dot" style={{ width: 6, height: 6 }} />
        <span>{getCurrentDateString()} · Bengaluru</span>
      </div>

      {/* Right — Search, Bell, Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          width: 220,
        }}>
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 13,
              fontFamily: 'var(--font-body)',
              width: '100%',
            }}
            aria-label="Search"
          />
        </div>

        {/* Notifications */}
        <button
          className="btn-icon btn"
          aria-label="Notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'var(--magenta)',
            fontSize: 9,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'var(--font-mono)',
          }}>
            3
          </span>
        </button>

        {/* User Avatar */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: currentUser.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 14,
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 0 12px rgba(0,245,255,0.3)',
        }}>
          {currentUser.initials}
        </div>
      </div>
    </header>
  );
});

export default Topbar;

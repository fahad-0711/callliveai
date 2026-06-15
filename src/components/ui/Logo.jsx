import { memo } from 'react';

const Logo = memo(function Logo({ collapsed = false, size = 'default' }) {
  const sizes = {
    small: { height: 28, iconSize: 24 },
    default: { height: 34, iconSize: 32 },
    large: { height: 44, iconSize: 40 },
  };
  const s = sizes[size] || sizes.default;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: collapsed ? 0 : 8,
      height: s.height,
    }}>
      {/* Logo Icon — Purple dots + signal arcs */}
      <svg
        width={s.iconSize}
        height={s.iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Dot cluster (left side) */}
        <circle cx="8" cy="10" r="3.5" fill="#7B3FA0" />
        <circle cx="8" cy="20" r="3.5" fill="#7B3FA0" />
        <circle cx="8" cy="30" r="3.5" fill="#7B3FA0" />
        <circle cx="16" cy="15" r="3.5" fill="#7B3FA0" />
        <circle cx="16" cy="25" r="3.5" fill="#7B3FA0" />
        <circle cx="24" cy="20" r="3.5" fill="#7B3FA0" />

        {/* Signal arcs (top-right) */}
        <path
          d="M28 12 A6 6 0 0 1 34 18"
          stroke="#7B3FA0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M26 6 A12 12 0 0 1 38 18"
          stroke="#7B3FA0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Logo Text */}
      {!collapsed && (
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: size === 'large' ? 24 : size === 'small' ? 16 : 20,
          lineHeight: 1,
          letterSpacing: '-0.3px',
          display: 'flex',
          alignItems: 'baseline',
        }}>
          <span style={{ color: '#f0f4ff' }}>calllive</span>
          <span style={{ color: '#7B3FA0', position: 'relative' }}>
            .ai
          </span>
        </div>
      )}
    </div>
  );
});

export default Logo;

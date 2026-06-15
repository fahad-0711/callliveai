import { useEffect, useRef } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: { bg: 'rgba(0,255,136,0.12)', border: 'rgba(0,255,136,0.3)', color: '#00ff88', progress: '#00ff88' },
  warning: { bg: 'rgba(255,170,0,0.12)', border: 'rgba(255,170,0,0.3)', color: '#ffaa00', progress: '#ffaa00' },
  error: { bg: 'rgba(255,68,68,0.12)', border: 'rgba(255,68,68,0.3)', color: '#ff4444', progress: '#ff4444' },
  info: { bg: 'rgba(0,245,255,0.12)', border: 'rgba(0,245,255,0.3)', color: '#00f5ff', progress: '#00f5ff' },
};

function ToastItem({ toast }) {
  const progressRef = useRef(null);
  const { removeToast } = useToast();
  const Icon = icons[toast.type] || icons.success;
  const c = colors[toast.type] || colors.success;

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = '100%';
      requestAnimationFrame(() => {
        if (progressRef.current) {
          progressRef.current.style.width = '0%';
          progressRef.current.style.transition = `width ${toast.duration}ms linear`;
        }
      });
    }
  }, [toast.duration]);

  return (
    <div
      className={`toast glass-card-static ${toast.exiting ? 'toast-exit' : ''}`}
      style={{
        background: c.bg,
        borderColor: c.border,
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon size={18} style={{ color: c.color, flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{toast.message}</span>
        <button
          onClick={() => removeToast(toast.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
          aria-label="Dismiss notification"
        >
          <X size={14} style={{ color: 'var(--text-muted)' }} />
        </button>
      </div>
      <div
        ref={progressRef}
        className="toast-progress"
        style={{ background: c.progress, width: '100%' }}
      />
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

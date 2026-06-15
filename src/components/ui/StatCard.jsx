import { memo } from 'react';
import { useCounter } from '../../hooks/useCounter';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import * as LucideIcons from 'lucide-react';

const StatCard = memo(function StatCard({ data }) {
  const count = useCounter(data.value);
  const Icon = LucideIcons[data.icon];
  
  const sparkData = data.sparkline?.map((v, i) => ({ v })) || [];
  
  const displayValue = () => {
    const num = data.suffix ? count.toFixed(1) : Math.round(count);
    return `${data.prefix || ''}${num}${data.suffix || ''}`;
  };

  return (
    <div className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
            {data.label}
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 32,
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}>
            {displayValue()}
          </p>
        </div>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: `${data.color}15`,
          border: `1px solid ${data.color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 20px ${data.color}25`,
        }}>
          {Icon && <Icon size={20} style={{ color: data.color }} />}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className={data.trend >= 0 ? 'badge badge-trend-up' : 'badge badge-trend-down'}>
          {data.trend >= 0 ? '▲' : '▼'} {data.trendAbsolute ? `+${data.trend}` : `${Math.abs(data.trend)}%`}
        </span>
        
        {sparkData.length > 0 && (
          <div style={{ width: 80, height: 32 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id={`spark-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={data.color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={data.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={data.color}
                  strokeWidth={1.5}
                  fill={`url(#spark-${data.id})`}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
});

export default StatCard;

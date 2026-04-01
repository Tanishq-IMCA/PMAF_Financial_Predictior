import React from 'react';

const MetricCard = ({ title, value, unit, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'var(--danger-red)' : '#39e58c';

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <h3 style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', fontWeight: 400 }}>
        {title}
      </h3>
      <p style={{ margin: '8px 0', fontSize: '2rem', fontWeight: 600 }}>
        {unit}{value}
      </p>
      {change && (
        <p style={{ margin: 0, fontSize: '0.8rem', color: changeColor }}>
          {change}% {changeType === 'increase' ? '▲' : '▼'} vs last month
        </p>
      )}
    </div>
  );
};

const MetricsPanel = ({ historical, predictions }) => {
  const lastBalance = historical.length > 0 ? historical[historical.length - 1].Balance.toFixed(2) : '0.00';
  const zeroBalanceDate = predictions?.day_of_reckoning || 'N/A';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <MetricCard 
        title="Current Balance"
        value={lastBalance}
        unit="$"
      />
      <MetricCard 
        title="Zero Balance Date"
        value={zeroBalanceDate}
        unit=""
      />
      <MetricCard 
        title="Monthly Spend"
        value="2,450.78" // Mock data
        unit="$"
        change="+15"
        changeType="increase"
      />
      <MetricCard 
        title="Avg. Transaction"
        value="45.60" // Mock data
        unit="$"
        change="-5"
        changeType="decrease"
      />
    </div>
  );
};

export default MetricsPanel;

import React, { useState, useEffect } from 'react';
import { useNumberClimb, useTextReveal } from '../hooks/useAnimations';

const AnimatedMetricCard = ({ title, value, unit, change, changeType, isVisible, animationType = 'number' }) => {
  const numberValue = parseFloat(value?.replace(/,/g, '')) || 0;
  const animatedNumber = useNumberClimb(numberValue, 2000);
  const animatedText = useTextReveal(value, 2000);

  const displayValue = () => {
    if (animationType === 'text') {
      return animatedText;
    }
    // Format the number with commas
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(animatedNumber);
  };

  return (
    <div className={`glass-panel metric-card-${isVisible ? 'visible' : 'hidden'}`} style={{ padding: '20px' }}>
      <h3 style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', fontWeight: 400 }}>
        {title}
      </h3>
      <p style={{ margin: '8px 0 4px 0', fontSize: '2rem', fontWeight: 600, minHeight: '40px' }}>
        {unit}{displayValue()}
      </p>
      {change && (
        <p style={{ margin: 0, fontSize: '0.8rem', color: changeType === 'increase' ? 'var(--danger-red)' : '#39e58c' }}>
          {change}% {changeType === 'increase' ? '▲' : '▼'} vs last month
        </p>
      )}
    </div>
  );
};

const MetricsPanel = ({ historical, predictions }) => {
  const [visibleCards, setVisibleCards] = useState([]);

  const lastBalance = historical.length > 0 ? historical[historical.length - 1].Balance.toFixed(2) : '0.00';
  const projectedBalance = predictions?.predictions.length > 0 ? predictions.predictions[predictions.predictions.length - 1].Predicted_Balance.toFixed(2) : '0.00';

  const metrics = [
    { title: "Current Balance", value: lastBalance, unit: "$", animationType: 'number' },
    { title: "Projected 30-Day Balance", value: projectedBalance, unit: "$", animationType: 'number' },
    { title: "Monthly Spend", value: "2450.78", unit: "$", change: "+15", changeType: "increase", animationType: 'number' },
    { title: "Avg. Transaction", value: "45.60", unit: "$", change: "-5", changeType: "decrease", animationType: 'number' }
  ];

  useEffect(() => {
    const timers = metrics.map((_, index) => 
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 200) // Staggered delay
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {metrics.map((metric, index) => (
        <AnimatedMetricCard
          key={metric.title}
          {...metric}
          isVisible={visibleCards.includes(index)}
        />
      ))}
    </div>
  );
};

export default MetricsPanel;

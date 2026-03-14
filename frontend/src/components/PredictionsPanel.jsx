import React from 'react';

const PredictionsPanel = ({ data }) => {
  if (!data) return <div>No prediction data available.</div>;

  const { day_of_reckoning, insights } = data;

  return (
    <div>
      <h2>AI Insights & Predictions</h2>
      
      <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255, 77, 77, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ff4d4d' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#ff4d4d' }}>🚨 Day of Reckoning</h3>
        {day_of_reckoning ? (
          <p style={{ margin: 0 }}>At your current spending velocity, your balance is projected to hit $0 on: <strong>{day_of_reckoning}</strong></p>
        ) : (
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>Your balance is safe for the projected period.</p>
        )}
      </div>

      <div>
        <h3>Module Insights</h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          {insights.map((insight, idx) => (
            <li key={idx} style={{ marginBottom: '12px' }}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PredictionsPanel;

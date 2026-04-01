import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

const AIInsightsPanel = ({ insights }) => {
  return (
    <div className="glass-panel ai-insights-panel">
      <h3><FaLightbulb style={{ marginRight: '10px', color: '#FFCE56' }} /> AI Insights</h3>
      {insights && insights.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
          {insights.map((insight, index) => (
            <li key={index} style={{ marginBottom: '12px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              - {insight}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No insights available at the moment.</p>
      )}
    </div>
  );
};

export default AIInsightsPanel;

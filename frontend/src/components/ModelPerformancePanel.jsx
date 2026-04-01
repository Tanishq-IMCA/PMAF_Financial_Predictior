import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa'; // Import a sleek checkmark icon

const ModelPerformancePanel = () => {
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModelPerformance = async () => {
      try {
        const backendHost = window.location.hostname;
        const API_BASE_URL = `http://${backendHost}:5000/api`;
        const response = await axios.get(`${API_BASE_URL}/model_performance`);
        setModelData(response.data);
      } catch (err) {
        console.error("Error fetching model performance:", err);
        setError("Failed to load model performance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchModelPerformance();
  }, []);

  if (loading) return <div className="glass-panel model-performance-panel-root">Loading Model Performance...</div>;
  if (error) return <div className="glass-panel model-performance-panel-root danger-text">{error}</div>;
  if (!modelData || !modelData.performance) return <div className="glass-panel model-performance-panel-root">No model performance data available.</div>;

  const { best_model, performance } = modelData;

  return (
    <div className="glass-panel model-performance-panel-root">
      <h2>Model Performance</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <th style={{ padding: '8px', textAlign: 'left', color: 'rgba(255,255,255,0.7)' }}>Model</th>
            <th style={{ padding: '8px', textAlign: 'right', color: 'rgba(255,255,255,0.7)' }}>RMSE</th>
            <th style={{ padding: '8px', textAlign: 'right', color: 'rgba(255,255,255,0.7)' }}>R² Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(performance).map(([modelName, metrics]) => (
            <tr 
              key={modelName} 
              style={{ 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: modelName === best_model ? 'rgba(0,242,255,0.1)' : 'transparent'
              }}
            >
              <td style={{ padding: '8px', fontWeight: modelName === best_model ? 'bold' : 'normal' }}>
                {modelName} {modelName === best_model && <FaCheckCircle style={{ color: '#39e58c', marginLeft: '8px' }} />}
              </td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{metrics.rmse}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{metrics.r2_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: '16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
        <FaCheckCircle style={{ color: '#39e58c', marginRight: '8px' }} /> Best model based on lowest RMSE.
      </p>
    </div>
  );
};

export default ModelPerformancePanel;

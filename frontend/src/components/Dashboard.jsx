import React, { useState, useEffect } from 'react';
import FancyChart from './FancyChart';
import PredictionsPanel from './PredictionsPanel';
import Header from './Header'; // Import the new Header component
import MetricsPanel from './MetricsPanel'; // Import the new MetricsPanel component
import { fetchHistoricalData, fetchPredictions } from '../utils/api';

const Dashboard = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const history = await fetchHistoricalData();
        const predictions = await fetchPredictions();
        
        setHistoricalData(history);
        setPredictionData(predictions);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div style={{padding: '32px'}}>Loading Dashboard Data...</div>;

  return (
    <div>
      <Header /> {/* Place the Header at the top */}
      <div className="dashboard-container">
        <div className="glass-panel chart-container">
          <h2>Balance Forecast</h2>
          <FancyChart historical={historicalData} predictions={predictionData?.predictions || []} />
        </div>
        
        {/* New Metrics Panel */}
        <div className="metrics-grid"> {/* This will be a grid for metrics */}
          <MetricsPanel historical={historicalData} predictions={predictionData} />
        </div>

        {/* Existing Predictions Panel */}
        <div className="glass-panel predictions-panel">
          <PredictionsPanel data={predictionData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

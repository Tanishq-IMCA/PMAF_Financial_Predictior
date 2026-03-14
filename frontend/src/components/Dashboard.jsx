import React, { useState, useEffect } from 'react';
import FancyChart from './FancyChart';
import PredictionsPanel from './PredictionsPanel';
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
      <h1 style={{padding: '32px 32px 0 32px'}}>PMAF Financial Predictor</h1>
      <div className="dashboard-container">
        <div className="glass-panel chart-container">
          <h2>Balance Forecast</h2>
          <FancyChart historical={historicalData} predictions={predictionData?.predictions || []} />
        </div>
        
        <div className="glass-panel">
          <PredictionsPanel data={predictionData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

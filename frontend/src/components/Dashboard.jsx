import React, { useState, useEffect } from 'react';
import FancyChart from './FancyChart';
import PredictionsPanel from './PredictionsPanel';
import Header from './Header';
import MetricsPanel from './MetricsPanel';
import ModelPerformancePanel from './ModelPerformancePanel';
import AIInsightsPanel from './AIInsightsPanel';
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
      <Header />
      <div className="dashboard-container">
        {/* Main content area for the graph and the full-width panel below it */}
        <div className="main-content">
          <div className="glass-panel chart-wrapper">
            <div className="chart-container">
              <h2>Balance Forecast</h2>
              <FancyChart historical={historicalData} predictions={predictionData?.predictions || []} />
            </div>
          </div>
          <div className="bottom-panels">
            {/* PredictionsPanel now takes the full width */}
            <div className="glass-panel predictions-panel">
              <PredictionsPanel data={predictionData} />
            </div>
          </div>
        </div>
        
        {/* Right column for metrics and other panels */}
        <div className="right-column-panels">
          <div className="metrics-grid">
            <MetricsPanel historical={historicalData} predictions={predictionData} />
          </div>
          {/* Pass the insights data to the component */}
          <AIInsightsPanel insights={predictionData?.insights || []} />
          <ModelPerformancePanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

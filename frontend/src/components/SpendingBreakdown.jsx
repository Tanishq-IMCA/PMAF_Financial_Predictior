import React, { useState, useEffect } from 'react';
import { Doughnut, Line, Radar } from 'react-chartjs-2';
import { fetchHistoricalData } from '../utils/api';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  CategoryScale,
  RadialLinearScale,
  Filler
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const SpendingBreakdown = () => {
  const [doughnutData, setDoughnutData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [radarData, setRadarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const processData = async () => {
      setLoading(true);
      const historicalData = await fetchHistoricalData();

      if (historicalData.length === 0) {
        setLoading(false);
        return;
      }

      const spending = {};
      historicalData.forEach(item => {
        if (item.Amount < 0) {
          const category = item.Category;
          spending[category] = (spending[category] || 0) + Math.abs(item.Amount);
        }
      });

      const labels = Object.keys(spending);
      const data = Object.values(spending);
      const colors = ['#8A2BE2', '#00BFFF', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

      setDoughnutData({
        labels,
        datasets: [{ data, backgroundColor: colors }]
      });

      const topTwoCategories = Object.entries(spending).sort((a, b) => b[1] - a[1]).slice(0, 2).map(item => item[0]);
      const category1Data = historicalData.filter(item => item.Category === topTwoCategories[0] && item.Amount < 0).map(item => ({ x: item.Date, y: Math.abs(item.Amount) }));
      const category2Data = historicalData.filter(item => item.Category === topTwoCategories[1] && item.Amount < 0).map(item => ({ x: item.Date, y: Math.abs(item.Amount) }));

      setLineData({
        datasets: [
          { label: topTwoCategories[0], data: category1Data, borderColor: '#8A2BE2', tension: 0.4, fill: false },
          { label: topTwoCategories[1], data: category2Data, borderColor: '#00BFFF', tension: 0.4, fill: false }
        ]
      });

      setRadarData({
        labels,
        datasets: [{
          label: 'Spending Distribution',
          data,
          backgroundColor: 'rgba(138, 43, 226, 0.2)',
          borderColor: '#8A2BE2',
          pointBackgroundColor: '#8A2BE2',
        }]
      });

      setLoading(false);
      // Trigger fade-in after data is loaded
      setTimeout(() => setIsVisible(true), 100);
    };

    processData();
  }, []);

  const animationOptions = {
    animation: {
      duration: 5000
    }
  };

  const chartOptions = { ...animationOptions, plugins: { legend: { labels: { color: 'white', font: { size: 14 } } } }, scales: { x: { type: 'time', time: { unit: 'month' }, ticks: { color: 'white', font: { size: 12 } }, grid: { color: 'rgba(255,255,255,0.1)' } }, y: { ticks: { color: 'white', font: { size: 12 } }, grid: { color: 'rgba(255,255,255,0.1)' } } } };
  const radarOptions = { ...animationOptions, plugins: { legend: { labels: { color: 'white', font: { size: 14 } } } }, scales: { r: { angleLines: { color: 'rgba(255,255,255,0.2)' }, grid: { color: 'rgba(255,255,255,0.2)' }, pointLabels: { color: 'white', font: { size: 14 } }, ticks: { backdropColor: 'transparent', color: 'white' } } } };
  const doughnutOptions = { ...animationOptions, plugins: { legend: { position: 'right', labels: { color: 'white', font: { size: 14 } } } } };

  return (
    <div className={`glass-panel metric-card-${isVisible ? 'visible' : 'hidden'}`}>
      <h2>Spending Analysis</h2>
      {loading ? <p>Loading spending data...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '16px' }}>
          <div style={{ gridColumn: '1 / 2' }}>
            <h3>Breakdown</h3>
            <p style={{color: 'rgba(255,255,255,0.7)', marginTop: '-8px', fontSize: '0.9rem'}}>Total Spending Distribution</p>
            {doughnutData ? <Doughnut data={doughnutData} options={doughnutOptions} /> : <p>No data.</p>}
          </div>
          <div style={{ gridColumn: '2 / 3' }}>
            <h3>Spending Shape</h3>
            <p style={{color: 'rgba(255,255,255,0.7)', marginTop: '-8px', fontSize: '0.9rem'}}>Across All Categories</p>
            {radarData ? <Radar data={radarData} options={radarOptions} /> : <p>No data.</p>}
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: '32px' }}>
            <h3>Top 2 Categories Over Time</h3>
            {lineData ? <Line data={lineData} options={chartOptions} /> : <p>No trend data.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingBreakdown;

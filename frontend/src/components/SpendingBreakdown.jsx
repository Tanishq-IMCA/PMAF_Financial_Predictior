import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
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
  CategoryScale
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

const SpendingBreakdown = () => {
  const [doughnutData, setDoughnutData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all'); // 'weekly', 'monthly', 'all'

  const filterDataByRange = (data, range) => {
    if (range === 'all') return data;
    const now = new Date();
    const rangeStart = new Date();
    if (range === 'weekly') {
      rangeStart.setDate(now.getDate() - 7);
    } else if (range === 'monthly') {
      rangeStart.setMonth(now.getMonth() - 1);
    }
    return data.filter(d => new Date(d.Date) >= rangeStart);
  };

  useEffect(() => {
    const processData = async () => {
      setLoading(true);
      const historicalData = await fetchHistoricalData();
      const filteredData = filterDataByRange(historicalData, timeRange);

      if (filteredData.length === 0) {
        setDoughnutData(null);
        setLineData(null);
        setLoading(false);
        return;
      }

      // --- Doughnut Chart Data ---
      const spending = {};
      filteredData.forEach(item => {
        if (item.Amount < 0) {
          const category = item.Category;
          spending[category] = (spending[category] || 0) + Math.abs(item.Amount);
        }
      });

      setDoughnutData({
        labels: Object.keys(spending),
        datasets: [{
          data: Object.values(spending),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'],
        }]
      });

      // --- Line Chart Data (Top 2 Categories) ---
      const topTwoCategories = Object.entries(spending).sort((a, b) => b[1] - a[1]).slice(0, 2).map(item => item[0]);
      
      const category1Data = filteredData.filter(item => item.Category === topTwoCategories[0] && item.Amount < 0).map(item => ({ x: item.Date, y: Math.abs(item.Amount) }));
      const category2Data = filteredData.filter(item => item.Category === topTwoCategories[1] && item.Amount < 0).map(item => ({ x: item.Date, y: Math.abs(item.Amount) }));

      setLineData({
        datasets: [
          { label: topTwoCategories[0], data: category1Data, borderColor: '#FF6384', fill: false },
          { label: topTwoCategories[1], data: category2Data, borderColor: '#36A2EB', fill: false }
        ]
      });

      setLoading(false);
    };

    processData();
  }, [timeRange]);

  return (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Spending Breakdown</h2>
        <div>
          <button onClick={() => setTimeRange('weekly')}>Weekly</button>
          <button onClick={() => setTimeRange('monthly')}>Monthly</button>
          <button onClick={() => setTimeRange('all')}>All Time</button>
        </div>
      </div>
      {loading ? <p>Loading spending data...</p> : (
        <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
          <div style={{ flex: 1 }}>
            <h3>By Category</h3>
            {doughnutData ? <Doughnut data={doughnutData} /> : <p>No spending data.</p>}
          </div>
          <div style={{ flex: 2 }}>
            <h3>Top 2 Categories Over Time</h3>
            {lineData ? <Line data={lineData} options={{ scales: { x: { type: 'time', time: { unit: 'month' } } } }} /> : <p>No trend data.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingBreakdown;

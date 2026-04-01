import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

const FancyChart = ({ historical, predictions }) => {
  const [timeRange, setTimeRange] = useState('all'); // 'weekly', 'monthly', 'all'

  const filterData = (data, range) => {
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

  const filteredHistorical = filterData(historical, timeRange);

  const labels = [
    ...filteredHistorical.map(d => d.Date),
    ...predictions.map(d => d.Date)
  ];

  const historicalBalances = [
    ...filteredHistorical.map(d => d.Balance),
    ...predictions.map(() => null)
  ];

  const lastHistoricalBalance = filteredHistorical.length > 0 ? filteredHistorical[filteredHistorical.length - 1].Balance : 0;
  
  const predictedBalances = [
    ...filteredHistorical.map((_, i) => i === filteredHistorical.length - 1 ? lastHistoricalBalance : null),
    ...predictions.map(d => d.Predicted_Balance)
  ];

  const pointColors = predictedBalances.map((val) => val < 1000 ? 'rgba(255, 77, 77, 1)' : 'rgba(100, 255, 218, 1)');

  const data = {
    labels,
    datasets: [
      {
        label: 'Actual Balance',
        data: historicalBalances,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fill: true,
      },
      {
        label: 'Predicted Balance',
        data: predictedBalances,
        borderColor: 'rgba(100, 255, 218, 0.8)',
        borderDash: [5, 5],
        pointBackgroundColor: pointColors,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: 'white' } } },
    scales: {
      x: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => setTimeRange('weekly')}>Weekly</button>
        <button onClick={() => setTimeRange('monthly')}>Monthly</button>
        <button onClick={() => setTimeRange('all')}>All Time</button>
      </div>
      <div style={{ height: '350px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default FancyChart;

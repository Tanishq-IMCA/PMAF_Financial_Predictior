import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FancyChart = ({ historical, predictions }) => {
  // Extracting data for the chart
  // Simplify by grouping by day if needed, or just taking the last X entries for visibility
  const recentHistory = historical.slice(-50); // Just show recent history for clarity

  const labels = [
    ...recentHistory.map(d => d.Date),
    ...predictions.map(d => d.Date)
  ];

  const historicalBalances = [
    ...recentHistory.map(d => d.Balance),
    ...predictions.map(() => null) // Pad with nulls for prediction period
  ];

  // The prediction line starts from the last historical point
  const lastHistoricalBalance = recentHistory.length > 0 ? recentHistory[recentHistory.length - 1].Balance : 0;
  
  const predictedBalances = [
    ...recentHistory.map((_, i) => i === recentHistory.length - 1 ? lastHistoricalBalance : null),
    ...predictions.map(d => d.Predicted_Balance)
  ];

  // Dynamic coloring for prediction line based on "Danger Zone"
  const pointColors = predictedBalances.map((val, index) => {
      if (val === null) return 'rgba(0,0,0,0)';
      return val < 1000 ? 'rgba(255, 77, 77, 1)' : 'rgba(100, 255, 218, 1)'; // Red if danger, else teal
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Actual Balance',
        data: historicalBalances,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
        tension: 0.3, // Smooth curve
        fill: true,
        pointRadius: 0,
        pointHitRadius: 10,
      },
      {
        label: 'Predicted Balance',
        data: predictedBalances,
        borderColor: 'rgba(100, 255, 218, 0.8)', // Base color
        borderWidth: 2,
        borderDash: [5, 5], // Dotted line
        tension: 0.3,
        pointBackgroundColor: pointColors,
        pointBorderColor: pointColors,
        pointRadius: 2,
        segment: {
            borderColor: ctx => {
                // If the end point of the segment is in danger zone, color segment red
                const index = ctx.p1DataIndex;
                const val = predictedBalances[index];
                if (val !== null && val < 1000) {
                    return 'rgba(255, 77, 77, 0.8)'; // Transition to red
                }
                return 'rgba(100, 255, 218, 0.8)';
            }
        }
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'white' }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.6)', maxTicksLimit: 10 },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { color: 'rgba(255,255,255,0.6)' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  };

  return <Line options={options} data={data} />;
};

export default FancyChart;

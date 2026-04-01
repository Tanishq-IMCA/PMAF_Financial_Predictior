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
  const labels = [
    ...historical.map(d => d.Date),
    ...predictions.map(d => d.Date)
  ];

  const historicalBalances = [
    ...historical.map(d => d.Balance),
    ...predictions.map(() => null)
  ];

  const lastHistoricalBalance = historical.length > 0 ? historical[historical.length - 1].Balance : 0;
  
  const predictedBalances = [
    ...historical.map((_, i) => i === historical.length - 1 ? lastHistoricalBalance : null),
    ...predictions.map(d => d.Predicted_Balance)
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Actual Balance',
        data: historicalBalances,
        borderColor: '#8A2BE2', // BlueViolet
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(138, 43, 226, 0.5)');
          gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4, // Increased tension for smoother lines
      },
      {
        label: 'Predicted Balance',
        data: predictedBalances,
        borderColor: '#00BFFF', // DeepSkyBlue
        borderDash: [5, 5],
        tension: 0.4, // Increased tension for smoother lines
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 4000 // 4-second animation
    },
    plugins: { 
      legend: { 
        labels: { 
          color: 'white', 
          font: { size: 14 } 
        } 
      } 
    },
    scales: {
      x: { 
        ticks: { 
          color: 'rgba(255,255,255,0.8)', 
          font: { size: 12 } 
        }, 
        grid: { color: 'rgba(255,255,255,0.1)' } 
      },
      y: { 
        ticks: { 
          color: 'rgba(255,255,255,0.8)', 
          font: { size: 12 } 
        }, 
        grid: { color: 'rgba(255,255,255,0.1)' } 
      }
    }
  };

  return (
    <div style={{ height: '400px' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default FancyChart;

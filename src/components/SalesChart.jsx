// src/components/SalesChart.jsx
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
import { useInventory } from '../context/InventoryContext';
import { getDates } from '../data/salesData';

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

const SalesChart = () => {
  const { products } = useInventory();
  const labels = getDates();

  const data = {
    labels,
    datasets: products.map((item, index) => {
      const colors = ['#667eea', '#2af598', '#f6d365', '#ff0844'];
      const color = colors[index % colors.length];
      
      return {
        label: item.name,
        data: item.salesHistory,
        borderColor: color,
        backgroundColor: color + '20', // subtle transparent fill
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: color,
        fill: true
      };
    })
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: '600' }
        }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#666',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { display: false },
        ticks: { font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } }
      }
    }
  };

  return (
    <div style={{ height: '350px' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default SalesChart;

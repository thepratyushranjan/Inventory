// src/components/SalesChart.js
import React from 'react';
import { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const chartRef = useRef(null);
  const data = {
    labels: ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k', '65k', '70k', '75k', '80k', '85k', '90k', '95k', '100k'],
    datasets: [
      {
        label: 'Sales Data',
        data: [20, 30, 50, 54, 33, 40, 37, 57, 30, 83, 37, 56, 52, 57, 80, 90, 57, 61, 21, 80], // Example data
        borderColor: '#007bff',
        backgroundColor: function () {
          const chart = chartRef.current;
          if (!chart) return '#4379EE10';

          const ctx = chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 60, chart.height);
          gradient.addColorStop(0, '#4379EE29'); // Top color
          gradient.addColorStop(1, '#ffffff'); // Bottom color

          return gradient;
        },
        pointBackgroundColor: '#007bff',
        tension: 0.1,
        fill: true,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Sales Chart',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        grid: {
          display: true,
          color: '#EAEAEA', 
          borderColor: '#EAEAEA',
          tickColor: '#EAEAEA',
        },
        ticks: {
          callback: (value) => `${value}%`,
          stepSize: 20,
          min: 0, 
          max: 100,
        },
        //beginAtZero: true,
      },
    },
};
useEffect(() => {
  if (chartRef.current) {
    const chart = chartRef.current;
    chart.update();
  }
}, []);

  return <Line ref={chartRef} data={data} options={options} />;
};

export default SalesChart;

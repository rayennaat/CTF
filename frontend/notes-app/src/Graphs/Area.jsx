import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const AreaChart = () => {
  const data = {
    labels: [
      "Jan 18 2025 01:46:58 GMT-0800",
      "Jan 18 2025 03:14:00 GMT-0800",
      "Jan 18 2025 04:42:38 GMT-0800",
    ],
    datasets: [
      {
        label: "kAiZ3n", // Legend Label
        data: [250, 550, 840], // Data Points
        fill: true, // Shading under the line
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Fill Color
        borderColor: "rgba(75, 192, 192, 1)", // Line Color
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point Fill Color
        pointBorderColor: "#fff", // Point Border Color
        pointHoverRadius: 5, // Point Size on Hover
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Position the legend below the chart
      },
      tooltip: {
        enabled: true, // Enable hover tooltips
        callbacks: {
          label: (tooltipItem) =>
            `Score: ${tooltipItem.raw}`, // Customize tooltip text
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time", // X-axis title
        },
        ticks: {
          maxRotation: 45, // Rotate labels for better readability
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Score", // Y-axis title
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "500px", width: "1300px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;

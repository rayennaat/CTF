import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const UserCategoryProgress = ({ userData }) => {
  if (!userData || !userData.categories) {
    return <div>No category data available.</div>;
  }

  const categoryNames = Object.keys(userData.categories);
  const solvedCounts = Object.values(userData.categories);

  const data = {
    labels: categoryNames,
    datasets: [
      {
        label: `${userData.name || "User"}'s Category Progress`,
        data: solvedCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: Math.max(...solvedCounts) * 1.2,
        ticks: {
          stepSize: 1,
          fontSize: 10, // Smaller font size for ticks
        },
        pointLabels: {
          fontSize: 12, // Smaller font size for labels
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true, // Add responsive true
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.formattedValue} solved`;
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

const MyComponent = () => {
    const userData = {
        name: "John Doe",
        categories: {
            "Web Development": 5,
            "Crypto": 12,
            "Game": 8,
            "Forensics": 2,
            "Pwn": 10,
        }
    }
    return (
        <div className="w-full h-[500px] p-4"> {/* Added padding and w-full */}
            <UserCategoryProgress userData={userData}/>
        </div>
    )
}

export default MyComponent;
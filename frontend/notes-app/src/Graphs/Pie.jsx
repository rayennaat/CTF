import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { pieChartData } from "./LineData"; // Correctly point to your data file

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position the legend
      },
    },
    cutout: "50%", // Converts the pie chart into a donut chart
  };

  return <Pie options={options} data={pieChartData} />;
};

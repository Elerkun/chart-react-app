import { useMemo } from "react";
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
} from "chart.js";
import { Line, Lin } from "react-chartjs-2";

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

const power = [6, 7, 10, 4, 5, 8, 9];
const power2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
const labels = ["10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30"];
const options = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Multi Axis'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
            beginAtZero: true,
          type: 'linear',
          display: true,
          position: 'right',
        },
      }
};
export const LineChart = () => {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Mis datos",
          data: power,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
          yAxisID: 'y',
        },
        {
          label: "Mis datos (2)",
          tension: 0.3,
          data: power2,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
          yAxisID: 'y1',
        },
      ],
      labels,
    };
  }, []);
  return <Line data={data} options={options} />;
};

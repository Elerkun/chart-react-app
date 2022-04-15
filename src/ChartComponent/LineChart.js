import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-moment';

ChartJS.register(
  TimeScale,
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
//const labels = ["10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30"];
const meterData = [{
  x: '2021-11-06 23:39:30',
  y: 10
}, {
  x: '2021-11-06 01:00:28',
  y: 9
}, {
  x: '2021-11-07 09:00:28',
  y: 8
}];
const powerSet = [{
  x: '2021-11-06 23:40:35',
  y: 3
}, {
  x: '2021-11-06 01:00:28',
  y: 6
}, {
  x: '2021-11-06 09:00:28',
  y: 3
}];
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
        // y1: {
        //     beginAtZero: true,
        //   type: 'linear',
        //   display: true,
        //   position: 'right',
        // },
        x: {
          type: "time",
          time: {
            unit: 'minute',
            // format: 'HH:mm',
            stepSize: 15,
            //unitStepSize: 15,
            displayFormats: {
              'minute': 'DD MMM YYY HH:mm',
              'hour': 'HH',
              'day': 'DD'
            },
            // unit: "day"
          }
        }
    }
};
export const LineChart = () => {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Meter Data",
          data: meterData,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
         //yAxisID: 'y',
        },
        {
          label: "Power Set",
          tension: 0.3,
          data: powerSet,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
         //yAxisID: 'y1',
        },
      ],
      //labels,
    };
  }, []);
  return <Line data={data} options={options} />;
};

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
  LogarithmicScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-moment';

ChartJS.register(
  TimeScale,
  LogarithmicScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const power = [80, 200, 400, 600, null, 2000, 3000, 4000, 5000];
const power2 = [30, 50.5, 700, 90, 1000, 0, 1500, 1300, 0, 0];
const labels = ["2021-11-06 09:00:28", "2021-11-07 09:01:30", "2021-11-08 09:01:35", "2021-11-09 09:01:45", "2021-11-10 09:02:04",
                "2021-11-11 11:00:28", "2021-11-12 12:40:35", "2021-11-13 13:00:28", "2021-11-14 14:00:28", "2021-11-15 15:00:28"];
// const meterData = [{
//   x: '2021-11-06 23:39:30',
//   y: 10
// }, {
//   x: '2021-11-06 01:00:28',
//   y: 9
// }, {
//   x: '2021-11-07 09:00:28',
//   y: 8
// }];
// const powerSet = [{
//   x: '2021-11-06 23:40:35',
//   y: 3
// }, {
//   x: '2021-11-06 01:00:28',
//   y: 6
// }, {
//   x: '2021-11-06 09:00:28',
//   y: 3
// }];
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
          min:10,
          display: true,
          type: 'linear',
        },
        // y: {
        //   beginAtZero: true,
        //   type: 'linear',
        //   display: true,
        //   position: 'left',
        // },
        // y1: {
        //     beginAtZero: true,
        //   type: 'linear',
        //   display: true,
        //   position: 'right',
        // },
        x: {
          type: "time",
          time: {
            unit: 'day',
            // format: 'HH:mm',
            stepSize: 1,
            //unitStepSize: 15,
            displayFormats: {
              'minute': 'DD MM HH:mm',
              'hour': 'HH',
              'day': 'DD MMM HH:mm'
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
          data: power,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
          spanGaps: true,
         //yAxisID: 'y',
        },
        {
          label: "Power Set",
          tension: 0.3,
          data: power2,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
         //yAxisID: 'y1',
        },
      ],
      labels,
    };
  }, []);
  return <Line data={data} options={options} />;
};

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
import moment from 'moment-timezone';
import {
  getAcks, getMeterDataValues, getAcksControlPlan,
} from './fullConfiguration';
import meterData from './mocks/meterData.json';
import appliedSetPoint from './mocks/appliedSetPoint.json';
import controlPlan from './mocks/controlPlan.json';

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

moment.updateLocale(moment.locale(), { invalidDate: '-' });
moment.tz.setDefault('UTC');

const validTimeZones = moment.tz.names();
export const generateEpoch = () => {
  let currentTimeZone = moment.tz.guess();
  if (validTimeZones.indexOf(moment.tz.guess()) === -1) {
    // eslint-disable-next-line no-console
    console.error('Wrong timezone', moment.tz.guess());
    currentTimeZone = 'UTC';
  }
  // eslint-disable-next-line no-console
  console.info(`Generating epoch with ${currentTimeZone} timezone`);
  return ({
    formatDateToChart: (v) => (v && moment(v)?.isValid()
      ? moment(v)?.format('YYYY-MM-DD HH:mm:ss') : ''),
  });
};
const useAcks = getAcks(appliedSetPoint);
const controlPlanData = getAcksControlPlan(controlPlan.controlPlans.map((v) => v.data));
const setTimeMeterData = meterData.meterDataTrendFlatTableDTOList.flatMap((current) => current.meterDataEntityList.map((entityList) => ({
  time: new Date(current.timestamp),
  trendIdValue: entityList.trendIdValue,
  trendIdKeyMeasureUnit: entityList.trendIdKeyMeasureUnit,
})));
const meterDataValues = getMeterDataValues(setTimeMeterData);
const appliedSetPointsTime = useAcks.flat().map((setTime) => ({
  y: setTime.y,
  x: generateEpoch().formatDateToChart(setTime.x),
  reason: setTime.reason,
})).sort((a, b) => (a.x > b.x ? 1 : -1));
const controlMeterDataInfo = meterDataValues.map((setMeterDataInfo) => ({
  y: setMeterDataInfo.y,
  x: generateEpoch().formatDateToChart(setMeterDataInfo.x),
  reason: '',
})).sort((a, b) => (a.x > b.x ? 1 : -1));
const controlPlanInfo = controlPlanData.flat(Infinity).map((setControlPlanTime) => ({
  y: setControlPlanTime.y,
  x: generateEpoch().formatDateToChart(setControlPlanTime.x),
  reason: setControlPlanTime.reason,
})).sort((a, b) => (a.x > b.x ? 1 : -1));
meterDataValues.push(useAcks);
meterDataValues.push(controlPlanData);
const timeFormated = meterDataValues.flat(Infinity).map((v) => ({
  x: generateEpoch().formatDateToChart(v.x),
  y: v.y,
  reason: v.reason ? v.reason : '',
}));
const labels = [];// timeFormated.sort((a, b) => a.x > b.x ? 1: -1);
const startTime = Math.max.apply(null, labels.map((v) => new Date(v.x)));
const endTime = Math.min.apply(null, labels.map((v) => new Date(v.x)));
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

const options = () => ({
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
            // format: 'HH:mm',
            unit: 'minute',
            stepSize: 15,
            //unitStepSize: 15,
            displayFormats: {
              'minute': 'DD MM HH:mm',
              'hour': 'HH',
              'day': 'DD MMM HH:mm'
            },
            // unit: "day"
          },
        }
    }
});
export const LineChart = () => {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Meter Data",
          data: controlMeterDataInfo,
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
          data: appliedSetPointsTime,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
          spanGaps: true,
         //yAxisID: 'y1',
        },
        {
          label: 'Control Plan',
          data: controlPlanInfo,
          tension: 0.3,
          borderColor: 'rgba(70, 30, 125)',
          pointBackgroundColor: 'rgba(70, 30, 125)',
          backgroundColor: 'rgba(70, 30, 125, 0.3)',
          pointRadius: 6,
          spanGaps: true,
          fill: false,
        },
      ],
      labels
    };
  }, []);
  return <Line data={data} options={options()} />;
};

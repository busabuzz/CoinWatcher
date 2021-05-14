import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";

let data = {
  labels: [...Array(50).keys()],
  datasets: [
    {
      label: "",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      lineTension: 0.1,
      borderWidth: 1,
      data: [...Array(50).keys()],
    },
  ],
};

let options = {
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem) {
        return tooltipItem.yLabel;
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    xAxes: [
      {
        ticks: {
          display: false,
        },
        display: false,
      },
    ],
    yAxes: [
      {
        ticks: {
          display: false,
        },
      },
    ],
  },
  showScale: false,
};

const chartConfig = {
  type: "line",
  data: data,
  options: options,
};

const LineChart = (props) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);

      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  useEffect(() => {
    if (chartInstance !== null) {
      chartInstance.data.datasets[0].data = props.data;
      chartInstance.update();
    }
  });

  return (
    <div>
      <canvas ref={chartContainer} key={props.key} />
    </div>
  );
};

export default LineChart;

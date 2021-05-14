import React, { useState, useEffect } from "react";
import Charts from "react-apexcharts";
import ApexCharts from "apexcharts";
import "./ApexChart.css";

const ApexChart = (props) => {
  const [config, setConfig] = useState({
    options: {
      chart: {
        id: props.symbol,
        type: "line",
        background: "#fffff0",
        toolbar: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
    },
    series: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    ApexCharts.exec(config.options.chart.id, "updateSeries", [
      { data: props.data },
    ]);
  });

  return (
    <div className="apexchart">
      <Charts
        options={config.options}
        series={config.series}
        type="line"
        width="290"
      />
    </div>
  );
};

export default ApexChart;

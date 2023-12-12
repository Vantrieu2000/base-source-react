import React from 'react';
import Chart from 'react-apexcharts';

interface ApexChartProps {
  options: ApexCharts.ApexOptions;
  series: { name: string; data: number[] }[];
  type: string | any;
  width: string;
  height: string;
}

const ApexChart: React.FC<ApexChartProps> = ({
  options,
  series,
  type,
  width,
  height,
}) => {
  return (
    <Chart
      options={options}
      series={series}
      type={type}
      width={width}
      height={height}
    />
  );
};

export default ApexChart;

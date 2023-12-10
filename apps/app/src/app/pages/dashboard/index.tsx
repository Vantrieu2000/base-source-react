import React from 'react';
import ApexChart from '../../components/chart/ApexChart';

export const Dashboard = () => {
  const options = {
    chart: {
      id: 'apexchart-example',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];
  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="area"
        width={'100%'}
        height={'520px'}
      />
    </>
  );
};

export default Dashboard;

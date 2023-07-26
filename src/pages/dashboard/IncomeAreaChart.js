import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [dataMonthPrices, setDataMonthPrices] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      {
        name: 'Sales',
        data: [0, 86, 28, 115, 48, 210, 136, 0, 0, 0, 0, 0]
      }
    ]
  });

  useEffect(() => {
    async function fetchDataMonthPrices() {
      try {
        const response = await axios.get('http://localhost:8080/order/MonthPrice');
        setDataMonthPrices(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDataMonthPrices();
  }, []);

  useEffect(() => {
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: slot === 'month' ? monthLabels : dayLabels,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
    const chartDataCopy = { ...chartData };
    for (let i = 0; i < monthLabels.length; i++) {
      const targetMonth = i + 1;

      const matchingPrice = dataMonthPrices.find(([month]) => month === targetMonth);

      if (matchingPrice) {
        chartDataCopy.series[0].data[i] = matchingPrice[1];
      } else {
        chartDataCopy.series[0].data[i] = 0;
      }
    }
    setChartData(chartDataCopy);
  }, [primary, secondary, line, theme, slot, dataMonthPrices]);

  useEffect(() => {
    setChartData({
      ...chartData,
      series: [
        {
          name: 'Sales',
          data: slot === 'month' ? chartData.series[0].data : [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    });
  }, [slot]);

  return <ReactApexChart options={options} series={chartData.series} type="area" height={450} width="100%" />;
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string
};

export default IncomeAreaChart;

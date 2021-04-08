import React from "react";
import {getBarOptions} from '../../api/nifty';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = (props) => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={getBarOptions()} />
    </div>
  );
};

export default BarChart;

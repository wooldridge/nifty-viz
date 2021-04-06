import React from "react";
import {getLineOptions} from '../../api/nifty';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = (props) => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={getLineOptions()} />
    </div>
  );
};

export default LineChart;

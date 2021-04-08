import React from "react";
import {getLineOptions} from '../../api/nifty';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";


const test = async () => {
  const result = await axios.get('http://localhost:8889/api/test');
  console.log(result);
};

const LineChart = (props) => {
  test();
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={getLineOptions()} />
    </div>
  );
};

export default LineChart;

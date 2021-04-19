import React, {useState, useEffect} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";

const LineChart = () => {

  const [chartOptions, setChartOptions] = useState({
    xAxis: {
      categories: [],
    },
    yAxis: {
      type: 'logarithmic'
    },
    series: [
      { data: [] }
    ]
  });

  const test = async () => {
    try {
      const result = await axios.get('http://localhost:8889/api/nfts?limit=20&orderBy=priceChangePercent&orderDir=desc');
      if (result) {
        let valsMapped = result.data.rows.map(r => {
          return r["Results.Results.priceChangePercent"].value;
        })
        let namesMapped = result.data.rows.map(r => {
          return r["Nft.Nft.name"].value;
        })
        setChartOptions({ 
          series: [{ data: valsMapped }],
          xAxis: { categories: namesMapped }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };  

  useEffect(() => {
    test();
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default LineChart;

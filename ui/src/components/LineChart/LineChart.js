import React, {useState, useEffect} from "react";
import QueryResult from '../../models/QueryResult';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";

const LineChart = (props) => {

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'column'
    },
    title: {
      text: 'NFT Statistics'
    },
    xAxis: {
      title: {
        text: 'NFT Name'
      },
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Price Change %'
      },
      type: 'logarithmic'
    },
    series: [
      { data: [] }
    ]
  });

  const test = async () => {
    try {
      const result = await axios.get('http://localhost:8889/api/nfts?limit=20&orderBy=priceChangePercent&orderDir=desc');
      console.log("result", result);
      if (result) {
        let qr = new QueryResult(result);
        let categories = qr.getColData("Nft.Nft.name");
        let data = qr.getColData("Results.Results.priceChangePercent");
        setChartOptions({ 
          series: [{ data: data }],
          xAxis: { categories: categories }
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

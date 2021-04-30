import React, {useState, useEffect} from "react";
import QueryResult from '../../models/QueryResult';
import Highcharts, { Point } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";

const stats = [
    {
        key: "primarySales",
        label: "Primary Sales",
        adj: 1
    }, {

        key: "primaryPrice",
        label: "Primary Price",
        adj: 100
    }, {
        key: "secondarySales",
        label: "Secondary Sales",
        adj: 1
    }, {
        key: "secondaryPriceAvg",
        label: "Secondary Price Avg.",
        adj: 100
    }, {
        key: "priceChangePercent",
        label: "Price Change %",
        adj: 1
    }
];

const Scatter = (props) => {

  const [selectedStat1, setSelectedStat1] = useState(stats[0]);
  const [selectedStat2, setSelectedStat2] = useState(stats[0]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'scatter',
      height: '700'
    },
    title: {
      text: 'NFT Statistics'
    },
    xAxis: {
      title: {
        text: 'X Axis'
      }
    },
    yAxis: {
      title: {
        text: 'Y Axis'
      }
    },
    tooltip: {
        formatter: function () {
            return this.point.name + ', x:' + this.x +
                ', y:' + this.y;
        }
    },
    credits: {
        enabled: false
    },
    series: [
      { data: [] }
    ]
  });

  const updateChart = async () => {
    try {
      const result = await axios.get('http://localhost:8889/api/nfts?limit=100&groupBy=name');
      console.log("result", result);
      if (result) {
        let qr = new QueryResult(result);
        let pairs = qr.getPairData(selectedStat1.key, selectedStat1.adj, selectedStat2.key, selectedStat2.adj, "Nft.name");   
        console.log("pairs", pairs);
        setChartOptions(
            { 
                series: [{ data: pairs }],
                xAxis: {
                    title: {
                      text: selectedStat1.label
                    },
                    type: 'logarithmic'
                  },
                yAxis: {
                    title: {
                      text: selectedStat2.label
                    },
                    type: 'logarithmic'
                }
            }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };  

  useEffect(() => {
    updateChart();
  }, [selectedStat1, selectedStat2]);

  const handleStatChange1 = (event) => {
      setSelectedStat1(stats[event.target.options.selectedIndex]);
  }

  const handleStatChange2 = (event) => {
    setSelectedStat2(stats[event.target.options.selectedIndex]);
  }

  const menuStats1 = (
    <select 
        name="stats1" 
        id="stats1"
        onChange={(event) => handleStatChange1(event)}
        value={selectedStat1.key}
    >
    { stats.map((elem, index) => (
        <option value={elem.key} key={index}>{elem.label}</option>
    )) }
    </select>
  );

  const menuStats2 = (
    <select 
        name="stats2" 
        id="stats2"
        onChange={(event) => handleStatChange2(event)}
        value={selectedStat2.key}
    >
    { stats.map((elem, index) => (
        <option value={elem.key} key={index}>{elem.label}</option>
    )) }
    </select>
  );

  return (
    <div>
        <div>{menuStats1}</div>
        <div>{menuStats2}</div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default Scatter;

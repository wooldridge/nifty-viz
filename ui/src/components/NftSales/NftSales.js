import React, {useState, useEffect} from "react";
import QueryResult from '../../models/QueryResult';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";

const stats = [
    {
        key: "primarySales",
        label: "Primary Sales"
    }, {

        key: "primaryPrice",
        label: "Primary Price",
        adj: 100
    }, {
        key: "secondarySales",
        label: "Secondary Sales"
    }, {
        key: "secondaryPriceAvg",
        label: "Secondary Price Avg.",
        adj: 100
    }, {
        key: "priceChangePercent",
        label: "Price Change %"
    }
];

const cats = [
    {
        key: "Nft",
        label: "NFT Name"
    }, {

        key: "Artist",
        label: "Artist Name"
    }
];

const NftSales = (props) => {

  const [selectedStat, setSelectedStat] = useState(stats[0]);
  const [selectedCat, setSelectedCat] = useState(cats[0]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'column',
      height: '700'
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
        text: 'Stat'
      },
      type: 'logarithmic'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 40,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
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
      const result = await axios.get('http://localhost:8889/api/nfts?limit=40&orderBy=' + selectedStat.key + '&groupBy=name&orderDir=desc');
      if (result) {
        let qr = new QueryResult(result);
        let categories = qr.getColData(selectedCat.key + ".name");
        let data = qr.getColData(selectedStat.key, selectedStat.adj);
        setChartOptions({ 
          series: [{ name: selectedStat.label, data: data }],
          xAxis: { categories: categories }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };  

  useEffect(() => {
    updateChart();
  }, [selectedStat, selectedCat]);

  const handleStatChange = (event) => {
      setSelectedStat(stats[event.target.options.selectedIndex]);
  }

  const handleCatChange = (event) => {
    setSelectedCat(cats[event.target.options.selectedIndex]);
  }

  const menuStats = (
    <select 
        name="stats" 
        id="stats"
        onChange={(event) => handleStatChange(event)}
        value={selectedStat.key}
    >
    { stats.map((elem, index) => (
        <option value={elem.key} key={index}>{elem.label}</option>
    )) }
    </select>
  );

  const menuCats = (
    <select 
        name="cats" 
        id="cats"
        onChange={(event) => handleCatChange(event)}
        value={selectedCat.key}
    >
    { cats.map((elem, index) => (
        <option value={elem.key} key={index}>{elem.label}</option>
    )) }
    </select>
  );

  return (
    <div>
        <div>{menuStats}</div>
        <div>{menuCats}</div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default NftSales;

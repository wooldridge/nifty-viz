import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BarChart from './components/BarChart/BarChart';
import NftSales from './components/NftSales/NftSales';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/barchart">Bar Chart</Link>
          </li>
          <li>
            <Link to="/nftsales">NFT Sales Stats</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <div>
              <h2>Home</h2>
            </div>
          </Route>
          <Route path="/barchart">
            <BarChart />
          </Route>
          <Route path="/nftsales">
            <NftSales />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


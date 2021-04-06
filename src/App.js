import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BarChart from './components/BarChart/BarChart';
import LineChart from './components/LineChart/LineChart';

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
            <Link to="/linechart">Line Chart</Link>
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
          <Route path="/linechart">
            <LineChart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


import React from "react";
import Access from '../Access/Access'
import Dashboard from '../Dashboard/Dashboard';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/access">
            <Access />
          </Route>
         
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Redirect to="/access" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
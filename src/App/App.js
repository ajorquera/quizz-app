import React from "react";
import Access from '../Access/Access'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/access">
            <Access />
          </Route>
          <Route path="/">
            <Redirect to="/access" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
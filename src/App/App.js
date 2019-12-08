import React from "react";
import Access from '../access/Access'
import Dashboard from '../Dashboard/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <SnackbarProvider>
      <CssBaseline />
      <Router>
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
      </Router>
    </SnackbarProvider>
  );
}
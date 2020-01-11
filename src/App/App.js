import React from "react";
import Dashboard from '../Dashboard/Dashboard';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

// ref https://material-ui.com/components/css-baseline/
import CssBaseline from '@material-ui/core/CssBaseline';

import Access from '../access/Access'
import theme from '../theme';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
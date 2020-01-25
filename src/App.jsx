import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import Router from './Router';
import theme from './utils/theme';
import {useAuth} from './components/Auth';

import './utils/firebase';

// ref https://material-ui.com/components/css-baseline/
import CssBaseline from '@material-ui/core/CssBaseline';

export default () => {
  const {isAuth} = useAuth();

  if(!isAuth) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
};
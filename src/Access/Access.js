import React from 'react';
import Login from './Login';
import Register from './Register';

import Grid from '@material-ui/core/Grid';
import api from '../utils/api';

import {
    Switch,
    Redirect,
    Route,
    useHistory,
    useRouteMatch
  } from "react-router-dom";

export default () => {
    let history = useHistory();

    const match = useRouteMatch();
    const path = match.path;

    const handleError = (error) => {
        console.log(error.message);
    }

    const loginUser = ({email, password}) => {
        api.auth.login(email, password).then(() => {
            history.push('/home');
        }).catch(handleError)
    };

    const registerUser = ({email, password}) => {
        api.auth.register(email, password).then(() => {
            history.push('/access/login');
        }).catch(handleError);
    };

    return (
        <div>
            <Grid 
                container 
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid xs={12} md={6} item >
                    <Switch>
                    <Route path={`${path}/login`}>
                            <Login onSubmit={loginUser} />
                        </Route>
                        <Route path={`${path}/register`}>
                            <Register onSubmit={registerUser} />
                        </Route>
                        <Route>
                            <Redirect to={`${path}/login`} />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </div>
    );
}
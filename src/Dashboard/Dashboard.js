import React from 'react';
import Questions from '../Questions/Questions';

import Grid from '@material-ui/core/Grid';

import {
    Switch,
    Redirect,
    Route,
    useRouteMatch
  } from "react-router-dom";

export default () => {
    const match = useRouteMatch();
    const path = match.path;

    return (
        <div>
            <Grid 
                container 
            >
                <Grid xs={12} md={6} item >
                    <Switch>
                        <Route path={`${path}/questions`}>
                            <Questions />
                        </Route>
                        <Route>
                            <Redirect to={`${path}/questions`} />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </div>
    );
}
import React from 'react';


import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";

export default () => {
    const match = useRouteMatch();
    const path = match.path;
    const style = {
        Dashboard: {
            minHeight: '100vh',
            margin: '50px'
        }
    };

    return (
        <div style={style.Dashboard}>
            <Switch>
                <Route path={`${path}/admin`}>
                </Route>
                <Route>
                </Route>
            </Switch>
        </div>
    );
}
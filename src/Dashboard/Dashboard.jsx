import React from 'react';
import Projects from './pages/Projects';
  
import { Container } from '@material-ui/core';
import NewEditProject from './pages/NewEditProject';
import SingleProject from './pages/SingleProject';

import {
    Switch,
    Route,
    useRouteMatch,
    Redirect,
} from "react-router-dom";

export default () => {
    const match = useRouteMatch();
    const path = match.path;
    
    return (
        <Container>
            <Switch>
                <Route path={`${path}/projects/new`}>
                    <NewEditProject />
                </Route>
                <Route path={`${path}/projects/:id`}>
                    <SingleProject />
                </Route>
                <Route path={`${path}/projects`}>
                    <Projects />
                </Route>
                <Route>
                    <Redirect to={`${path}/projects`} />
                </Route>
            </Switch>
        </Container>
    );
}
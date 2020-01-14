import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Projects from './pages/Projects';

import {
    Switch,
    Route,
    useRouteMatch,
    Redirect,

  } from "react-router-dom";
import { Container } from '@material-ui/core';
import SingleProject from './pages/SingleProject';

const firestore = firebase.firestore();

const style = {
    Dashboard: {
       
    }
};


export default () => {
    const match = useRouteMatch();
    const path = match.path;
    
    return (
        <Container style={style.Dashboard}>
            <Switch>
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
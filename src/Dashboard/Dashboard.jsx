import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import Projects from './pages/Projects';

import {
    Switch,
    Route,
    useRouteMatch,
    Redirect,

  } from "react-router-dom";

const firestore = firebase.firestore();

const style = {
    Dashboard: {
       
    }
};


export default () => {
    const match = useRouteMatch();
    const path = match.path;
    
    



    return (
        <div style={style.Dashboard}>
            <Switch>
                <Route path={`${path}/projects`}>
                    <Projects />
                </Route>
                <Route path={`${path}/projects/:id`}>
                    {/* <SingleProject id={} /> */}
                </Route>
                <Route>
                    <Redirect to={`${path}/projects`} />
                </Route>
            </Switch>
        </div>
    );
}
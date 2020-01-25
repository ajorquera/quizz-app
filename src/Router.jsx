import React from "react";

import AccessView from './components/AccessView'

import Login from "./pages/Login";
import Register from "./pages/Register.page";
import ForgotPassword from "./pages/ForgotPassword.page.jsx";
import DashboardView from "./pages/DashboardView";
import SingleProject from "./pages/SingleProject";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Projects from "./pages/Projects";
import PickUser from "./pages/PickUser.page";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/projects/:id">
          <DashboardView>
            <SingleProject />
          </DashboardView>
        </Route>
        <Route path="/projects">
          <DashboardView>
            <Projects />
          </DashboardView>
        </Route>
        <Route path="/login">
          <AccessView>
            <Login />
          </AccessView>
        </Route>
        <Route path="/register">
          <AccessView>
            <Route path="/register/:typeUser" component={Register}/>
            <Route path="/register" exact component={PickUser}/>
          </AccessView>
        </Route>
        <Route path="/forgot-password">
          <AccessView>
            <ForgotPassword />
          </AccessView>
        </Route>
        <Route>
          <Redirect to="/projects" />
        </Route>
      </Switch>
    </Router>
  );
}
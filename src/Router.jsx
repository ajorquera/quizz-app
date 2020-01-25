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
  Route,
} from "react-router-dom";
import Projects from "./pages/Projects";
import PickUser from "./pages/PickUser.page";
import Invitation from "./pages/Invitation.page";
import {ProtectedRoute} from "./components/Auth";

const createDashboardView = (Component) => () => (<DashboardView><Component /></DashboardView>)
const createAccessView = (Component) => () => (<AccessView><Component /></AccessView>)

export default () => {

  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/projects/:id" redirect="/login" component={createDashboardView(SingleProject)} />
        <ProtectedRoute path="/projects" redirect="/login" component={createDashboardView(Projects)} />
        <ProtectedRoute path="/invitation/:projectId" redirect="/login" component={createDashboardView(Invitation)} />
          
        <Route path="/login" component={createAccessView(Login)} />
        <Route path="/register">
          <AccessView>
            <Route path="/register/:typeUser" component={Register}/>
            <Route path="/register" exact component={PickUser}/>
          </AccessView>
        </Route>
        <Route path="/forgot-password" component={createAccessView(ForgotPassword)} />
      </Switch>
    </Router>
  );
}
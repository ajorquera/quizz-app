import React, {useState} from 'react';
import Login from './Login';
import Register from './Register';

import Grid from '@material-ui/core/Grid';
import api from '../utils/api';
import ForgotPassword from './ForgotPassword';
import { useSnackbar } from 'notistack';

import {
    Switch,
    Redirect,
    Route,
    useHistory,
    useRouteMatch
  } from "react-router-dom";

export default (props) => {
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();

    const match = useRouteMatch();
    const path = match.path;

    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        enqueueSnackbar(error.message)
    }

    const request = (req) => {
        setLoading(true);
        req.finally(() => {
            setLoading(false);
        }).catch(handleError);

        return req;
    }

    const loginUser = ({email, password}) => {
        request(api.auth.login(email, password)).then(() => {
            history.push('/dashboard');
        })
    };

    const registerUser = ({email, password}) => {
        request(api.auth.register(email, password)).then(() => {
            history.push('/access/login');
        });
    };

    const forgotPassword = (email) => {
        request(api.auth.forgotPassword());
    }

    const style = {
        Access: {
            minHeight: '100vh'
        }
    };

    return (
        <Grid 
            style={style.Access}
            container 
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid xs={12} sm={8} md={4} item >
                <Switch>
                    <Route path={`${path}/login`}>
                        <Login onSubmit={loginUser} loading={loading} />
                    </Route>
                    <Route path={`${path}/register`}>
                        <Register onSubmit={registerUser} loading={loading} />
                    </Route>
                    <Route path={`${path}/forgot-password`}>
                        <ForgotPassword onSubmit={forgotPassword} loading={loading} />
                    </Route>
                    <Route>
                        <Redirect to={`${path}/login`} />
                    </Route>
                </Switch>
            </Grid>
        </Grid>
    );
}
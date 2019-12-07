import React, {useState} from 'react';
import Login from './Login';
import Register from './Register';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles({
    Access: {
        minHeight: '100vh',
        padding: '15px'
        
    },
    backgroundTop: {
        position: 'absolute',
        height: '40%',
        width: '100%',
        zIndex: '-1',
        background: 'linear-gradient(225deg, rgba(255,38,106,1) 0%, rgba(255,102,64,1) 100%);',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
    },
    card: {
        margin: '0 10px'
    }
});



export default (props) => {
    const classes = useStyles();
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

    const goToDashboard = () => history.push('/dashboard');

    const loginUser = ({email, password}) => {
        request(api.auth.login(email, password)).then(goToDashboard)
    };

    const loginWithGoogle = () => {
        request(api.auth.loginWithGoogle()).then(goToDashboard);
    }

    const login = (type, data={}) => {
        if(type === 'password') {
            loginUser(data);
        } else if(type === 'google') {
            loginWithGoogle();
        }
    }

    const registerUser = ({email, password}) => {
        request(api.auth.register(email, password)).then(() => {
            history.push('/access/login');
        });
    };

    const forgotPassword = ({email}) => {
        request(api.auth.forgotPassword(email)).then(() => {
            enqueueSnackbar('We have send an email to reset your password')
        });
    }

    return (
        <React.Fragment>
            <div className={classes.backgroundTop}></div>
            <Grid 
                className={classes.Access}
                container 
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid xs={12} sm={8} md={4} item >
                    <Switch>
                        <Route path={`${path}/login`}>
                            <Login onSubmit={login} loading={loading} />
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
        </React.Fragment>
    );
}
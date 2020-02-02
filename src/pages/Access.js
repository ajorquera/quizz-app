import React, {useState} from 'react';
import * as yup from "yup";
import firebase from 'utils/firebase';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import {authService} from '../utils/services';
import { useSnackbar } from 'notistack';


import {
    Switch,
    Redirect,
    Route,
    useHistory,
    useRouteMatch
  } from "react-router-dom";

import Form from '../components/Form';

const firestore = firebase.firestore();

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

    logo: {
        margin: '30px auto',
        display: 'block'
    }
});

yup.setLocale({
    mixed: {
       required: 'Este campo es requerido'
    },
    string: {
        email: 'Debe ser un email válido',
        // eslint-disable-next-line
        min: 'Debe tener al menos ${min} carácteres'
    }

});


const loginSchema = yup.object().shape({
    email: yup.string().email().required().meta({label: 'Email'}),
    password: yup.string().min(6).required().meta({label: 'Contraseña', typeInput: 'password'})
});

const forgoPasswordSchema = yup.object().shape({
    email: yup.string().email().required().meta({label: 'Email'})
});

const registerSchema = yup.object().shape({
    email: yup.string().email().required().meta({label: 'Email'}),
    companyName: yup.string().required().meta({label: 'Nombre de Empresa'}),
    phone: yup.string().required().meta({label: 'Teléfono'}),
    website: yup.string().required().meta({label: 'Web'}),
    country: yup.string().required().meta({label: 'País'}),
    password: yup.string().min(6).required().meta({label: 'Contraseña', typeInput: 'password'}),
    termsConditions: yup.boolean().oneOf([true]).required().meta({label: 'Acepto los Terminos y Condiciones', typeInput: 'checkbox'}),
});



const loginLink = {to: '/access/login', label:"login"}


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
        request(authService.login(email, password)).then(goToDashboard)
    };

    const registerUser = (data) => {
        const {email, password} = data;

        const promise = authService.register(email, password).then(auth => {
            const user = auth.user;

            return firestore.collection('users').doc(user.uid).set({
                phone: data.phone,
                email,
                companyName: data.companyName,
                website: data.website,
                country: data.country            
            })
        });

        request(promise).then(() => {
            history.push('/access/login');
        });
    };

    const forgotPassword = ({email}) => {
        request(authService.forgotPassword(email)).then(() => {
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
            >
                <Grid xs={12} sm={8} md={4} item >
                    <img className={classes.logo} src="/logo.png" alt="logo" />
                    <Switch>
                        <Route path={`${path}/login`}>
                            <Form buttonTitle="Login" formSchema={loginSchema} onSubmit={loginUser} loading={loading} />
                        </Route>
                        <Route path={`${path}/register`}>
                            <Form buttonTitle="Registar" links={[loginLink]} formSchema={registerSchema} onSubmit={registerUser} loading={loading} />                            
                        </Route>
                        <Route path={`${path}/forgot-password`}>
                            <Form buttonTitle="Resetear Contraseña" links={[loginLink]} formSchema={forgoPasswordSchema} onSubmit={forgotPassword} loading={loading} />                            
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
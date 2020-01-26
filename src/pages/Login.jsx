import * as yup from 'yup';
import React, {useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useSnackbar } from 'notistack';

import MakeForm from '../components/MakeForm';
import api from '../utils/services/firestore.service';

import AccessFormView from '../components/AccessFormView';

const loginSchema = [
    {name: 'email', label: 'Email', type: 'text', validation: yup.string().email().required()},
    {name: 'password', label: 'Contraseña', type: 'password', validation: yup.string().min(6).required()},
];

const loginLinks = [
    {to: '/register', label:"Registro"},
    {to: '/forgot-password', label:"Olvide mi contraseña"},
    {to: '/projects', label:"Proyectos"},
];

const DEFAULT_REDIRECT = '/dashboard';

export default () => {
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();
    let location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('redirect');

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
            history.push(redirect || DEFAULT_REDIRECT);
        })
    };

    return (
        <AccessFormView title="Login" links={loginLinks}>
            <MakeForm buttonTitle="Login" links={loginLinks} schema={loginSchema} onSubmit={loginUser} loading={loading} />
        </AccessFormView>
    )
};
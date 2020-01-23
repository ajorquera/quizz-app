import * as yup from 'yup';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';

import Form from '../components/Form';
import api from '../utils/api';

const loginSchema = yup.object().shape({
    email: yup.string().email().required().meta({label: 'Email'}),
    password: yup.string().min(6).required().meta({label: 'Contraseña', typeInput: 'password'})
});

const loginLinks = [
    {to: '/register', label:"Registro"},
    {to: '/forgot-password', label:"Olvide mi contraseña"},
    {to: '/projects', label:"Proyectos"},
];

export default () => {
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();
    const goToDashboard = () => history.push('/dashboard');
    
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
        request(api.auth.login(email, password)).then(goToDashboard)
    };

    return (
        <Form buttonTitle="Login" links={loginLinks} formSchema={loginSchema} onSubmit={loginUser} loading={loading} />
    )
};
import * as yup from 'yup';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import firebase from 'utils/firebase';

import Form from '../components/Form';
import api from '../utils/api';
const firestore = firebase.firestore();

const registerSchema = yup.object().shape({
    email: yup.string().email().required().meta({label: 'Email'}),
    companyName: yup.string().required().meta({label: 'Nombre de Empresa'}),
    phone: yup.string().required().meta({label: 'Teléfono'}),
    website: yup.string().required().meta({label: 'Web'}),
    country: yup.string().required().meta({label: 'País'}),
    password: yup.string().min(6).required().meta({label: 'Contraseña', typeInput: 'password'}),
    termsConditions: yup.boolean().oneOf([true]).required().meta({label: 'Acepto los Terminos y Condiciones', typeInput: 'checkbox'}),
});

const loginLink = {to: '/login', label:"login"}

export default () => {
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();
    
    const [loading, setLoading] = useState(false);
    const handleError = (error) => {
        enqueueSnackbar(error.message)
    }

    const registerUser = (data) => {
        const {email, password} = data;

        const promise = api.auth.register(email, password).then(auth => {
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

    const request = (req) => {
        setLoading(true);
        req.finally(() => {
            setLoading(false);
        }).catch(handleError);

        return req;
    }

    return (
        <Form buttonTitle="Registar" links={[loginLink]} formSchema={registerSchema} onSubmit={registerUser} loading={loading} />                            
    )
};
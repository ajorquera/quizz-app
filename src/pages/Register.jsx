import * as yup from 'yup';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import firebase from 'utils/firebase';

import api from '../utils/api';
import AccessFormView from '../components/AccessFormView';
import MakeForm from '../components/MakeForm/MakeForm';

const firestore = firebase.firestore();

const registerSchema = [
    {name: 'email', label: 'Label', type: 'text', validation: yup.string().email().required()},
    {name: 'companyName', label: 'Nombre de Empresa', type: 'text', validation: yup.string().required()},
    {name: 'phone', label: 'Teléfono', type: 'text', validation:  yup.string().required()},
    {name: 'website', label: 'Web', type: 'text', validation:  yup.string().required()},
    {name: 'country', label: 'País', type: 'text', validation:  yup.string().required()},
    {name: 'password', label: 'Contraseña', type: 'password', validation:  yup.string().min(6).required()},
    {name: 'termsConditions', label: 'Acepto los Terminos y Condiciones', type: 'checkbox', validation: yup.boolean().oneOf([true]).required()},
];

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
        <AccessFormView title="Registrar" links={[loginLink]}>
            <MakeForm buttonTitle="Registar" schema={registerSchema} onSubmit={registerUser} loading={loading} />                            
        </AccessFormView>
    )
};
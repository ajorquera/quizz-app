import * as yup from 'yup';
import React, {useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import firebase from 'utils/firebase';

import api from '../utils/services/firestore.service';
import AccessFormView from '../components/AccessFormView';
import MakeForm from '../components/MakeForm/MakeForm';

const firestore = firebase.firestore();

const registerCompanySchema = [
    {name: 'companyName', label: 'Nombre de Empresa', type: 'text', validation: yup.string().required()},
    {name: 'email', label: 'Email', type: 'text', validation: yup.string().email().required()},
    {name: 'phone', label: 'Teléfono', type: 'text', validation:  yup.string().required()},
    {name: 'website', label: 'Web', type: 'text', validation:  yup.string().required()},
    {name: 'country', label: 'País', type: 'text', validation:  yup.string().required()},
    {name: 'password', label: 'Contraseña', type: 'password', validation:  yup.string().min(6).required()},
    {name: 'acceptTermsConditions', label: 'Acepto los Terminos y Condiciones', type: 'checkbox', validation: yup.boolean().oneOf([true]).required()},
];

const registerExpertSchema = [
    {name: 'name', label: 'Nombre', type: 'text', validation: yup.string().required()},
    {name: 'phone', label: 'Teléfono', type: 'text', validation: yup.string().required()},
    {name: 'email', label: 'Email', type: 'text', validation:  yup.string().required()},
    {name: 'password', label: 'Contraseña', type: 'password', validation:  yup.string().required()},
    {name: 'acceptTermsConditions', label: 'Acepto los Terminos y Condiciones', type: 'checkbox', validation: yup.boolean().oneOf([true]).required()},
];

export default () => {
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();
    let params = useParams();
    const isExpert = params.typeUser === 'expert'
    
    const [loading, setLoading] = useState(false);
    const handleError = (error) => {
        enqueueSnackbar(error.message)
    }

    const registerUser = (data) => {
        
        const {email, password, ...rest} = data;

        const promise = api.auth.register(email, password).then(auth => {
            const user = auth.user;

            return firestore.collection('users').doc(user.uid).set({
                ...rest,
                type: isExpert ? 'expert' : 'company'            
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

    const title = isExpert ? 'Registrar Experto' : 'Registrar Compañia'
    return (
        <AccessFormView back title={title}>
            <MakeForm 
                buttonTitle="Registar" 
                schema={isExpert ? registerExpertSchema : registerCompanySchema} 
                onSubmit={registerUser} 
                loading={loading} 
            />                            
        </AccessFormView>
    )
};
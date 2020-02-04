import * as yup from 'yup';
import React, {useState} from 'react';
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useSnackbar } from 'notistack';

import {authService, firestoreService} from '../utils/services';
import AccessFormView from '../components/AccessFormView';
import MakeForm from '../components/MakeForm/MakeForm';

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
    let location = useLocation();
    let params = useParams();
    const isExpert = params.typeUser === 'expert';

    const queryParams = new URLSearchParams(location.search); 
    const redirect = queryParams.get('redirect');
    
    const [loading, setLoading] = useState(false);
    const handleError = (error) => {
        enqueueSnackbar(error.message);
    };

    const registerUser = (data) => {
        
        const {email, password, ...rest} = data;

        const promise = authService.register(email, password).then(auth => {
            return firestoreService.createMe({
                ...rest,
                type: isExpert ? 'expert' : 'company'            
            });
        });

        request(promise).then(() => {
            history.push(redirect || '/login');
        });
    };

    const request = (req) => {
        setLoading(true);
        req.finally(() => {
            setLoading(false);
        }).catch(handleError);

        return req;
    };

    const title = isExpert ? 'Registrar Experto' : 'Registrar Compañia';
    return (
        <AccessFormView back title={title}>
            <MakeForm 
                buttonTitle="Registar" 
                schema={isExpert ? registerExpertSchema : registerCompanySchema} 
                onSubmit={registerUser} 
                loading={loading} 
            />                            
        </AccessFormView>
    );
};
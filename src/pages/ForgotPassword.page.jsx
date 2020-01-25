import * as yup from 'yup';
import React, {useState} from 'react';
import { useSnackbar } from 'notistack';

import api from '../utils/api';
import MakeForm from '../components/MakeForm/MakeForm';
import AccessFormView from '../components/AccessFormView';

const forgoPasswordSchema = [
    {name: 'email', label: 'Email', validation: yup.string().email().required().meta({label: 'Email'})}
];

const loginLink = {to: '/login', label:"login"}

export default () => {
    const { enqueueSnackbar } = useSnackbar();
    
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

    const forgotPassword = ({email}) => {
        request(api.auth.forgotPassword(email)).then(() => {
            enqueueSnackbar('We have send an email to reset your password')
        });
    }

    return (
        <AccessFormView title="Resetear Contraseña" links={[loginLink]}>
            <MakeForm buttonTitle="Reset" schema={forgoPasswordSchema} onSubmit={forgotPassword} loading={loading} />                            
        </AccessFormView>
    )
};
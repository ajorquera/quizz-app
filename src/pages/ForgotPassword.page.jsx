import * as yup from 'yup';
import React, {useState} from 'react';
import { useSnackbar } from 'notistack';

import Form from '../components/Form';
import api from '../utils/api';

const forgoPasswordSchema = yup.object().shape({
    email: yup.string().email().required().meta({label: 'Email'})
});


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
        <Form buttonTitle="Resetear Contraseña" links={[loginLink]} formSchema={forgoPasswordSchema} onSubmit={forgotPassword} loading={loading} />                            
    )
};
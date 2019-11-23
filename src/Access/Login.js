import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useForm from 'react-hook-form';
import { HookFormInput } from "react-hook-form-input";
import * as yup from "yup";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    Link
  } from "react-router-dom";

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  });

export default (props) => {
    const style = {
        center: {
            textAlign: 'center'
        }
    }

    const { register, handleSubmit, errors, formState, setValue } = useForm({
        validationSchema: formSchema
    });

    const submit = (type) => {
        return (data) => {
            props.onSubmit(type, data);
        }
    }

    const isSubmitDisabled = Boolean(props.loading || (formState.isSubmitted && !formState.isValid));

    const showError = (propName) => Boolean(formState.isSubmitted && errors[propName]);
    const showErrorMessage = (propName) => showError(propName) && errors[propName].message;

    return (
        <div>
            <Card>
                <form onSubmit={handleSubmit(submit('password'))}>
                    <CardHeader title="Login"/>
                    <CardContent>
                        <HookFormInput
                            error={showError('email')}
                            helperText={showErrorMessage('email')}
                            fullWidth
                            label="Email"
                            mode="onChange"
                            name="email"
                            margin="normal"
                            register={register}
                            component={<TextField />}
                            setValue={setValue}
                        />
                        <HookFormInput
                            fullWidth
                            error={showError('password')}
                            helperText={showErrorMessage('password')}
                            name="password"
                            label="Password"
                            margin="normal"
                            type="password"
                            mode="onChange"
                            component={<TextField />}
                            register={register}
                            setValue={setValue}
                        />
                        <div>
                            <span>Not an user? </span>
                            <Link to="/access/register">Register</Link>
                        </div>
                        <div>
                            <span>Forgot your password? </span>
                            <Link to="/access/forgot-password">Click here</Link>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button disabled={isSubmitDisabled} variant="contained" type="submit" color="primary" size="large" fullWidth>
                            {props.loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                    </CardActions>
                    <p style={style.center}>OR</p>
                    <CardActions>
                        <Button disabled={props.loading} variant="contained" onClick={submit('google')} color="secondary" size="large" fullWidth>
                            {props.loading ? <CircularProgress size={24} color="inherit" /> : 'Login With GOOGLE'}
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </div>
    );
}
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
import { makeStyles } from '@material-ui/styles';

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  });

  const useStyles = makeStyles({
    center: {
        textAlign: 'center'
    },
    cardHeader: {
        paddingBottom: '0',
        textAlign: 'center'
    },
    cardContent: {
        paddingTop: '0'
    },
    loginButton: {
        background: 'linear-gradient(225deg, rgba(255,38,106,1) 0%, rgba(255,102,64,1) 100%);',
        color: 'white',
        margin: '0 auto',
        borderRadius: '30px',
        '&.Mui-disabled': {
            background: 'rgba(0, 0, 0, 0.26)'
        }
    },
    links: {
        textAlign: 'center',
        '& a': {
            color: '#ff7a52',
            fontWeight: 'bolder',
            textDecoration: 'none'
        }
    }
  });

export default (props) => {
    const classes = useStyles();

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
                    <CardContent className={classes.cardContent}>
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
                    </CardContent>
                    <CardActions>
                        <Button disabled={isSubmitDisabled} variant="contained" type="submit" size="large" classes={{contained: classes.loginButton}}>
                            {props.loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                    </CardActions>                    
                    <CardContent className={classes.links}>
                        <div>   
                            <Link to="/access/register">REGISTRO</Link>
                        </div>
                        <div>
                            <Link to="/access/forgot-password">OLVIDE MI CONTRASEÑA</Link>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
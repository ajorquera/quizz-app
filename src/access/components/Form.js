import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import useForm from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { HookFormInput } from "react-hook-form-input";
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import Button from "access/components/Button";
import Link from "access/components/Link";
import { FormControlLabel, Checkbox, FormHelperText, FormControl } from '@material-ui/core';

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
    links: {
        textAlign: 'center',
    },
    checkboxMessage: {
        marginTop: '-5px'
    }
});

const getFieldsFromSchema = (formSchema) => {
    return Object.entries(formSchema.describe().fields).map(([key, value]) => {
        const {typeInput, label} = value.meta;
        return {
            label,
            name: key,
            typeInput: typeInput || 'text'
        }
    });
}

const formOpts = (formSchema) => {
    return {
        mode: 'onChange',
        validationSchema: formSchema,
    }
}

const createCheckbox = ({field, classes, showError, showErrorMessage}) => {
    return (
        <FormControl>
            <FormControlLabel
                control={<Checkbox />}
                label={field.label}
            />
            {showError(field.name) && <FormHelperText classes={{root: classes.checkboxMessage}}>{showErrorMessage(field.name)}</FormHelperText>}
        </FormControl>
    );
};

const Form = (props) => {
    const classes = useStyles();

    const { register, handleSubmit, errors, formState, setValue } = useForm(formOpts(props.formSchema));

    const submit = (data) => {
        props.onSubmit(data);
    }

    const fields = getFieldsFromSchema(props.formSchema);
    const isSubmitDisabled = Boolean(props.loading || (formState.isSubmitted && !formState.isValid));
    const showError = (propName) => Boolean(errors[propName] && (formState.isSubmitted || formState.touched.find(prop => prop === propName)));
    const showErrorMessage = (propName) => showError(propName) && errors[propName].message;
    
    console.log(errors);
    console.log('isValid', formState.isValid);

    return (
        <React.Fragment>
            <Card>
                <form onSubmit={handleSubmit(submit)}>
                    <CardContent className={classes.cardContent}>
                        {fields.map((field, i) => {

                            const attributes = {
                                key: i,
                                error: showError(field.name),
                                fullWidth: true,
                                name: field.name,
                                label: field.label,
                                margin: 'normal',
                                type: field.typeInput,
                                mode: "onChange",
                                register,
                                setValue
                            };

                            if(field.typeInput === 'checkbox') {
                                attributes.component = createCheckbox({field, classes, showError, showErrorMessage});
                            } else {
                                attributes.helperText = showErrorMessage(field.name);
                                attributes.component = <TextField />;
                            }

                            return (<HookFormInput {...attributes}  />)
                        })}
                    </CardContent>
                    <CardActions>
                        <Button disabled={isSubmitDisabled} variant="contained" type="submit" size="large">
                            {props.loading ? <CircularProgress size={24} color="inherit" /> : props.buttonTitle}
                        </Button>
                    </CardActions>                    
                    <CardContent className={classes.links}>
                        {props.links.map((link, i) => (
                            <div key={i}>   
                                <Link to={link.to}>{link.label}</Link>
                            </div>
                        ))}
                    </CardContent>
                </form>
            </Card>
        </React.Fragment>
    );
}

Form.propTypes = {
    formSchema: PropTypes.object,
    buttonTitle: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.object)
}


export default Form;
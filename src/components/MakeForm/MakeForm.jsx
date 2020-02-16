import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { TextField, RadioGroup, FormControlLabel, Radio, CircularProgress, FormControl, Checkbox, FormHelperText } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import CheckboxGroup from '../CheckboxGroup';

const styles = {
  text: {
    margin: '15px 0'
  },
  textarea: {
    margin: '15px 0'
  },
  submitButton: {
    margin: '15px auto',
    display: 'flex'
  }
};

const createSchema = (fields) => {
  let schema = yup.object({});

  fields.forEach(field => {
    schema = schema.shape({
      [field.name]: field.validation || yup.mixed()
    });
  });

  return schema;
};


const MakeForm = (props)  => {
  const yupSchema = useRef(createSchema(props.schema));

  const {control, handleSubmit, errors, formState} = useForm({ validationSchema: yupSchema.current });

  const renderField = (field, index) => {
    let component;
    const fieldType = field.type || 'text';
    const errorMessage = errors[field.name] && errors[field.name].message;
    
    const commonProps = {
      key: index,
      control,
      name: field.name,
      defaultValue: field.value,
      label: field.label,
      disabled: field.disabled
    };
    
    const textProps = {
      error: !!errorMessage,
      helperText: errorMessage,
      defaultValue: field.value || '',
      fullWidth: true,
    };

    switch(fieldType) {
      case 'text':
      case 'password':
      case 'number':
        component = (
          <Controller 
            {...commonProps}
            {...textProps}
            as={TextField}
            type={fieldType}
            style={styles.text} 
          />
        );
        break;

      case 'textarea': 
        component = (
          <Controller 
            {...commonProps}
            {...textProps}
            as={TextField} 
            style={styles.textarea} 
            rows={field.rows || 4}
            multiline 
            variant="outlined"
          />
        );
        break;

      case 'radiogroup': 
        component = (
          <RadioGroup row key={index}>
            {field.options.map((item, i) => (
              <FormControlLabel
                key={i}
                control={<Controller defaultValue={field.value} {...commonProps} as={Radio} control={control} disabled={item.disabled} checked={item.value === field.value} color="primary" />}
                label={item.label}
                labelPlacement="end"    
              />
            ))}

          </RadioGroup>
        );
        break;

        case 'checkbox': 
        component = (
          <FormControl>
            <FormControlLabel
                control={<Controller {...commonProps}  defaultValue={false} value={true} as={Checkbox} />}
                label={field.label}
            />
            <FormHelperText error>{errorMessage}</FormHelperText>
        </FormControl>
        );
        break;

      case 'checkboxgroup': 
        component = (
          <CheckboxGroup options={field.options} {...commonProps} />
        );
        break;

      default: 
        component = (<div key={index}></div>);
    }

    return component;
  };

  const stopPropagation = (cb) => {
    return (e) => {
      e.stopPropagation();
      cb(e);
    };
  };
  
    const fields = props.schema;
    const isSubmitDisabled = formState.isSubmitted && !formState.isValid;
    return (
        <form onSubmit={stopPropagation(handleSubmit(props.onSubmit))}>
          {fields.map((field,i) => (
            <div key={i}>
              {renderField(field, i)}
            </div>
          ))}

          <Button 
            type="submit" 
            disabled={isSubmitDisabled}
            color="primary" 
            size="large"
            variant="contained" 
            style={styles.submitButton} 
          >
              {props.loading && (
                <CircularProgress size={24} color="inherit" /> 
              )}
              {!props.loading && (
                props.buttonTitle
              )}

            </Button>
        </form>
    );
};

MakeForm.propTypes = {
  schema: PropTypes.array,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  buttonTitle: PropTypes.string
};

MakeForm.defaultProps = {
  loading: false,
  buttonTitle: 'Submit'
};

export default MakeForm;
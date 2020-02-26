import React, {} from 'react';
import {FormControl, FormGroup, FormControlLabel, FormLabel, Checkbox} from '@material-ui/core';

const styles = {
  container: {
    display: 'block'
  }
};


export default (props) => {

  const onChange = (option, isChecked) => {
    if(typeof props.onChange === 'function') {
      props.onChange(option, isChecked);
    }
  };

  const isChecked = (option) => {
    const value = props.value;
    if(!Array.isArray(value)) return false;  
    return value.some(item => (item.value || item.label) === (option.value || option.label));
  };

  return (
    <FormControl style={{...styles.container, ...props.style}}>
      <FormGroup row={props.row}>
        {props.title && (<FormLabel component="legend">{props.title}</FormLabel>)}
        {props.options.map((option, i) => (
          <FormControlLabel
            key={i}
            disabled={props.disabled}
            control={<Checkbox 
              checked={isChecked(option)} 
              onChange={(e) => onChange(option, e.target.checked)} 
              value={option.value} 
            />}
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
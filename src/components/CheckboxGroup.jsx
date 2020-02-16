import React, {} from 'react';
import {FormControl, FormGroup, FormControlLabel, FormLabel, Checkbox} from '@material-ui/core';

const styles = {
  container: {
    
  }
};


export default (props) => {
  const onChange = (option, isChecked) => {
    if(typeof props.onChange === 'function') {
      const value = Array.isArray(props.value) ? [...props.value] : [];

      if(isChecked) {
        value.push(option.value);
      } else {
        const index = value.findIndex(str => str === option.value);
        value.splice(index, 1);
      }
      
      props.onChange(value);
    }
  };

  const isChecked = (option) => {
    return Array.isArray(props.value) && props.value.find(item => item.value === option.value);
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
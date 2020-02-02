import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const styles = {
  container: {
    
  },
  input: {
    display: 'none'
  }
};

export default (props) => {
  const inputEl = useRef();

  const onClick = () => {
    inputEl.current.click();
  };

  const onChange = (e) => {
    
    if(typeof props.onChange === 'function') {
      const file = e.target.files[0];
      props.onChange(file);
    }
  };

  return (
    <span style={styles.container}>
      <input onChange={onChange} style={styles.input} ref={inputEl} type="file" accept="image/*" capture="camera" />
      <Button
        variant="contained"
        color="primary" 
        onClick={onClick}
        startIcon={<PhotoCamera />}
      >
        Nueva Foto
      </Button>
    </span>
  );
};
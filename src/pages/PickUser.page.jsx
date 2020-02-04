import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import AccessFormView from '../components/AccessFormView';
import { Button } from '@material-ui/core';

const styles = {
  button: {
    margin: '10px 0',
    padding: '30px'
  }
};

const buttons = [
  {to: '/register/company', label: 'Compañia', color: 'primary'},
  {to: '/register/expert', label: 'Experto', color: 'secondary'}
];

export default (props) => {
  const history = useHistory();
  const location = useLocation();

  const onClick = (button) => {
    history.push({pathname: button.to, search: location.search});
  };

  return (
    <AccessFormView back title="¿Qué tipo de usuario eres?">
     {buttons.map((button, i) => (
       <Button onClick={() => onClick(button)} fullWidth color={button.color} key={i} variant="outlined" style={styles.button}>
         {button.label}
       </Button>
     ))}
    </AccessFormView>
  );
};
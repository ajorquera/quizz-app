import React from 'react';
import AccessFormView from '../components/AccessFormView';
import { Button } from '@material-ui/core';

const styles = {
  container: {
    textAlign: 'justify'
  },
  button: {
    display: 'block',
    margin: '0 auto',
    marginBottom: '30px'
  }
}

const loginLink = {to: '/login', label: 'Login'}

export default (props) => {
  return (
    <AccessFormView title="Invitación" links={[loginLink]} style={styles.container}>
      <p>Felicidades!!!</p>
      <p>Has sido invitado para formar parte del proyecto. Para continuear debes aceptar la invitacion</p>
      <Button color="primary" variant="contained" style={styles.button}>Aceptar</Button>
    </AccessFormView>
  )
};
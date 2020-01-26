import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import AccessFormView from '../components/AccessFormView';
import { Button, CircularProgress } from '@material-ui/core';
import {apiService} from '../utils/services';
import {useAuth} from '../components/Auth';

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

export default (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {projectId} = useParams();
  const {accessToken} = useAuth();

  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  const handleSuccess = () => {
    enqueueSnackbar('Ya formas parte del proyecto. Vamos a redirigirte al dashboard');

    setTimeout(() => {
      history.push('/project');
    }, 1500);    
  }

  const handleError = (error) => {
    console.error(error);
  }

  const onClick = () => {
    setLoading(true);
    console.log(apiService);
    
    apiService.invitation.create({
      projectId: projectId
    }, {headers}).then(handleSuccess).catch(handleError).finally(() => setLoading(false))
  };

  return (
    <AccessFormView title="Invitación" style={styles.container}>
      <p>Felicidades!!!</p>
      <p>Has sido invitado para formar parte de un nuevo proyecto. Para continuar debes aceptar la invitacion</p>
      <Button onClick={onClick} disabled={loading} size="large" color="primary" variant="contained" style={styles.button}>
        {loading ? <CircularProgress size={22} color="inherit" /> : 'Aceptar Invitación'}
      </Button>
    </AccessFormView>
  )
};
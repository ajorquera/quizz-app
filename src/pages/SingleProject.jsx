import React, {useState, useEffect, useCallback} from 'react';
import {useRouteMatch} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import {CircularProgress, Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {firestoreService, apiService} from '../utils/services';
import UserDialog from '../components/UserDialog';
import Grid from '@material-ui/core/Grid';
import PanelistCard from '../components/PanelistCard';
import NotificationDialog from '../components/NotificationDialog';
import UserInfoDialog from '../components/UserInfoDialog';
import {useAuth} from '../components/Auth';
import { useSnackbar } from 'notistack';

const styles = {
  panelistCard: {
    width: '200px'
  }
};

export default () => {
  const match = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const projectId = match.params.id;
  const [project, setProject] = useState({});
  const [isOpenModal, setisOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [panelist, setPanelist] = useState(null);
  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const {accessToken} = useAuth();

  const uuid = (prefix='') => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return prefix + v.toString(16);
    });
  };
  

  const handleError = (error) => {
    console.log(error);
  };

  const toggleUserModal = (force) => {
    setisOpenModal(force !== undefined ? force : !isOpenModal);
  };

  const getProject = useCallback(() => {
    setLoading(true);
    firestoreService.projects.get(projectId)
      .then(project => setProject(project))
      .catch(handleError)
      .finally(() => setLoading(false));
     
  }, [projectId]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const onSubmit = (data) => {
    const id = uuid();
    firestoreService.users.createPanelist({projectId: project.id, ...data, id})
      .then(() => {
        toggleUserModal(false);
        getProject();
      })
      .catch(handleError)
      .finally();
  };
  

  const deleteUser = (panelist) => {
    firestoreService.users.deletePanelist({...panelist, projectId: project.id}).then(() => {
      getProject();
    });
  };

  const openInvitationDialog = (userInfo) => {
    setPanelist({...userInfo, projectId: project.id});
    setIsOpenNotificationModal(true);
  };

  const showUserInfo = (userInfo) => {
    setPanelist({...userInfo, projectId: project.id});
    setIsOpenUserModal(true);
  };

  const onClickMenu = (type, panelist) => {
    switch(type) {
      case 'sendSms':
        openInvitationDialog(panelist);
        break;
      
      case 'delete': 
        deleteUser(panelist);
        break;

      case 'showInfo': 
        showUserInfo(panelist);
        break;

      default: 
    }
  };

  const sendNotification = (data) => {
    debugger
    setIsOpenNotificationModal(false);
    apiService.notifications.create({
      to: data.phone,
      text: data.message
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(res => {
      enqueueSnackbar('La invitacion ha sido enviada con exito');
    })
    .catch(res => {
      enqueueSnackbar(res.data.message);
    });
  };

  return (
    <React.Fragment>
      <br />
      <Button onClick={goBack}>
        &lt; Atrás
      </Button>
      <h1>{project.name}</h1>
      <h2>Panelistas</h2>
        <Grid container spacing={3}>
          {project.panel && project.panel.map((item, i) => (
              <Grid item key={i} >
                <PanelistCard style={styles.panelistCard} accepted={item.hasAcceptInvitation} name={item.name} onClickMenu={(type) => onClickMenu(type, item)} key={i} />
              </Grid>
          ))}
          {loading && (
            <CircularProgress />
          )}
        </Grid>

      <Fab style={{float: 'right'}} onClick={() => toggleUserModal(true)} color="primary">+</Fab>
      <UserDialog onSubmit={onSubmit} open={isOpenModal} onClose={() => toggleUserModal(false)} />
      <NotificationDialog title="Enviar invitación" onSubmit={sendNotification} open={isOpenNotificationModal} onClose={() => setIsOpenNotificationModal(false)} data={panelist} />
      <UserInfoDialog title="Información" open={isOpenUserModal} onClose={() => setIsOpenUserModal(false)} data={panelist} />
    </React.Fragment>
  );

};
import React, {useState, useEffect, useCallback} from 'react';
import {useRouteMatch} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import api from '../utils/services/firestore.service';
import UserDialog from '../components/UserDialog';
import Grid from '@material-ui/core/Grid';
import PanelistCard from '../components/PanelistCard';
import NotificationDialog from '../components/NotificationDialog';
import UserInfoDialog from '../components/UserInfoDialog';

const styles = {
  panelistCard: {
    width: '200px'
  }
};

export default () => {
  const match = useRouteMatch();
  const projectId = match.params.id;
  const [project, setProject] = useState({});
  const [isOpenModal, setisOpenModal] = useState(false);
  const [panelist, setPanelist] = useState(null);
  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  
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
    api.projects.get(projectId)
      .then(project => setProject(project))
      .catch(handleError);
     
  }, [projectId]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const onSubmit = (data) => {
    const id = uuid();
    api.users.createPanelist({projectId: project.id, ...data, id})
      .then(() => {
        toggleUserModal(false);
        getProject();
      })
      .catch(handleError)
      .finally();
  };
  

  const deleteUser = (panelist) => {
    api.users.deletePanelist({...panelist, projectId: project.id}).then(() => {
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

  return (
    <React.Fragment>
      <h1>{project.name}</h1>
      <h2>Panelistas</h2>
        <Grid container spacing={3}>
          {project.panel && project.panel.map((item, i) => (
              <Grid item key={i} >
                <PanelistCard style={styles.panelistCard} name={item.name} onClickMenu={(type) => onClickMenu(type, item)} key={i} />
              </Grid>
          ))}
        </Grid>

      <Fab style={{float: 'right'}} onClick={() => toggleUserModal(true)} color="primary">+</Fab>
      <UserDialog onSubmit={onSubmit} open={isOpenModal} onClose={() => toggleUserModal(false)} />
      <NotificationDialog title="Enviar invitación" open={isOpenNotificationModal} onClose={() => setIsOpenNotificationModal(false)} data={panelist} />
      <UserInfoDialog title="Información" open={isOpenUserModal} onClose={() => setIsOpenUserModal(false)} data={panelist} />
    </React.Fragment>
  );

};
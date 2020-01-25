import React, {useState, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import uniqueId from 'lodash.uniqueid';
import api from '../utils/api';
import UserDialog from '../components/UserDialog';
import { Container, Grid } from '@material-ui/core';
import PanelistCard from '../components/PanelistCard';
import NotificationDialog from '../components/NotificationDialog';

export default () => {
  const match = useRouteMatch();
  const projectId = match.params.id;
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({})
  const [isOpenModal, setisOpenModal] = useState(false)
  const [panelist, setPanelist] = useState(null)
  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false)
  
  const handleError = (error) => {
    console.log(error);
  };

  const toggleUserModal = (force) => {
    setisOpenModal(force !== undefined ? force : !isOpenModal);
  };

  const getProject = () => {
    setLoading(true);
    api.projects.get(projectId)
      .then(project => setProject(project))
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if(!loading && !project.name) getProject();
  })

  const onSubmit = (data) => {
    const id = uniqueId('userID-');
    setLoading(true);
    api.users.createPanelist({projectId: project.id, ...data, id})
      .then(() => {
        toggleUserModal(false);
        getProject();
      })
      .catch(handleError)
      .finally();
  }
  

  const deleteUser = (panelist) => {
    api.users.deletePanelist({...panelist, projectId: project.id}).then(() => {
      getProject();
    });
  };

  const openInvitationDialog = (userInfo) => {
    setPanelist(userInfo)
    setIsOpenNotificationModal(true);
  }

  const onClickMenu = (type, panelist) => {
    switch(type) {
      case 'sendSms':
        openInvitationDialog(panelist);
        break;
      
      case 'delete': 
        deleteUser(panelist);
        break;

      default: 
    }
  };

  return (
    <React.Fragment>
      <h1>{project.name}</h1>
      <h2>Panelistas</h2>
      <Container>
        <Grid container spacing={3}>
          {project.panel && project.panel.map((item, i) => (
              <Grid item key={i} md={3} sm={6} xs={12} >
                <PanelistCard name={item.name} onClickMenu={(type) => onClickMenu(type, item)} key={i} />
              </Grid>
          ))}
        </Grid>
      </Container>

      <Fab style={{float: 'right'}} onClick={() => toggleUserModal(true)} color="primary">+</Fab>
      <UserDialog onSubmit={onSubmit} open={isOpenModal} onClose={() => toggleUserModal(false)} />
      <NotificationDialog title="Enviar invitación" open={isOpenNotificationModal} onClose={() => setIsOpenNotificationModal(false)} data={panelist} />
    </React.Fragment>
  );

};
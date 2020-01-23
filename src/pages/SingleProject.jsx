import React, {useState, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import api from '../utils/api';
import UserDialog from '../components/UserDialog';
import { Container, Grid } from '@material-ui/core';
import PanelistCard from '../components/PanelistCard';

export default () => {
  const match = useRouteMatch();
  const projectId = match.params.id;
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({})
  const [isOpenModal, setisOpenModal] = useState(false)
  
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

    setLoading(true);
    api.users.createPanelist({projectId: project.id, ...data})
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

  const onClickMenu = (type, panelist) => {
    switch(type) {
      case 'sendSms':
        api.notifications.create({
          to: panelist.phone,
          text: 'hola'
        });
        break;
      
      case 'delete': 
        api.users.deletePanelist(panelist).then(() => getProject())
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
              <Grid item key={i} xs={3}>
                <PanelistCard name={item.name} onClickMenu={(type) => onClickMenu(type, item)} key={i} />
              </Grid>
          ))}
        </Grid>
      </Container>

      <Fab style={{float: 'right'}} onClick={() => toggleUserModal(true)} color="primary">+</Fab>
      <UserDialog onSubmit={onSubmit} open={isOpenModal} onClose={() => toggleUserModal(false)} />
    </React.Fragment>
  );

};
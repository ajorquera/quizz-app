import React, {useState, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import api from '../../utils/api';
import UserDialog from '../components/UserDialog';
import { Container, Grid, CardContent, Card, Chip } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

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
  

  return (
    <React.Fragment>
      <h1>{project.name}</h1>
      <h2>Panelistas</h2>
      <Container>
        <Grid container spacing={3}>
          {project.panel && project.panel.map((panelist, i) => (
            <Grid item key={i}>
              <Card>
                <CardContent>
                  <div style={{textAlign: 'center'}}>
                    <AccountCircle style={{fontSize: '50px'}} />
                  </div>
                  <h2>{panelist.name}</h2>
                  <Chip
                    size="small"
                    color="primary"
                    label="Progress..."
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Fab onClick={() => toggleUserModal(true)} color="primary">+</Fab>
      <UserDialog onSubmit={onSubmit} open={isOpenModal} onClose={() => toggleUserModal(false)} />
    </React.Fragment>
  );

};
import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  useHistory
} from "react-router-dom";
import { Grid } from '@material-ui/core';
import api from '../../utils/api';

export default () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const history = useHistory();
  const getProjects = () => {
    setLoading(true);

    return api.projects.get().then(projects => {
        setProjects(projects);
        setIsDataLoaded(true);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    if(!isDataLoaded && !loading) getProjects();
  });

  return (
    <React.Fragment>
      <h1 style={{textAlign: 'center'}}>Projects</h1>
      <Container style={{border: '1px solid black', paddingTop: '10px', paddingBottom: '10px'}}>
        <Grid container spacing={3}>
          {projects.map((project, i) => (
            <Grid key={i} item>
              <Card onClick={() => history.push(`/dashboard/projects/${project.id}`)}>
                <CardContent>
                  <h1>{project.name}</h1>
                  <p>{project.requirements}</p>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Fab style={{float: 'right'}} color="primary" onClick={() => history.push('/dashboard/projects/new')}>+</Fab>
    </React.Fragment>
  );
}
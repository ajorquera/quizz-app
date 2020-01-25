import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import * as yup from 'yup';

import api from '../utils/api';
import BaseDialog from '../components/BaseDialog';
import MakeForm from '../components/MakeForm/MakeForm';

const projectSchema = [
  {name: 'name', label: 'Nombre', validation: yup.string().required()},
  {name: 'companyName', label: 'Nombre Compañia', validation: yup.string().required()},
  {name: 'contactName', label: 'Nombre de Contacto', validation: yup.string().required()},
  {name: 'contactEmail', label: 'Email de Contacto', validation: yup.string().required()},
  {name: 'contactPhone', label: 'Telefono de Contacto', validation: yup.string().required()},
  {name: 'requirements', label: 'Requerimiento', type: 'textarea', validation: yup.string().required()},
  {name: 'numberParticipants', label: 'Numero participantes', type: 'number', validation: yup.number().min(1).required()},
];

export default () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false)
  const history = useHistory();
  const getProjects = () => {
    setLoading(true);

    return api.projects.get().then(projects => {
        setProjects(projects);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    getProjects();
  }, []);

  const onSubmitProject = () => {

  }

  return (
    <React.Fragment>
      <h1 style={{textAlign: 'center'}}>Projects</h1>
      <Container style={{border: '1px solid black', paddingTop: '10px', paddingBottom: '10px'}}>
        <Grid container spacing={3}>
          {projects.map((project, i) => (
            <Grid key={i} item>
              <Card onClick={() => history.push(`/projects/${project.id}`)}>
                <CardContent>
                  <h1>{project.name}</h1>
                  <p>{project.requirements}</p>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Fab style={{float: 'right'}} color="primary" onClick={() => setOpenProjectModal(true)}>+</Fab>

      <BaseDialog open={openProjectModal} title="Proyecto" onClose={() => setOpenProjectModal(false)}>
        <MakeForm buttonTitle="Guardar" schema={projectSchema} onSubmit={onSubmitProject} loading={loading} />
      </BaseDialog>
    </React.Fragment>
  );
}
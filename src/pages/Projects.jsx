import React, {useState, useEffect, useCallback} from 'react';
import {useHistory} from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import * as yup from 'yup';
import {useSnackbar} from 'notistack';

import {firestoreService} from '../utils/services';
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
  const {enqueueSnackbar} = useSnackbar();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const history = useHistory();
  
  const getProjects = useCallback(() => {
    setLoading(true);

    return firestoreService.projects.get().then(projects => {
        setProjects(projects);
    })
    .catch((error) => {
      enqueueSnackbar(error.message);
      setTimeout(() => {
        history.push('/logout');
      }, 1000);
    })
    .finally(() => setLoading(false));
  }, [history, enqueueSnackbar]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const onSubmitProject = (data) => {
    firestoreService.projects.create(data).then(() => {
      getProjects();
      setOpenProjectModal(false);

    });
  };

  return (
    <React.Fragment>
      <h1 style={{textAlign: 'center'}}>Projects</h1>
        <Grid container spacing={3}>
          {projects.map((project, i) => (
            <Grid key={i} item>
              <Card style={{cursor: 'pointer'}} onClick={() => history.push(`/projects/${project.id}`)}>
                <CardContent>
                  <h1>{project.name}</h1>
                  <p>{project.requirements}</p>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {loading && (
            <CircularProgress />
          )}
        </Grid>
      <Fab style={{float: 'right'}} color="primary" onClick={() => setOpenProjectModal(true)}>+</Fab>

      <BaseDialog open={openProjectModal} title="Proyecto" onClose={() => setOpenProjectModal(false)}>
        <MakeForm buttonTitle="Guardar" schema={projectSchema} onSubmit={onSubmitProject} loading={loading} />
      </BaseDialog>
    </React.Fragment>
  );
};
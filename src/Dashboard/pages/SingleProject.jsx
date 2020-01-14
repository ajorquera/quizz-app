import React, {useState} from 'react';
import * as yup from 'yup';
import Form from '../../access/components/Form';
import {
  useHistory
} from "react-router-dom";

import api from '../../utils/api';

const createProjectSchema = yup.object().shape({
  name: yup.string().required().meta({label: 'Nombre'}),
  companyName: yup.string().required().meta({label: 'Nombre de Empresa'}),
  contactName: yup.string().required().meta({label: 'Nombre de Contacto'}),
  contactEmail: yup.string().email().required().meta({label: 'Email de Contacto'}),
  contactPhone: yup.string().required().meta({label: 'Telefono de Contactor'}),
  requirements: yup.string().required().meta({label: 'Requerimientos',  typeInput: 'textArea'}),
  numberParticipants: yup.number().min(1).required().meta({label: 'Numero Participantes', typeInput: 'number'}),
});

export default () => {
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const handleError = (error) => {
    console.log(error);
  };
  const onSubmit = (data) => {
    setLoading(true);
    api.projects.create(data)
      .then(() => {
        history.push('/dashboard/projects')
      })
      .catch(handleError)
      .finally(() => setLoading(false));  
  };
  

  return (
    <div>
      <h4 onClick={() => history.goBack()}>&lt; Atrás</h4>
      <h1>Nuevo proyecto</h1>
      <Form buttonTitle="Crear" formSchema={createProjectSchema} onSubmit={onSubmit} loading={loading} />                            
    </div>
  );
}

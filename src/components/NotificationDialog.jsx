import React, {useEffect} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from '@material-ui/icons/Close';
import * as yup from 'yup';
import template from 'lodash/template';

import MakeForm from './MakeForm';
import { IconButton } from '@material-ui/core';

// eslint-disable-next-line
const compiledMessage = template('Hola, queremos invitarte a que formes parte de nuestro grupo de panelistas. Solo tienes que hacer click en este link: ${domain}/invitation/${projectId}')
const DOMAIN = process.env.REACT_APP_FIREBASE_HOSTING_DOMAIN;
const notificationSchema = [
  {name: 'typeNotification', value: 'sms' , label: 'Notificación', type: 'radiogroup', options: [
    {label: 'Email', value: 'email', disabled: true},
    {label: 'SMS', value: 'sms'},
    {label: 'WhatsApp', value: 'whatsapp', disabled: true},
  ], validation: yup.string().required()},
  {name: 'name', disabled: true, label: 'Nombre', type: 'text', validation: yup.string().required()},
  {name: 'phone', disabled: true, label: 'Teléfono', type: 'text', validation: yup.string().required()},
];

const styles = {
  container: {

  },
  closeButton: {
    float: 'right'
  }
};

export default (props) => {
  const schema = [...notificationSchema];

  useEffect(() => {
    const data = props.data;
    if(!data) return;

    schema.push({
      value: compiledMessage({projectId: data.projectId, domain: DOMAIN}), 
      name: 'message', 
      label: 'Mensaje', 
      type: 'textarea', 
      rows: 5, 
      validation: yup.string().required()
    });

    schema.forEach(field => {
      if(data[field.name]) {
        field.value = data[field.name];
      }
    });
  }, [props.data, schema]);

  return (
    <Dialog fullWidth maxWidth="sm" style={styles.container} {...props}>
      <DialogContent>
        <DialogTitle >
          {props.title}
          <IconButton color="primary" size="small" onClick={props.onClose} style={styles.closeButton}>
            <Close></Close>
          </IconButton>
          
        </DialogTitle>
        <DialogContent dividers>
          <MakeForm buttonTitle="Enviar" schema={schema} onSubmit={props.onSubmit} loading={props.loading} />                            
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}
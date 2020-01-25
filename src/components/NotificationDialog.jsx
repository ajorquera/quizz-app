import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from '@material-ui/icons/Close';
import * as yup from 'yup';

import MakeForm from './MakeForm';
import { IconButton } from '@material-ui/core';

const schema = [
  {name: 'typeNotification', value: 'sms' , label: 'Notificación', type: 'radiogroup', items: [
    {label: 'Email', value: 'email', disabled: true},
    {label: 'SMS', value: 'sms'},
    {label: 'WhatsApp', value: 'whatsapp', disabled: true},
  ], validation: yup.string().required()},
  {name: 'name', label: 'Nombre', type: 'text', validation: yup.string().required()},
  {name: 'phone', label: 'Teléfono', type: 'text', validation: yup.string().required()},
  {name: 'message', label: 'Mensaje', type: 'textarea', validation: yup.string().required()},
];

const styles = {
  container: {

  },
  closeButton: {
    float: 'right'
  }
};

export default (props) => {

  return (
    <Dialog fullWidth maxWidth="sm" style={styles.container} open={props.open} onClose={props.onClose}>
      <DialogContent>
        <DialogTitle >
          {props.title}
          <IconButton color="primary" size="small" onClick={props.onClose} style={styles.closeButton}>
            <Close></Close>
          </IconButton>
          
        </DialogTitle>
        <DialogContent dividers>
          <MakeForm buttonTitle="Enviar" schema={schema} onSubmit={() => props.onSubmit} loading={props.loading} />                            

        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}
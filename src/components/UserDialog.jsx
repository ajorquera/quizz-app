import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as yup from 'yup';

import MakeForm from './MakeForm';

const userSchema = [
  {name: 'name', label: 'Nombre', validation: yup.string().required()},
  {name: 'phone', label: 'Telefono', validation: yup.string().required()},
  {name: 'email', label: 'Email', validation: yup.string().required()},
];

export default (props) => {

  const closeModal = () => {
    if(typeof props.onClose === 'function') props.onClose();
  }

  return (
    <Dialog open={props.open} onClose={() => closeModal()}>
      <DialogContent>
        <DialogTitle >Panelista</DialogTitle>
        <MakeForm buttonTitle="Crear" schema={userSchema} onSubmit={props.onSubmit} loading={props.loading} />                            
      </DialogContent>
    </Dialog>
  );
}
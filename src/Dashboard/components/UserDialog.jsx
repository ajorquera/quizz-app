import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as yup from 'yup';

import Form from '../../access/components/Form';

const userSchema = yup.object().shape({
  name: yup.string().required().meta({label: 'Nombre'}),
  phone: yup.string().required().meta({label: 'Telefono'}),
  email: yup.string().required().meta({label: 'Email'}),
});

export default (props) => {

  const closeModal = () => {
    if(typeof props.onClose === 'function') props.onClose();
  }

  return (
    <Dialog open={props.open} onClose={() => closeModal()}>
      <DialogContent>
        <DialogTitle >Panelista</DialogTitle>
        <Form buttonTitle="Crear" formSchema={userSchema} onSubmit={props.onSubmit} loading={props.loading} />                            
      </DialogContent>
    </Dialog>
  );
}
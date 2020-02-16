import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from '@material-ui/icons/Close';

import { IconButton } from '@material-ui/core';

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
          {props.children}          
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}
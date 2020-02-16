import React from 'react';
import {Card, CardContent, IconButton} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import CheckboxGroup from './CheckboxGroup';

const styles = {
  container: {
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    right: 0
  }
};

export default (props) => {
  return (
    <Card style={styles.container}>
      <IconButton style={styles.closeButton} size="small" onClick={props.onClose}>
        <Close />
      </IconButton>
      <CardContent>
        <h2>{props.title}</h2>
        <CheckboxGroup disabled options={props.todos}/>
      </CardContent>
    </Card>
  );
};
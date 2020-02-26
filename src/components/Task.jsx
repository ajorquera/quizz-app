import React, {useState, useEffect, useRef} from 'react';
import {Card, CardHeader, CardContent, Button, CardActions, Grid} from '@material-ui/core';
import CheckboxGroup from './CheckboxGroup';
import BaseDialog from './dialogs/BaseDialog';

const styles = {
  container: {
    maxWidth: 300
  },
  button: {
    width: '100%'
  }
};

export default (props) => {
  const {name, description, todos} = props.task;
  const [actions, setActions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

  const takeGeo = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  };

  const takePicture = () => {
    return new Promise((resolve, reject) => {
      const id = 'inputToPick';
      let input = document.getElementById(id);
      input = input || document.createElement('input');
      input.setAttribute('accept', 'image/*');
      input.setAttribute('type', 'file');
      input.setAttribute('capture', 'camera');
      input.setAttribute('capture', 'camera');
      input.setAttribute('style', 'display: none;');

      input.onchange = (e) => {
        const file = e.target.files[0];
        input.onchange = null;
        resolve(file);
      };

      if(!document.getElementById(id)) {
        document.body.appendChild(input);
      }

      input.click();
    });
  };

  const onAction = (action, isChecked) => {
    const requirement = action.requirements[0];
    
    if(!requirement) {
      isChecked ? addAction(action) : removeAction(action);
    } else if(isChecked) {
      let promise;
      switch (requirement) {
        case 'geopoint':
          promise = takeGeo();
          break;

        case 'photos':
          promise = takePicture();
          break;
        default:
          promise = Promise.reject();
          break;
      }

      promise.then((result) => {
        action.result = result;
        addAction(action);
      });
    }
  };

  const addAction = (action) => {
    actions.push(action);
    setActions([...actions]);
  };

  const removeAction = (action) => {
    const index = actions.findIndex(todo => todo.label === action.label);
    if(index >= 0) {
      actions.splice(index, 1);
      setActions([...actions]);
    }
  };

  useEffect(() => {
    if(isModalOpen) {
      setActions([]);
    }
    
  }, [isModalOpen]);

  const finishTask = () => {
    if(props.onSubmit) props.onSubmit(props.task, actions);
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Card style={{...styles.container, ...props.style}}>
        <CardHeader title={name} />
        <CardContent>
          <CheckboxGroup disabled options={todos} />
        </CardContent>
        <CardActions>
          <Button onClick={() => setIsModalOpen(true)} style={styles.button} color="primary" variant="contained" >Realizar</Button>
        </CardActions>
      </Card>
      <BaseDialog title="Realizar Tarea" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>{name}</h1>
        <p>{description}</p>

        <h3>Acciones</h3>
        <CheckboxGroup value={actions} options={todos} onChange={onAction} />
        <Grid container justify="flex-end">
          <Button disabled={actions.length <= 0} onClick={finishTask} variant="contained" color="primary">Finalizar</Button>
        </Grid>
      </BaseDialog>
      <input ref={inputRef} accept="image/*" capture="camera"type="file" style={{display: 'none'}} />
    </React.Fragment>
  );
};
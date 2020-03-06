import React, {useState} from 'react';
import {TextField, IconButton, Grid, Button} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import BaseDialog from './BaseDialog';
import CheckboxGroup from '../CheckboxGroup';

const styles = {
  container: {
    
  },
  textField: {
    marginTop: '15px'
  }
};

const options = [
  {label: 'Geolocalizacion', value: 'geopoint'},
  {label: 'Fotos', value: 'photos'},
];

// {requirements: ['geopoint', 'photos'], label: ''}

export default (props) => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = () => {
    todos.push({
      label: '',
      requirements: []
    });

    setTodos([...todos]);
  };

  const onChangeCheckbox = (todo, option, isChecked) => {
    todo.requirements = [option.value];
    setTodos([...todos]);
  };

  const submit = () => {
    if(typeof props.onSubmit === 'function') {
      props.onSubmit({
        name,
        description,
        todos
      });

      setTodos([]);
      setName('');
      setDescription('');
    }
  };

  const onChangeLabel = (todo, value) => {
    todo.label = value;
    setTodos([...todos]);
  };

  return (
    <BaseDialog {...props} style={{...styles.container, ...props.style}}>
      <TextField value={name} onChange={e => setName(e.target.value)} style={styles.textField} fullWidth label="Nombre" />
      <TextField value={description} onChange={e => setDescription(e.target.value)} style={styles.textField} multiline rows="3" fullWidth placeholder="Descripcion" />
      <div>
        <h4>Todo <IconButton disabled={todos.length > 10} onClick={addTodo} size="small"><Add /></IconButton></h4>
        <div>
          {todos.map((todo, i) => (
            <div key={i}>
              <div><TextField value={todo.label} onChange={(e) => onChangeLabel(todo, e.target.value)} placeholder="Nombre" /></div>
              <CheckboxGroup value={todo.requirements} row options={options} onChange={(value, isChecked) => onChangeCheckbox(todo, value, isChecked)} />
            </div>
          ))}
        </div>
      </div>
      <Grid container justify="center">
        <Button onClick={submit} variant="outlined" color="primary">Submit</Button>
      </Grid>
    </BaseDialog>
  );
};
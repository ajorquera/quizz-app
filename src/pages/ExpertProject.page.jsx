import React, {useState, useEffect} from 'react';
import Assignment from '@material-ui/icons/Assignment';
import MoodBad from '@material-ui/icons/MoodBad';

import {useAuth} from '../components/Auth';
import {storageService, firestoreService} from '../utils/services';
import { CircularProgress } from '@material-ui/core';
import Task from '../components/Task';



const styles = {
  container: {
  },
  photoContainer: {
    maxWidth: '200px',
  },
  image: {
    height: '100%',
    width: '100%'
  }
};

export default (props) => {
  const {firestoreUser} = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(firestoreUser) {
      
      setLoading(false);
      
    }
  }, [firestoreUser]);

  const onSubmitTask = async (task, actions) => {
    const actionsData = await Promise.all(actions.map(async action => {
      const requirement = action.requirements[0];
      const newAction = {
          label: action.label
      };

      if(requirement) {
        newAction.requirement = requirement;  
      }

      if(requirement === 'geopoint') {
        const {latitude, longitude} = action.result.coords;
        newAction.geopoint = {latitude, longitude};
      } else if(requirement === 'photos') {
        newAction.photo = await storageService.uploadFile(`user/${firestoreUser.id}/photos`, action.result);
      }

      return newAction;
    }));

    const newTask = {
      ...task,
      todos: actionsData,
      dateTime: (new Date()).toISOString()
    };


    firestoreService.addHistory(newTask);
  };
  
  const project = firestoreUser && firestoreUser.project;
  const tasks = project && project.tasks;

  return (
    <div style={styles.container}>
        {project && (
          <React.Fragment>
            <h1>
              <span style={{marginRight: '10px'}}>{project.name}</span>
            </h1>
            
            <h3>Tareas por hacer</h3>
            <div>
              {!loading && tasks.map((task, i) => (
                <Task task={task} key={i} onSubmit={onSubmitTask} />
              ))}
            </div>
          </React.Fragment>
        )}
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          {loading && (
            <CircularProgress />
          )}
          {!loading && !project && (
            <div style={{textAlign: 'center', opacity: 0.7}}>
              <h3><Assignment style={{fontSize: '64px'}} /></h3>
              <p>Parece que todavia no tienes ningun proyecto &nbsp;</p>
              <MoodBad />
            </div>
          )}

        </div>
    </div>
  );
};
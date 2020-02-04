import React, {useState, useEffect} from 'react';
import Assignment from '@material-ui/icons/Assignment';
import MoodBad from '@material-ui/icons/MoodBad';

import {useAuth} from '../components/Auth';
import ImgInput from '../components/ImgInput';
import {storageService, firestoreService} from '../utils/services';
import { Grid, CircularProgress } from '@material-ui/core';


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
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if(firestoreUser) {
      
      setLoading(false);
      if(firestoreUser.photos) setPhotos(firestoreUser.photos);
    }
  }, [firestoreUser]);

  const uploadFile = async (file) => {
    setLoading(true);
    const path = await storageService.uploadFile(`user/${firestoreUser.id}/photos`, file);
    const newPhoto = createPhoto(path);
    
    photos.push(newPhoto);
    firestoreService.updateMe({photos});

    setPhotos([...photos]);
    setLoading(false);
  };

  const createPhoto = (path) => {
    return {
      timestamp: Date.now(),
      url: storageService.getFileUrl(path)
    };
  };
  
  const project = firestoreUser && firestoreUser.project;

  return (
    <div style={styles.container}>
        {project && (
          <React.Fragment>
            <h1>
              <span style={{marginRight: '10px'}}>{project.name}</span>
              <ImgInput onChange={uploadFile} />
            </h1>
            <Grid container justify="center" spacing={4}>
              {photos.reverse().map((photo, i) => (
                <Grid style={styles.photoContainer} item key={i}>
                  <img style={styles.image} src={photo.url} alt="ohoto" />
                </Grid>
              ))}
            </Grid>
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
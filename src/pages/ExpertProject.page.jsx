import React, {useState, useEffect} from 'react';
import {useAuth} from '../components/Auth';
import ImgInput from '../components/ImgInput';
import {storageService, firestoreService} from '../utils/services';
import { Grid, Container } from '@material-ui/core';


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
      console.log(firestoreUser);
      
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
      url: `https://storage.googleapis.com/${storageService.getBucket()}/${path}`
    };
  };

  return (
    <div style={styles.container}>
      {!loading && (
        <div>
          <h1>
            <span style={{marginRight: '10px'}}>{firestoreUser.project.name}</span>
            <ImgInput onChange={uploadFile} />
          </h1>
          <Grid container justify="center" spacing={4}>
            {photos.map((photo, i) => (
              <Grid style={styles.photoContainer} item key={i}>
                <img style={styles.image} src={photo.url} alt="ohoto" />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};
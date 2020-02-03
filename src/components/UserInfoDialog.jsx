import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import BaseDialog from './BaseDialog';
import {firestoreService} from '../utils/services';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  photoContainer: {
    maxWidth: '100px',
  },
  img: {
    width: '100%',
    height: '100%',
  }
};

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(props.data && props.data.uid) {
      setLoading(true);
      firestoreService.users.get(props.data.uid).then(setUser).finally(setLoading);
    }

    return () => {
      setUser(null);
    }
  }, [props.data]);

  return (
    <BaseDialog {...props}>
      <h2>Fotos</h2>
      <Grid justify="center" container spacing={4}>
        {user && user.photos.map((photo, i) => (
          <Grid key={i} style={styles.photoContainer} item>
            <img style={styles.img} src={photo.url} alt="user-pic" />
          </Grid>
        ))}
        {loading && (
          <CircularProgress />
        )}
      </Grid>
    </BaseDialog>
  );
};
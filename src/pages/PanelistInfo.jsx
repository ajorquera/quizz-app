import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {firestoreService} from '../utils/services';

const styles = {
  container: {
    
  }
};

export default (props) => {
  const {id} = useParams();
  const [panelist, setPanelist] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    firestoreService.users.get(id).then(data => {
      setPanelist(data);
      setLoading(true);
    });
  }, [id]);
  
  return (
    <div style={{...styles.container, ...props.style}}>
      <h1>Informacion Panelista</h1>
      {loading && (
        loading
      )}

      {panelist && (
        <h2>{panelist.name}</h2>
      )}

    </div>
  );
};
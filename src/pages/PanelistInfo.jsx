import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {firestoreService} from '../utils/services';
import { Button, Card, CardHeader, Grid, Chip, Link } from '@material-ui/core';
import format from 'date-fns/format'

import BaseDialog from '../components/dialogs/BaseDialog';

const styles = {
  container: { 
    position: 'relative'
    
  },
  photoModal: {

  },
  mapContainer: {
    height: '500px',
    position: 'relative',
    overflow: 'hidden'
  },
  map: {
    height: '100%',
    width: '100%'
  },
  date: {
    position: 'absolute',
    right: 0,
    margin: '10px'
  }
};

export default (props) => {
  const {id} = useParams();
  const [panelist, setPanelist] = useState(null);
  
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isGeoModalOpen, setIsGeoModalOpen] = useState(false);
  
  const [photo, setPhoto] = useState(null);
  const [geoLocations, setGeoLocations] = useState(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    firestoreService.users.get(id).then(data => {
      setPanelist(data);
      setLoading(true);
    });
  }, [id]);

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const openTodo = (todo) => {
    if(todo.geopoint) {
      setGeoLocations([todo.geopoint]);
      setIsGeoModalOpen(true);
    } else if(todo.photo) {
      setPhoto(todo.photo);
      setIsImgModalOpen(true);
    }
  };

  const renderTodo = (todo) => {
    let component = null;
    
    if(todo.geopoint || todo.photo) {
      component = (
        <Link onClick={() => openTodo(todo)} component="button">{todo.label}</Link>
      );
    } else {
      component = (<span>{todo.label} - Si</span>);
    }

    return component;
  };

  const showMovements = () => {
    const geoLocations = panelist.history.reduce((locations, action) => {
      const geopoints = action.todos.map(todo => todo.geopoint).filter(Boolean);

      if(geopoints.length > 0) {
        locations.push(...geopoints);
      }
      return locations;
    }, []);

    setGeoLocations(geoLocations);
    setIsGeoModalOpen(true);
  };

  const getMapProps = (locations) => {
    const props = {style: styles.map};

    if(geoLocations && geoLocations.length === 1) {
      const {latitude, longitude} = geoLocations[0];
      props.center = [latitude, longitude];
      props.zoom = 15;
    } else if(geoLocations) {
      props.bounds = geoLocations.map(loc => [loc.latitude, loc.longitude]);
    }

    return props; 
  };

  const renderDate = (isoDate) => {
    return format(new Date(isoDate), 'dd / M / yyyy');
  };
  
  return (
    <div style={{...styles.container, ...props.style}}>
      <div>
        <Button onClick={goBack}>
          &lt; Atrás
        </Button>
      </div>
      <h1>Informacion Panelista</h1>
      {loading && (
        loading
      )}

      {panelist && (
        <div>
          <h2>{panelist.name}</h2>
          <div>
            <Button onClick={() => showMovements()} variant="outlined" color="primary">
              Ver Movimientos
            </Button>
          </div>
          <h3>Tareas</h3>
          <Grid container spacing={3}>
            {panelist.history.map((action, i) => (
              <Grid key={i} xs={12} md={12}  item>
                <Card>
                  <Chip size="small" style={styles.date} label={renderDate(action.dateTime)} />
                  <CardHeader title={action.name} />
                  <div>
                    <ul>
                      {action.todos.map((todo, i) => (
                        <li key={i}>
                          {renderTodo(todo)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Grid>
            ))}

          </Grid>

        </div>
      )}
      <BaseDialog open={isGeoModalOpen} onClose={() => setIsGeoModalOpen(false)} title="Localización">
        <div style={styles.mapContainer} >
          <Map  {...getMapProps()}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoLocations && geoLocations.map(({latitude, longitude}, i) => (
              <Marker key={i} position={[latitude, longitude]}></Marker>
            ))}
          </Map>
        </div>
      </BaseDialog>

      <BaseDialog style={styles.photoModal} open={isImgModalOpen} title="Foto" onClose={() => setIsImgModalOpen(false)}>
        <img style={{width: '100%', height: '100%'}} src={photo} alt="pic" />
      </BaseDialog>
    </div>
  );
};
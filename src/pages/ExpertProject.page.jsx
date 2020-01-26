import React, {useState, useEffect} from 'react';
import {useAuth} from '../components/Auth';
import { Container } from '@material-ui/core';


const styles = {
  container: {
    color: 'black'
  }
}

export default (props) => {
  const {firestoreUser} = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(firestoreUser) {
      console.log(firestoreUser);
      
      setLoading(false)
    }
  }, [firestoreUser])

  return (
    <Container style={styles.container}>
      {!loading && (
        <h1>{firestoreUser.project.name}</h1>
      )}
    </Container>
  )
};
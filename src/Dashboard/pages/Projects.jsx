import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import firebase from '../../utils/firebase';

const firestore = firebase.firestore();



export default () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getProjects = () => {
    setLoading(true);
    const projects = [];

    return firestore.collection('projects').get().then(querySnap => {
        querySnap.forEach(snapDoc => {
            const project = {id: snapDoc.id, ...snapDoc.data()};
            projects.push(project);
        });

        setProjects(projects);
        setIsDataLoaded(true);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    //if(!isDataLoaded) getProjects();
  });

  return (
    <Container>
      <h1 style={{textAlign: 'center'}}>Projects</h1>
      <Container style={{border: '1px solid black'}}>
        {projects.map(project => (
          <Card></Card>
        ))}
      </Container>
    </Container>
  );
}
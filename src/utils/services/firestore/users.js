import firebase from '../../firebase';
import projects from './projects';
import {extractFirestoreData} from './helpers';

const firestore = firebase.firestore();

export default {
  createPanelist: async (projectId, data) => {
    let project = await projects.get(projectId);
    project.newPanelist(data);
    const panel = project.toJson().panel;
    
    await firestore.collection('projects').doc(project.id).update({panel});
    return project.panel;
},
deletePanelist: async (id, panelist) => {
    let project = await projects.get(id);
    const isDeleted = project.deletePanelist(panelist);
    const panel = project.panel;

    if(isDeleted) {
        await firestore.collection('projects').doc(project.id).update({panel});
    }
},
get: (id) => {
    return firestore.collection('users').doc(id).get().then(extractFirestoreData);
},
};

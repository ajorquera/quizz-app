import firebase from '../../firebase';
import projects from './projects';
import {extractFirestoreData} from './helpers';

const firestore = firebase.firestore();


export default {
  createPanelist: async (data) => {
    let project = await projects.get(data.projectId);
    const panel = project.panel || [];
    panel.push({...data});

    await firestore.collection('projects').doc(data.projectId).update({panel});

    return project.panel;
},
deletePanelist: async (panelist) => {
    const {projectId, id} = panelist;
    let project = await projects.get(projectId);
    const panel = project.panel;
    const panelistIndex = panel.findIndex(item => item.id === id);

    if(panelistIndex >= 0) {
        panel.splice(panelistIndex , 1);
        await firestore.collection('projects').doc(projectId).update({panel});
    }
},
get: (id) => {
    return firestore.collection('users').doc(id).get().then(extractFirestoreData);
},
};

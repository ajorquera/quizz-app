import firebase from 'utils/firebase';
import Project from '../classes/Project';

const firestore = firebase.firestore();
const auth = firebase.auth();

const firestoreService = {};

const extractFirestoreData = async function extractFirestoreData(docRef) {
    const id = docRef.id;
    const data = docRef.data();
    return {id, ...data};
};

firestoreService.users = {
    createPanelist: async (data) => {
        let project = await firestoreService.projects.get(data.projectId);
        const panel = project.panel || [];
        panel.push({...data});

        await firestore.collection('projects').doc(data.projectId).update({panel});

        return project.panel;
    },
    deletePanelist: async (panelist) => {
        const {projectId, id} = panelist;
        let project = await firestoreService.projects.get(projectId);
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

firestoreService.projects = {
    create: (data) => {
        const {id, ...newData} = data;

        return firestore.collection('projects').add(newData);
    },
    get: async (id) => {
        if(id) {
            return firestore.collection('projects').doc(id).get().then(extractFirestoreData);
        } else {
            return firestore.collection('projects').get().then(querySnap => {
                const projects = [];
                
                querySnap.forEach(snapDoc => {
                    const project = {id: snapDoc.id, ...snapDoc.data()};
                    projects.push(new Project(project));
                });
                return projects;
            }); 
        }

    }
};

firestoreService.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
firestoreService.updateMe = (data) => {
    return firestore.collection('users').doc(auth.currentUser.uid).update(data);
};


firestoreService.createMe = (data) => {
    const auth = firebase.auth();
    return firestore.collection('users').doc(auth.currentUser.uid).set(data);
};


export default firestoreService;
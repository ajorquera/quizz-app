import firebase from 'utils/firebase';
import Project from './classes/Project';
import { Endpoint } from './classes/RestApi';
const url = process.env.REACT_APP_FIREBASE_API_DOMAIN;

const firestore = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const api = {};

const extractFirestoreData = async function extractFirestoreData(docRef) {
    const id = docRef.id;
    const data = docRef.data();
    return {id, ...data};
}

api.users = {
    getMyInfo: async () => {
        const userAuth = auth.currentUser;
        const userDb = await firestore.collection('users').doc(userAuth.uid).get();

        return  {...userAuth, ...userDb};
    },
    update: (data) => {
        
    },
    createPanelist: async (data) => {
        let project = await api.projects.get(data.projectId);

        project.panel.push({...data});

        await firestore.collection('projects').doc(data.projectId).update({
            panel: project.panel
        });

        return project.panel;
    },
    deletePanelist: async (panelist) => {
        const {projectId, id} = panelist;
        let project = await api.projects.get(projectId);
        const panel = project.panel;
        const panelistIndex = panel.findIndex(item => item.id === id);

        if(panelistIndex >= 0) {
            panel.splice(panelistIndex , 1);
            await firestore.collection('projects').doc(projectId).update({panel});
        }
    }
};
api.auth = {
    login: (email, password) => auth.signInWithEmailAndPassword(email, password),
    loginWithGoogle: () => auth.signInWithPopup(googleProvider),
    register: (email, password) => auth.createUserWithEmailAndPassword(email, password),
    forgotPassword: email => auth.sendPasswordResetEmail(email)
};
api.projects = {
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

api.notifications = new Endpoint(`/notifications`, {baseUrl: url});

export default api;
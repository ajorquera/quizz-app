import firebase from 'utils/firebase';
const firestore = firebase.firestore();

const DOMAIN = 'https://us-central1-quiz-app-b0a23.cloudfunctions.net';
const path = '/api';
const baseURL = `${DOMAIN}${path}`;

const auth = firebase.auth();

const toJson = (res) => {
    return res.json();
}

const googleProvider = new firebase.auth.GoogleAuthProvider();

const onStateAuthChange = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            resolve(user);
        })
    })
}

const headers = {
    'Content-Type': 'application/json'
};

export default {
    users: {
        get: () => fetch(`${baseURL}/users`),
        update: (data) => {
           
        }
    },
    auth: {
        login: (email, password) => auth.signInWithEmailAndPassword(email, password),
        loginWithGoogle: () => auth.signInWithPopup(googleProvider),
        register: (email, password) => auth.createUserWithEmailAndPassword(email, password),
        forgotPassword: email => auth.sendPasswordResetEmail(email)
    },
    projects: {
        create: (data) => firestore.collection('projects').add(data)
    }
}
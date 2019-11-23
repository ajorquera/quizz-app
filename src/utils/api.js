import firebase from './firebase';

const DOMAIN = 'https://us-central1-quiz-app-b0a23.cloudfunctions.net';
const path = '/api';
const baseURL = `${DOMAIN}${path}`;

const auth = firebase.auth();

const toJson = (res) => {
    return res.json();
}

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
        getMyInfo: async () => {
            await onStateAuthChange();
            return fetch(`${baseURL}/users/${auth.currentUser.uid}`).then(toJson);
        },
        update: (data) => {
            const userId = auth.currentUser.uid;
            
            return fetch(`${baseURL}/users/${userId}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers
            })
        }
        
    },
    auth: {
        login: (email, password) => auth.signInWithEmailAndPassword(email, password),
        register: (email, password) => auth.createUserWithEmailAndPassword(email, password),
        forgotPassword: email => auth.sendPasswordResetEmail(email)
    },
    questions: {
        get: () => fetch(`${baseURL}/questions`).then(toJson),
        update: (id, data) => {
            return fetch(`${baseURL}/questions/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers
            })
        }
    }
}
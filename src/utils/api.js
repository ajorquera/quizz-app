import firebase from './firebase';

const DOMAIN = process.env.REACT_APP_FIREBASE_API_DOMAIN || '';
const baseURL = `http://${DOMAIN}`


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
        loginWithGoogle: () => auth.signInWithPopup(googleProvider),
        register: (email, password) => auth.createUserWithEmailAndPassword(email, password)
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
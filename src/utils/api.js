import firebase from './firebase';

const DOMAIN = process.env.REACT_APP_FIREBASE_API_DOMAIN || '';
const baseURL = `http://${DOMAIN}`


const auth = firebase.auth();

const toJson = (res) => {
    return res.json();
}

export default {
    users: {
        get: () => fetch(`${baseURL}/users`),
        update: (data) => {
            const userId = auth.currentUser.uid;

            return fetch(`${baseURL}/users/${userId}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
    },
    auth: {
        login: (email, password) => auth.signInWithEmailAndPassword(email, password),
        register: (email, password) => auth.createUserWithEmailAndPassword(email, password)
    },
    questions: {
        get: () => fetch(`${baseURL}/questions`).then(toJson)
    }
}
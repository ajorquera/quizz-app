import firebase from './firebase';

const DOMAIN = '';
const path = '/api';
const baseURL = `https://${DOMAIN}${path}`


const auth = firebase.auth();

export default {
    users: {
        get: fetch(`${baseURL}/user`),
    },
    auth: {
        login: (email, password) => auth.signInWithEmailAndPassword(email, password),
        register: (email, password) => auth.createUserWithEmailAndPassword(email, password)
    }
}
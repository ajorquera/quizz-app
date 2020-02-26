import firebase from '../../firebase';
import {extractFirestoreData} from './helpers';

const firestore = firebase.firestore();

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const updateMe = (data) => {
  const auth = firebase.auth();
  return firestore.collection('users').doc(auth.currentUser.uid).update(data);
};


export const createMe = (data) => {
    const auth = firebase.auth();
    return firestore.collection('users').doc(auth.currentUser.uid).set(data);
};

export const addHistory = async (item) => {
  const auth = firebase.auth();
  const data = await firestore.collection('users').doc(auth.currentUser.uid).get().then(extractFirestoreData);
  const history = data.history || [];
  history.push(item);
  return updateMe({history});
};

export {default as projects} from './projects';
export {default as users} from './users';
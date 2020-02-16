import firebase from '../../firebase';

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

export {default as projects} from './projects';
export {default as users} from './users';
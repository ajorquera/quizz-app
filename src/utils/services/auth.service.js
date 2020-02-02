import firebase from 'utils/firebase';

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default {
  login: (email, password) => auth.signInWithEmailAndPassword(email, password),
  loginWithGoogle: () => auth.signInWithPopup(googleProvider),
  register: (email, password) => auth.createUserWithEmailAndPassword(email, password),
  forgotPassword: email => auth.sendPasswordResetEmail(email)
};
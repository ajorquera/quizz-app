const firebase = require('../utils/firebase');
const firestore = firebase.firestore();

module.exports = (user) => {
    return firestore.collection('users').doc(user.uid).set({
        email: user.email,
    });
}
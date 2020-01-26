const firebase = require('../utils/firebase');
const firestore = firebase.firestore();

module.exports = async (user) => {
    return firestore.collection('users').doc(user.uid).set({
        type: 'user',
    }, {merge: true});
};
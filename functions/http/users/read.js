const firebase = require('../../utils/firebase');

const firestore = firebase.firestore();

module.exports = async (req, res, next) => {
    let querySnapshot;
    try {
        querySnapshot = await firestore.collection('users').get();
    } catch(e) {
        return next({code: 'FIREBASE_ERROR', data: e});
    }

    const users = [];

    querySnapshot.forEach(snap => {
        users.push({id: snap.id, ...snap.data()});
    })

    res.json(users);
};
const firebase = require('../../utils/firebase');

const firestore = firebase.firestore();

module.exports = async (req, res, next) => {
    let querySnapshot;
    try {
        querySnapshot = await firestore.collection('questions').get();
    } catch(e) {
        return next({code: 'FIREBASE_ERROR', data: e});
    }

    const questions = [];

    querySnapshot.forEach(snap => {
        questions.push({id: snap.id, ...snap.data()});
    })

    res.json(questions);
};
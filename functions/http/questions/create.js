const firebase = require('../../utils/firebase');

const firestore = firebase.firestore();

module.exports = async (req, res, next) => {
    const data = req.body;

    const question = {
        text: data.text,
        id: null,
        answers: data.answers
    };

    let ref;

    try {
        ref = await firestore.collection('questions').add(question);
    } catch(e) {
        return next({code: 'FIREBASE_ERROR', data: e});
    }

    question.id = snap.id;

    return res.json(question);
};
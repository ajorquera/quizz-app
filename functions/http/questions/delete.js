const firebase = require('../../utils/firebase');

const firestore = firebase.firestore();
const NO_CONTENT = 204;

module.exports = async (req, res, next) => {
    const questionId = req.params.id;

    try {
        await firestore.collection('questions').doc(questionId).delete();
    } catch(e) {
        return next({code: 'FIREBASE_ERROR', data: e});
    }

    return res.status(NO_CONTENT).end();
};
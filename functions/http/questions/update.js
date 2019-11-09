const firebase = require('../../utils/firebase');

const firestore = firebase.firestore();
const NO_CONTENT = 204;

module.exports = async (req, res, next) => {
    const data = req.body;

    try {
        await firestore.collection('questions').doc(data.id).add(data);
    } catch(e) {
        return next({code: 'FIREBASE_ERROR', data: e});
    }

    return res.status(NO_CONTENT).end();
};
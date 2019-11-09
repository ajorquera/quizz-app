const firebase = require('../../utils/firebase');

const firestore = firebase.firestore();

const NO_CONTENT = 204;

module.exports = async (req, res, next) => {
    const userId = req.params.id;
    const data = req.body;

    try {
        await firestore.collection('users').doc(userId).update(data);
    } catch(e) {
        return next({code: 'FIREBASE_ERROR', data: e});
    }

    return res.status(NO_CONTENT).end();
};
const firebase = require('../../utils/firebase');

const firestore = firebase.firestore();
const auth = firebase.auth();
const NO_CONTENT = 204;

module.exports = async (req, res, next) => {
    const userId = req.params.id;

    try {
        await firestore.collection('users').doc(userId).delete();
        await auth.deleteUser(userId);
    } catch(e) {
        return next({code: 'FIREBASE_ERROR', data: e});
    }

    return res.status(NO_CONTENT).end();
};
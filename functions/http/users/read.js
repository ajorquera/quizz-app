const firebase = require('../../utils/firebase');

const firestore = firebase.firestore();

module.exports = async (req, res, next) => {
    let querySnapshot;
    const userId = req.params.id;
    try {
        querySnapshot = userId ? await firestore.collection('users').doc(userId).get() : await firestore.collection('users').get();
    } catch(e) {
        return next({code: 'FIREBASE_ERROR', data: e});
    }
    
    let response;
    if(userId && querySnapshot.exists) {
        response = querySnapshot.data();
        response.id = querySnapshot.id;
    } else if(querySnapshot.forEach) {
        response = [];
    
        querySnapshot.forEach(snap => {
            response.push({id: snap.id, ...snap.data()});
        })
    }

    res.json(response);
};
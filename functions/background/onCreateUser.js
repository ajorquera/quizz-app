const firebase = require('../utils/firebase');

module.exports = (user) => {
    return firebase.collection('users').doc(user.uid).set({
        isAdmin: false,
        email: user.email,
        answeredQuestions: []
    });
}
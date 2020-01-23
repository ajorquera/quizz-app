const firebase = require('../utils/firebase')
const auth = firebase.auth();
const firestore = firebase.firestore();

module.exports = (change, context) => {
  const userID = context.params.userId;


}
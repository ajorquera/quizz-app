const functions    = require('firebase-functions');
const app          = require('./http/app');
const onCreateUser = require('./background/onCreateUser');

exports.app =  functions.https.onRequest(app);
exports.onCreateUser = functions.auth.user().onCreate(onCreateUser);
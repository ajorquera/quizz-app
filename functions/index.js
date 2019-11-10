const functions    = require('firebase-functions');
const api          = require('./http/api');
const onCreateUser = require('./background/onCreateUser');

exports.api =  functions.https.onRequest(api);
exports.onCreateUser = functions.auth.user().onCreate(onCreateUser);
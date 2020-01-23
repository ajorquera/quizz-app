const functions        = require('firebase-functions');
const onCreateAuthUser = require('./background/onCreateAuthUser');
const app              = require('./http/app');

exports.onCreateAuthUser = functions.auth.user().onCreate(onCreateAuthUser);
exports.api = functions.https.onRequest(app);
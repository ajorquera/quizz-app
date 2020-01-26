const functions        = require('firebase-functions');
const app              = require('./http/app');

exports.api = functions.https.onRequest(app);
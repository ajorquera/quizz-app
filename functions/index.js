const functions = require('firebase-functions');
const api = require('./http/api');

exports.api =  functions.https.onRequest(api);
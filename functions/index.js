const functions    = require('firebase-functions');
const onCreateUser = require('./background/onCreateUser');

exports.onCreateUser = functions.auth.user().onCreate(onCreateUser);
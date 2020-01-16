const functions        = require('firebase-functions');
const onCreateAuthUser = require('./background/onCreateAuthUser');

exports.onCreateAuthUser = functions.auth.user().onCreate(onCreateAuthUser);
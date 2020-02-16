const functions        = require('firebase-functions');
const app              = require('./http/app');
const onProjectUpdate  = require('./background/onProjectUpdate');

exports.api = functions.https.onRequest(app);
exports.onUpdateProject = functions.firestore.document('projects/{id}').onUpdate(onProjectUpdate);
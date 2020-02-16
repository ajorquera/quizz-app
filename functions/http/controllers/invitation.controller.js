const Joi = require('@hapi/joi');
const {NO_CONTENT} = require('http-status-codes');
const firebase = require('../../utils/firebase');

const schema = Joi.object({
  projectId: Joi.string().required()
});

const firestore = firebase.firestore();

module.exports = async (req, res, next) => {
  const user = req.firebaseUser;
  const body = req.body || {};
  const {error} = schema.validate(body);

  if(error) return next({code: 'VALIDATION_ERROR', data: error});

  const userSnap = await firestore.collection('users').doc(req.firebaseUser.uid).get();
  const data = userSnap.data();
  
  if(!userSnap.exists || data.type !== 'expert') return next({code: 'UNATHORIZED'});
  
  const projectSnap = await firestore.collection('projects').doc(body.projectId).get();
  const projectData = projectSnap.data();

  if(!projectSnap.exists) return next({code: 'NOT_FOUND', data: 'Project doesn\'t exist'});

  const panelist = projectData.panel.find(panelist => panelist.email === user.email);
  
  if(!panelist) return next({code: 'NOT_FOUND', data: {message: 'User not found in panel'}});

  panelist.uid = user.uid;
  panelist.hasAcceptInvitation = true;
  await projectSnap.ref.update({panel: projectData.panel});
  await userSnap.ref.set({
    project: {
      name: projectData.name,
      id: body.projectId,
      tasks: projectData.tasks
    }
  }, {merge: true});

  return res.status(NO_CONTENT).end();
};
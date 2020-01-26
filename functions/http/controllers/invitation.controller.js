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
  
  if(data.type === 'user') {
    const projectSnap = await firestore.collection('projects').doc(body.projectId).get();
    const projectData = projectSnap.data();

    const panelist = projectData.panel.findIndex(panelist => panelist.email === user.email);
    
    if(panelist) {
      panelist.uid = user.uid;
      panelist.hasAcceptInvitation = true;
      await projectSnap.update({panel: projectData.panel});
      await userSnap.set({
        project: {
          name: projectData.name
        }
      }, {merge: true});

    } else {
      return next({code: 'NOT_FOUND', data: {message: 'User not found in panel'}});
    }

  } else {
    return next({code: 'UNATHORIZED'});
  }

  return res.status(NO_CONTENT).end();
};
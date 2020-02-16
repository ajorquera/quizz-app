const firebase = require('../utils/firebase')
const firestore = firebase.firestore();

const objToStr = (obj) => JSON.stringify(obj);

const isDeepEqual = (a, b) => {
  return objToStr(a) === objToStr(b);
}

const hasUpdated = (name, old, newData) => {
  return !isDeepEqual(old[name], newData[name]);
}

module.exports = (change, context) => {
  const newData = change.after.data();
  const old = change.before.data();

  if(hasUpdated('tasks', old, newData)) {
    const {panel, tasks} = newData;

    const panelists = panel.filter(panelist => panelist.hasAcceptInvitation);
  
    if(panelists.length) {
      const batch = firestore.batch();
  
      panelists.forEach(panelist => {
        const ref = firestore.collection('users').doc(panelist.uid);
        batch.update(ref, {['project.tasks']: tasks});
      });

      return batch.commit();
    }
  }

  return null;
};
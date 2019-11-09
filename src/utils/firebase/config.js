const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

export default {
    apiKey,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`
};
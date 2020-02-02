import firebase from 'firebase/app';
import config from './config';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;
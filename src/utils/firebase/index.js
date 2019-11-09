import * as firebase from 'firebase/app';
import config from './config';

import 'firebase/firestore';
import 'firebase/auth';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;
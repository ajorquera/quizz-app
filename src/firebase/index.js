import * as firebase from 'firebase/app';
import config from './config';

import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(config);

export default firebase;
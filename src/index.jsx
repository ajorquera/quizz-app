import React from 'react';
import ReactDOM from 'react-dom';
import register from './utils/registerServiceWorker';
import App from './App';

import './utils/firebase';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
register();
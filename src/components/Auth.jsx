import React from 'react';
import {useHistory} from 'react-router-dom';
import firebase from '../utils/firebase';
const auth = firebase.auth();

export default ({children, ...props}) => {
  const history = useHistory();


  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user && typeof props.onAuthorized === 'function') {
        props.onAuthorized(history);
      } else if(typeof props.onUnathorized === 'function') {
        props.onUnathorized(history);
      }
    });

    return () => unsubscribe(); 

  }, []);

  return (
    <props.component {...props}>
      {children}
    </props.component>
  );
};
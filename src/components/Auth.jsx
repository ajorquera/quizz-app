import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import firebase from '../utils/firebase'

const auth = firebase.auth();

export const createGuardRoute = redirect => Component => {
  class Guard extends React.Component {
    render() {
      const {match, history} = this.props;
      const {isAuth, user} = this.state;

      if(isAuth && !user) {
        history.push({pathname: redirect, search: `?redirect=${match.path}`});
      } else {
        return (
          Route
        );
      }
    }
  }

  return Guard;
}

export const ProtectedRoute = ({component, redirect, ...props}) => {
  const {isAuth, user} = useAuth();
  const Component = component;
  return (
    <Route
      {...props}
      render={(props) => {
        const {match} = props;
        if(isAuth && !user) {
          return (<Redirect to={{
            pathname: redirect,
            search: `?redirect=${match.url}`
          }} />)
        } else if(isAuth) {
          return (
            <Component {...props} />
          )
        }
      }}
    />
  );
}

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsAuth(true);
    });

    return unsubscribe;
  }, []);

  return {user, isAuth};
};
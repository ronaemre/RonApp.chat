import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase from './firebase';
import store from './store/store'
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';



const rrfProps = {
  firebase,
  config: {
    userProfile: 'users'
  },
  dispatch: store.dispatch
}

const Root = () => {

  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //login olmuş
        history.push("/")
      } else {
        //login olmamış
        history.push("/signup")
      }
    })
  }, [])

  return (
    <Switch>
      <PrivateRoute exact path="/">
        <App />
      </PrivateRoute>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Switch>

  );
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Root />
      </Router >
    </ReactReduxFirebaseProvider>
  </Provider>
  , document.getElementById('root'));

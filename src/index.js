import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



const Root = () => {
  return (

    <Router>
      <Switch>


        <Route exact path="/" component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router >

  )
}


ReactDOM.render(<Root />, document.getElementById('root'));

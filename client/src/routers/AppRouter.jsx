import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Header } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import LandingPage from '../components/LandingPage.jsx';
import LoginPage from '../components/LoginPage.jsx';
import SignupPage from '../components/SignupPage.jsx';
import Dashboard from '../components/Dashboard.jsx';

const AppRouter =() => (
  <BrowserRouter>
    <div>
    <Header as='h1' inverted color ='blue' textAlign='center'>Know-how</Header>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/signup' component={SignupPage} />
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
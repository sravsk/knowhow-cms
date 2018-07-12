import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Header } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import LandingPage from '../components/LandingPage.jsx';
import NavBar from '../components/NavBar.jsx';
import LoginPage from '../components/LoginPage.jsx';
import SignupPage from '../components/SignupPage.jsx';
import Home from '../components/home.jsx';

const AppRouter =() => (
  <BrowserRouter>
    <Container>
    <NavBar />
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/signup' component={SignupPage} />
      <Route exact path='/home' component={Home} />
    </Switch>
    </Container>
  </BrowserRouter>
);

export default AppRouter;
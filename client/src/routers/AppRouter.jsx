import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Header } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from '../components/LandingPage.jsx';

const AppRouter =() => (
  <BrowserRouter>
    <div>
    <Header as='h1' textAlign='center'>Know-how</Header>
    <Route exact path='/' component={LandingPage} />
    </div>
  </BrowserRouter>
);

export default AppRouter;
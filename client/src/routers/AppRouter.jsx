import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Header } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import LandingPage from '../components/LandingPage.jsx';
import NavBar from '../components/NavBar.jsx';
import LoginPage from '../components/LoginPage.jsx';
import SignupPage from '../components/SignupPage.jsx';
import Home from '../components/home.jsx';
import devAdminPage from '../components/devAdminPage.jsx';
import CategoriesPage from '../components/CategoriesPage.jsx';
import CompanyArticles from '../components/CompanyArticles.jsx';
import ArticlesPage from '../components/ArticlesPage.jsx';
import ArticleContent from '../components/ArticleContent.jsx';

const AppRouter =() => (
  <BrowserRouter>
    <Container>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={SignupPage} />
        <Route exact path='/categories' component={CategoriesPage} />
        <Route exact path='/articles' component={ArticlesPage} />
        <Route exact path='/companyarticles' component={CompanyArticles} />
        <Route exact path='/:companyId/categories/:categoryId/articles' component={ArticlesPage} />
        <Route exact path='/articles/:articleId' component={ArticleContent} />
        <Route exact path='/devadminpage' component={devAdminPage} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default AppRouter;


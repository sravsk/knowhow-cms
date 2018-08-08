import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Header } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import LandingPage from '../components/LandingPage.jsx';
import NavBar from '../components/NavBar.jsx';
import LoginPage from '../components/LoginPage.jsx';
import SignupPage from '../components/SignupPage.jsx';
import Home from '../components/Home.jsx';
import devAdminPage from '../components/devAdminPage.jsx';
import CategoriesPage from '../components/CategoriesPage.jsx';
import CompanyArticles from '../components/CompanyArticles.jsx';
import ArticlesPage from '../components/ArticlesPage.jsx';
import Editor from '../components/Editor.jsx';
import ArticleContent from '../components/ArticleContent.jsx';
import NewArticle from '../components/NewArticle.jsx';
import NewCategory from '../components/NewCategory.jsx';
import InviteUser from '../components/InviteUser.jsx';
import SignupWithCode from '../components/SignupWithCode.jsx';
import ForgotPassword from '../components/ForgotPassword.jsx';
import ResetPassword from '../components/ResetPassword.jsx';
import Settings from '../components/Settings.jsx';


class AppRouter extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      companyId: '',
      company: '',
      role: ''
    }
    this.updateInfo = this.updateInfo.bind(this)
    console.log(this.props)
  }

  updateInfo(obj) {
    this.setState({
      user: obj.user,
      companyId: obj.companyId,
      company: obj.company,
      role: obj.role
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Container>
          <NavBar
            user={this.state.user}
            company={this.state.company}
            updateUserInfo={this.updateInfo}
          />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/articles' component={ArticlesPage} />
            <Route exact path='/editor' component={Editor} />
            <Route exact path='/addcategory' component={NewCategory} />
            <Route exact path='/:companyId/categories/:categoryId/articles' component={ArticlesPage} />
            <Route exact path='/articles/:articleId' component={ArticleContent} />
            <Route exact path='/devadminpage' component={devAdminPage} />
            <Route exact path='/inviteuser' component={InviteUser} />
            <Route exact path='/signupwithcode' component={SignupWithCode} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route exact path='/resetpassword' component={ResetPassword} />

            <Route exact path='/settings' render={(props) => {
              return (
                <Settings
                  role={this.state.role}
                />
              )
            }} />

            <Route exact path='/home' render={(props) => {return (
              <Home
                user={this.state.user}
                companyId={this.state.companyId}
                company={this.state.company}
                role={this.state.role}
              />
            )}} />

            <Route exact path='/login' render={(props) => {return (
              <LoginPage
                updateInfo={this.updateInfo}
              />
            )}} />

            <Route exact path='/signup' render={(props) => {return (
              <SignupPage
                updateInfo={this.updateInfo}
              />
            )}} />

            <Route exact path='/categories' render={(props) => {return (
              <CategoriesPage
                user={this.state.user}
                companyId={this.state.companyId}
                company={this.state.company}
                role={this.state.role}
              />
            )}} />

            <Route exact path='/companyarticles' render={(props) => {return (
              <CompanyArticles
                user={this.state.user}
                companyId={this.state.companyId}
                company={this.state.company}
                role={this.state.role}
              />
            )}} />

            <Route exact path='/addarticle' render={(props) => {return (
              <NewArticle
                user={this.state.user}
                companyId={this.state.companyId}
                company={this.state.company}
                role={this.state.role}
              />
            )}} />

          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default AppRouter;

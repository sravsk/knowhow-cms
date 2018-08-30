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
import socketIOClient from 'socket.io-client';
import axios from 'axios';

class AppRouter extends React.Component{
  constructor(props) {
    super(props)
    this.socket = null;
    this.state = {
      user: '',
      companyId: '',
      company: '',
      role: '',
      blinkyChatButton : 'chat-button',
      messages : [],
      uid : localStorage.getItem('uid') ? localStorage.getItem('uid') : this.generateUID(),
      appid : localStorage.getItem('appid')
    }
    this.updateInfo = this.updateInfo.bind(this)
  }

  // generate a random string, use it to set uid key on local storage
  // can identify users accessing chat app from different browser tabs
  generateUID(){
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem('uid', text);
    return text;
  }

  updateInfo(obj) {
    this.setState({
      user: obj.user,
      companyId: obj.hashedCompanyId,
      company: obj.company,
      role: obj.role
    })
  }

  componentWillMount() {
      axios.get('/user')
      .then(result => {
        if (result.data !== '') {
          this.updateInfo(result.data)
          this.initializeChat()
        }
      })
  }

  initializeChat(){
    //expose a standalone build of socket io client by socket.io server
    this.socket = socketIOClient('http://ec2-54-215-238-252.us-west-1.compute.amazonaws.com:5000/', {
      query : 'user='+this.state.user+'&uid='+this.state.uid+'&appid='+localStorage.getItem('appid')
    });
    var substring = "appid="
    var params = this.socket.query.split(substring).pop();
    this.socket.emit('join', params, (err) => {
      if(err) {
        alert(err)
      }
    });
    this.socket.on('message', (message) => {
      this.setState({
          blinkyChatButton : 'blinky-chat-button',
          messages : this.state.messages.concat([message])
      })
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
            <Route exact path='/editor' component={Editor} />
            <Route exact path='/addcategory' component={NewCategory} />
            <Route exact path='/articles/:articleId' component={ArticleContent} />
            <Route exact path='/devadminpage' component={devAdminPage} />
            <Route exact path='/inviteuser' component={InviteUser} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route exact path='/resetpassword' component={ResetPassword} />

            {this.state.companyId && <Route exact path='/home' render={(props) => {return (
              <Home
                user={this.state.user}
                companyId={this.state.companyId}
                company={this.state.company}
                role={this.state.role}
                blinkyChatButton = {this.state.blinkyChatButton}
                messages={this.state.messages}
                socket = {this.socket}
                appid={this.state.companyId}

              />
            )}} />}

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

            <Route exact path='/signupwithcode' render={(props) => {return (
              <SignupWithCode
                updateInfo={this.updateInfo}
              />
            )}} />

            <Route exact path='/articles' render={(props) => {return (
              <ArticlesPage
                user={this.state.user}
                companyId={this.state.companyId}
                company={this.state.company}
                role={this.state.role}
              />
            )}} />

            {this.state.companyId && <Route exact path='/:companyId/categories/:categoryId/articles' render={(props) => {return (
              <ArticlesPage
                user={this.state.user}
                companyId={this.state.companyId}
                company={this.state.company}
                role={this.state.role}
              />
            )}} />}

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

import React from 'react';
import Editor from './Editor.jsx';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Header, Segment, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import CompanyArticles from './CompanyArticles.jsx';
import CategoriesPage from './CategoriesPage.jsx';
import Chat from './Chat.jsx';
import Settings from './Settings.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArticles: true,
      showCategories: false,
      company: '',
      role: '',
      showChat : false,
      showSettings: false,
    }
  }

  showCategories() {
    this.setState({
      showCategories: true,
      showArticles: false,
      showChat : false,
      showSettings: false
    });
  }

  showArticles() {
    this.setState({
      showCategories: false,
      showArticles: true,
      showChat : false,
      showSettings: false
    });
  }

  showChat() {
    this.setState({
      showCategories: false,
      showArticles: false,
      showChat : true,
      showSettings: false
    });
  }

  showSettings() {
    this.setState({
      showCategories: false,
      showArticles: false,
      showChat : false,
      showSettings: true
    });
  }

  render () {
    if (this.state.showArticles) {
      var info = <CompanyArticles
        currentPage={this.state.currentPage}
        user={this.props.user}
        companyId={this.props.companyId}
        company={this.props.company}
        role={this.props.role}
      />
    } else if (this.state.showCategories) {
      var info = <CategoriesPage
        user={this.props.user}
        companyId={this.props.companyId}
        company={this.props.company}
        role={this.props.role}
      />
    } else if(this.state.showChat) {
      var info = <Chat
        user={this.props.user}
        companyId={this.props.companyId}
        company={this.props.company}
        role={this.props.role}
        messages={this.props.messages}
        socket={this.props.socket}
        blinkyChatButton={this.props.blinkyChatButton}
        uid = {this.props.uid}
        />
    } else if (this.state.showSettings) {
      var info = <Settings
      role={this.props.role}
      companyId={this.props.companyId}
      company={this.props.company}
      />
    }
    return (
      <Segment raised style={{ 'marginTop': '8vh' }}>
        <Header as='h1' color='blue' style={{ 'margin': '0 0 -4vh 0', 'paddingLeft': '2vh' }}>{this.props.company}</Header>
        <Button floated='right'><Link to='/addcategory' className='button-text-color'>Add New Category</Link></Button>
        <Button floated='right' ><Link to='/addarticle' className='button-text-color'>Add New Article</Link></Button>
        <br /><br />
        <Grid celled>
          <Grid.Column width={3} className='background'>
            <br/><br/>
            <div style={{position: 'fixed', margin: '2em'}}>
              <Button fluid style={{ 'color': '#2185d0'}} onClick={this.showArticles.bind(this)}>Articles</Button><br/>
              <Button fluid style={{ 'color': '#2185d0'}} onClick={this.showCategories.bind(this)}>Categories</Button><br/>
              <Button fluid style={{ 'color': '#2185d0'}} className={this.props.blinkyChatButton} onClick={this.showChat.bind(this)}>Chat</Button><br/>
              <Button fluid style={{ 'color': '#2185d0'}} onClick={this.showSettings.bind(this)}>Settings</Button>
            </div>
          </Grid.Column>
          <Grid.Column width={13}>
            {info}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}



export default Home;

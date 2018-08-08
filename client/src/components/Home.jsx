import React from 'react';
import Editor from './Editor.jsx';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Header, Segment } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';
import CompanyArticles from './CompanyArticles.jsx';
import CategoriesPage from './CategoriesPage.jsx';
import axios from 'axios';
import Chat from './Chat.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArticles: true,
      showCategories: false,
      company: '',
      role: '',
      showChat : false
    }
  }

  showCategories() {
    this.setState({
      showCategories: true,
      showArticles: false,
      showChat : false
    });
  }

  showArticles() {
    this.setState({
      showCategories: false,
      showArticles: true,
      showChat : false
    });
  }

  showChat() {
    this.setState({
      showCategories: false,
      showArticles: false,
      showChat : true
    });
  }

  render () {
    if (this.state.showArticles) {
      var info = <CompanyArticles />
    } else if (this.state.showCategories) {
      var info = <CategoriesPage />
    } else if(this.state.showChat) {
      var info = <Chat/>
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
              <Button fluid style={{ 'color': '#2185d0'}} onClick={this.showChat.bind(this)}>Chat</Button><br/>
              <Button fluid style={{ 'color': '#2185d0'}}><Link to='/settings'>Settings</Link></Button>
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

import React from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { Container, Menu, Header, Button } from 'semantic-ui-react';
import axios from 'axios';

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: '',
      onLandingPage: false
    }
  }

  componentDidMount() {
    // check if a user is logged in
    // if yes, get name of user
    axios.get('/user')
      .then(result => {
        let user = result.data;
        if (user) {
          this.setState({
            isLoggedIn: true,
            user: user
          });
        }
      })
  }

  handleLogout() {
    axios.get('/logout')
      .then(result => {
        if (result.data === 'logged out') {
          this.setState({
            isLoggedIn: false,
            onLandingPage: true
          })
        }
      });
  }

  render () {
    // Redirect to LandingPage after use is logged out
    if (this.state.onLandingPage) {
      return (
        <Redirect to='/' />
      );
    }
    // show login and signup buttons if user is not logged in
    // show logout button if user is logged in
    if (!this.state.isLoggedIn) {
      return (
        <Container className='navbar'>
        <Menu fixed='top' inverted>
          <Menu.Item>
            <Header as='h1' color ='blue' textAlign='center'>Know-how</Header>
          </Menu.Item>
          <Menu.Item position='right'>
            <Button floated='right'><NavLink to='/signup'>Signup</NavLink></Button>
          </Menu.Item>
          <Menu.Item>
            <Button floated='right'><NavLink to='/login'>Login</NavLink></Button>
          </Menu.Item>
        </Menu>
        </Container>
      );
    } else {
      return (
        <Container className='navbar'>
          <Menu fixed='top' inverted>
            <Menu.Item>
              <Header as='h1' color ='blue' textAlign='center'>Know-how</Header>
            </Menu.Item>
            <Menu.Item position='right'>
              Hello {this.state.user}
            </Menu.Item>
            <Menu.Item position='right'>
              <Button floated='right' onClick={this.handleLogout.bind(this)}>Log out</Button>
            </Menu.Item>
          </Menu>
        </Container>
      );
    }
  }

}

export default NavBar;

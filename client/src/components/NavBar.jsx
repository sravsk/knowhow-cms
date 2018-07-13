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
    // if yes, get userInfo (name and companyId of user)
    axios.get('/user')
      .then(result => {
        if (result.data) {
          let name = result.data.name;
          let companyId = result.data.companyId;
          // console.log(result, name, companyId)
          if (name) {
            this.setState({
              isLoggedIn: true,
              user: name
            });
          }
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
            <Button><NavLink to='/signup'>Signup</NavLink></Button>
          </Menu.Item>
          <Menu.Item>
            <Button><NavLink to='/login'>Login</NavLink></Button>
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
              <Button><Link style={{ color: 'black' }} to='/home'>Go Home</Link></Button>
            </Menu.Item>
            <Menu.Item>
              <Button style={{ color: 'black' }} onClick={this.handleLogout.bind(this)}>Log out</Button>
            </Menu.Item>
          </Menu>
        </Container>
      );
    }
  }

}

export default NavBar;

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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
          this.setState({
            isLoggedIn: true,
            user: name
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
    // Redirect to LandingPage after user is logged out
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
            <Link to='/home'><Header as='h1' color ='blue'>Know-how</Header></Link>
          </Menu.Item>
          <Menu.Item position='right'>
           <Button primary><Link className='nav-button' to='/signup'>Signup</Link></Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary><Link className='nav-button' to='/login'>Login</Link></Button>
          </Menu.Item>
        </Menu>
        </Container>
      );
    } else {
      return (
        <Container className='navbar'>
          <Menu fixed='top' inverted>
            <Menu.Item>
              <Link to='/home'><Header as='h1' color ='blue'>Know-how</Header></Link>
            </Menu.Item>
            <Menu.Item position='right'>
              <p>Hello {this.state.user}</p>
            </Menu.Item>
            <Menu.Item>
              <Button primary onClick={this.handleLogout.bind(this)}>Log out</Button>
            </Menu.Item>
          </Menu>
        </Container>
      );
    }
  }

}

export default NavBar;

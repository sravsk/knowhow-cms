import React from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

class SignupExistingCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      code: '',
      password: '',
      passwordMatch: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signupUser() {
    if (this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.passwordMatch === '' || this.state.code === '') {
      alert('Name, Email, Code, Password fields cannot be empty. Enter new values.');
    }
    else if (this.state.password !== this.state.passwordMatch) {
      alert('Passwords do not match. Try again.');
    } else {
      // all fields have values and passwords match
      var data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        code: this.state.code
      };
      // TODO - send a POST request with user info and sign up user
    }
  }

  render() {
    if (this.state.onHome) {
      return (
        <Redirect to='/home' />
      )
    }
    return (
      <div className='signup-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.signup-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Create an account by entering your invitation code
            </Header>
            <Form size='large' onSubmit={this.signupUser.bind(this)}>
              <Segment raised>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Enter Password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
                {/*<p className='password-info'>Password must be between 8-100 characters long.</p>*/}
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Reenter Password'
                  type='password'
                  name='passwordMatch'
                  value={this.state.passwordMatch}
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                  fluid
                  placeholder='Enter code from invitation email'
                  type='code'
                  name='code'
                  value={this.state.code}
                  onChange={this.handleChange.bind(this)}
                />
              </Segment>
              <Form.Button content='Sign up with your code' primary fluid size='large' />
            </Form>
            <Message>
              Already a member?&nbsp; <Link to='/login'><Button primary basic size='small'>Log In</Button></Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignupExistingCompany;
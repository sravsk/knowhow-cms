import React from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordMatch: '',
      company: '',
      domain: '',
      onDashboardPage: false
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signupUser() {
    console.log('in signup')
    if (this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.passwordMatch === '' || this.state.company === '' || this.state.company === '') {
      alert('Name, Email, Password, Company and Domain fields cannot be empty. Enter new values.');
    }
    else if (this.state.password !== this.state.passwordMatch) {
      alert('Passwords do not match. Try again.');
    } else {
      // all fields have values and passwords match
      var data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.email,
        company: this.state.company,
        domain: this.state.domain
      };
      axios.post('/signupuser', data)
        .then(result => {
          console.log(result.data)
          if (result.data === 'user created') {
            this.setState({
              onDashboardPage: true
            });
          } else if (result.data === 'duplicate email') {
            alert('User with given email already exists.');
          } else {
            alert('An admin user already exists for this company. Contact admin to sign up.');
          }
        })
    }
  }

  render() {
    if (this.state.onDashboardPage) {
      return (
        <Redirect to='/dashboard' />
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
          style={{ height: '90%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Create an account
            </Header>
            <Form size='large' onSubmit={this.signupUser.bind(this)}>
              <Segment.Group>
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
                    placeholder='Password'
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange.bind(this)}
                  />
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
                </Segment>
                <Segment raised>
                  <Form.Input
                    fluid
                    icon='building'
                    iconPosition='left'
                    placeholder='Company Name'
                    name='company'
                    value={this.state.company}
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Input
                    fluid
                    icon='building'
                    iconPosition='left'
                    placeholder='Domain'
                    name='domain'
                    value={this.state.domain}
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Button content='Sign up' primary fluid size='large' />
                </Segment>
              </Segment.Group>
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

export default SignupPage;
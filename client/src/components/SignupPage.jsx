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
      onHome: false
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signupUser() {
    if (this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.passwordMatch === '' || this.state.company === '' || this.state.company === '') {
      alert('Name, Email, Password, Company and Domain fields cannot be empty. Enter new values.');
    }
    else if (this.state.password !== this.state.passwordMatch) {
      alert('Passwords do not match. Try again.');
    } else {
      var data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        company: this.state.company,
        domain: this.state.domain
      };
      axios.post('/signupuser', data)
        .then(result => {
          if (!result.data.signup) {
            if (result.data.message === 'user exists') {
              alert('An admin user already exists for this company. Contact admin to sign up.');
            } else if (result.data.message === 'duplicate email') {
              alert('User with given email already exists.');
            } else {
              let errors = result.data.errors;
              var messages = errors.map((error) => {
                return error.msg;
              });
              alert(messages);
            }
          } else {
            this.props.updateInfo(result.data.userInfo);
            this.setState({
              onHome: true
            });
          }
        })
    }
  }

  render() {
    if (this.state.onHome) {
      return (
        <Redirect to='/home' />
      )
    }
    return (
      <div className='signup-form' style={{ 'marginTop': '12vh' }}>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.signup-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '75%' }}
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
                    placeholder='Enter Name'
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Input
                    fluid
                    icon='mail'
                    iconPosition='left'
                    placeholder='Enter Email'
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
                </Segment>
                <Segment raised>
                  <Form.Input
                    fluid
                    icon='building'
                    iconPosition='left'
                    placeholder='Enter Company Name'
                    name='company'
                    value={this.state.company}
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Input
                    fluid
                    icon='building'
                    iconPosition='left'
                    placeholder='Enter Domain'
                    name='domain'
                    value={this.state.domain}
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Button content='Sign up' primary fluid size='large' />
                </Segment>
              </Segment.Group>
            </Form>
            <Message>
              <Header as='h3'>Signing up with a code?</Header><br/><Link to='/signupwithcode'><Button primary fluid size='large'>Go to Sign up with Code</Button></Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignupPage;
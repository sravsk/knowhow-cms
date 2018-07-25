import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleForgotPassword() {
    if (this.state.email === '') {
      alert('Email field cannot be empty. Enter your email');
    } else {
      axios.post(`forgotpwd?email=${this.state.email}`)
        .then(result => {
          alert('An email with password reset instructions has been sent to your email address, if it exists on our system.');
        })
    }
  }

  render () {
    return (
      <div className='forgot-password'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.forgot-password {
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
              Forgot your password?
            </Header>
            <Header as='h5'>Please enter the email address you registered with and we'll send you instructions on how to reset your password.</Header>
            <Form size='large' onSubmit={this.handleForgotPassword.bind(this)}>
              <Segment raised>
                <Form.Input
                  name='email'
                  value={this.state.email}
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='Enter Email'
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Button content='Send verification email'color='blue' fluid size='large' />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ForgotPassword;
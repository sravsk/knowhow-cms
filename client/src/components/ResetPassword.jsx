import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      password: '',
      passwordMatch: '',
      onLoginPage: false
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  resetPassword() {
    if (this.state.password !== this.state.passwordMatch) {
      alert('Passwords do not match. Try again');
    } else {
      let data = {
        code: this.state.code,
        password: this.state.password
      };
      axios.post('/resetpwd', data)
      .then(result => {
        if (result.data === 'password changed') {
          alert('Password changed successfully. Login!');
          this.setState({
            onLoginPage: true
          })
        } else {
          alert('Invalid code. Check your email or try resetting password again.');
        }
      })
    }
  }

  render () {
    if (this.state.onLoginPage) {
      return (
        <Redirect to='/login' />
      );
    }
    return (
      <div className='reset-password'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.reset-password {
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
                Choose your new password
              </Header>
              <Form size='large' onSubmit={this.resetPassword.bind(this)}>
                <Segment raised>
                  <Form.Input
                    name='code'
                    value={this.state.code}
                    fluid
                    icon='certificate'
                    iconPosition='left'
                    placeholder='Enter Code'
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Input
                    name='password'
                    value={this.state.password}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Enter New Password'
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Input
                    name='passwordMatch'
                    value={this.state.passwordMatch}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Reenter Password'
                    type='password'
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Button content='Reset' color='blue' fluid size='large' />
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default ResetPassword;
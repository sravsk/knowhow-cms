import React from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

class SignupExistingCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      code: '',
      password: '',
      passwordMatch: ''
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signupUser() {
    if (this.state.name === '' || this.state.password === '' || this.state.passwordMatch === '' || this.state.code === '') {
      alert('Name, Code, Password fields cannot be empty. Enter new values.');
    }
    else if (this.state.password !== this.state.passwordMatch) {
      alert('Passwords do not match. Try again.');
    } else if (this.state.password.length < 8 || this.state.password.length > 100) {
      alert('Password length must be between 8 and 100 characters');
    } else {
      // all fields have values and passwords match
      axios.post(`/signupuserwithcode?name=${this.state.name}&password=${this.state.password}&code=${this.state.code}`)
      .then(result => {
        if (result.data.signup) {
          // result.data has properties name, companyId and role
          alert('You have been signed up');
          this.setState({
            onHome: true
          });
        } else {
          alert('Invalid code');
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
      <div className='signup-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.signup-form {
            height: 95%;
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
                  icon='certificate'
                  iconPosition='left'
                  placeholder='Enter code from invitation email'
                  type='code'
                  name='code'
                  value={this.state.code}
                  onChange={this.handleChange.bind(this)}
                />
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
              <Form.Button content='Sign up with your code' primary fluid size='large' />
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignupExistingCompany;
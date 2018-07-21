import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class InviteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  inviteUser() {
    console.log('in invite user', this.state)
    if (this.state.email === '') {
      alert('Email cannot be empty. Enter new value.');
    } else {
      let data = {
        email: this.state.email
      };
      axios.post('/inviteuser', data)
      .then(result => {
        if (result.data) {
          alert('Invitation has been sent');
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
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
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
              Invite an admin user for your company
            </Header>
            <Form size='large' onSubmit={this.inviteUser.bind(this)}>
              <Segment raised>
                <Form.Input
                  name='email'
                  value={this.state.email}
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Button content='Send Invite' color='blue' fluid size='large'></Form.Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};

export default InviteUser;
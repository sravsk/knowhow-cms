import React from 'react';
import { Button, Form, Grid, Header, Segment, Dropdown } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class InviteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      roles: [{key: 'admin', text: 'admin', value: 'admin'}, {key: 'general', text: 'general', value: 'general'}],
      role: 'general'
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  inviteUser() {
    if (this.state.email === '') {
      alert('Email cannot be empty. Enter new value.');
    } else {
      let data = {
        email: this.state.email,
        role: this.state.role
      };
      axios.post('/inviteuser', data)
      .then(result => {
        if (result.data) {
          alert('Invitation has been sent');
          this.setState({
            email: ''
          })
        }
      })
    }
  }

  handleSelectRole(e, { value }) {
    this.setState({
      role: value
    });
  }

  render() {
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
              Invite a user for your company
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
                <Dropdown
                  placeholder='Select Role'
                  fluid
                  selection
                  options={this.state.roles}
                  onChange={this.handleSelectRole.bind(this)}
                />
                <br/>
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
import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      company: '',
      domain: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
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
            <Form size='large'>
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
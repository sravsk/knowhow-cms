import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
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
          style={{ height: '90%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Login to your account
            </Header>
            <Form
            size='large'>
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
                <Form.Input
                  name='password'
                  value={this.state.password}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Button content='Login' color='blue' fluid size='large' />
              </Segment>
            </Form>
            <Message>
              New to us?&nbsp; <Link to='/signup'><Button primary basic size='small'>Sign up</Button></Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};

export default LoginPage;

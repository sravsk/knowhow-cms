import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Message, Header } from 'semantic-ui-react';

class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Segment raised style={{ 'height': '100vh' }}>
        <Header as='h2' textAlign='center'>
          Settings
        </Header>
        { (this.props.role === 'admin') && <div style={{display: 'flex', justifyContent: 'center', marginTop: '5vh'}}><Button><Link to='/inviteuser'>Invite a new user for your company</Link></Button></div>}<br/>
        <Message><h4>Installation Instructions</h4><p>TODO - fill this in</p></Message>
      </Segment>);
  }
}

export default Settings;
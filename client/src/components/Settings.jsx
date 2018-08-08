import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    return (
      <Segment raised style={{ 'height': '100vh' }}>
        { (this.props.role === 'admin') && <div style={{display: 'flex', justifyContent: 'center', marginTop: '5vh'}}><Button><Link to='/inviteuser'>Invite a new user for your company</Link></Button></div>}
      </Segment>);
  }
}

export default Settings;
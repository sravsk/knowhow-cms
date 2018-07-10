import React from 'react';

import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Button floated='right'><Link to='/signup'>Signup</Link></Button>
        <Button floated='right'><Link to='/login'>Login</Link></Button>
        <p>Knowledge base app description..... </p>
      </Container>
    );
  }
}

export default LandingPage;
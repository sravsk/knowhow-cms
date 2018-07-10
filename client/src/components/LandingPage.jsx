import React from 'react';

import { Button, Container } from 'semantic-ui-react';

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Button primary floated='right'>Login</Button>
        <Button primary floated='right'>Signup</Button>
        <p>Knowledge base app description..... </p>
      </Container>
    );
  }
}

export default LandingPage;
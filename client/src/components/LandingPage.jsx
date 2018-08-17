import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container className='content-main'>
        <Header as='h3' style={{ 'textAlign': 'center', 'marginTop': '15vh', 'paddingBottom': '-100vh' }} color='blue'>A self-serve online library of information about your product or service.</Header>
      </Container>
    );
  }
}

export default LandingPage;

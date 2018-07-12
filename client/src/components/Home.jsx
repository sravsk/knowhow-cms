import React from 'react';
import { Container, Grid, Button, Header } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';

const Home = () => {
  return (
    <Container>
    <NavBar />
    <Header as='h2'>Home</Header>
    <Grid container celled style={{height: '80vh'}} >
    <Grid.Column width={4}>
      <Grid.Row>
        <Header as='h4'>Categories</Header>
      </Grid.Row>
      <Grid.Row>
        <Header as='h4'>Articles</Header>
      </Grid.Row>
    </Grid.Column>
    <Grid.Column width={12}>
      Corresponding info....
    </Grid.Column>
  </Grid>
    </Container>
  );
}

export default Home;
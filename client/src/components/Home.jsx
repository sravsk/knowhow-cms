import React from 'react';

import Editor from './Editor.jsx';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Header, Segment } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';

const Home = () => {
  return (
    <Container>
      <NavBar />
      <Button floated='right'><Link to='/editor'>Add New Article</Link></Button>
      <Button floated='right'>Add New Category</Button>
      <br /><br />
      <Grid container celled style={{height: '80vh'}} >
        <Grid.Column width={4}>
          <Segment>
            <Header as='h4'><Link to='/companyarticles'>Articles</Link></Header>
          </Segment>
          <Segment>
            <Header as='h4'><Link to='/categories'>Categories</Link></Header>
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          Corresponding info....
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Home;

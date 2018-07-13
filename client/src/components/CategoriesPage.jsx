import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button } from 'semantic-ui-react';

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header as='h2'>Categories</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={10}>
            <Button floated='right'>Add New Category</Button>
            </Grid.Column>
          </Grid.Row>
          TODO - populate this page with all categories for the logged in user's company
        </Grid>
      </Container>
    );
  }
}

export default CategoriesPage;
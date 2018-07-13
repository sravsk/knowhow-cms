import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button } from 'semantic-ui-react';

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header as='h2'>Articles</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={10}>
            <Button floated='right'>Add New Article</Button>
            </Grid.Column>
          </Grid.Row>
          TODO - populate this page with all articles for the given category and company
        </Grid>
      </Container>
    );
  }
}

export default ArticlesPage;
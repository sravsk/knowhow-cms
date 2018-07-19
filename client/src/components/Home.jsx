import React from 'react';

import Editor from './Editor.jsx';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Header, Segment } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';
import CompanyArticles from './CompanyArticles.jsx';
import CategoriesPage from './CategoriesPage.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArticles: true,
      showCategories: false
    }
  }

  showCategories() {
    this.setState({
      showCategories: true,
      showArticles: false
    });
  }

  showArticles() {
    this.setState({
      showCategories: false,
      showArticles: true
    });
  }

  render () {
    if (this.state.showArticles) {
      var info = <CompanyArticles />
    } else if (this.state.showCategories) {
      var info = <CategoriesPage />
    }
    return (
      <Container>
        <NavBar />
        <Button floated='right'><Link to='/addcategory'>Add New Category</Link></Button>
        <Button floated='right'><Link to='/newarticle'>Add New Article</Link></Button>
        <br /><br />
        <Grid container celled>
          <Grid.Column width={3}>
            <Segment>
              <Header as='h3' onClick={this.showArticles.bind(this)}>Articles</Header>
            </Segment>
            <Segment>
              <Header as='h3' onClick={this.showCategories.bind(this)}>Categories</Header>
            </Segment>
          </Grid.Column>
          <Grid.Column width={13}>
            {info}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Home;

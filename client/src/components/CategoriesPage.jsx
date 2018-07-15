import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button, Item } from 'semantic-ui-react';
import axios from 'axios';
import CategoryItem from './CategoryItem.jsx';

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    // get info about logged in user
    axios.get('/user')
      .then(result => {
        let companyId = result.data.companyId;
        // get all categories for given companyId
        axios.get(`/${companyId}/categoriesdata`)
          .then(result => {
            this.setState({
              categories: result.data
            });
          })
      })
  }

  render() {
    let renderCategories = this.state.categories.map(category => {
      return (<div key={category.id}><CategoryItem category={category} /></div>);
    });
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header as='h2'>Categories</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={10}>
            <Button floated='right'><Link to='/addcategory'>Add New Category</Link></Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Item.Group divided>
              {renderCategories}
            </Item.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default CategoriesPage;
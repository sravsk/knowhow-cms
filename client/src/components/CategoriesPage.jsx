import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button, Segment } from 'semantic-ui-react';
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
      return (<Segment key={category.id}><CategoryItem category={category} /></Segment>);
    });
    return (
      <Container>
        <Grid  style = {{ marginLeft: '2vw', marginRight: '2vw' }}>
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header as='h2'>Categories</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Segment.Group style={{ width: '100%', 'minHeight': '70vh' }} >
              {renderCategories}
            </Segment.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default CategoriesPage;
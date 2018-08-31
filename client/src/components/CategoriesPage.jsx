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
    axios.get(`/${this.props.companyId}/categoriesdata`)
      .then(result => {
        this.setState({
          categories: result.data
        });
      }
    )
  }

  handleDelete(obj) {
    axios.post('/deletecategory', {id: obj.id, coId: obj.companyId})
    .then(res => this.setState({categories: res.data}))
  }

  render() {
    let renderCategories = this.state.categories.map(category => {
      return (<Segment raised key={category.id}><CategoryItem category={category} handleDelete={this.handleDelete.bind(this)} {...this.props}/></Segment>);
    });
    return (
      <Segment raised>
        <Header as='h2' textAlign='center'>
          Categories
        </Header>
        <Grid  style={{ marginLeft: '2vw', marginRight: '2vw', 'border': 'none' }}>
          <Grid.Row>
            <Segment.Group className='background' style={{ width: '100%', 'minHeight': '70vh', 'border': 'none' }} >
              {renderCategories}
            </Segment.Group>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default CategoriesPage;

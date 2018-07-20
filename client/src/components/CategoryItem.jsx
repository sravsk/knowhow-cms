import React from 'react';
import { Segment, Grid, Item, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpdate() {

  }

  render() {
    return (
      <Item>
        <Item.Header style={{ fontSize: '1.2em', paddingBottom: '0.5em' }} >
          <Link to={`/${this.props.category.companyId}/categories/${this.props.category.id}/articles`}>{this.props.category.name}</Link>
          <Button compact color='red' icon='trash alternate' floated='right' />
          <Button compact floated='right' >
            <Link to={{
            data: {
              id: this.props.category.id,
              name: this.props.category.name,
              description: this.props.category.description
            },
            pathname: '/addcategory'
          }} ><Icon name='edit' /></Link>
        </Button>
        </Item.Header>
        <Item.Description>
          {this.props.category.description}
        </Item.Description>
      </Item>
    );
  }
}

export default CategoryItem;

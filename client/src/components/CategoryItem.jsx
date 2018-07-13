import React from 'react';
import { Segment, Grid, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Item>
        <Item.Header style={{ fontSize: '1.2em', paddingBottom: '0.5em' }} >
          <Link to={`/${this.props.category.companyId}/categories/${this.props.category.id}/articles`}>{this.props.category.name}</Link>
        </Item.Header>
        <Item.Description>
          {this.props.category.description}
        </Item.Description>
      </Item>
    );
  }
}

export default CategoryItem;
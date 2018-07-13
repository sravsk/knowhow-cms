import React from 'react';
import { Segment, Grid, Item } from 'semantic-ui-react';

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Item>
        <Item.Header style={{ fontSize: '1.2em', paddingBottom: '0.5em' }} >
          {this.props.category.name}
        </Item.Header>
        <Item.Description>
          {this.props.category.description}
        </Item.Description>
      </Item>
    );
  }
}

export default CategoryPage;
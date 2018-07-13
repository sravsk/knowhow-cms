import React from 'react';
import { Segment, Grid, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ArticleContent from './ArticleContent.jsx';

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Item>
        <Item.Header style={{ fontSize: '1.2em', paddingBottom: '0.5em' }} >
          <Link to={{
            pathname: `/articles/${this.props.article.id}`,
            state: {
              article: this.props.article
            }
          }} >{this.props.article.title}</Link>
        </Item.Header>
        <Item.Description>
          {this.props.article.description}
        </Item.Description>
      </Item>
    );
  }
}

export default ArticleItem;

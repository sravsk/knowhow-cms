import React from 'react';
import { Segment, Grid, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ArticleContent from './ArticleContent.jsx';

const Hashids = require('hashids');
const hashids = new Hashids('knowhow-api', 16);

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hashedArticleId = hashids.encode(this.props.article.id);
    return (
      <Item className='background item'>
        <Item.Header style={{ fontSize: '1.2em', paddingBottom: '0.5em' }} >
          <Link to={{
            pathname: `/articles/${hashedArticleId}`,
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

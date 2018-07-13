import React from 'react';
import { Container, Item } from 'semantic-ui-react';

const ArticleContent = (props) => {
  let articleId = props.match.params;
  let article = props.location.state.article;
  return (
    <Container>
      <Item>
        <Item.Header as='h3'>
          {article.title}
        </Item.Header>
        <Item.Description as='h5'>
          {article.description}
        </Item.Description>
        <Item.Extra>
          {article.content}
        </Item.Extra>
      </Item>
    </Container>
  );
}

export default ArticleContent;

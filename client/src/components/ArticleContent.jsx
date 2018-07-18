import React from 'react';
import { Container, Item, Button, Segment, Header } from 'semantic-ui-react';

const ArticleContent = (props) => {
  let articleId = props.match.params;
  let article = props.location.state.article;
  return (
    <Container>
      <br /><br />
      <Button floated='right'>Edit Article</Button>
      <Segment style={{ 'marginTop': '7vh' }}>
        <Header as='h3'>
          {article.title}
        </Header>
        <Item.Description as='h5'>
          {article.description}
        </Item.Description>
        <Item.Extra>
          {article.content}
        </Item.Extra>
      </Segment>
    </Container>
  );
}

export default ArticleContent;

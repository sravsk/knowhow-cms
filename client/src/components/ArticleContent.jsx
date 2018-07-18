import React from 'react';
import { Container, Item, Button, Segment, Header } from 'semantic-ui-react';

const ArticleContent = (props) => {
  let articleId = props.match.params;
  let article = props.location.state.article;
  return (
    <Segment>
      <br />
      <Button floated='right'>Edit Article</Button>
      <Header as='h2' attached='top' style={{'marginTop': '7vh'}} >
        {article.title}
      </Header>
      <Header as='h3' attached='top, bottom'>
        {article.description}
      </Header>
      <Segment>
        {article.content}
      </Segment>
    </Segment>
  );
}

export default ArticleContent;

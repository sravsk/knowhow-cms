import React from 'react';
import { Container, Item, Button, Segment, Header } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';

const ArticleContent = (props) => {
  let articleId = props.match.params;
  let article = props.location.state.article;
  return (
    <Segment raised  style={{ 'marginTop': '-5em', 'minHeight': '100vh'}}>
      <NavBar />
      <Button floated='right'>Edit Article</Button>
      <Header as='h3' textAlign='center'>
        {article.title}<br/>
        {article.description}
      </Header>
      <Segment style={{ 'minHeight': '80vh' }}>
        {article.content}
      </Segment>
    </Segment>
  );
}

export default ArticleContent;

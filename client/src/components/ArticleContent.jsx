import React from 'react';
import { Container, Item, Button, Segment, Header, Icon, Modal, Grid } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ArticleContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  toggleModal() {
    this.setState({open: !this.state.open})
  }

  deleteArticle() {
    axios.post('/deleteArticle/', { articleId: this.props.location.state.article.id })
    .then(() => this.props.history.push('/home'));
  }

  render() {
    let articleId = this.props.match.params;
    let article = this.props.location.state.article;
    return (
      <Segment raised style={{ 'marginTop': '-10vh','minHeight': '90vh' }}>
        <NavBar />
        <br />
        <Modal open={this.state.open} trigger={<Button floated='right' style={{ 'color': '#2185d0'}} onClick={this.toggleModal}>Delete Article</Button>} basic size='small'>
          <Modal.Content>
            <p>
              {`You are about to delete ${article.title}.  Continue?`}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={this.toggleModal}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={this.deleteArticle}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Button floated='right'>
          <Link to={{
            pathname: '/addarticle',
            state: {
              title: article.title,
              description: article.description,
              content: article.content,
              category: article.categoryId,
              id: article.id
            }
          }} className='button-text-color'>Edit Article</Link>
        </Button>
        <Segment style={{ 'marginTop': '7vh', 'padding': '3vh 0', textAlign: 'center', 'backgroundColor': 'rgba(240, 240, 240, 0.5)' }}>
          <Header as='h1' style={{'lineHeight': '80%' }}>
            {article.title}
          </Header>
          <Header as='h3' style={{'lineHeight': '80%'}}>
            {article.description}
          </Header>
        </Segment>
        <Segment style={{ 'minHeight': '70vh', 'backgroundColor': 'rgba(240, 240, 240, 0.5)' }}>
          <div dangerouslySetInnerHTML={{__html: article.content}}></div>
        </Segment>
      </Segment>
    );
  }
}

export default ArticleContent;

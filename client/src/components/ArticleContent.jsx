import React from 'react';
import { Container, Item, Button, Segment, Header, Icon, Modal } from 'semantic-ui-react';
import axios from 'axios';

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
      <Segment style={{ 'minHeight': '70vh' }}>
        <br />
        <Modal open={this.state.open} trigger={<Button floated='right' onClick={this.toggleModal}>Delete Article</Button>} basic size='small'>
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
        <Button floated='right'>Edit Article</Button>
        <Header as='h2' attached='top' style={{'marginTop': '7vh'}} >
          {article.title}
        </Header>
        <Header as='h3' attached='top, bottom'>
          {article.description}
        </Header>
        <Segment style={{ 'minHeight': '60vh' }}>
          <div dangerouslySetInnerHTML={{__html: article.content}}></div>
        </Segment>
      </Segment>
    );
  }
}

export default ArticleContent;

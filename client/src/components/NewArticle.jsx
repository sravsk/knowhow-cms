import React from 'react';
import { Container, Input, Form } from 'semantic-ui-react';
import Editor from './Editor.jsx';

class NewArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      content: ''
    }
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleTitleChange(e){
    this.setState({
      title: e
    })
  }

  handleDescriptionChange(e){
    this.setState({
      description: e
    })
  }

  handleContentChange(html) {
    this.setState({content: html})
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input placeholder='New Article Title' onChange={this.handleTitleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder='Article description' onChange={this.handleDescriptionChange}/>
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <Editor handleContentChange={this.handleContentChange} content={this.props.content}/>
          </Form.Field>
        </Form>
      </Container>
    )
  }
};

export default NewArticle;

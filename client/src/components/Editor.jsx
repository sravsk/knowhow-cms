import React from 'react';
import { Container, Form } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
      categories:
        [
          { key: '1', text: 'valhardcoded1', value: 'hardcoded1' },
          { key: '2', text: 'valhardcoded2', value: 'hardcoded2' },
        ],
      title: '',
      description: '',
      category: null,
      content: '',
      modules: {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'},
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
        clipboard: {
          matchVisual: false,
        }
      },
      formats: [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.typeText = this.typeText.bind(this);
  }

  handleSubmit() {
    let article = {
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      content: this.state.content,
    }
    axios.post('/article', article)
    .then(res => JSON.stringify(res))
    .then(jres => console.log(jres))
    .catch(err => console.error(err))
    this.setState({ title: '', description: '', category: '', editorHtml: '' });
    alert(`${article.title} has been added to articles`);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCategory(e, { value, key, text }) {
    this.setState({ category: e.target.innerText })
  }

  typeText(html) {
    let delta = this.refs.quillRef.getEditor().getContents()
    this.setState({editorHtml: html, content: delta})
  }

  render() {
    return (
      <Container className="editor">
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required>
            <label>Title</label>
            <input placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field required>
            <label>Description</label>
            <input placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} />
          </Form.Field>
          <Form.Select label="Category" options={this.state.categories} name="category" placeholder="Category" value={this.state.category} onChange={this.handleCategory}>
          </Form.Select>
          <Form.Field required>
            <label>Content</label>
            <ReactQuill className="editor" placeholder={"Contribute content . . . "} className="content" ref="quillRef" modules={this.state.modules} formats={this.state.formats} theme="snow" bounds={'.editor'} onChange={this.typeText} value={this.state.editorHtml} />
          </Form.Field>
          <Form.Button content='Submit' />
        </Form>
      </Container>
    );
  }
}

export default Editor;
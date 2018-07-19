import React from 'react';
import { Container, Form, Button, Input, Dropdown } from 'semantic-ui-react';
import Editor from './Editor.jsx';
import ReactQuill from 'react-quill';
import axios from 'axios';

class NewArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      content: '',
      category: '',
      categories: [],
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

    this.setState = this.setState.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }

  componentDidMount() {
    if(this.props.location.state) {
        this.setState({
        title: this.props.location.state.title,
        description: this.props.location.state.description,
        content: this.props.location.state.content,
        category: this.props.location.state.category,
        id: this.props.location.state.id,
      })
    }
    axios.get('/user').then(res => {
      let compId = res.data.companyId;
      axios.get(`/${compId}/categoriesdata`).then(res2 => {
        var cleaned = []
        res2.data.forEach(catOption => {
          let scrubbed = {
            text: catOption.name,
            value: catOption.id,
            description: catOption.description
          }
          cleaned.push(scrubbed);
        })
        this.setState({categories: cleaned})
      })
    })
  }

  handleTitleChange(e, { value }) {
    this.setState({
      title: value
    })
  }

  handleDescriptionChange(e, { value }) {
    this.setState({
      description: value
    })
  }

  handleContentChange(html) {
    this.setState({
      content: html
    })
  }

  handleSelectCategory(e, { value }) {
    this.setState({
      category: value
    }, () => console.log(this.state.category))
  }

  saveArticle() {
    let obj = {
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
      categoryId: this.state.category,
      id: this.state.id
    };
    axios.post('/article',obj).then(res => {
      alert(res.data);
    });
  }

  render() {
    return (
      <Container>
        <h1>{this.props.location.state ? 'Edit Article' : 'New Article'}</h1>
        <Dropdown
          button
          search
          labeled
          fluid
          floating
          className='icon'
          icon='bars'
          text='Select Category'
          options={this.state.categories}
          value={this.state.category}
          onChange={this.handleSelectCategory}
        />
        <br />
        <Form>
          <h3>Title</h3>
          <Input
            placeholder='New Article Title'
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <br />
          <br />

          <h3>Description</h3>
          <Input
            placeholder='Article description'
            onChange={this.handleDescriptionChange}
            fluid
            value={this.state.description}
          />
          <br />

          <h3>Content</h3>
          <ReactQuill
            className="editor"
            placeholder={"Contribute content . . . "}
            className="content"
            ref={(el) => { this.reactQuillRef = el }}
            modules={this.state.modules}
            formats={this.state.formats}
            theme="snow"
            bounds={'.editor'}
            onChange={this.handleContentChange}
            value={this.state.content}
          />
          <br />

          <Button
            content='Save Article'
            onClick={this.saveArticle}
          />
        </Form>
      </Container>
    )
  }
};

export default NewArticle;

import React from 'react';
import { Segment, Form, Button, Input, Dropdown, Grid, Header, Container } from 'semantic-ui-react';
import Editor from './Editor.jsx';
import NavBar from './NavBar.jsx';
import ReactQuill from 'react-quill';
import Delta from 'quill-delta';
import config from '../../../config.js';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class NewArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      image: 0,
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
    this.replaceUri = this.replaceUri.bind(this);
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
    let editor = this.reactQuillRef.getEditor()
    let delta = editor.getContents();
    if(typeof delta.ops[delta.ops.length - 2] === 'object') {
      let dataUri = /(<img src=")([^"]*)(">)/g;
      if(!this.state.category | !this.state.title) {
        alert('Ensure both category and title are specified');
        return;
      } else {
        let corrected = html.replace(dataUri, this.replaceUri)
        this.setState({
          content: html,
          corrected: corrected
        })
      }
    } else {
      this.setState({
        content: html,
        corrected: html
      })
    }

  }

  replaceUri(match, p1, p2, p3, offset, string) {
    let bucket = config.S3.Bucket;
    let image = this.state.image
    let regex = /^data:.+\/(.+);base64,(.*)$/;
    let matches = p2.match(regex);
    let ext = matches[1];
    let data = matches[2];
    let key = `${this.state.category}/${this.state.title}/${this.state.image}.${ext}`;
    let encoded = `${encodeURIComponent(this.state.category)}/${encodeURIComponent(this.state.title)}/${this.state.image}.${ext}`.replace(/%20/g, '+');
    this.setState({image: this.state.image++})
    if(p2.includes('base64')) {
      let uri = /^data:.+\/(.+);base64,(.*)$/;
      let urimatch = p2.match(uri);
      axios.post('/uploadimage', {
        imageKey: key,
        data: data
      })
      .then(res => console.log(res));
      return `${p1}https://s3-us-west-2.amazonaws.com/${bucket}/${encoded}${p3}`
    } else {
      return `${p1}${p2}${p3}`
    }
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
      content: this.state.corrected,
      categoryId: this.state.category,
      id: this.state.id
    };
    axios.post('/article',obj).then(res => {
      alert(res.data);
    });
  }

  render() {
    return (
      <Segment raised style={{ 'marginTop': '-7vh', 'height': '100vh' }}>
        <Grid centered>
          <Grid.Column style={{ maxWidth: '80%', 'backgroundColor': 'rgba(240, 240, 240, 0.5)' }}>
            <Header as='h2' textAlign='center'>{this.props.location.state ? 'Edit Article' : 'New Article'}</Header>
            <br />
            <Segment raised>
              <Dropdown
                button
                search
                labeled
                fluid
                floating
                className='icon'
                icon='bars'
                placeholder='Select Category'
                options={this.state.categories}
                value={this.state.category}
                onChange={this.handleSelectCategory}
              />
              <br />
              <Form>
                <Header as='h3' textAlign='left'>Article Title</Header>
                <Input
                  fluid
                  placeholder='New Article Title'
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                />

                <Header as='h3' textAlign='left'>Article Description</Header>
                <Input
                  placeholder='Article description'
                  onChange={this.handleDescriptionChange}
                  fluid
                  value={this.state.description}
                />

                <Header as='h3' textAlign='left'>Article Content</Header>
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
                  style={{ 'minHeight': '15vh' }}
                />
                <Container textAlign='center'>
                  <Button
                    content='Save Article'
                    onClick={this.saveArticle}
                    style={{ 'color': '#2185d0', 'width': '20vw'}}
                  />
                </Container>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
};

export default withRouter(NewArticle);

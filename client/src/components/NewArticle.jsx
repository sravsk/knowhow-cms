import React from 'react';
import { Segment, Form, Button, Input, Dropdown, Grid, Header, Container } from 'semantic-ui-react';
import Editor from './Editor.jsx';
import NavBar from './NavBar.jsx';
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
    // var editor = this.reactQuillRef.getEditor()
    // var delta = editor.getContents()
    // console.log('delta ', delta)
    // console.log('delta.ops ', delta.ops)
    // var itag = html.match(/<img src="[^"]*">/g)



    let dataUri = /(<img src=")([^"]*)(">)/g
    console.log('dataUri ', html.match(dataUri))
    function replaceUri(match, p1, p2, p3, offset, string) {
      return p2.includes('base64') ? `${p1}${awsFile}${p2}` : `${p1}${p2}${p2}`
    }
    function replaceUri(match, p1, p2, p3, offset, string) {
      let bucket = 'houskertest'
      let path = 'folder1'
      let image = 'squirrel.png'
      let awsFile = `https://s3-us-west-2.amazonaws.com/${bucket}/${path}/${image}`
      return p2.includes('base64') ? `${p1}${awsFile}${p3}` : `${p1}${p2}${p3}`
    }
    let corrected = html.replace(dataUri, replaceUri)
    console.log('corrected ', corrected)



    // let htmlConverted = html.replace()
    // // console.log('itag ', itag)
    // let corrected = itag.map(tag => {
    //   let urlReg = /"([^"]*)"/
    //   let urlString = tag.match(urlReg)
    //   console.log('urlString ', urlString)

// let url = new URL(urlString[1]);
// let bufImg = ImageIO.read(url);
// let file = new File("downloaded.jpg");
// ImageIO.write(img, "jpg", file);


//filter for data urls (urls hosted on other sites can stay)
//convert data urls to file for upload (maybe involves converting to a blob and fileReader???)
//send to file to AWS and specify a path
//replace url with AWS filepath of image that you specified

// let bucket = 'adelleTest'
// let path = 'folder1'
// let image = 'image1.png'

//       tag = tag.replace(urlReg, `"https://s3.amazonaws.com/${bucket}/${path}/${image}"`)
//       // console.log('tag ', tag)
//     }).join('');
//     console.log('corrected ', corrected)



    this.setState({
      // content: html
      content: corrected
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
      <Segment raised style={{ 'marginTop': '-7vh', 'height': '100vh' }}>
        <NavBar />
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

export default NewArticle;

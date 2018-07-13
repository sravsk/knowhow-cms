import React from 'react';
import { Container, Grid, Button, Header } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
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
    this.typeText = this.typeText.bind(this);
  }

  typeText(html) {
    this.setState({editorHtml: html})
  }

  render() {
    return (
      <Container className="editor">
        <ReactQuill className="editor" placeholder={"Contribute content . . . "} className="content" ref={(el) => { this.reactQuillRef = el }} modules={this.state.modules} formats={this.state.formats} theme="snow" bounds={'.editor'} onChange={this.typeText} value={this.state.editorHtml} />
      </Container>
    );
  }
}

export default Editor;
import React from 'react';
import { Container, Grid, Header, Form, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from './NavBar.jsx';

class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      categoryDescription: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addCategory() {
    var data = {
      categoryName: this.state.categoryName,
      categoryDescription: this.state.categoryDescription
    };
    axios.post('/addCategory', data)
      .then(result => {
        if (result.data) {
          alert(`${this.state.categoryName} has been added.`);
        } else {
          alert(`${this.state.categoryName} already exists.`)
        }
        this.setState({
          categoryName: '',
          categoryDescription: ''
        })
      })
  }

  render() {
    return (
      <Segment raised  style={{ 'marginTop': '-5em', 'height': '100vh'}}>
        <NavBar />
        <br/>
        <Grid verticalAlign='center'>
          <Grid.Column style={{ maxWidth: '60%' }}>
            <Header as='h2' textAlign='center'>
              Add a new category for your company
            </Header>
            <Form size='large' onSubmit={this.addCategory.bind(this)}>
              <Segment raised>
                <Form.Input
                  name='categoryName'
                  value={this.state.categoryName}
                  fluid
                  placeholder='Category Name'
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                  name='categoryDescription'
                  value={this.state.categoryDescription}
                  fluid
                  placeholder='Category Description'
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Button content='Submit' style={{ 'color': '#2185d0'}}/>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default NewCategory;
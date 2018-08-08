import React from 'react';
import { Container, Grid, Header, Form, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from './NavBar.jsx';

class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      categoryDescription: '',
      id: ''
    }
  }

  componentDidMount() {
    if (this.props.location.data) {
      this.setState({
        categoryDescription: this.props.location.data.description,
        categoryName: this.props.location.data.name,
        id: this.props.location.data.id
      })
      // console.log(this.props.location.data);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  updateCategory() {
    let data = {
      id: this.state.id,
      name: this.state.categoryName,
      description: this.state.categoryDescription
    }

    axios.post('/updatecategory', data).then(() => this.props.history.push('/home'));
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
      }).then(() => this.props.history.push('/home'))
  }

  render() {
    return (
      <Segment raised style={{ 'height': '100vh' }}>
        <br/>
        <Grid centered>
          <Grid.Column style={{ maxWidth: '80%', 'backgroundColor': 'rgba(240, 240, 240, 0.5)' }}>
            <Header as='h2' textAlign='center'>
              {(this.props.location.data) ? 'Update Category' :
              'New Category'}
            </Header>
            <br />
            <Form size='large' onSubmit={this.state.id === '' ? this.addCategory.bind(this) : this.updateCategory.bind(this)}>
              <Segment raised>
                <br />
                <Header as='h3' textAlign='left'>Category Name</Header>
                <Form.Input
                  name='categoryName'
                  value={this.state.categoryName}
                  fluid
                  placeholder='Category Name'
                  onChange={this.handleChange.bind(this)}
                />
                <Header as='h3' textAlign='left'>Category Description</Header>
                <Form.Input
                  name='categoryDescription'
                  value={this.state.categoryDescription}
                  fluid
                  placeholder='Category Description'
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <Container textAlign='center'>
                  <Form.Button content='Save Category' style={{ 'color': '#2185d0', 'width': '20vw' }}/>
                </Container>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default NewCategory;

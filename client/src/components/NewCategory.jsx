import React from 'react';
import { Container, Grid, Header, Form, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';

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
        console.log('in add new category', result)
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
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '75%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Add a New Category
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
                <Form.Button content='Submit' primary />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default NewCategory;
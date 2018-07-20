import React from 'react';
import Editor from './Editor.jsx';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Header, Segment } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';
import CompanyArticles from './CompanyArticles.jsx';
import CategoriesPage from './CategoriesPage.jsx';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArticles: true,
      showCategories: false,
      company: ''
    }
  }

  componentDidMount() {
    // get company name for the user that's logged in
    axios.get('/company')
      .then(result => {
        this.setState({
          company: result.data
        });
      })
  }

  showCategories() {
    this.setState({
      showCategories: true,
      showArticles: false
    });
  }

  showArticles() {
    this.setState({
      showCategories: false,
      showArticles: true
    });
  }

  render () {
    if (this.state.showArticles) {
      var info = <CompanyArticles />
    } else if (this.state.showCategories) {
      var info = <CategoriesPage />
    }
    return (
      <Segment raised  style={{ 'marginTop': '-5em'}}>
        <NavBar />
        <Button floated='left' style={{'width': '40%'}}><Link to='#' className='button-text-color'>{this.state.company}</Link></Button>
        <Button floated='right'><Link to='/addcategory' className='button-text-color'>Add New Category</Link></Button>
        <Button floated='right' ><Link to='/newarticle' className='button-text-color'>Add New Article</Link></Button>
        <br /><br />
        <Grid container celled>
          <Grid.Column width={3} className='background'>
            <br/><br/>
            <Button fluid style={{ 'color': '#2185d0'}} onClick={this.showArticles.bind(this)}>Articles</Button><br/>
            <Button fluid style={{ 'color': '#2185d0'}} onClick={this.showCategories.bind(this)}>Categories</Button>
          </Grid.Column>
          <Grid.Column width={13}>
            {info}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default Home;

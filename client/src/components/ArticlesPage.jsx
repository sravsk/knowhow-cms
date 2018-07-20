import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';
import ArticleItem from './ArticleItem.jsx';
import NavBar from './NavBar.jsx';

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    let categoryId = this.props.match.params.categoryId;
    let companyId = this.props.match.params.companyId;
    // fetch all articles for the given category and company
    axios.get(`/${companyId}/categories/${categoryId}/articlesdata`)
      .then(result => {
        this.setState({
          articles: result.data
        });
      })
  }

  render() {
    let renderArticles = this.state.articles.map(article => {
      return (<Segment key={article.id}><ArticleItem article={article} /></Segment>);
    })
    return (
      <Segment raised  style={{ 'marginTop': '-5em'}}>
        <NavBar />
        <Grid style = {{ marginLeft: '2vw', marginRight: '2vw' }} >
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header as='h2'>Articles</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={10}>
            <Button floated='right'><Link to='/newarticle'>Add New Article</Link></Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Segment.Group style={{ width: '100%', 'minHeight': '70vh' }} >
              {renderArticles}
            </Segment.Group>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default ArticlesPage;
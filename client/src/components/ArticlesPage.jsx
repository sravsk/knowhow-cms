import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';
import ArticleItem from './ArticleItem.jsx';
import Pagination from './Pagination.jsx';

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
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

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({
      pageOfItems: pageOfItems
    });
  }

  render() {
    let renderArticles = this.state.pageOfItems.map(article => {
      return (<Segment key={article.id}><ArticleItem article={article} /></Segment>);
    })
    return (
      <Segment raised>
        <Grid style = {{ marginLeft: '2vw', marginRight: '2vw' }} >
          <Grid.Row>
            <Grid.Column floated='left' width={12}>
              <Header as='h2'>Articles in {this.props.location.state.categoryName}</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={4}>
            <Button floated='right'><Link to='/addarticle'>Add New Article</Link></Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Segment.Group style={{ width: '100%', 'minHeight': '70vh' }} >
              {renderArticles}
            </Segment.Group>
          </Grid.Row>
          <Grid.Row>
            <Pagination items={this.state.articles} onChangePage={this.onChangePage} />
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default ArticlesPage;

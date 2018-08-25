import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Header, Container, Button, Segment, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import ArticleItem from './ArticleItem.jsx';

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstArticles: [],
      lastArticles: [],
      previousArticles: [],
      nextArticles: [],
      currentArticles: [],
      perPage: 10,
      currentPage: 1,
      totalPages: 10
    };
    this.pageClick = this.pageClick.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.getFirstLastAndCount = this.getFirstLastAndCount.bind(this);
  }

  componentDidMount() {
    this.getFirstLastAndCount();
  }

    getFirstLastAndCount() {
    axios.get(`/${this.props.companyId}/articlesfirstlastpg/${this.state.perPage}`)
    .then(result => {
      this.setState({
        totalPages: Math.ceil(result.data.count / this.state.perPage),
        currentArticles: result.data.firstPage,
        nextArticles: result.data.nextPage,
        firstArticles: result.data.firstPage,
        lastArticles: result.data.lastPage
      });
    })
  }

  getCurrentPage(last) {
    let companyId = this.props.companyId
    axios.get(`/${companyId}/articlesdata/${this.state.currentPage}/${this.state.perPage}/${this.state.totalPages}`)
    .then(result => {
      if(this.state.currentPage < this.state.totalPages || this.state.currentPage > 1 && !last) {
        this.setState({currentArticles: result.data.currentPage})
      }
      this.setState({
        previousArticles: result.data.previousPage,
        nextArticles: result.data.nextPage
      });
    })
  }

  pageClick(e) {
    switch(e.target.innerHTML) {
      case '«':
        this.setState({currentPage: 1, currentArticles: this.state.firstArticles}, this.getCurrentPage);
        break;
      case '⟨':
        this.setState({currentPage: this.state.currentPage - 1}, this.getCurrentPage);
        break;
      case '...':
        break;
      case '⟩':
        if(this.state.currentPage !== this.state.totalPages) {
          this.setState({currentPage: this.state.currentPage + 1, currentArticles: this.state.nextArticles}, this.getCurrentPage);
        }
        break;
      case '»':
        if(this.state.currentPage !== this.state.totalPages) {
          this.setState({currentPage: this.state.totalPages, currentArticles: this.state.lastArticles}, () => this.getCurrentPage('last'))
        }
        break;
      default:
        if(parseInt(e.target.innerHTML) !== this.state.currentPage) {
          this.setState({currentPage: parseInt(e.target.innerHTML)}, this.getCurrentPage);
        }
    }
  }

  render() {
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
              {this.state.currentArticles.map(article => (<Segment raised key={article.id}><ArticleItem article={article} /></Segment>))}
            </Segment.Group>
          </Grid.Row>
          <Grid.Row>
            <Pagination defaultActivePage={1} totalPages={this.state.totalPages} onClick={this.pageClick} />
        </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default withRouter(ArticlesPage);

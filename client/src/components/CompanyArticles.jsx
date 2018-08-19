import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button, Segment, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import ArticleItem from './ArticleItem.jsx';

class CompanyArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      currentPage: 1,
      totalPages: 10
    }
    this.pageClick = this.pageClick.bind(this);
  }

  componentDidMount() {
    //get the count(*) articles from server, divide by ten, set state of total pages
    // get info about logged in user
    if (this.props.companyId) {
      let companyId = this.props.companyId
      axios.get(`/${companyId}/articlesdata/${this.state.currentPage}`)
      .then(result => {
        this.setState({
          articles: result.data
        });
      })
    }
  }

  componentDidUpdate() {
    // get info about logged in user
    // console.log('component updated');
    let companyId = this.props.companyId
      axios.get(`/${companyId}/articlesdata/${this.state.currentPage}`)
        .then(result => {
          this.setState({
            articles: result.data
          });
        })
  }

  getPage() {
    axios.get(`/${companyId}/articlesdata/${this.state.currentPage}`)
    .then(result => {
      this.setState({
        articles: result.data
      });
    })
  }

  pageClick(e) {
    console.log('e.target.value from pageClick: ', e.target.innerHTML)
    switch(e.target.innerHTML) {
      case '«':
        this.setState({currentPage: 1})
        console.log('you have a beginning arrow!');
        break;
      case '⟨':
        this.setState({currentPage: this.state.currentPage - 1})
        console.log('you have a back arrow!');
        break;
      case '...':
        console.log('elipsis');
        break;
      case '⟩':
        this.setState({currentPage: this.state.currentPage + 1})
        console.log('you have a next arrow!');
        break;
      case '»':
        this.setState({currentPage: this.state.totalPages})
        console.log('you have a last arrow!');
        break;
      default:
        this.setState({currentPage: parseInt(e.target.innerHTML)});
    }
  }

  render() {
    let renderArticles = this.state.articles.map(article => {
      return (<Segment raised key={article.id}><ArticleItem article={article} /></Segment>);
    })
    return (
      <Segment raised >
        <Header as='h2' textAlign='center'>
          Articles
        </Header>
        <Grid  style = {{ marginLeft: '2vw', marginRight: '2vw', 'border': 'none' }}>
          <Grid.Row>
            <Segment.Group className='background' style={{ width: '100%', 'minHeight': '70vh', 'border': 'none' }} >
              {renderArticles}
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

export default CompanyArticles;

import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';
import ArticleItem from './ArticleItem.jsx';

class CompanyArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
    console.log(props)
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    // get info about logged in user
    if (this.props.companyId) {
      let companyId = this.props.companyId
      axios.get(`/${companyId}/articlesdata/${this.props.currentPage}`)
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
      axios.get(`/${companyId}/articlesdata/${this.props.currentPage}`)
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
        </Grid>
      </Segment>
    );
  }
}

export default CompanyArticles;

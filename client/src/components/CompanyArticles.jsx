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
  }

  componentDidMount() {
    // get info about logged in user
    axios.get('/user')
      .then(result => {
        let companyId = result.data.companyId;
        // get all articles for given companyId
        axios.get(`/${companyId}/articlesdata`)
          .then(result => {
            this.setState({
              articles: result.data
            });
          })
      })
  }

  render() {
    let renderArticles = this.state.articles.map(article => {
      return (<Segment key={article.id}><ArticleItem article={article} /></Segment>);
    })
    return (
      <Container >
        <Grid  style = {{ marginLeft: '5vw', marginRight: '5vw' }}>
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header as='h2'>Articles</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Segment.Group style={{ width: '100%' }} >
              {renderArticles}
            </Segment.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default CompanyArticles;

// all articles for given company id

import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button, Item } from 'semantic-ui-react';
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
    console.log('in company articles page')
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
      return (<div key={article.id}><ArticleItem article={article} /></div>);
    })
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header as='h2'>Articles</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={10}>
            <Button floated='right'>Add New Article</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Item.Group divided>
              {renderArticles}
            </Item.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default CompanyArticles;

// all articles for given company id

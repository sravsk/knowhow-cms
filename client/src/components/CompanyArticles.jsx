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
    let companyId = this.props.companyId
      axios.get(`/${companyId}/articlesdata`)
        .then(result => {
          this.setState({
            articles: result.data
          });
        })
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

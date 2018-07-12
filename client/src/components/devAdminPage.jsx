import axios from 'axios';

import React from 'react';
import { Container, Grid, Button, Header } from 'semantic-ui-react';

class devAdminPage extends React.Component {
  constructor(props){
    super(props)
  }

  fillTestData() {
    axios.get('/db/testfill').then(result => {
      alert(result.data);
    })
  }

  clearDatabase() {
    axios.get('/db/clear').then(result => {
      alert(result.data);
    })
  }

  dropDatabase() {
    axios.get('/db/drop').then(result => {
      alert(result.data);
    })
  }

  rebuildDatabase() {
    axios.get('/db/rebuild').then(result => {
      alert(result.data);
    })
  }

  render(){
    return(
      <Container >
        <Header>Developer Admin Page</Header>
        <Grid style={{height: '8vh'}}>
          <Grid.Row>
            <Button onClick={this.fillTestData} content='Fill test data' color='yellow'/>
            <Button onClick={this.clearDatabase} content='Empty database' color='purple'/>
            <Button onClick={this.dropDatabase} content='Drop database' color='red'/>
            <Button onClick={this.rebuildDatabase} content='Rebuild database' color='red'/>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default devAdminPage;

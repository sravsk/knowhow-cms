import React from 'react';
import { Container, Header, Divider, Grid, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container className='content-main'>
        <Icon name='book'/>

        <Header as='h3' style={{ 'textAlign': 'center', 'marginTop': '5vh' }} color='blue'>
          A self-serve online library for your product or service.
        </Header>

        <Divider />

        <Grid className='content-list'>
          <Grid.Column width={5}>
            <Image src='https://s3.us-east-2.amazonaws.com/knowhow-123/ezgif.com-video-to-gif+(1).gif' size='medium' />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header>Rich Content</Header>
            <Container textAlign='justified'>
              <p>

                You can put tons of info into your articles, which will display super cool.

              </p>
            </Container>
          </Grid.Column>
        </Grid>

        <Divider />

        <Grid className='content-list'>
          <Grid.Column width={9}>
            <Header>Image Support</Header>
            <Container textAlign='justified'>
              <p>

                Place images into your content to help your customers better understand your product.

              </p>
            </Container>
          </Grid.Column>
          <Grid.Column width={5}>
            <Image src='https://s3.us-east-2.amazonaws.com/knowhow-123/ezgif.com-video-to-gif+(2).gif' size='medium' />
          </Grid.Column>
        </Grid>

        <Divider />

        <Grid className='content-list'>
          <Grid.Column width={5}>
            <Image src='https://s3.us-east-2.amazonaws.com/knowhow-123/Screen+Shot+2018-08-30+at+8.42.51+PM.png' size='medium' />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header>Nest Videos</Header>
            <Container textAlign='justified'>
              <p>

                Add videos into your content to remove confusion and increase understanding

              </p>
            </Container>
          </Grid.Column>
        </Grid>

        <Divider />

        <Grid className='content-list'>
          <Grid.Column width={9}>
            <Header>Chat with your Customers</Header>
            <Container textAlign='justified'>
              <p>

                Answer customer questions when they need clarity

              </p>
            </Container>
          </Grid.Column>
          <Grid.Column width={5}>
            <Image src='https://s3.us-east-2.amazonaws.com/knowhow-123/ezgif.com-video-to-gif.gif' size='medium' />
          </Grid.Column>
        </Grid>

        <Divider inverted/>

        <Grid className='content-list'>
          <Grid.Column width={5}>
            <Image src='https://s3.us-east-2.amazonaws.com/knowhow-123/ezgif.com-video-to-gif+(3).gif' size='medium' />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header>Explore and Search</Header>
            <Container textAlign='justified'>
              <p>

                Customers can easily navigate and search through your product content

              </p>
            </Container>
          </Grid.Column>
        </Grid>

        <Divider />

      </Container>
    );
  }
}

export default LandingPage;

// Rich text articles
// Support for Images
// Nest Videos
// Chat
// Search

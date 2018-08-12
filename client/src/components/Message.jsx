import React from 'react';
import { Grid, Header, Container, Button, Segment, Comment, Form} from 'semantic-ui-react';

const Message = (props) => {
  var d = new Date();
	return(
      <Comment>
        <Comment.Avatar src='https://s3-us-west-1.amazonaws.com/knowhow-s3/assets/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>{props.user}</Comment.Author>
          <Comment.Metadata>
            <div>Today at {d.getHours()} : {d.getMinutes()}</div>
          </Comment.Metadata>
          <Comment.Text>
           {props.message.message.text}
          </Comment.Text>
        </Comment.Content>
      </Comment>
		)
}

export default Message;
import React from 'react';
import { Grid, Header, Container, Button, Segment, Comment, Form} from 'semantic-ui-react';

const Message = (props) => {
	return(
      <Comment>
        <Comment.Avatar src='https://semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>{props.user}</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>
           {props.message.message.text}
          </Comment.Text>
        </Comment.Content>
      </Comment>
		)
}

export default Message;